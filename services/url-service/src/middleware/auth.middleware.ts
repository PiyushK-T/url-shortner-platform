import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
// import { env } from "../config/env";
import { getEnv } from "../config/env";
const env = getEnv();

export interface AuthRequest extends Request {
  userEmail?: string;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  const token = authHeader.replace("Bearer ", "");
  const secret = env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    req.userEmail = payload.email as string;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
