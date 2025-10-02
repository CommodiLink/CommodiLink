// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Home
app.get('/', (_req, res) => res.send('✅ Backend is running'));

// DB health check
app.get('/healthz', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

// List users
app.get('/users', async (_req, res) => {
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
  try {
    const email = `demo+${Date.now()}@example.com`;
    const user = await prisma.user.create({ data: { email, password: 'demo' } });
    res.json(user);
  } catch (err) {
    console.error('GET /dev/seed error:', err);
    res.status(500).json({ error: String(err?.message || err) });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API on :${port}`);
});
