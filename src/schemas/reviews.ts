import { z } from "zod";

export const reviewSchema = z.object({
  userId: z.string().min(1, "Usuário é obrigatório"),
  destinationId: z.string().min(1, "Destino é obrigatório"),
  rating: z.number().min(1).max(5, "Avaliação deve estar entre 1 e 5"),
  comment: z.string().min(10, "Comentário deve ter no mínimo 10 caracteres"),
  date: z
    .string()
    .datetime("Data inválida")
    .default(() => new Date().toISOString()),
  helpfulVotes: z.number().default(0),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export type Review = z.infer<typeof reviewSchema>;

export const updateReviewSchema = reviewSchema.partial();

export const reviewFilterSchema = z.object({
  destinationId: z.string().optional(),
  userId: z.string().optional(),
  minRating: z.number().optional(),
  maxRating: z.number().optional(),
});
