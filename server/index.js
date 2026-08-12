import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import eventsRoutes from "./routes/events.js";
import newsRoutes from "./routes/news.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/news", newsRoutes);

// In production, serve the built frontend from the same process.
const distDir = path.join(__dirname, "..", "dist");
app.use(express.static(distDir));
app.get(/^(?!\/api|\/uploads).*/, (req, res, next) => {
  res.sendFile(path.join(distDir, "index.html"), (err) => {
    if (err) next();
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Amaltas API listening on http://localhost:${PORT}`));
