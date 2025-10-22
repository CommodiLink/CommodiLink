import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth.js";
import { attachAccess } from "../middleware/access.js";

export const kyc = express.Router();
const prisma = new PrismaClient();

kyc.get("/api/kyc", requireAuth(), attachAccess, async (req, res) => {
  const company = req.access.company;
  if (company) return res.json({ status: company.kycStatus, requirements: [] });
  res.json({ status: "PENDING", requirements: ["Upload Certificate of Incorporation", "Provide UBO details"] });
});
