import express from "express";
import { urlRouter } from "./modules/url/url.routes";
import { errorHandler } from "./middlewares/error.middleware";

export const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/url", urlRouter);
app.use(errorHandler);
