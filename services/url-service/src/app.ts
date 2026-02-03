import express, { Request, Response, NextFunction } from "express";
import { urlRouter } from "./modules/url/url.routes";
import { errorHandler } from "./middleware/error.middleware";
import {
  HEADER_REQUEST_ID,
  HEADER_USER_EMAIL,
} from "./constants/headers";

export const app = express();

app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  const requestId = req.headers[HEADER_REQUEST_ID] ?? "unknown";
  const userEmail = req.headers[HEADER_USER_EMAIL] ?? "anonymous";

  console.log(
    `[URL Service] [${requestId}] user=${userEmail} ${req.method} ${req.path}`
  );

  next();
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/url", urlRouter);
app.use(errorHandler);
