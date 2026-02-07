import { createClient } from "redis";
import { getEnv } from "./env";

const env = getEnv();

export const redisClient = createClient({
  url: env.REDIS_URL
});

redisClient.on("error", (err) => {
  console.error("[Redis] Error", err);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("[Redis] Connected");
  }
}
