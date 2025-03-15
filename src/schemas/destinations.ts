import { z } from "zod";

export const destinationSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  mainImage: z.string().url("URL da imagem inválida"),
  country: z.string().min(2, "País é obrigatório"),
  city: z.string().optional(),
  region: z.string().min(2, "Região é obrigatória"),
  rating: z
    .number()
    .min(0)
    .max(5, "Avaliação deve estar entre 0 e 5")
    .default(0),
  category: z
    .array(z.string())
    .min(1, "Pelo menos uma categoria é obrigatória"),
});

export type Destination = z.infer<typeof destinationSchema>;

export const updateDestinationSchema = destinationSchema.partial();

export const destinationFilterSchema = z.object({
  region: z.string().optional(),
  country: z.string().optional(),
  category: z.array(z.string()).optional(),
  minRating: z.number().optional(),
});
