import { Router } from "express";
import * as controller from "./url.controller";
import { authenticate } from "../../middlewares/auth.middleware";

export const urlRouter = Router();

urlRouter.post("/", authenticate, controller.createUrl);
urlRouter.get("/:code", controller.redirect);
