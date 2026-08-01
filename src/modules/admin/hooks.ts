"use client";

import {
  useQuery as useDashQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { api } from "@/shared/utils/api";

import { DashboardStats, getDashboardStats, getDashboardCarts, getDashboardWishlists, DashboardCart, DashboardWishlist } from "./api";
import { Account, AccountsResponse, CreateAccountData, UpdateAccount } from "./types";

/**
 * Admin accounts query.
 *
 * @description React Query hook to fetch paginated accounts for the
 * admin panel
 * @param filters - Filter options (page, pageSize, search, sortBy,
 * sortOrder, isAdmin)
 * @returns Query result with accounts response
 */
export const useAdminAccounts = (filters?: {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "name" | "email" | "createdAt" | "isAdmin";
  sortOrder?: "ASC" | "DESC";
  isAdmin?: boolean;
}) => {
  return useQuery<AccountsResponse>({
    queryKey: ["adminAccounts", filters],
    queryFn: async (): Promise<AccountsResponse> => {
      const params = new URLSearchParams();
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.pageSize) params.append("pageSize", filters.pageSize.toString());
      if (filters?.search) params.append("search", filters.search);
      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
      if (filters?.isAdmin !== undefined) params.append("isAdmin", filters.isAdmin.toString());

      const response = await api.get<AccountsResponse>(`/accounts?${params.toString()}`);
      return response;
    },
  });
};

/**
 * Account by email query.
 *
 * @description React Query hook to fetch a single account by email
 * @param email - Account email
 * @returns Query result with account or null
 */
export const useAccountByEmail = (email: string | null | undefined) => {
  return useQuery<Account | null>({
    queryKey: ["account", email],
    queryFn: async (): Promise<Account | null> => {
      if (!email) return null;
      const response = await api.get<Account>(`/accounts/email/${email}`);
      return response;
    },
    enabled: !!email,
  });
};

/**
 * Creates an account.
 *
 * @description React Query mutation hook to create a new account.
 * @returns Mutation result for account creation
 */
export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAccountData) => {
      const response = await api.post("/accounts", data);
      return response;
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
};

/**
 * Updates an account.
 *
 * @description React Query mutation hook to update an existing account.
 * @returns Mutation result for account update
 */
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, data }: { email: string; data: UpdateAccount }) => {
      const response = await api.patch(`/accounts/${email}`, data);
      return response;
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
};

/**
 * Deletes an account.
 *
 * @description React Query mutation hook to delete an account.
 * @returns Mutation result for account deletion
 */
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/accounts/${id}`);
      return response;
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
};

/**
 * Fetches dashboard statistics.
 *
 * @description React Query hook to fetch admin dashboard statistics.
 * @returns Query result with dashboard stats
 */
export function useDashboardStats() {
  return useDashQuery<DashboardStats, Error>({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });
}

/**
 * Fetches all customer carts for the admin panel.
 *
 * @description React Query hook to fetch every cart belonging to a
 * registered account with its items and product details.
 * @returns Query result with an array of carts
 */
export function useDashboardCarts() {
  return useQuery<DashboardCart[], Error>({
    queryKey: ["dashboardCarts"],
    queryFn: getDashboardCarts,
  });
}

/**
 * Fetches all customer wishlists for the admin panel.
 *
 * @description React Query hook to fetch every wishlist belonging to a
 * registered account with its items and product details.
 * @returns Query result with an array of wishlists
 */
export function useDashboardWishlists() {
  return useQuery<DashboardWishlist[], Error>({
    queryKey: ["dashboardWishlists"],
    queryFn: getDashboardWishlists,
  });
}
