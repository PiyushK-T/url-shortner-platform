import { Request, Response, NextFunction } from "express";
import * as urlService from "./url.service";

export async function createUrlHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { longUrl } = req.body;
    const ownerEmail = req.headers["x-user-email"] as string;

    if (!longUrl) {
      return res.status(400).json({ error: "longUrl is required" });
    }
    if (!ownerEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await urlService.createShortUrl(longUrl, ownerEmail);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function redirectHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const code = Array.isArray(req.params.code)
      ? req.params.code[0]
      : req.params.code;

    const longUrl = await urlService.resolveUrl(code);
    return res.redirect(302, longUrl);
  } catch {
    return res.status(404).json({ error: "URL not found" });
  }
}
