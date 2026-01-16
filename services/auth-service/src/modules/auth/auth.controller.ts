import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./auth.schemas";
import * as authService from "./auth.service";

export async function register(req: Request, res: Response) {
  const dto = registerSchema.parse(req.body);
  const user = await authService.register(dto.email, dto.password);
  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const dto = loginSchema.parse(req.body);
  const result = await authService.login(dto.email, dto.password);
  res.status(200).json(result);
}
