"use server";

import { createSessionClient } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";

type WishlistItemType = "destination" | "package";

export async function addToWishlist(
  userId: string,
  itemId: string,
  itemType: WishlistItemType
) {
  const { databases } = await createSessionClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.wishlist,
      ID.unique(),
      {
        userId,
        [`${itemType}Id`]: itemId,
        itemType,
        addedAt: new Date().toISOString(),
        status: "active",
      }
    );
  } catch (error) {
    console.error("Erro ao adicionar item à wishlist:", error);
    throw error;
  }
}

export async function removeFromWishlist(itemId: string) {
  const { databases } = await createSessionClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.wishlist, itemId);
    return true;
  } catch (error) {
    console.error("Erro ao remover item da wishlist:", error);
    throw error;
  }
}

export async function checkWishlistItem(
  userId: string,
  itemId: string,
  itemType: WishlistItemType
) {
  const { databases } = await createSessionClient();
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.wishlist,
      [
        Query.equal("userId", userId),
        Query.equal(`${itemType}Id`, itemId),
        Query.equal("itemType", itemType),
      ]
    );

    return response.documents[0] || null;
  } catch (error) {
    console.error("Erro ao verificar item na wishlist:", error);
    throw error;
  }
}
