import { Router } from "express";
import { trackEvent } from "../controllers/analytics.controller";

const router = Router();

router.post("/track", trackEvent);

export default router;
