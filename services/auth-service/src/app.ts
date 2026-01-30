import express from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { errorHandler } from "./middleware/error.middleware";

export const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const requestId = req.headers["x-request-id"];
  console.log(`[${requestId}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use(errorHandler);
