import {
  COLLECTIONS,
  createSessionClient,
  createAdminClient,
  DATABASE_ID,
} from "@/lib/appwrite/config";
import { ID } from "node-appwrite";

// CREATE - Criar novo destino
export async function createDestination(destinationData: {
  name: string;
  description: string;
  mainImage: string;
  country: string;
  city?: string;
  region: string;
  rating: number;
  category: string[];
}) {
  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.destinations,
      ID.unique(),
      destinationData
    );
  } catch (error) {
    console.error("Erro ao criar destino:", error);
    throw error;
  }
}

// READ - Listar todos os destinos com queries opcionais
export async function getDestinations(queries: any[] = []) {
  const { databases } = await createSessionClient();
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.destinations,
      queries
    );
  } catch (error) {
    console.error("Erro ao buscar destinos:", error);
    throw error;
  }
}

// READ - Buscar um destino específico
export async function getDestination(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.destinations,
      id
    );
  } catch (error) {
    console.error("Erro ao buscar destino:", error);
    throw error;
  }
}

// UPDATE - Atualizar um destino
export async function updateDestination(
  id: string,
  destinationData: Partial<{
    name: string;
    description: string;
    mainImage: string;
    country: string;
    city?: string;
    region: string;
    rating: number;
    category: string[];
  }>
) {
  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.destinations,
      id,
      destinationData
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
  const queries = [
    // Query.equal("category", [category])
  ];
  return getDestinations(queries);
}

// Buscar destinos por região
export async function getDestinationsByRegion(region: string) {
  const queries = [
    // Query.equal("region", region)
  ];
  return getDestinations(queries);
}

// Buscar destinos por avaliação mínima
export async function getDestinationsByMinRating(rating: number) {
  const queries = [
    // Query.greaterThanEqual("rating", rating)
  ];
  return getDestinations(queries);
}
