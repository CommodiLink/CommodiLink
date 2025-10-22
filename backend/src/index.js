// backend/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import { requireAuth } from "./middleware/auth.js";
import { attachAccess } from "./middleware/access.js";

// Routers
import { companies } from "./routes/companies.js";
import { dealRooms } from "./routes/dealRooms.js";
import { kyc } from "./routes/kyc.js";
import { billing } from "./routes/billing.js";
import { docs } from "./routes/docs.js";
import { analytics } from "./routes/analytics.js";

dotenv.config();

const app = express();

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ||
  process.env.CORS_ORIGIN ||
  "https://commodilink-frontend-1orq.onrender.com";

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Try to initialize Prisma, but don't crash if DB isn't ready
let prisma = null;
try {
  const { PrismaClient } = await import("@prisma/client");
  prisma = new PrismaClient();
  await prisma.$connect();
  console.log("Prisma connected");
} catch (e) {
  console.warn("Prisma not available yet (continuing without DB):", e?.message || e);
}
// expose so routers can detect demo vs DB
globalThis.prisma = prisma;

// Home
app.get("/", (_req, res) => res.type("text/plain").send("✅ Backend is running"));

app.get(["/health", "/api/health", "/api/status"], (_req, res) => {
  res.json({
    ok: true,
    service: "commodilink-backend",
    time: new Date().toISOString(),
    uptimeSec: Math.round(process.uptime()),
  });
});

// DB health check
app.get("/healthz", async (_req, res) => {
  const payload = { ok: true, db: "skipped" };
  if (!prisma) return res.json({ ...payload, db: "unavailable" });
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ...payload, db: "ok" });
  } catch (err) {
    res.json({ ...payload, db: "error", error: err?.message || String(err) });
  }
});

// ---------------- AUTH (cookie) ----------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  try {
    let user = null;

    if (prisma) {
      try {
        user = await prisma.user.findFirst({ where: { email } });
        // TODO: verify password hash if stored
      } catch {}
    }

    if (!user && email === "demo@commodilink.com" && password === "Password1") {
      user = { id: 1, email: "demo@commodilink.com", companyId: 1 };
    }

    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
      { sub: user.id, email: user.email, company_id: user.companyId ?? 1 },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set true when you have HTTPS on both services + custom domain
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ error: "login_failed" });
  }
});

app.post("/api/logout", (_req, res) => {
  res.clearCookie("session", { httpOnly: true, sameSite: "lax", secure: false });
  res.json({ ok: true });
});

app.get("/api/me", requireAuth(), attachAccess, (req, res) => {
  const { user, company, kycVerified, paid } = req.access;
  res.json({
    user: { id: user.id, email: user.email },
    company,
    access: { kycVerified, paid },
  });
});

// ---------------- ROUTERS ----------------
app.use(companies);
app.use(dealRooms);
app.use(kyc);
app.use(billing);
app.use(docs);
app.use(analytics);

// 404 helper (so the client gets JSON, not HTML)
app.use((req, res) => {
  res.status(404).json({ error: "not_found", path: req.path });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API listening on :${PORT}`);
});

