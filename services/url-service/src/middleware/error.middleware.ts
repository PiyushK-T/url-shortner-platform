import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  console.error(err.message);
  res.status(400).json({ message: err.message });
}
