"use server";
import { createSessionClient, createAdminClient } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";
import {
  destinationSchema,
  type Destination,
  updateDestinationSchema,
  destinationFilterSchema,
} from "@/schemas/destinations";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";
import { z } from "zod";

// CREATE - Criar novo destino
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

// READ - Listar todos os destinos com filtros opcionais
export async function getDestinations(
  filters?: z.infer<typeof destinationFilterSchema>
) {
  const { databases } = await createSessionClient();
  try {
    const queries = [];

    if (filters) {
      const validatedFilters = destinationFilterSchema.parse(filters);

      if (validatedFilters.region) {
        queries.push(Query.equal("region", validatedFilters.region));
      }
      if (validatedFilters.country) {
        queries.push(Query.equal("country", validatedFilters.country));
      }
      if (
        validatedFilters.categories &&
        validatedFilters.categories.length > 0
      ) {
        // Cria um filtro OR para buscar destinos que contenham qualquer uma das categorias
        queries.push(
          Query.search("categories", validatedFilters.categories.join(","))
        );
      }
      if (validatedFilters.minRating) {
        queries.push(
          Query.greaterThanEqual("rating", validatedFilters.minRating)
        );
      }
      if (validatedFilters.excludeId) {
        queries.push(Query.notEqual("$id", validatedFilters.excludeId));
      }
      if (validatedFilters.limit) {
        queries.push(Query.limit(validatedFilters.limit));
      }
    }

    const destinations = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.destinations,
      queries
    );
    return destinations as unknown as { documents: Destination[] };
  } catch (error) {
    console.error("Erro ao buscar destinos:", error);
    throw error;
  }
}

// READ - Buscar um destino específico
export async function getDestination(id: string) {
  const { databases } = await createSessionClient();
  try {
    const destination = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.destinations,
      id
    );
    return destination as unknown as Destination;
  } catch (error) {
    console.error("Erro ao buscar destino:", error);
    throw error;
  }
}

// UPDATE - Atualizar um destino
export async function updateDestination(
  id: string,
  destinationData: z.infer<typeof updateDestinationSchema>
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

// DELETE - Deletar um destino
export async function deleteDestination(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.destinations, id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar destino:", error);
    throw error;
  }
}

// Funções auxiliares

// Buscar destinos por categoria
export async function getDestinationsByCategory(category: string) {
  return getDestinations({
    categories: [
      {
        name: category,
        description: "",
        icon: "",
      },
    ],
  });
}

// Buscar destinos por região
export async function getDestinationsByRegion(region: string) {
  return getDestinations({ region });
}

// Buscar destinos por avaliação mínima
export async function getDestinationsByMinRating(rating: number) {
  return getDestinations({ minRating: rating });
}
