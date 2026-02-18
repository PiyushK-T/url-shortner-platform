import { createClient } from "redis";
import { getEnv } from "./env";

const env = getEnv();

export const redisClient = createClient({
  url: env.REDIS_URL,
});

export async function connectRedis() {
  try {
    await redisClient.connect();
  } catch {}
}

export async function disconnectRedis() {
  try {
    await redisClient.disconnect();
  } catch {}
}

