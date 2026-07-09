"use server";

import { createAccount, issueTokenForEmail } from "@/lib/api/auth";

export async function handleSignUp(formData: Record<string, string>) {
  const response = (await createAccount(
    formData.name,
    formData.email,
    formData.password,
  )) as any;

  if (response?.errors) return response;

  // Issue a session token immediately after account creation (server-side),
  // so the client can sign in without a separate login round-trip.
  try {
    const tokenData = await issueTokenForEmail(formData.email);
    return { preIssuedToken: JSON.stringify(tokenData) };
  } catch {
    // Fall back gracefully — the client will handle the sign-in itself
    return {};
  }
}
