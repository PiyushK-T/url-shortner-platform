import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

export const envSchema = z.object({
  PORT: z.string().default("4002"),
  BASE_URL: z.string().default("http://localhost:3000"),
  JWT_SECRET: z.string().optional(),
  ANALYTICS_SERVICE_URL: z.string().optional(),
  REDIS_URL: z.string().default("redis://localhost:6379")
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse(process.env);
  }
  return cachedEnv;
}
