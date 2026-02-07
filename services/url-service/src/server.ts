import app from "./app";
import { connectRedis } from "./config/redis";
import { getEnv } from "./config/env";

const env = getEnv();

async function startServer() {
  await connectRedis();

  app.listen(env.PORT, () => {
    console.log(`[URL Service] running on port ${env.PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
