import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { getEnv } from "../config/env";

const env = getEnv();

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // const payload = jwt.verify(token, env.JWT_SECRET) as unknown as { email: string };
    if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
    }

    const payload = jwt.verify(token, env.JWT_SECRET as Secret) as { email: string };

    // Attach to headers for downstream services
    req.headers["x-user-email"] = payload.email;

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
