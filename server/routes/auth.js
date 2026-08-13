import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { requireAuth, JWT_SECRET } from "../middleware/auth.js";

const router = Router();

function toPublicUser(u) {
  return { id: u.id, name: u.name, phone: u.phone, email: u.email, username: u.username };
}

router.post("/register", async (req, res, next) => {
  try {
    const { name, phone, email, username, password, confirmPassword } = req.body || {};

    if (!name || !phone || !email || !username || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const [existingRows] = await db.query(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingRows.length > 0) {
      return res.status(409).json({ error: "Username or email already registered" });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name, phone, email, username, password) VALUES (?, ?, ?, ?, ?)",
      [name, phone, email, username, passwordHash]
    );

    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
    const user = rows[0];
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    const user = rows[0];
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
});

export default router;
