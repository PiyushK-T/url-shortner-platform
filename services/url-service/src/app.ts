import express, { Request, Response, NextFunction } from "express";
import { urlRouter } from "./modules/url/url.routes";
import { errorHandler } from "./middleware/error.middleware";
import { requireUser } from "./middleware/auth.middleware";

const app = express();
app.use(express.json());

// request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  const requestId = req.headers["x-request-id"] ?? "unknown";
  const userEmail = req.headers["x-user-email"] ?? "anonymous";

  console.log(
    `[URL Service] [${requestId}] user=${userEmail} ${req.method} ${req.path}`
  );
  next();
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// protected create + public redirect
app.use("/url", requireUser, urlRouter);

app.use(errorHandler);

export default app;
