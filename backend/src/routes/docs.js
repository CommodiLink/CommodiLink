import express from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.js";
import { attachAccess, requirePaidAndVerified } from "../middleware/access.js";

export const docs = express.Router();
const upload = multer({ dest: "/tmp" });

docs.get("/api/docs", requireAuth(), attachAccess, requirePaidAndVerified, (_req, res) => {
  res.json([{ id: 1, name: "SPA_Sample.pdf", url: "#", createdAt: new Date() }]);
});

docs.post("/api/docs", requireAuth(), attachAccess, requirePaidAndVerified, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "file_required" });
  res.status(201).json({ id: Math.floor(Math.random() * 100000), name: req.file.originalname, url: "#", createdAt: new Date() });
});
