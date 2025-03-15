import { z } from "zod";
import { destinationSchema } from "./destinations";

export const categorySchema = z.object({
  $id: z.string().optional(),
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  icon: z.string(),
  color: z.string().optional(),
});

export const updateCategorySchema = categorySchema.partial();
export const categoryFilterSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  destinations: z.array(destinationSchema).optional(),
});
export type Category = z.infer<typeof categorySchema>;
