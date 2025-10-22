import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { attachAccess } from "../middleware/access.js";

export const analytics = express.Router();

analytics.get("/api/analytics", requireAuth(), attachAccess, (_req, res) => {
  res.json({
    totals: { deals: 8, active: 5, closed: 3 },
    kycs: { verified: 18, pending: 6, rejected: 1 },
    volumeByCommodity: [
      { commodity: "D2", volume: 120000 },
      { commodity: "EN590", volume: 60000 },
      { commodity: "Jet A1", volume: 40000 }
    ],
    recent: [
      { ts: new Date(), text: "You created a deal room" },
      { ts: new Date(), text: "Counterparty uploaded SPA" }
    ]
  });
});
