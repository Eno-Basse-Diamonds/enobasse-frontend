import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../utils/api";
import {
  CreateAccountData,
  UpdateAccount,
  AccountsResponse,
  Account,
} from "../types/accounts";

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
      if (filters?.pageSize)
        params.append("pageSize", filters.pageSize.toString());
      if (filters?.search) params.append("search", filters.search);
      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
      if (filters?.isAdmin !== undefined)
        params.append("isAdmin", filters.isAdmin.toString());

      const response = await api.get<AccountsResponse>(
        `/accounts?${params.toString()}`,
      );
      return response;
    },
  });
};

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

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      data,
    }: {
      email: string;
      data: UpdateAccount;
    }) => {
      const response = await api.patch(`/accounts/${email}`, data);
      return response;
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
};

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
