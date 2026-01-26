import { Router } from "express";
// import { env } from "../config/env";
import { getEnv } from "../config/env";
const env = getEnv();

import { proxy } from "../middlewares/proxy.middleware";

export const proxyRouter = Router();

proxyRouter.use("/api/auth", proxy(env.AUTH_SERVICE_URL || ""));
proxyRouter.use("/api/url", proxy(env.URL_SERVICE_URL || ""));
proxyRouter.use("/api/analytics", proxy(env.ANALYTICS_SERVICE_URL || ""));
