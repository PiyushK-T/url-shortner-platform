import express, { Request, Response, NextFunction } from "express";
import { urlRouter } from "./modules/url/url.routes";
import { errorHandler } from "./middleware/error.middleware";
import { requireUser } from "./middleware/auth.middleware";
import { connectRedis } from "./config/redis";

const app = express();

app.use(express.json());

/**
 * Connect Redis
 */
if (process.env.NODE_ENV !== "test") {
  connectRedis().catch((err) => {
    console.error("Failed to connect Redis", err);
    process.exit(1);
  });
}

/**
 * Request logging
 */
app.use((req: Request, _res: Response, next: NextFunction) => {
  const requestId = req.headers["x-request-id"] ?? "unknown";
  const userEmail = req.headers["x-user-email"] ?? "anonymous";

  // console.log(
  //   `[URL Service] [${requestId}] user=${userEmail} ${req.method} ${req.path}`
  // );

  next();
});

/**
 * Health check
 */
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * Routes
 * - POST /url (protected)
 * - GET /url/:code (public redirect)
 */
app.use("/url", requireUser, urlRouter);

/**
 * Global error handler
 */
app.use(errorHandler);

export default app;
