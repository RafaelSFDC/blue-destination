import { z } from "zod";

export const wishlistSchema = z.object({
  userId: z.string().min(1, "Usuário é obrigatório"),
  destinationId: z.string().optional(),
  packageId: z.string().optional(),
  addedAt: z
    .string()
    .datetime("Data inválida")
    .default(() => new Date().toISOString()),
  item_type: z.enum(["destination", "package"]),
  status: z.enum(["active", "removed"]).default("active"),
  notes: z.string().optional(),
});

// Garante que pelo menos destinationId OU packageId está presente
export const wishlistValidation = wishlistSchema.refine(
  (data) => data.destinationId || data.packageId,
  {
    message: "É necessário fornecer destinationId ou packageId",
  }
);

export type Wishlist = z.infer<typeof wishlistSchema>;

export const updateWishlistSchema = wishlistSchema.partial();

export const wishlistFilterSchema = z.object({
  userId: z.string().optional(),
  item_type: z.enum(["destination", "package"]).optional(),
  status: z.enum(["active", "removed"]).optional(),
});
