import { Router } from "express";
import {
  createUrlHandler,
  redirectHandler
} from "./url.controller";

export const urlRouter = Router();

// protected create
urlRouter.post("/", createUrlHandler);

// public redirect
urlRouter.get("/:code", redirectHandler);
