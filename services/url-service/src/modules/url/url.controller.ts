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

    const result = urlService.createShortUrl(longUrl, ownerEmail);

    res.status(201).json(result);
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
    const param = req.params.code;

    if (!param || Array.isArray(param)) {
      return res.status(400).json({
        error: "Invalid short URL code"
      });
    }

    const longUrl = await urlService.resolveUrl(param);

    res.redirect(302, longUrl);
  } catch (err) {
    next(err);
  }
}
