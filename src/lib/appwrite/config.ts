import "server-only";
import { Client, Databases, Account, Storage } from "node-appwrite";

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "";
export const APPWRITE_BUCKET_URL =
  process.env.NEXT_PUBLIC_APPWRITE_BUCKET_URL || "";

export const COLLECTIONS = {
  users: "users",
  destinations: process.env.NEXT_PUBLIC_APPWRITE_DESTINATIONS_ID!,
  packages: process.env.NEXT_PUBLIC_APPWRITE_PACKAGES_ID!,
  bookings: process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_ID!,
  reviews: process.env.NEXT_PUBLIC_APPWRITE_REVIEWS_ID!,
  promotions: process.env.NEXT_PUBLIC_APPWRITE_PROMOTIONS_ID!,
  blog: process.env.NEXT_PUBLIC_APPWRITE_BLOG_ID!,
  wishlist: process.env.NEXT_PUBLIC_APPWRITE_WISHLIST_ID!,
  coupons: process.env.NEXT_PUBLIC_APPWRITE_COUPONS_ID!,
  banners: process.env.NEXT_PUBLIC_APPWRITE_BANNERS_ID!,
  email_templates: process.env.NEXT_PUBLIC_APPWRITE_EMAIL_TEMPLATES_ID!,
};

const createAdminClient = async () => {
  const client = new Client();
  client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "");
  client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");
  client.setKey(process.env.NEXT_APPWRITE_API_KEY || "");
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get admin() {
      return new Storage(client);
    },
  };
};

const createSessionClient = async (session?: string) => {
  const client = new Client();
  client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "");
  client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

  if (session) {
    client.setSession(session);
  }
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};
export { createAdminClient, createSessionClient };
