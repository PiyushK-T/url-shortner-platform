import express from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

export const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use(errorHandler);
