"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import {
  emailTemplateSchema,
  type EmailTemplate,
  updateEmailTemplateSchema,
  emailTemplateFilterSchema,
} from "@/schemas/email-templates";
import { z } from "zod";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";

export async function createEmailTemplate(templateData: EmailTemplate) {
  const validatedData = emailTemplateSchema.parse(templateData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.email_templates,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar template de email:", error);
    throw error;
  }
}

export async function getEmailTemplates(
  filters?: z.infer<typeof emailTemplateFilterSchema>
) {
  const { databases } = await createSessionClient();
  try {
    const queries = [];

    if (filters) {
      const validatedFilters = emailTemplateFilterSchema.parse(filters);
      if (validatedFilters.type) queries.push(`type=${validatedFilters.type}`);
      if (validatedFilters.active !== undefined)
        queries.push(`active=${validatedFilters.active}`);
    }

    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.email_templates,
      queries
    );
  } catch (error) {
    console.error("Erro ao buscar templates de email:", error);
    throw error;
  }
}

export async function getEmailTemplate(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.email_templates,
      id
    );
  } catch (error) {
    console.error("Erro ao buscar template de email:", error);
    throw error;
  }
}

export async function updateEmailTemplate(
  id: string,
  templateData: Partial<EmailTemplate>
) {
  const validatedData = updateEmailTemplateSchema.parse(templateData);

  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.email_templates,
      id,
      validatedData
    );
  } catch (error) {
    console.error("Erro ao atualizar template de email:", error);
    throw error;
  }
}

export async function deleteEmailTemplate(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTIONS.email_templates,
      id
    );
    return true;
  } catch (error) {
    console.error("Erro ao deletar template de email:", error);
    throw error;
  }
}

export async function getTemplateByType(type: string) {
  const queries = [
    // Query.equal("type", type),
    // Query.equal("active", true)
  ];
  return getEmailTemplates(queries);
}
