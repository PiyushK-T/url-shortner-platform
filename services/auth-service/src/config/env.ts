import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().optional(), 
  AUTH_SERVICE_URL: z.string().optional(),
  URL_SERVICE_URL: z.string().optional(),
  ANALYTICS_SERVICE_URL: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse(process.env);
  }
  return cachedEnv;
}
