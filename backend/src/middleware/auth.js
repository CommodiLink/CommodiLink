// backend/src/middleware/auth.js
import jwt from "jsonwebtoken";

export function requireAuth() {
  return (req, res, next) => {
    try {
      // Accept either HttpOnly cookie or Bearer header (useful for tools)
      const cookieToken = req.cookies?.session;
      const auth = req.headers.authorization || "";
      const headerToken = auth.startsWith("Bearer ") ? auth.slice(7) : null;
      const token = cookieToken || headerToken;
      if (!token) return res.status(401).json({ error: "unauthorized" });

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: payload.sub, email: payload.email, companyId: payload.company_id };
      next();
    } catch (e) {
      return res.status(401).json({ error: "unauthorized" });
    }
  };
}
