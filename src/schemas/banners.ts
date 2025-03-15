import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  imageUrl: z.string().url("URL da imagem inválida"),
  linkUrl: z.string().url("URL do link inválida").optional(),
  startDate: z.string().datetime("Data de início inválida"),
  endDate: z.string().datetime("Data de término inválida"),
  position: z.string().min(1, "Posição é obrigatória"),
  active: z.boolean().default(true),
  priority: z.number().default(0),
});

export type Banner = z.infer<typeof bannerSchema>;
