import express from "express";
import cors from "cors";
import { rateLimiter } from "./middleware/rateLimit.middleware";
import { proxyRouter } from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { requestIdMiddleware } from "./middleware/requestId.middleware";
import { authMiddleware } from "./middleware/auth";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);
app.use(requestIdMiddleware);

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((req, _res, next) => {
  const requestId = req.headers["x-request-id"];
  console.log(`[${requestId}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(authMiddleware);
app.use(proxyRouter);

app.use(errorHandler);
