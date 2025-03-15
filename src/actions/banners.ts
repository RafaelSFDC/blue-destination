"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";

export async function createBanner(bannerData: {
  title: string;
  description?: string;
  image_url: string;
  link_url?: string;
  start_date: string;
  end_date: string;
  position: string;
  active: boolean;
}) {
  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.banners,
      ID.unique(),
      bannerData
    );
  } catch (error) {
    console.error("Erro ao criar banner:", error);
    throw error;
  }
}

export async function getBanners(queries: any[] = []) {
  const { databases } = await createSessionClient();
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.banners,
      queries
    );
  } catch (error) {
    console.error("Erro ao buscar banners:", error);
    throw error;
  }
}

export async function getBanner(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.banners, id);
  } catch (error) {
    console.error("Erro ao buscar banner:", error);
    throw error;
  }
}

export async function updateBanner(
  id: string,
  bannerData: Partial<{
    title: string;
    description: string;
    image_url: string;
    link_url: string;
    start_date: string;
    end_date: string;
    position: string;
    active: boolean;
  }>
) {
  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.banners,
      id,
      bannerData
    );
  } catch (error) {
    console.error("Erro ao atualizar banner:", error);
    throw error;
  }
}

export async function deleteBanner(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.banners, id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar banner:", error);
    throw error;
  }
}

export async function getActiveBanners() {
  const queries = [
    // Query.equal("active", true),
    // Query.lessThan("start_date", new Date().toISOString()),
    // Query.greaterThan("end_date", new Date().toISOString())
  ];
  return getBanners(queries);
}
