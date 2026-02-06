import { Router } from "express";
import {
  createUrlHandler,
  redirectHandler
} from "./url.controller";

export const urlRouter = Router();

// protected
urlRouter.post("/", createUrlHandler);

// public
urlRouter.get("/:code", redirectHandler);
