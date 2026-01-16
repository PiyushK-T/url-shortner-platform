import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number),
  JWT_SECRET: z.string().min(10),
  ANALYTICS_SERVICE_URL: z.string().url(),
  BASE_URL: z.string().url()
});

export const env = envSchema.parse(process.env);
