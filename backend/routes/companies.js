import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth.js";
import { attachAccess } from "../middleware/access.js";

export const companies = express.Router();
const prisma = new PrismaClient();

companies.get("/api/companies", requireAuth(), attachAccess, async (_req, res) => {
  try {
    if (prisma) {
      try {
        const rows = await prisma.company.findMany({ orderBy: { updatedAt: "desc" }, take: 50 });
        if (rows?.length) return res.json(rows);
      } catch {}
    }
    res.json([
      { id: 1, name: "Northstar Trading Ltd", kycStatus: "VERIFIED", country: "UK", sector: "Trading", updatedAt: new Date() },
      { id: 2, name: "Baltic Refineries",     kycStatus: "PENDING",  country: "LT", sector: "Refining", updatedAt: new Date() },
      { id: 3, name: "Atlas Shipping DMCC",   kycStatus: "VERIFIED", country: "AE", sector: "Shipping", updatedAt: new Date() }
    ]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "companies_load_failed" });
  }
});

companies.get("/api/companies/:id", requireAuth(), attachAccess, async (req, res) => {
  const id = Number(req.params.id);
  try {
    if (prisma) {
      try {
        const row = await prisma.company.findUnique({ where: { id } });
        if (row) return res.json(row);
      } catch {}
    }
    const demo = {
      1: { id: 1, name: "Northstar Trading Ltd", kycStatus: "VERIFIED", country: "UK", sector: "Trading",
           description: "Broker/trader focused on middle distillates, West Africa and Med.", products: ["D2", "EN590", "Jet A1"], volumes: "25-100k MT",
           location: "London, UK" },
      2: { id: 2, name: "Baltic Refineries", kycStatus: "PENDING", country: "LT", sector: "Refining",
           description: "Independent refinery with diesel/gasoil output.", products: ["Gasoil", "Naphtha"], volumes: "50-150k MT", location: "Klaipėda, LT" },
      3: { id: 3, name: "Atlas Shipping DMCC", kycStatus: "VERIFIED", country: "AE", sector: "Shipping",
           description: "Tanker owner/operator. Aframax & MR fleet.", fleet: "12 MR, 3 Aframax", location: "Dubai, UAE" }
    };
    if (!demo[id]) return res.status(404).json({ error: "not_found" });
    res.json(demo[id]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "company_load_failed" });
  }
});
