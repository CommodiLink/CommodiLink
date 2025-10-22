// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';          // ← NEW
import jwt from 'jsonwebtoken';                    // ← NEW
import { dealRooms } from './routes/dealRooms.js'; // ← NEW
import { requireAuth } from './middleware/auth.js';      // ← NEW
import { attachAccess } from './middleware/access.js';   // ← NEW

dotenv.config();

const app = express();

// Allow your frontend (works locally too)
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ||
  process.env.CORS_ORIGIN ||
  'https://commodilink-frontend-1orq.onrender.com';

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // ← enable reading HttpOnly cookies

// Try to initialize Prisma, but don't crash if DB isn't ready
let prisma = null;
try {
  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient();
  await prisma.$connect();
  console.log('Prisma connected');
} catch (e) {
  console.warn('Prisma not available yet (continuing without DB):', e?.message || e);
}

// Home
app.get('/', (_req, res) => res.type('text/plain').send('✅ Backend is running'));

// Lightweight health (NEVER hits DB; always 200)
app.get(['/health', '/api/health', '/api/status'], (_req, res) => {
  res.json({
    ok: true,
    service: 'commodilink-backend',
    time: new Date().toISOString(),
    uptimeSec: Math.round(process.uptime()),
  });
});

// DB health check (returns 200 with db status instead of 500)
app.get('/healthz', async (_req, res) => {
  const payload = { ok: true, db: 'skipped' };

  if (!prisma) {
    payload.db = 'unavailable';
    return res.json(payload);
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    payload.db = 'ok';
    res.json(payload);
  } catch (err) {
    payload.db = 'error';
    payload.error = err?.message || String(err);
    res.json(payload);
  }
});

/* ================== SIMPLE AUTH (cookie-based) ================== */
/** POST /api/login
 * Accepts { email, password } and sets an HttpOnly cookie "session".
 * For now we allow a demo user when DB is missing so you can test UI.
 */
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    let user = null;
    if (prisma) {
      user = await prisma.user.findFirst({ where: { email } });
      // TODO: verify password hash if you store one
    }
    if (!user) {
      if (email === 'demo@commodilink.com' && password === 'Password1') {
        user = { id: 1, email: 'demo@commodilink.com', companyId: 1 };
      }
    }
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const token = jwt.sign(
      { sub: user.id, email: user.email, company_id: user.companyId ?? 1 },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.cookie('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set true when serving over HTTPS
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({ error: 'login_failed' });
  }
});

/** GET /api/me
 * Verifies cookie and returns user + access flags (paid/KYC).
 */
app.get('/api/me', requireAuth(), attachAccess, (req, res) => {
  const { user, company, kycVerified, paid } = req.access;
  res.json({ user: { id: user.id, email: user.email }, company, access: { kycVerified, paid } });
});
/* ================================================================ */

// Demo user endpoints you already had
app.get('/users', async (_req, res) => {
  if (!prisma) return res.status(503).json({ error: 'database not available' });
  try {
    const users = await prisma.user.findMany({ take: 50, orderBy: { id: 'asc' } });
    res.json(users);
  } catch (err) {
    console.error('GET /users error:', err);
    res.status(500).json({ error: String(err?.message || err) });
  }
});

app.post('/users', async (req, res) => {
  if (!prisma) return res.status(503).json({ error: 'database not available' });
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    const user = await prisma.user.create({ data: { email, password } });
    res.status(201).json(user);
  } catch (err) {
    if (err?.code === 'P2002') return res.status(409).json({ error: 'email already exists' });
    console.error('POST /users error:', err);
    res.status(500).json({ error: String(err?.message || err) });
  }
});

// Quick seed route to add a demo user
app.get('/dev/seed', async (_req, res) => {
  if (!prisma) return res.status(503).json({ error: 'database not available' });
  try {
    const email = `demo+${Date.now()}@example.com`;
    const user = await prisma.user.create({ data: { email, password: 'demo' } });
    res.json(user);
  } catch (err) {
    console.error('GET /dev/seed error:', err);
    res.status(500).json({ error: String(err?.message || err) });
  }
});

/* ========= IMPORTANT: mount Deal Rooms API (protected) ========= */
app.use(dealRooms);
/* =============================================================== */

// Bind to Render's dynamic port
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API listening on :${PORT}`);
});
