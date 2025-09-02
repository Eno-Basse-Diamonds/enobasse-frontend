import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import { Account, CreateAccountData, UpdateAccountData } from "../types/accounts";

// Get all accounts for admin
export const useAdminAccounts = (filters?: {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "name" | "email" | "createdAt" | "isAdmin";
  sortOrder?: "ASC" | "DESC";
  isAdmin?: boolean;
}) => {
  return useQuery({
    queryKey: ["adminAccounts", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.pageSize) params.append("pageSize", filters.pageSize.toString());
      if (filters?.search) params.append("search", filters.search);
      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
      if (filters?.isAdmin !== undefined) params.append("isAdmin", filters.isAdmin.toString());

      const response = await api.get(`/accounts?${params.toString()}`);
      return response.data;
    },
  });
};

// Get account by email
export const useAccountByEmail = (email: string | null | undefined) => {
  return useQuery({
    queryKey: ["account", email],
    queryFn: async () => {
      if (!email) return null;
      const response = await api.get(`/accounts/email/${email}`);
      return response.data;
    },
    enabled: !!email,
  });
};

// Create account
export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAccountData) => {
      const response = await api.post("/accounts", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminAccounts"] });
    },
  });
};

// Update account
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, data }: { email: string; data: UpdateAccountData }) => {
      const response = await api.patch(`/accounts/${email}`, data);
      return response.data;
    },
    onSuccess: (_, { email }) => {
      queryClient.invalidateQueries({ queryKey: ["adminAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["account", email] });
    },
  });
};

// Delete account
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/accounts/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminAccounts"] });
    },
  });
};
