import { api } from "../utils/api";

export const requestResetPassword = async (email: string) => {
  return api.post("/accounts/request-reset-password", { email });
};

export const resetCode = async (email: string, resetCode: string) => {
  return api.post("/accounts/verify-reset-code", { email, resetCode });
};

export const changePassword = async (email: string, newPassword: string) => {
  return api.put("/accounts/change-password", { email, newPassword });
};
