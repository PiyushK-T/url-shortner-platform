import { createClient } from "redis";
import { getEnv } from "./env";

const env = getEnv();

let redisClient: any = null;

export function getRedisClient() {
  if (process.env.NODE_ENV === "test") {
    return {
      exists: async () => 0,
      set: async () => {},
      get: async () => null,
      quit: async () => {}
    };
  }

  if (!redisClient) {
    redisClient = createClient({
      url: env.REDIS_URL
    });
  }

  return redisClient;
}

export async function connectRedis() {
  if (process.env.NODE_ENV === "test") return;

  const client = getRedisClient();
  await client.connect();
  console.log("Redis connected");
}
