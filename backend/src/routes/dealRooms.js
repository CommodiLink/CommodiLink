// backend/src/routes/dealRooms.js
import { Router } from "express";
import jwt from "jsonwebtoken";

// Small helper: de-JWT the cookie if present
function readUserFromCookie(req) {
  try {
    const raw = req.cookies?.session;
    if (!raw) return null;
    const decoded = jwt.verify(raw, process.env.JWT_SECRET);
    return { id: decoded.sub, email: decoded.email, companyId: decoded.company_id };
  } catch {
    return null;
  }
}

export const dealRooms = Router();

// -------- DEMO FALLBACK STORAGE (when Prisma isn't connected) --------
const memory = {
  rooms: [
    {
      id: "demo-1",
      title: "Jet A1 — Nov Lift, 100k bbl",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      participants: [{ id: 1, name: "Demo Trading LLC" }],
      lastMessageAt: new Date().toISOString(),
    },
  ],
  messages: {
    "demo-1": [
      {
        id: "m-1",
        author: "Demo User",
        body: "Welcome to the demo room 👋",
        createdAt: new Date().toISOString(),
      },
    ],
  },
};

// Simple “are we DB-backed?” check —index.js creates globalThis.prisma if connected
const getPrisma = () => globalThis.prisma ?? null;

// ---------------------------- ROUTES ---------------------------------

// List rooms (requires cookie login)
dealRooms.get("/api/deal-rooms", async (req, res) => {
  const user = readUserFromCookie(req);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const prisma = getPrisma();
  if (!prisma) {
    // demo data
    return res.json({ rooms: memory.rooms });
  }

  try {
    const rows = await prisma.dealRoom.findMany({
      where: {
        members: { some: { userId: user.id } },
      },
      orderBy: { createdAt: "desc" },
      include: {
        members: { include: { user: { select: { id: true, email: true } } } },
      },
      take: 100,
    });

    const rooms = rows.map((r) => ({
      id: r.id,
      title: r.title,
      status: r.status,
      createdAt: r.createdAt,
      participants:
        r.members?.map((m) => ({ id: m.userId, name: m.user?.email })) ?? [],
      lastMessageAt: r.updatedAt,
    }));

    res.json({ rooms });
  } catch (err) {
    console.error("GET /api/deal-rooms error:", err);
    res.status(500).json({ error: "failed_to_list_rooms" });
  }
});

// Create a room
dealRooms.post("/api/deal-rooms", async (req, res) => {
  const user = readUserFromCookie(req);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const { title } = req.body ?? {};
  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return res.status(400).json({ error: "title_min_3" });
  }

  const prisma = getPrisma();
  if (!prisma) {
    // demo add
    const room = {
      id: `demo-${Date.now()}`,
      title: title.trim(),
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      participants: [{ id: user.id ?? 1, name: user.email ?? "Demo User" }],
      lastMessageAt: new Date().toISOString(),
    };
    memory.rooms.unshift(room);
    memory.messages[room.id] = [];
    return res.status(201).json({ room });
  }

  try {
    const created = await prisma.dealRoom.create({
      data: {
        title: title.trim(),
        status: "ACTIVE",
        members: {
          create: [{ userId: user.id, role: "OWNER" }],
        },
      },
      include: {
        members: { include: { user: { select: { id: true, email: true } } } },
      },
    });

    const room = {
      id: created.id,
      title: created.title,
      status: created.status,
      createdAt: created.createdAt,
      participants:
        created.members?.map((m) => ({ id: m.userId, name: m.user?.email })) ??
        [],
      lastMessageAt: created.updatedAt,
    };

    res.status(201).json({ room });
  } catch (err) {
    console.error("POST /api/deal-rooms error:", err);
    res.status(500).json({ error: "failed_to_create_room" });
  }
});

// (Optional) room messages — demo only
dealRooms.get("/api/deal-rooms/:id/messages", async (req, res) => {
  const user = readUserFromCookie(req);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const prisma = getPrisma();
  if (!prisma) {
    return res.json({ messages: memory.messages[req.params.id] ?? [] });
  }

  try {
    const msgs = await prisma.message.findMany({
      where: { roomId: req.params.id },
      orderBy: { createdAt: "asc" },
      take: 500,
    });
    res.json({ messages: msgs });
  } catch (err) {
    console.error("GET /api/deal-rooms/:id/messages error:", err);
    res.status(500).json({ error: "failed_to_list_messages" });
  }
});

