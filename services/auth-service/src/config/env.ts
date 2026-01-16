import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string()
});

export const env = envSchema.parse(process.env);
