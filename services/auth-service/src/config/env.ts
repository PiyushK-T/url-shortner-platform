import dotenv from "dotenv";
import { z } from "zod";

// dotenv.config();

export const envSchema = z.object({
  PORT: z.string().default("4000"),
  AUTH_SERVICE_URL: z.string().optional(),
  URL_SERVICE_URL: z.string().optional(),
  ANALYTICS_SERVICE_URL: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  BASE_URL: z.string().default("http://localhost:3000"),
  JWT_EXPIRES_IN: z.string().min(1).default("1h"),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse(process.env);
  }
  return cachedEnv;
}
