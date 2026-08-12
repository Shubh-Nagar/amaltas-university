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
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image files are allowed"));
    cb(null, true);
  },
});

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const [news] = await db.query("SELECT * FROM news WHERE status = 'active' ORDER BY created_at DESC");
    res.json({ news });
  } catch (err) {
    next(err);
  }
});

router.get("/deleted", requireAuth, async (req, res, next) => {
  try {
    const [news] = await db.query("SELECT * FROM news WHERE status = 'deleted' ORDER BY updated_at DESC");
    res.json({ news });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "An image is required" });

    const image = `/uploads/${req.file.filename}`;
    const [result] = await db.query(
      "INSERT INTO news (image, created_by) VALUES (?, ?)",
      [image, req.user.id]
    );

    const [rows] = await db.query("SELECT * FROM news WHERE id = ?", [result.insertId]);
    res.status(201).json({ news: rows[0] });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth, upload.single("image"), async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM news WHERE id = ? AND status = 'active'", [req.params.id]);
    const existing = rows[0];
    if (!existing) return res.status(404).json({ error: "News item not found" });

    let image = existing.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
      if (existing.image) fs.unlink(path.join(uploadsDir, path.basename(existing.image)), () => {});
    }

    await db.query(
      "UPDATE news SET image = ?, updated_by = ?, updated_at = NOW() WHERE id = ?",
      [image, req.user.id, req.params.id]
    );

    const [updatedRows] = await db.query("SELECT * FROM news WHERE id = ?", [req.params.id]);
    res.json({ news: updatedRows[0] });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM news WHERE id = ? AND status = 'active'", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: "News item not found" });

    await db.query(
      "UPDATE news SET status = 'deleted', updated_by = ?, updated_at = NOW() WHERE id = ?",
      [req.user.id, req.params.id]
    );
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/restore", requireAuth, async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM news WHERE id = ? AND status = 'deleted'", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: "Deleted news item not found" });

    await db.query(
      "UPDATE news SET status = 'active', updated_by = ?, updated_at = NOW() WHERE id = ?",
      [req.user.id, req.params.id]
    );

    const [updatedRows] = await db.query("SELECT * FROM news WHERE id = ?", [req.params.id]);
    res.json({ news: updatedRows[0] });
  } catch (err) {
    next(err);
  }
});

export default router;
