import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  userId: z.string(),
});

