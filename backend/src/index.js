// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

// Try to initialize Prisma, but don't crash if DB isn't ready
let prisma = null;
try {
  // Lazy import so the service can boot even if Prisma/DB is misconfigured
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
    // Keep HTTP 200 so platform/frontends don’t mark the service as down
    res.json(payload);
  }
});

// List users
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

// Create user (POST body: { "email": "...", "password": "..." })
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

// Bind to Render's dynamic port
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API listening on :${PORT}`);
});
