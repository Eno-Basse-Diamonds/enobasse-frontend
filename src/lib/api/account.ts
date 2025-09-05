import { UpdateAccount, CreateAccountData } from "../types/accounts";
import { api } from "../utils/api";

export const requestResetPassword = async (email: string) => {
  return api.post("/auth/request-password-reset", { email });
};

export const resetCode = async (email: string, resetCode: string) => {
  return api.post("/auth/verify-reset-code", { email, resetCode });
};

export const changePassword = async (email: string, newPassword: string) => {
  return api.post("/auth/change-password", { email, newPassword });
};

export const updateAccount = async (
  email: string,
  accountDto: UpdateAccount,
) => {
  return api.patch(`/accounts/${email}`, accountDto);
};

export const getPreferredCurrency = async (
  email: string | null | undefined,
): Promise<string> => {
  return api.get(`/accounts/${email}/preferred-currency`);
};

export const getAccountByEmail = async (email: string) => {
  return api.get(`/accounts/email/${email}`);
};

export const getAllAccounts = async (filters?: {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  isAdmin?: boolean;
}) => {
  const params = new URLSearchParams();
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.pageSize) params.append("pageSize", filters.pageSize.toString());
  if (filters?.search) params.append("search", filters.search);
  if (filters?.sortBy) params.append("sortBy", filters.sortBy);
  if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
  if (filters?.isAdmin !== undefined)
    params.append("isAdmin", filters.isAdmin.toString());

  return api.get(`/accounts?${params.toString()}`, { cache: false });
};

export const createAccount = async (data: CreateAccountData) => {
  return api.post("/accounts", data);
};

export const deleteAccount = async (id: string) => {
  return api.delete(`/accounts/${id}`);
};
