// backend/src/routes/dealRooms.js
import { Router } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";

export const dealRooms = Router();

/* ------------------------ helpers / wiring ------------------------ */

function readUser(req) {
  try {
    const raw = req.cookies?.session;
    if (!raw) return null;
    const decoded = jwt.verify(raw, process.env.JWT_SECRET);
    return { id: decoded.sub, email: decoded.email, companyId: decoded.company_id };
  } catch {
    return null;
  }
}

const getPrisma = () => globalThis.prisma ?? null;

function ensureAuth(req, res, next) {
  const u = readUser(req);
  if (!u) return res.status(401).json({ error: "unauthorized" });
  req.user = u;
  next();
}

/* ------------------------ in-memory fallback ---------------------- */

const mem = {
  rooms: [], // { id, title, status, createdAt, members:[{userId,email,role}], updatedAt }
  messages: {}, // roomId -> [{ id, kind:'text'|'file', authorId, authorEmail, body?, fileId?, fileName?, mime?, size?, createdAt }]
  files: {}, // fileId -> { roomId, ownerId, buffer, mime, size, fileName, createdAt }
};

function memEnsureMember(room, userId) {
  return room?.members?.some((m) => m.userId === userId);
}

/* ------------------------ multer (file uploads) ------------------- */
// memoryStorage keeps files in RAM (Render’s disk is ephemeral). Size cap 20 MB.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    // Allow list: add more if needed
    const ok = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ].includes(file.mimetype);
    cb(ok ? null : new Error("blocked_mime"));
  },
});

/* ------------------------ list rooms ------------------------------ */
dealRooms.get("/api/deal-rooms", ensureAuth, async (req, res) => {
  const prisma = getPrisma();
  const { id: userId } = req.user;

  if (!prisma) {
    // fallback
    const rooms = mem.rooms
      .filter((r) => memEnsureMember(r, userId))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((r) => ({
        id: r.id,
        title: r.title,
        status: r.status,
        createdAt: r.createdAt,
        lastMessageAt: r.updatedAt,
        participants: r.members.map((m) => ({ id: m.userId, name: m.email })),
      }));
    return res.json({ rooms });
  }

  try {
    const rows = await prisma.dealRoom.findMany({
      where: { members: { some: { userId } } },
      orderBy: { updatedAt: "desc" },
      include: { members: { include: { user: true } } },
      take: 100,
    });

    const rooms = rows.map((r) => ({
      id: r.id,
      title: r.title,
      status: r.status,
      createdAt: r.createdAt,
      lastMessageAt: r.updatedAt,
      participants:
        r.members?.map((m) => ({ id: m.userId, name: m.user?.email })) ?? [],
    }));

    res.json({ rooms });
  } catch (err) {
    console.error("GET /api/deal-rooms error:", err);
    res.status(500).json({ error: "list_failed" });
  }
});

/* ------------------------ create room ----------------------------- */
dealRooms.post("/api/deal-rooms", ensureAuth, async (req, res) => {
  const prisma = getPrisma();
  const { id: userId, email } = req.user;
  const { title } = req.body ?? {};
  if (!title || String(title).trim().length < 3) {
    return res.status(400).json({ error: "title_min_3" });
  }

  if (!prisma) {
    const now = new Date().toISOString();
    const room = {
      id: `mem-${Date.now()}`,
      title: String(title).trim(),
      status: "ACTIVE",
      createdAt: now,
      updatedAt: now,
      members: [{ userId, email, role: "OWNER" }],
    };
    mem.rooms.unshift(room);
    mem.messages[room.id] = [];
    return res.status(201).json({
      room: {
        id: room.id,
        title: room.title,
        status: room.status,
        createdAt: room.createdAt,
        lastMessageAt: room.updatedAt,
        participants: room.members.map((m) => ({ id: m.userId, name: m.email })),
      },
    });
  }

  try {
    const created = await prisma.dealRoom.create({
      data: {
        title: String(title).trim(),
        status: "ACTIVE",
        members: { create: [{ userId, role: "OWNER" }] },
      },
      include: { members: { include: { user: true } } },
    });

    return res.status(201).json({
      room: {
        id: created.id,
        title: created.title,
        status: created.status,
        createdAt: created.createdAt,
        lastMessageAt: created.updatedAt,
        participants:
          created.members?.map((m) => ({
            id: m.userId,
            name: m.user?.email,
          })) ?? [],
      },
    });
  } catch (err) {
    console.error("POST /api/deal-rooms error:", err);
    res.status(500).json({ error: "create_failed" });
  }
});

/* ------------------------ room detail ----------------------------- */
dealRooms.get("/api/deal-rooms/:id", ensureAuth, async (req, res) => {
  const prisma = getPrisma();
  const { id: userId } = req.user;
  const roomId = req.params.id;

  if (!prisma) {
    const r = mem.rooms.find((r) => r.id === roomId);
    if (!r || !memEnsureMember(r, userId)) return res.status(404).json({ error: "not_found" });
    return res.json({
      room: {
        id: r.id,
        title: r.title,
        status: r.status,
        createdAt: r.createdAt,
        lastMessageAt: r.updatedAt,
        participants: r.members.map((m) => ({ id: m.userId, name: m.email })),
      },
    });
  }

  try {
    const r = await prisma.dealRoom.findFirst({
      where: { id: roomId, members: { some: { userId } } },
      include: { members: { include: { user: true } } },
    });
    if (!r) return res.status(404).json({ error: "not_found" });

    res.json({
      room: {
        id: r.id,
        title: r.title,
        status: r.status,
        createdAt: r.createdAt,
        lastMessageAt: r.updatedAt,
        participants:
          r.members?.map((m) => ({ id: m.userId, name: m.user?.email })) ?? [],
      },
    });
  } catch (err) {
    console.error("GET /api/deal-rooms/:id error:", err);
    res.status(500).json({ error: "detail_failed" });
  }
});

/* ------------------------ list messages --------------------------- */
dealRooms.get("/api/deal-rooms/:id/messages", ensureAuth, async (req, res) => {
  const prisma = getPrisma();
  const { id: userId } = req.user;
  const roomId = req.params.id;

  if (!prisma) {
    const r = mem.rooms.find((r) => r.id === roomId);
    if (!r || !memEnsureMember(r, userId)) return res.status(404).json({ error: "not_found" });
    return res.json({ messages: mem.messages[roomId] ?? [] });
  }

  try {
    const room = await prisma.dealRoom.findFirst({
      where: { id: roomId, members: { some: { userId } } },
    });
    if (!room) return res.status(404).json({ error: "not_found" });

    const msgs = await prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" },
      take: 500,
    });

    res.json({
      messages: msgs.map((m) => ({
        id: m.id,
        kind: m.kind, // 'text'|'file'
        authorId: m.authorId,
        authorEmail: m.authorEmail,
        body: m.body ?? null,
        fileId: m.fileId ?? null,
        fileName: m.fileName ?? null,
        mime: m.mime ?? null,
        size: m.size ?? null,
        createdAt: m.createdAt,
      })),
    });
  } catch (err) {
    console.error("GET /messages error:", err);
    res.status(500).json({ error: "messages_failed" });
  }
});

/* ------------------------ send text message ----------------------- */
dealRooms.post("/api/deal-rooms/:id/messages", ensureAuth, async (req, res) => {
  const prisma = getPrisma();
  const { id: userId, email } = req.user;
  const roomId = req.params.id;
  const { body } = req.body ?? {};
  if (!body || String(body).trim().length === 0) {
    return res.status(400).json({ error: "empty_body" });
  }

  if (!prisma) {
    const r = mem.rooms.find((r) => r.id === roomId);
    if (!r || !memEnsureMember(r, userId)) return res.status(404).json({ error: "not_found" });
    const msg = {
      id: `m-${Date.now()}`,
      kind: "text",
      authorId: userId,
      authorEmail: email,
      body: String(body).trim(),
      createdAt: new Date().toISOString(),
    };
    (mem.messages[roomId] ??= []).push(msg);
    r.updatedAt = msg.createdAt;
    return res.status(201).json({ message: msg });
  }

  try {
    const room = await prisma.dealRoom.findFirst({
      where: { id: roomId, members: { some: { userId } } },
    });
    if (!room) return res.status(404).json({ error: "not_found" });

    const msg = await prisma.message.create({
      data: {
        roomId,
        kind: "text",
        authorId: userId,
        authorEmail: email,
        body: String(body).trim(),
      },
    });

    await prisma.dealRoom.update({ where: { id: roomId }, data: { updatedAt: new Date() } });

    res.status(201).json({
      message: {
        id: msg.id,
        kind: msg.kind,
        authorId: msg.authorId,
        authorEmail: msg.authorEmail,
        body: msg.body,
        createdAt: msg.createdAt,
      },
    });
  } catch (err) {
    console.error("POST text message error:", err);
    res.status(500).json({ error: "send_failed" });
  }
});

/* ------------------------ upload a file (secure) ------------------ */
dealRooms.post(
  "/api/deal-rooms/:id/upload",
  ensureAuth,
  upload.single("file"),
  async (req, res) => {
    const prisma = getPrisma();
    const { id: userId, email } = req.user;
    const roomId = req.params.id;

    if (!req.file) return res.status(400).json({ error: "no_file" });

    const { originalname, mimetype, size, buffer } = req.file;

    if (!prisma) {
      const r = mem.rooms.find((r) => r.id === roomId);
      if (!r || !memEnsureMember(r, userId)) return res.status(404).json({ error: "not_found" });

      const fileId = `f-${Date.now()}`;
      mem.files[fileId] = {
        roomId,
        ownerId: userId,
        buffer,
        mime: mimetype,
        size,
        fileName: originalname,
        createdAt: new Date().toISOString(),
      };

      const msg = {
        id: `m-${Date.now()}`,
        kind: "file",
        authorId: userId,
        authorEmail: email,
        fileId,
        fileName: originalname,
        mime: mimetype,
        size,
        createdAt: new Date().toISOString(),
      };
      (mem.messages[roomId] ??= []).push(msg);
      r.updatedAt = msg.createdAt;
      return res.status(201).json({ message: msg });
    }

    try {
      // If using Prisma + your own file store (e.g., S3), replace the below with a save-to-S3 step
      // and keep metadata in DB. For now we'll save small files to DB as bytes (or you can skip).
      const file = await prisma.file.create({
        data: {
          roomId,
          ownerId: userId,
          mime: mimetype,
          size,
          fileName: originalname,
          // If your schema has 'bytes' (bytea in Postgres), you can store buffer.
          // Otherwise, store a pointer/URL you generate.
          bytes: buffer, // <-- requires bytes: Bytes in Prisma schema
        },
      });

      const msg = await prisma.message.create({
        data: {
          roomId,
          kind: "file",
          authorId: userId,
          authorEmail: email,
          fileId: file.id,
          fileName: originalname,
          mime: mimetype,
          size,
        },
      });

      await prisma.dealRoom.update({ where: { id: roomId }, data: { updatedAt: new Date() } });

      res.status(201).json({
        message: {
          id: msg.id,
          kind: msg.kind,
          authorId: msg.authorId,
          authorEmail: msg.authorEmail,
          fileId: msg.fileId,
          fileName: msg.fileName,
          mime: msg.mime,
          size: msg.size,
          createdAt: msg.createdAt,
        },
      });
    } catch (err) {
      console.error("upload error:", err);
      res.status(500).json({ error: "upload_failed" });
    }
  }
);

/* ------------------------ secure download ------------------------- */
dealRooms.get("/api/deal-rooms/:id/files/:fileId", ensureAuth, async (req, res) => {
  const prisma = getPrisma();
  const { id: userId } = req.user;
  const { id: roomId, fileId } = req.params;

  if (!prisma) {
    const r = mem.rooms.find((r) => r.id === roomId);
    if (!r || !memEnsureMember(r, userId)) return res.status(404).json({ error: "not_found" });
    const f = mem.files[fileId];
    if (!f || f.roomId !== roomId) return res.status(404).json({ error: "not_found" });

    res.setHeader("Content-Type", f.mime);
    res.setHeader("Content-Length", f.size);
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(f.fileName)}"`);
    return res.send(f.buffer);
  }

  try {
    // Make sure the requester is a member:
    const room = await prisma.dealRoom.findFirst({
      where: { id: roomId, members: { some: { userId } } },
    });
    if (!room) return res.status(404).json({ error: "not_found" });

    const f = await prisma.file.findFirst({ where: { id: fileId, roomId } });
    if (!f) return res.status(404).json({ error: "not_found" });

    res.setHeader("Content-Type", f.mime);
    res.setHeader("Content-Length", f.size);
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(f.fileName)}"`);
    return res.send(f.bytes); // If you store in S3, redirect to signed URL instead.
  } catch (err) {
    console.error("download error:", err);
    res.status(500).json({ error: "download_failed" });
  }
});


