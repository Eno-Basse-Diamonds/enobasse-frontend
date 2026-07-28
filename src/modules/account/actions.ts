"use server";

import { changePassword, requestResetPassword, resetCode } from "./api";

/**
 * Handles password reset request.
 *
 * @description Server action that triggers a password reset email.
 * @param formData - Contains the email field
 * @returns The API response
 */
export async function handleRequestResetPassword(formData: Record<string, string>) {
  const response = (await requestResetPassword(formData.email)) as any;
  return response;
}

/**
 * Handles reset code verification.
 *
 * @description Server action that verifies the password-reset code.
 * @param formData - Contains the email and resetCode fields
 * @returns The API response
 */
export async function handleResetCode(formData: Record<string, string>) {
  const response = (await resetCode(formData.email, formData.resetCode)) as any;
  return response;
}

/**
 * Handles password change.
 *
 * @description Server action that changes the account password.
 * @param formData - Contains the email and newPassword fields
 * @returns The API response
 */
export async function handleChangePassword(formData: Record<string, string>) {
  const response = (await changePassword(formData.email, formData.newPassword)) as any;
  return response;
}
