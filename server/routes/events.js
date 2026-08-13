import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 12 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image files are allowed"));
    cb(null, true);
  },
});

const router = Router();

function toPublicEvent(e) {
  return { ...e, images: JSON.parse(e.images || "[]") };
}

// Events can only be dated within the current month, up to today — no backdating into
// past months and no scheduling into the future.
function dateRange() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const startOfMonth = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-01`;
  return { startOfMonth, today };
}

function isDateInAllowedRange(date) {
  const { startOfMonth, today } = dateRange();
  return date >= startOfMonth && date <= today;
}

router.get("/", async (req, res, next) => {
  try {
    const [events] = await db.query("SELECT * FROM events WHERE status = 'active' ORDER BY created_at DESC");
    res.json({ events: events.map(toPublicEvent) });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, upload.array("images", 12), async (req, res, next) => {
  try {
    const { title, description, date } = req.body || {};
    if (!title || !date) {
      return res.status(400).json({ error: "Title and date are required" });
    }
    if (!isDateInAllowedRange(date)) {
      const { startOfMonth, today } = dateRange();
      return res.status(400).json({ error: `Date must be between ${startOfMonth} and ${today}` });
    }

    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);
    const [result] = await db.query(
      "INSERT INTO events (title, description, date, images, created_by) VALUES (?, ?, ?, ?, ?)",
      [title, description || "", date, JSON.stringify(images), req.user.id]
    );

    const [rows] = await db.query("SELECT * FROM events WHERE id = ?", [result.insertId]);
    res.status(201).json({ event: toPublicEvent(rows[0]) });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth, upload.array("images", 12), async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM events WHERE id = ? AND status = 'active'", [req.params.id]);
    const existing = rows[0];
    if (!existing) return res.status(404).json({ error: "Event not found" });

    const { title, description, date } = req.body || {};
    if (!title || !date) {
      return res.status(400).json({ error: "Title and date are required" });
    }
    if (!isDateInAllowedRange(date)) {
      const { startOfMonth, today } = dateRange();
      return res.status(400).json({ error: `Date must be between ${startOfMonth} and ${today}` });
    }

    const currentImages = JSON.parse(existing.images || "[]");
    let keep = currentImages;
    if (req.body.keepImages !== undefined) {
      try {
        const parsed = JSON.parse(req.body.keepImages);
        if (Array.isArray(parsed)) keep = parsed.filter((img) => currentImages.includes(img));
      } catch {
        // malformed keepImages — fall back to keeping all existing images
      }
    }

    const removed = currentImages.filter((img) => !keep.includes(img));
    for (const img of removed) {
      fs.unlink(path.join(uploadsDir, path.basename(img)), () => {});
    }

    const newImages = (req.files || []).map((f) => `/uploads/${f.filename}`);
    const images = [...keep, ...newImages];

    await db.query(
      "UPDATE events SET title = ?, description = ?, date = ?, images = ?, updated_by = ?, updated_at = NOW() WHERE id = ?",
      [title, description || "", date, JSON.stringify(images), req.user.id, req.params.id]
    );

    const [updatedRows] = await db.query("SELECT * FROM events WHERE id = ?", [req.params.id]);
    res.json({ event: toPublicEvent(updatedRows[0]) });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM events WHERE id = ? AND status = 'active'", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: "Event not found" });

    await db.query(
      "UPDATE events SET status = 'deleted', updated_by = ?, updated_at = NOW() WHERE id = ?",
      [req.user.id, req.params.id]
    );
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
