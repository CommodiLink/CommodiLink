// backend/src/routes/companies.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { attachAccess } from "../middleware/access.js";

export const companies = Router();

// GET /api/companies
companies.get("/api/companies", requireAuth(false), attachAccess, async (req, res) => {
  try {
    const prisma = req.app.get("prisma");

    if (!prisma) {
      // Demo list (so dashboard & search work now)
      return res.json([
        {
          id: 1,
          name: "Atlas Refining Co.",
          country: "UAE",
          sector: "Refinery",
          kycStatus: "VERIFIED",
        },
        {
          id: 2,
          name: "BlueOcean Shipping",
          country: "Greece",
          sector: "Shipping",
          kycStatus: "PENDING",
        },
        {
          id: 3,
          name: "Terra Metals",
          country: "Chile",
          sector: "Mining",
          kycStatus: "VERIFIED",
        },
      ]);
    }

    const list = await prisma.company.findMany({
      orderBy: { id: "asc" },
      take: 200,
    });

    res.json(list);
  } catch (err) {
    console.error("GET /api/companies error", err);
    res.status(500).json({ error: "companies_failed" });
  }
});
