"use server";

import {
  requestResetPassword,
  resetCode,
  changePassword,
} from "../api/account";

export async function handleRequestResetPassword(
  formData: Record<string, string>,
) {
  const response = (await requestResetPassword(formData.email)) as any;
  return response;
}

export async function handleResetCode(formData: Record<string, string>) {
  const response = (await resetCode(formData.email, formData.resetCode)) as any;
  return response;
}

export async function handleChangePassword(formData: Record<string, string>) {
  const response = (await changePassword(
    formData.email,
    formData.newPassword,
  )) as any;
  return response;
}
