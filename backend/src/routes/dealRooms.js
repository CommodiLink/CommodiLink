// backend/src/routes/dealRooms.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { attachAccess } from "../middleware/access.js";

export const dealRooms = Router();

/** GET /api/deal-rooms — list rooms */
dealRooms.get("/api/deal-rooms", requireAuth(false), attachAccess, async (req, res) => {
  try {
    const prisma = req.app.get("prisma");

    if (!prisma) {
      // Demo rooms right away
      return res.json([
        {
          id: 101,
          title: "Diesel Cargo – Fujairah > Singapore",
          counterpart: "BlueOcean Shipping",
          lastMessageAt: new Date().toISOString(),
          unread: 2,
          status: "ACTIVE",
        },
        {
          id: 102,
          title: "Jet A-1 – Rotterdam spot",
          counterpart: "Atlas Refining Co.",
          lastMessageAt: new Date(Date.now() - 3600_000).toISOString(),
          unread: 0,
          status: "DRAFT",
        },
      ]);
    }

    const rooms = await prisma.dealRoom.findMany({
      orderBy: { updatedAt: "desc" },
      take: 100,
      include: { counterpart: true },
    });

    const mapped = rooms.map(r => ({
      id: r.id,
      title: r.title,
      counterpart: r.counterpart?.name ?? "Counterparty",
      lastMessageAt: r.updatedAt.toISOString?.() ?? new Date().toISOString(),
      unread: 0,
      status: r.status ?? "ACTIVE",
    }));

    res.json(mapped);
  } catch (err) {
    console.error("GET /api/deal-rooms error", err);
    res.status(500).json({ error: "rooms_failed" });
  }
});

/** DEV: seed demo rooms into DB (safe to remove later) */
dealRooms.post("/dev/seed-rooms", async (req, res) => {
  try {
    const prisma = req.app.get("prisma");
    if (!prisma) return res.status(503).json({ error: "db_unavailable" });

    // Quick minimal seed
    const c1 = await prisma.company.upsert({
      where: { id: 1 },
      update: {},
      create: { name: "Atlas Refining Co.", country: "UAE", sector: "Refinery" },
    });

    const c2 = await prisma.company.upsert({
      where: { id: 2 },
      update: {},
      create: { name: "BlueOcean Shipping", country: "Greece", sector: "Shipping" },
    });

    await prisma.dealRoom.createMany({
      data: [
        { title: "Diesel Cargo – Fujairah > Singapore", status: "ACTIVE", counterpartId: c2.id },
        { title: "Jet A-1 – Rotterdam spot", status: "DRAFT", counterpartId: c1.id },
      ],
      skipDuplicates: true,
    });

    res.json({ ok: true });
  } catch (e) {
    console.error("POST /dev/seed-rooms error", e);
    res.status(500).json({ error: "seed_failed" });
  }
});

