"use server";

import { createAccount, issueTokenForEmail } from "@/modules/auth/api";

/**
 * Handles user sign-up.
 *
 * @description Server action that creates an account and issues a session
 * token.
 * @param formData - Contains the name, email, and password fields
 * @returns The account data or pre-issued session token
 */
export async function handleSignUp(formData: Record<string, string>) {
  try {
    const response = (await createAccount(formData.name, formData.email, formData.password)) as any;

    if (response?.errors) return response;
  } catch (error) {
    return {
      errors: {
        email: [
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
        ],
      },
    };
  }

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
