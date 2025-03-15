"use server";

import { Client, Databases, Account, Storage } from "node-appwrite";

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
