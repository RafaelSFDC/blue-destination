"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import {
  bookingSchema,
  type Booking,
  updateBookingSchema,
} from "@/schemas/bookings";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";

export async function createBooking(bookingData: Booking) {
  const validatedData = bookingSchema.parse(bookingData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.bookings,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    throw error;
  }
}

export async function getBookings(queries: any[] = []) {
  const { databases } = await createSessionClient();
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.bookings,
      queries
    );
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    throw error;
  }
}

export async function getBooking(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.bookings, id);
  } catch (error) {
    console.error("Erro ao buscar reserva:", error);
    throw error;
  }
}

export async function updateBooking(id: string, bookingData: Partial<Booking>) {
  const validatedData = updateBookingSchema.parse(bookingData);

  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.bookings,
      id,
      validatedData
    );
  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);
    throw error;
  }
}

export async function deleteBooking(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.bookings, id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar reserva:", error);
    throw error;
  }
}
