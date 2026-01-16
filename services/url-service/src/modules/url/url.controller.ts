import { Response } from "express";
import { createUrlSchema } from "./url.schemas";
import * as service from "./url.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export function createUrl(req: AuthRequest, res: Response) {
  const dto = createUrlSchema.parse(req.body);
  const result = service.createShortUrl(dto.longUrl, req.userEmail!);
  res.status(201).json(result);
}

export async function redirect(req: AuthRequest, res: Response) {
  const code = req.params.code as string;
  const longUrl = await service.resolveUrl(code);
  res.redirect(longUrl);
}
