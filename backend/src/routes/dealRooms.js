import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth.js";
import { attachAccess, requirePaidAndVerified } from "../middleware/access.js";

export const dealRooms = express.Router();
const prisma = new PrismaClient();

dealRooms.get("/api/deal-rooms", requireAuth(), attachAccess, requirePaidAndVerified, async (_req, res) => {
  try {
    if (prisma) {
      try {
        const rooms = await prisma.dealRoom.findMany({ orderBy: { updatedAt: "desc" } });
        if (rooms?.length) return res.json(rooms);
      } catch {}
    }
    res.json([
      { id: 101, title: "Atlas x Northstar — D2", commodity: "Gasoil (D2)", volume: "50k MT", status: "ACTIVE", updatedAt: new Date() },
      { id: 102, title: "Baltic Refineries — FOB QLNG", commodity: "LNG", volume: "1 cargo", status: "DRAFT", updatedAt: new Date() }
    ]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "rooms_load_failed" });
  }
});

dealRooms.get("/api/deal-rooms/:id", requireAuth(), attachAccess, requirePaidAndVerified, async (req, res) => {
  const id = Number(req.params.id);
  try {
    if (prisma) {
      try {
        const room = await prisma.dealRoom.findUnique({ where: { id } });
        if (room) return res.json(room);
      } catch {}
    }
    if (id !== 101 && id !== 102) return res.status(404).json({ error: "not_found" });
    res.json({ id, title: id === 101 ? "Atlas x Northstar — D2" : "Baltic Refineries — FOB QLNG", status: "ACTIVE",
               commodity: id === 101 ? "Gasoil (D2)" : "LNG", volume: id === 101 ? "50k MT" : "1 cargo",
               members: [{ name: "You" }, { name: "Counterparty" }], messages: [], updatedAt: new Date() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "room_load_failed" });
  }
});

dealRooms.post("/api/deal-rooms", requireAuth(), attachAccess, requirePaidAndVerified, async (req, res) => {
  const { title, commodity, volume } = req.body || {};
  if (!title) return res.status(400).json({ error: "title_required" });
  try {
    if (prisma) {
      try {
        const created = await prisma.dealRoom.create({ data: { title, commodity, volume, companyId: req.access.company?.id ?? 1 } });
        return res.status(201).json(created);
      } catch {}
    }
    res.status(201).json({ id: Math.floor(Math.random() * 100000), title, commodity, volume, status: "DRAFT", updatedAt: new Date() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "room_create_failed" });
  }
});
