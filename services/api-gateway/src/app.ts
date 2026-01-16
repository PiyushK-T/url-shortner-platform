import express from "express";
import cors from "cors";
import { rateLimiter } from "./middlewares/rateLimit.middleware";
import { proxyRouter } from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(proxyRouter);
app.use(errorHandler);
