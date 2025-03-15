import { z } from "zod";
import { categorySchema } from "./categories";

export const faqsSchema = z.object({
  question: z.string().min(3, "Pergunta deve ter no mínimo 3 caracteres"),
  answer: z.string().min(10, "Resposta deve ter no mínimo 10 caracteres"),
});

export const imageSchema = z.object({
  src: z.string().url("URL da imagem inválida"),
  alt: z.string().min(3, "Altura deve ter no mínimo 3 caracteres"),
});

export const destinationSchema = z.object({
  $id: z.string().optional(),
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  price: z.number().positive("Preço deve ser maior que zero"),
  mainImage: z.string().url("URL da imagem inválida"),
  images: z.array(imageSchema),
  country: z.string().min(2, "País é obrigatório"),
  city: z.string().optional(),
  region: z.string().min(2, "Região é obrigatória"),
  rating: z
    .number()
    .min(0)
    .max(5, "Avaliação deve estar entre 0 e 5")
    .default(0),
  categories: z
    .array(categorySchema)
    .min(1, "Pelo menos uma categoria é obrigatória"),
  discount: z.number().optional(),
  faqs: z.array(faqsSchema).optional(),
  timezone: z.string().optional(),
  languages: z.array(z.string()).optional(),
  climate: z.string().optional(),
  currency: z.string().optional(),
  bestTimeToVisit: z.string().optional(),
});

export type Destination = z.infer<typeof destinationSchema>;

export const updateDestinationSchema = destinationSchema.partial();

export const createDestinationSchema = destinationSchema.extend({
  $id: z.string().optional(),
  mainImage: z.any(), // Permitindo qualquer tipo de dado para a imagem
  images: z.any(), // Permitindo qualquer tipo de dado para as imagens
  categories: z
    .array(z.string())
    .min(1, "Pelo menos uma categoria é obrigatória"),
  faqs: z.array(z.string()).optional(),
});

export const destinationFilterSchema = z.object({
  region: z.string().optional(),
  country: z.string().optional(),
  categories: z.array(categorySchema).optional(),
  minRating: z.number().optional(),
  excludeId: z.string().optional(), // Adicionando opção para excluir um ID específico
  limit: z.number().optional(), // Opcional: adicionar limite de resultados
});
