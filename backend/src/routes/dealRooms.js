import express from "express";
import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { attachAccess, requirePaidAndVerified } from "../middleware/access.js";

export const dealRooms = express.Router();

// List rooms for the user's company (guarded)
dealRooms.get(
  "/api/deal-rooms",
  requireAuth(),
  attachAccess,
  requirePaidAndVerified,
  async (req, res) => {
    const rooms = await prisma.dealRoom.findMany({
      where: { companyId: req.access.company.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(rooms);
  }
);

// Create a room
dealRooms.post(
  "/api/deal-rooms",
  requireAuth(),
  attachAccess,
  requirePaidAndVerified,
  async (req, res) => {
    const { title, commodity, volume } = req.body || {};
    const room = await prisma.dealRoom.create({
      data: {
        title,
        commodity,
        volume,
        companyId: req.access.company.id,
        members: {
          create: [{ userId: req.access.user.id, role: "OWNER" }],
        },
      },
    });
    res.status(201).json(room);
  }
);

// Read a single room (ensure it belongs to the company)
dealRooms.get(
  "/api/deal-rooms/:id",
  requireAuth(),
  attachAccess,
  requirePaidAndVerified,
  async (req, res) => {
    const id = Number(req.params.id);
    const room = await prisma.dealRoom.findFirst({
      where: { id, companyId: req.access.company.id },
      include: { members: true, documents: true, messages: { orderBy: { createdAt: "asc" } } },
    });
    if (!room) return res.status(404).json({ error: "not_found" });
    res.json(room);
  }
);
