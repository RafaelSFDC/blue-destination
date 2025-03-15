"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/config";
import { ID, OAuthProvider } from "node-appwrite";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return session;
}

export async function signUp(data: FormData) {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const { account } = await createAdminClient();
  const user = await account.create(ID.unique(), email, password);
  if (!user) {
    throw new Error("Failed to create user");
  }
  return "User created successfully";
}
export async function signIn(data: FormData) {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const cookieStore = await cookies();

    cookieStore.set("session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });
    return "Usuário logado com sucesso";
  } catch (err) {
    console.log(err);
    throw new Error("Conta inexistente ou senha incorreta");
  }
}

export async function oAuthSignIn() {
  const { account } = await createAdminClient();
  const head = await headers();
  const origin = head.get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/auth/oauth`,
    `${origin}/auth/login`
  );

  return redirect(redirectUrl);
}
export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/auth/login");
}

export async function getUser() {
  const session = await getSession();
  try {
    const { account } = await createSessionClient(session);
    const user = await account.get();
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
