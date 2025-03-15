import { z } from "zod";
import { categorySchema } from "./categories";

export const serviceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const packageSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  price: z.number().positive("Preço deve ser maior que zero"),
  destinationId: z.string().min(1, "Destino é obrigatório"),
  images: z.array(z.string().url()).optional(),
  includedServices: z.array(serviceSchema).optional(),
  duration: z.number().positive("Duração deve ser maior que zero").optional(),
  maxTravelers: z
    .number()
    .positive("Número máximo de viajantes deve ser maior que zero")
    .optional(),
  availableDates: z.array(z.date()).optional(),
  categories: z.array(categorySchema).optional(),
  status: z.enum(["active", "inactive", "draft"]).default("draft"),
});

export type Package = z.infer<typeof packageSchema>;

export const updatePackageSchema = packageSchema.partial();
export const packageFilterSchema = z.object({
  destinationId: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  categories: z.array(categorySchema).optional(),
  status: z.enum(["active", "inactive", "draft"]).optional(),
});
