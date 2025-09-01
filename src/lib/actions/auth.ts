"use server";

import { createAccount } from "@/lib/api/auth";

export async function handleSignUp(formData: Record<string, string>) {
  const response = (await createAccount(
    formData.name,
    formData.email,
    formData.password,
  )) as any;

  return response;
}
