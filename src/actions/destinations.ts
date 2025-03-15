"use server";
import { createSessionClient, createAdminClient } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import {
  destinationSchema,
  type Destination,
  updateDestinationSchema,
  destinationFilterSchema,
} from "@/schemas/destinations";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";

export async function createDestination(destinationData: Destination) {
  const validatedData = destinationSchema.parse(destinationData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.destinations,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar destino:", error);
    throw error;
  }
}

export async function updateDestination(
  id: string,
  destinationData: Partial<Destination>
) {
  const validatedData = updateDestinationSchema.parse(destinationData);

  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.destinations,
      id,
      validatedData
    );
  } catch (error) {
    console.error("Erro ao atualizar destino:", error);
    throw error;
  }
}
