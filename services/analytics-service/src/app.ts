import express from "express";
import analyticsRoutes from "./routes/analytics.routes";
import { errorHandler } from "./middleware/error.middleware";

export const app = express();

app.use(express.json());

app.use("/analytics", analyticsRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "analytics-service" });
});

app.use(errorHandler);
