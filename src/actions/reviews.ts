"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import {
  reviewSchema,
  type Review,
  updateReviewSchema,
  reviewFilterSchema,
} from "@/schemas/reviews";
import { z } from "zod";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";

export async function createReview(reviewData: Review) {
  const validatedData = reviewSchema.parse(reviewData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.reviews,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    throw error;
  }
}

export async function getReviews(filters?: z.infer<typeof reviewFilterSchema>) {
  const { databases } = await createSessionClient();
  try {
    const queries = [];

    if (filters) {
      const validatedFilters = reviewFilterSchema.parse(filters);
      if (validatedFilters.destinationId)
        queries.push(`destination_id=${validatedFilters.destinationId}`);
      if (validatedFilters.userId)
        queries.push(`user_id=${validatedFilters.userId}`);
      if (validatedFilters.minRating)
        queries.push(`rating>=${validatedFilters.minRating}`);
      if (validatedFilters.maxRating)
        queries.push(`rating<=${validatedFilters.maxRating}`);
    }

    const reviews = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.reviews,
      queries
    );
    return reviews as unknown as { documents: Review[] };
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    throw error;
  }
}

export async function getReview(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.reviews, id);
  } catch (error) {
    console.error("Erro ao buscar avaliação:", error);
    throw error;
  }
}

export async function updateReview(id: string, reviewData: Partial<Review>) {
  const validatedData = updateReviewSchema.parse(reviewData);

  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.reviews,
      id,
      validatedData
    );
  } catch (error) {
    console.error("Erro ao atualizar avaliação:", error);
    throw error;
  }
}

export async function deleteReview(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.reviews, id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar avaliação:", error);
    throw error;
  }
}
