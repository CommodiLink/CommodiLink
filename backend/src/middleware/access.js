import { prisma } from "../prisma.js";

export async function attachAccess(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
      include: { company: { include: { subscription: true } } },
    });
    if (!user) return res.status(401).json({ error: "unauthorized" });

    const company = user.company;
    const kycVerified = company?.kycStatus === "VERIFIED";
    const paid = company?.subscription?.status === "ACTIVE";

    req.access = { user, company, kycVerified, paid };
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "access_failed" });
  }
}

export function requirePaidAndVerified(req, res, next) {
  if (!req.access?.kycVerified) return res.status(403).json({ error: "kyc_required" });
  if (!req.access?.paid) return res.status(402).json({ error: "payment_required" }); // 402: Payment Required
  next();
}
