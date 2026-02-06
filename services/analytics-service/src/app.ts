import express from "express";
import analyticsRoutes from "./routes/analytics.routes";
import { errorHandler } from "./middleware/error.middleware";
import { trackRouter } from "./routes/track.routes";

export const app = express();

app.use(express.json());
app.use("/analytics", trackRouter);

app.use((req, res, next) => {
  const requestId = req.headers["x-request-id"];
  console.log(`[${requestId}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/analytics", analyticsRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "analytics-service" });
});

app.use(errorHandler);
