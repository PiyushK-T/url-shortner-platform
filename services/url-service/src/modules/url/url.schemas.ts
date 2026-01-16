import { z } from "zod";

export const createUrlSchema = z.object({
  longUrl: z.string().url()
});

export type CreateUrlDTO = z.infer<typeof createUrlSchema>;
