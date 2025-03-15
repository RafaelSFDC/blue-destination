"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import {
  promotionSchema,
  type Promotion,
  updatePromotionSchema,
  promotionFilterSchema,
} from "@/schemas/promotions";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";
import { z } from "zod";

export async function createPromotion(promotionData: Promotion) {
  const validatedData = promotionSchema.parse(promotionData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.promotions,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar promoção:", error);
    throw error;
  }
}

export async function getPromotions(
  filters?: z.infer<typeof promotionFilterSchema>
) {
  const { databases } = await createSessionClient();
  try {
    const queries = [];

    if (filters) {
      const validatedFilters = promotionFilterSchema.parse(filters);
      if (validatedFilters.active !== undefined)
        queries.push(`active=${validatedFilters.active}`);
      if (validatedFilters.start_date)
        queries.push(`start_date>=${validatedFilters.start_date}`);
      if (validatedFilters.end_date)
        queries.push(`end_date<=${validatedFilters.end_date}`);
    }

    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.promotions,
      queries
    );
  } catch (error) {
    console.error("Erro ao buscar promoções:", error);
    throw error;
  }
}

export async function getPromotion(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.promotions, id);
  } catch (error) {
    console.error("Erro ao buscar promoção:", error);
    throw error;
  }
}

export async function updatePromotion(
  id: string,
  promotionData: Partial<Promotion>
) {
  const validatedData = updatePromotionSchema.parse(promotionData);

  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.promotions,
      id,
      validatedData
    );
  } catch (error) {
    console.error("Erro ao atualizar promoção:", error);
    throw error;
  }
}

export async function deletePromotion(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.promotions, id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar promoção:", error);
    throw error;
  }
}
