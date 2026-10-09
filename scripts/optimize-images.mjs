/**
 * Generates a resized WebP copy next to every raster image in public/assets
 * (photo.png -> photo.webp), then points src/ references at the WebP copies.
 *
 * Why: many source photos are straight off a camera or phone (5–10 MB PNG/JPG,
 * 4000+ px wide). PageSpeed's "Properly size images" / "Serve images in
 * next-gen formats" / LCP audits were dominated by them. The originals stay
 * untouched in public/ so nothing that still links to them breaks.
 *
 * Usage:  npm run optimize:images
 * Re-run after adding new photos — already-converted files are skipped.
 */
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const PUBLIC = path.join(ROOT, "public");
const ASSETS = path.join(PUBLIC, "assets");
const SRC = path.join(ROOT, "src");

const MAX_WIDTH = 1920;
// Folders whose images only ever render small get a tighter cap (≈2× their
// largest on-screen width) so PageSpeed's "Properly size images" passes.
const FOLDER_MAX_WIDTH = {
  "images of university/logo": 600,
  "images of university/recognisation": 320,
  "images of university/hero section": 720,
  "images of university/leadership": 800,
  "images of university/testimonials": 800,
};
const maxWidthFor = (file) => {
  const rel = path.relative(ASSETS, path.dirname(file)).split(path.sep).join("/");
  return FOLDER_MAX_WIDTH[rel] ?? MAX_WIDTH;
};
const QUALITY = 72;
const RASTER = /\.(png|jpe?g)$/i;

// Files whose image URLs are read by crawlers / social cards — keep JPG/PNG there.
const SKIP_REWRITE = new Set(["schema.js", "SEO.jsx"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

// photo.png -> photo.webp. When photo.png and photo.jpg both exist they would
// collide, so those become photo-png.webp / photo-jpg.webp.
// Compares real directory listings: existsSync() is case-insensitive on
// Windows, so it would report photo.JPG as a sibling of photo.jpg.
const listing = new Map();
const siblings = (dir) => {
  if (!listing.has(dir)) listing.set(dir, existsSync(dir) ? readdirSync(dir) : []);
  return listing.get(dir);
};
const webpPath = (file) => {
  const ext = path.extname(file);
  const stem = file.slice(0, -ext.length);
  const base = path.basename(stem);
  const collides = siblings(path.dirname(file)).some(
    (name) => name !== path.basename(file) && RASTER.test(name) && name.slice(0, -path.extname(name).length) === base,
  );
  return collides ? `${stem}-${ext.slice(1).toLowerCase()}.webp` : `${stem}.webp`;
};

async function convertAll() {
  let before = 0, after = 0, count = 0;
  for await (const file of walk(ASSETS)) {
    if (!RASTER.test(file)) continue;
    const out = webpPath(file);
    const src = await stat(file);
    if (existsSync(out) && (await stat(out)).mtimeMs >= src.mtimeMs) continue;
    try {
      await sharp(file)
        .rotate() // respect EXIF orientation from phone photos
        .resize({ width: maxWidthFor(file), withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(out);
      const o = await stat(out);
      before += src.size; after += o.size; count++;
      console.log(`${(src.size / 1024).toFixed(0).padStart(6)} KB -> ${(o.size / 1024).toFixed(0).padStart(5)} KB  ${path.relative(PUBLIC, file)}`);
    } catch (err) {
      console.warn(`skip ${path.relative(PUBLIC, file)}: ${err.message}`);
    }
  }
  if (count) console.log(`\nConverted ${count} images: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
}

// Matches "/assets/....png" style URLs (possibly %20-encoded) inside source files.
const REF = /\/assets\/[^"'`)\s]+?\.(?:png|jpe?g)(?=["'`)\s])/gi;

async function rewriteRefs() {
  let changed = 0;
  for await (const file of walk(SRC)) {
    if (!/\.(jsx?|css)$/.test(file) || /\.test\./.test(file) || SKIP_REWRITE.has(path.basename(file))) continue;
    const text = await readFile(file, "utf8");
    const next = text.replace(REF, (url) => {
      const onDisk = path.join(PUBLIC, decodeURIComponent(url));
      return existsSync(webpPath(onDisk)) ? webpPath(url) : url;
    });
    if (next !== text) {
      await writeFile(file, next);
      changed++;
      console.log(`rewrote ${path.relative(ROOT, file)}`);
    }
  }
  console.log(`Updated references in ${changed} files.`);
}

await convertAll();
await rewriteRefs();
