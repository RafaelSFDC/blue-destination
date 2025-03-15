import { z } from "zod";

export const bookingSchema = z.object({
  userId: z.string().min(1, "Usuário é obrigatório"),
  packageId: z.string().min(1, "Pacote é obrigatório"),
  date: z.string().datetime("Data inválida"),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
  numberOfTravelers: z
    .number()
    .positive("Número de viajantes deve ser maior que zero"),
  totalPrice: z.number().positive("Preço total deve ser maior que zero"),
  paymentStatus: z.enum(["pending", "paid", "refunded"]),
  specialRequests: z.string().optional(),
});

export type Booking = z.infer<typeof bookingSchema>;

export const updateBookingSchema = bookingSchema.partial();
