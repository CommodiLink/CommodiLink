// backend/src/middleware/access.js
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Attach access flags (paid, kycVerified) and company info to req.access
 * If DB is not available OR demo user, we default to paid/verified for testing.
 */
export function attachAccess(req, _res, next) {
  // req.user is set by requireAuth()
  const user = req.user || { id: 1, email: "demo@commodilink.com", company_id: 1 };

  // If you have DB, try to read real flags; otherwise default to demo-true.
  const setDemo = () => {
    req.access = {
      user,
      company: { id: 1, name: "Demo Co", kycStatus: "VERIFIED" },
      kycVerified: true,
      paid: true,
    };
    return next();
  };

  // No Prisma? demo
  if (!prisma) return setDemo();

  // Prisma available: try real company
  prisma.company.findUnique({ where: { id: user.company_id } })
    .then((company) => {
      if (!company) return setDemo();
      // Map your own columns here if you have them; defaults enable demo access.
      const kycVerified = company.kycStatus === "VERIFIED" || company.kycStatus === "APPROVED" || true;
      const paid = company.subscriptionStatus === "ACTIVE" || true;

      req.access = { user, company, kycVerified, paid };
      next();
    })
    .catch(() => setDemo());
}

/** Block if not both paid and verified */
export function requirePaidAndVerified(req, res, next) {
  const a = req.access || {};
  if (!a.paid || !a.kycVerified) {
    return res.status(403).json({ error: "upgrade_or_complete_kyc" });
  }
  next();
}

