import { UpdateAccount } from "../types/accounts";
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

export const updateAccount = async (
  email: string,
  accountDto: UpdateAccount
) => {
  return api.patch(`/accounts/${email}`, accountDto);
};

export const getPreferredCurrency = async (
  email: string | null | undefined
): Promise<string> => {
  return api.get(`/accounts/${email}/preferred-currency`);
};
