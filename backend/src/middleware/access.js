// backend/src/middleware/access.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Loads the logged-in user (from req.user set by requireAuth),
 * along with their company + subscription, and computes access flags.
 *
 * Adds: req.access = { user, company, kycVerified, paid }
 */
export async function attachAccess(req, res, next) {
  try {
    let user = null;

    // Try DB first (normal path)
    try {
      user = await prisma.user.findUnique({
        where: { id: req.user.sub },
        include: { company: { include: { subscription: true } } },
      });
    } catch (e) {
      // If DB isn’t ready, fall through to demo shape below
    }

    // Demo/fallback so the UI still works if DB isn’t ready
    if (!user) {
      user = {
        id: req.user?.sub || 1,
        email: req.user?.email || 'demo@commodilink.com',
        company: null,
      };
    }

    const company = user.company || null;
    // Until you wire real KYC & billing, treat “no company yet” as allowed
    const kycVerified = company?.kycStatus === 'VERIFIED' || !company;
    const paid = company?.subscription?.status === 'ACTIVE' || !company;

    req.access = { user, company, kycVerified, paid };
    next();
  } catch (e) {
    console.error('attachAccess error:', e);
    res.status(500).json({ error: 'access_failed' });
  }
}

/**
 * Middleware that blocks unless company is KYC-verified and paid.
 * 403 -> KYC required
 * 402 -> Payment required
 */
export function requirePaidAndVerified(req, res, next) {
  if (!req.access?.kycVerified) return res.status(403).json({ error: 'kyc_required' });
  if (!req.access?.paid) return res.status(402).json({ error: 'payment_required' });
  next();
}

