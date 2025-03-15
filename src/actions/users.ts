"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import { userSchema, type User, updateUserSchema } from "@/schemas/users";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";

export async function createUser(userData: User) {
  const validatedData = userSchema.parse(userData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.users,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.users, id);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
}

export async function updateUser(id: string, userData: Partial<User>) {
  const validatedData = updateUserSchema.parse(userData);

  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.users,
      id,
      validatedData
    );
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.users, id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
}
