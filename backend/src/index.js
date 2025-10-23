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

// ✅ Trust Render’s proxy so secure cookies work
app.set("trust proxy", 1);

// Allow your frontend
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ||
  process.env.CORS_ORIGIN ||
  "https://commodilink-frontend-1orq.onrender.com";

app.use(
  cors({
    origin: FRONTEND_ORIGIN,      // must be exact, no "*"
    credentials: true,            // allow cookies
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

// Home/health
app.get("/", (_req, res) => res.type("text/plain").send("✅ Backend is running"));
app.get(["/health", "/api/health", "/api/status"], (_req, res) => {
  res.json({ ok: true, service: "commodilink-backend", time: new Date().toISOString(), uptimeSec: Math.round(process.uptime()) });
});
app.get("/healthz", async (_req, res) => {
  const payload = { ok: true, db: prisma ? "ok" : "unavailable" };
  if (prisma) {
    try { await prisma.$queryRaw`SELECT 1`; } catch (e) { payload.db = "error"; payload.error = e?.message || String(e); }
  }
  res.json(payload);
});

/* ================== AUTH ================== */
// POST /api/login → sets HttpOnly cookie usable cross-site
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  try {
    let user = null;

    if (prisma) {
      try { user = await prisma.user.findFirst({ where: { email } }); } catch {}
      // TODO: verify password hash
    }

    // demo user when DB empty
    if (!user && email === "demo@commodilink.com" && password === "Password1") {
      user = { id: 1, email, companyId: 1 };
    }
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
      { sub: user.id, email: user.email, company_id: user.companyId ?? 1 },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // 🔐 Critical cookie flags for cross-site XHR
    res.cookie("session", token, {
      httpOnly: true,
      sameSite: "none",   // <-- cross-site requires "none"
      secure: true,       // <-- must be true with SameSite=None
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ error: "login_failed" });
  }
});

app.post("/api/logout", (_req, res) => {
  res.clearCookie("session", { httpOnly: true, sameSite: "none", secure: true });
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
/* ========================================= */

// Demo user endpoints (optional)
app.get("/users", async (_req, res) => {
  if (!prisma) return res.status(503).json({ error: "database not available" });
  try {
    const users = await prisma.user.findMany({ take: 50, orderBy: { id: "asc" } });
    res.json(users);
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ error: String(err?.message || err) });
  }
});

app.post("/users", async (req, res) => {
  if (!prisma) return res.status(503).json({ error: "database not available" });
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: "email and password required" });
    const user = await prisma.user.create({ data: { email, password } });
    res.status(201).json(user);
  } catch (err) {
    if (err?.code === "P2002") return res.status(409).json({ error: "email already exists" });
    console.error("POST /users error:", err);
    res.status(500).json({ error: String(err?.message || err) });
  }
});

// Routers (protected where needed)
app.use(companies);
app.use(dealRooms);
app.use(kyc);
app.use(billing);
app.use(docs);
app.use(analytics);

// Port
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 API listening on :${PORT}`));

