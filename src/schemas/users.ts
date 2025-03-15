import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  phone: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),
  preferences: z
    .object({
      newsletter: z.boolean().default(false),
      notifications: z.boolean().default(true),
    })
    .optional(),
  role: z.enum(["user", "admin"]).default("user"),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type User = z.infer<typeof userSchema>;

export const updateUserSchema = userSchema.partial();
