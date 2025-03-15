"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import {
  packageSchema,
  type Package,
  updatePackageSchema,
  packageFilterSchema,
} from "@/schemas/packages";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";
import { z } from "zod";

export async function createPackage(packageData: Package) {
  const validatedData = packageSchema.parse(packageData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.packages,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar pacote:", error);
    throw error;
  }
}

export async function getPackages(
  filters?: z.infer<typeof packageFilterSchema>
) {
  const { databases } = await createSessionClient();
  try {
    const queries = [];

    if (filters) {
      const validatedFilters = packageFilterSchema.parse(filters);
      if (validatedFilters.destinationId)
        queries.push(`destination_id=${validatedFilters.destinationId}`);
      if (validatedFilters.minPrice)
        queries.push(`price>=${validatedFilters.minPrice}`);
      if (validatedFilters.maxPrice)
        queries.push(`price<=${validatedFilters.maxPrice}`);
      if (validatedFilters.categories)
        queries.push(`category=${validatedFilters.categories}`);
      if (validatedFilters.status)
        queries.push(`status=${validatedFilters.status}`);
    }
    const packages = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.packages,
      queries
    );
    return packages as unknown as { documents: Package[] };
  } catch (error) {
    console.error("Erro ao buscar pacotes:", error);
    throw error;
  }
}

export async function getPackage(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.packages, id);
  } catch (error) {
    console.error("Erro ao buscar pacote:", error);
    throw error;
  }
}

export async function updatePackage(id: string, packageData: Partial<Package>) {
  const validatedData = updatePackageSchema.parse(packageData);

  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.packages,
      id,
      validatedData
    );
  } catch (error) {
    console.error("Erro ao atualizar pacote:", error);
    throw error;
  }
}

export async function deletePackage(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.packages, id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar pacote:", error);
    throw error;
  }
}
