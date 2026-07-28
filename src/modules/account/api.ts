import { CreateAccountData, UpdateAccount } from "@/modules/admin/types";
import { api } from "@/shared/utils/api";

/**
 * Requests a password reset.
 *
 * @description Sends a password reset email for the given account.
 * @param email - The account email address
 * @returns The API response
 */
export const requestResetPassword = async (email: string) => {
  return api.post("/auth/request-password-reset", { email });
};

/**
 * Verifies a password-reset code.
 *
 * @description Verifies a password-reset code sent to the user's email.
 * @param email - The account email address
 * @param resetCode - The reset code to verify
 * @returns The API response
 */
export const resetCode = async (email: string, resetCode: string) => {
  return api.post("/auth/verify-reset-code", { email, resetCode });
};

/**
 * Changes the account password.
 *
 * @description Changes the account password using the verified reset code
 * flow.
 * @param email - The account email address
 * @param newPassword - The new password
 * @returns The API response
 */
export const changePassword = async (email: string, newPassword: string) => {
  return api.post("/auth/change-password", { email, newPassword });
};

/**
 * Updates account details.
 *
 * @description Updates account details such as billing address and preferred
 * currency.
 * @param email - The account email address
 * @param accountDto - The account data to update
 * @returns The API response
 */
export const updateAccount = async (email: string, accountDto: UpdateAccount) => {
  return api.patch(`/accounts/${email}`, accountDto);
};

/**
 * Gets the preferred currency.
 *
 * @description Gets the preferred currency for the given account.
 * @param email - The account email (may be null or undefined)
 * @returns The preferred currency code
 */
export const getPreferredCurrency = async (email: string | null | undefined): Promise<string> => {
  return api.get(`/accounts/${email}/preferred-currency`);
};

/**
 * Gets an account by email.
 *
 * @description Gets a single account by email address.
 * @param email - The account email address
 * @returns The account data
 */
export const getAccountByEmail = async (email: string) => {
  return api.get(`/accounts/email/${email}`);
};

/**
 * Fetches all accounts.
 *
 * @description Fetches all accounts with optional filtering, pagination and
 * sorting.
 * @param filters - Optional filter, pagination, and sort parameters
 * @returns The paginated accounts list
 */
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
  if (filters?.isAdmin !== undefined) params.append("isAdmin", filters.isAdmin.toString());

  return api.get(`/accounts?${params.toString()}`, { cache: false });
};

/**
 * Creates a new account.
 *
 * @description Creates a new account with the provided data.
 * @param data - The account creation data
 * @returns The created account
 */
export const createAccount = async (data: CreateAccountData) => {
  return api.post("/accounts", data);
};

/**
 * Gets the current user.
 *
 * @description Fetches the currently authenticated user from the NextAuth
 * session.
 * @returns The current user object or null
 */
export const getCurrentUser = async () => {
  const response = await fetch("/api/auth/session");
  if (!response.ok) return null;
  const data = await response.json();
  return data?.user || null;
};

/**
 * Deletes an account.
 *
 * @description Deletes an account by its ID.
 * @param id - The account ID
 * @returns The API response
 */
export const deleteAccount = async (id: string) => {
  return api.delete(`/accounts/${id}`);
};
