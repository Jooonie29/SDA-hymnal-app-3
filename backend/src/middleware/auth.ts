import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: "missing_auth" });
    return;
  }
  const token = auth.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_secret") as { sub: string };
    (req as any).userId = parseInt(payload.sub, 10);
    next();
  } catch {
    res.status(401).json({ error: "invalid_token" });
  }
}

