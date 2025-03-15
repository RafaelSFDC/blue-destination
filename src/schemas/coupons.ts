import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().min(3, "Código deve ter no mínimo 3 caracteres"),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z
    .number()
    .positive("Valor do desconto deve ser maior que zero"),
  startDate: z.string().datetime("Data de início inválida"),
  endDate: z.string().datetime("Data de término inválida"),
  usageLimit: z.number().optional(),
  timesUsed: z.number().default(0),
  active: z.boolean().default(true),
  minPurchase: z.number().optional(),
  maxDiscount: z.number().optional(),
});

export const updateCouponSchema = couponSchema.partial();

export type Coupon = z.infer<typeof couponSchema>;

export const couponFilterSchema = z.object({
  code: z.string().optional(),
  discountType: z.enum(["percentage", "fixed"]).optional(),
  active: z.boolean().optional(),
});
