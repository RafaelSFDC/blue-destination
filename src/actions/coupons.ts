"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import { z } from "zod";
import {
  couponSchema,
  type Coupon,
  updateCouponSchema,
  couponFilterSchema,
} from "@/schemas/coupons";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/enviroments";

export async function createCoupon(couponData: Coupon) {
  const validatedData = couponSchema.parse(couponData);

  const { databases } = await createAdminClient();
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.coupons,
      ID.unique(),
      validatedData
    );
  } catch (error) {
    console.error("Erro ao criar cupom:", error);
    throw error;
  }
}

export async function getCoupons(filters?: z.infer<typeof couponFilterSchema>) {
  const { databases } = await createSessionClient();
  try {
    const queries = [];

    if (filters) {
      const validatedFilters = couponFilterSchema.parse(filters);
      if (validatedFilters.active !== undefined)
        queries.push(`active=${validatedFilters.active}`);
      if (validatedFilters.code) queries.push(`code=${validatedFilters.code}`);
      if (validatedFilters.discount_type)
        queries.push(`discount_type=${validatedFilters.discount_type}`);
    }

    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.coupons,
      queries
    );
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
    throw error;
  }
}

export async function getCoupon(id: string) {
  const { databases } = await createSessionClient();
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.coupons, id);
  } catch (error) {
    console.error("Erro ao buscar cupom:", error);
    throw error;
  }
}

export async function updateCoupon(id: string, couponData: Partial<Coupon>) {
  const validatedData = updateCouponSchema.parse(couponData);

  const { databases } = await createAdminClient();
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.coupons,
      id,
      validatedData
    );
  } catch (error) {
    console.error("Erro ao atualizar cupom:", error);
    throw error;
  }
}

export async function deleteCoupon(id: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.coupons, id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar cupom:", error);
    throw error;
  }
}

export async function validateCoupon(code: string) {
  const queries = [
    // Query.equal("code", code),
    // Query.equal("active", true),
    // Query.greaterThan("end_date", new Date().toISOString())
  ];
  return getCoupons(queries);
}
