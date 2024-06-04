"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function login(formData: FormData) {
  const { email, password } = Object.fromEntries(formData.entries())

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      if (e.type === "CredentialsSignin") {
        return { error: "Credenciais inválidas" };
      }
    }
  }

  redirect("/dashboard");
}
