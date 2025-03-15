import { z } from "zod";

export const emailTemplateSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  subject: z.string().min(3, "Assunto deve ter no mínimo 3 caracteres"),
  content: z.string().min(10, "Conteúdo deve ter no mínimo 10 caracteres"),
  variables: z.array(z.string()),
  type: z.enum(["booking", "marketing", "notification"]),
  active: z.boolean().default(true),
  language: z.string().default("pt-BR"),
});

export type EmailTemplate = z.infer<typeof emailTemplateSchema>;
