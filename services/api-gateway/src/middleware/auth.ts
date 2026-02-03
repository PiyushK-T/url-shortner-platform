import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getEnv } from "../config/env";
import { HEADER_USER_EMAIL } from "../constants/headers";

const env = getEnv();

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }
    const payload = jwt.verify(token, env.JWT_SECRET) as { email: string };

    // Attach identity context
    req.headers[HEADER_USER_EMAIL] = payload.email;

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
