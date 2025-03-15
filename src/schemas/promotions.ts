import { z } from "zod";

export const promotionSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  discount: z.number().positive("Desconto deve ser maior que zero"),
  startDate: z.string().datetime("Data de início inválida"),
  endDate: z.string().datetime("Data de término inválida"),
  destinationId: z.string().optional(),
  packageId: z.string().optional(),
  active: z.boolean().default(true),
  minPurchase: z.number().optional(),
  maxDiscount: z.number().optional(),
});

export type Promotion = z.infer<typeof promotionSchema>;
