import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number),
  AUTH_SERVICE_URL: z.string().url(),
  URL_SERVICE_URL: z.string().url(),
  ANALYTICS_SERVICE_URL: z.string().url()
});

export const env = envSchema.parse(process.env);
