import { app } from "./app";
import { env } from "./config/env";

const server = app.listen(env.PORT, () => {
  console.log(`API Gateway running on port ${env.PORT}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("API Gateway shutdown complete");
    process.exit(0);
  });
});
