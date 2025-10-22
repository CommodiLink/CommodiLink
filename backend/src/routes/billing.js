import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { attachAccess } from "../middleware/access.js";

export const billing = express.Router();

billing.get("/api/plans", (_req, res) => {
  res.json([
    { id: "free", name: "Free", price: 0, features: ["Directory access", "Basic dashboard"] },
    { id: "pro", name: "Pro", price: 199, features: ["Deal rooms", "Docs & e-sign", "Analytics"] },
    { id: "enterprise", name: "Enterprise", price: 999, features: ["Unlimited members", "SLA support", "SSO/SAML"] }
  ]);
});

billing.get("/api/billing", requireAuth(), attachAccess, (req, res) => {
  const paid = req.access.paid;
  res.json({ plan: paid ? "Pro" : "Free", status: paid ? "ACTIVE" : "TRIAL" });
});

billing.post("/api/checkout", requireAuth(), attachAccess, (req, res) => {
  res.json({ url: "https://billing.example.com/checkout?plan=pro" });
});
