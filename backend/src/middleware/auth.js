// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';

export function requireAuth(cookieName = 'session') {
  return (req, res, next) => {
    const token = req.cookies?.[cookieName];
    if (!token) return res.status(401).json({ error: 'unauthorized' });

    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      return res.status(401).json({ error: 'invalid_token' });
    }
  };
}
