import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AdminOrdersResponse, getAdminOrders, updateOrder } from "./api";
import { Order } from "./types";

/**
 * Fetches orders for admin.
 *
 * @description React Query hook to fetch paginated orders for the admin panel.
 * @param params - Filter and pagination parameters
 * @returns Query result with paginated admin orders
 */
export const useAdminOrders = (params: {
  page?: number;
  perPage?: number;
  status?: string;
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "total";
  sortOrder?: "ASC" | "DESC";
}) => {
  return useQuery<AdminOrdersResponse, Error>({
    queryKey: [
      "adminOrders",
      {
        page: params.page,
        perPage: params.perPage,
        status: params.status,
        search: params.search,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      },
    ],
    queryFn: () => getAdminOrders(params),
    staleTime: 30_000,
  });
};

/**
 * Updates an order.
 *
 * @description React Query mutation hook to update an order.
 * @returns Mutation result for order update
 */
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Order,
    Error,
    {
      id: string;
      data: Partial<Pick<Order, "status" | "billingAddress" | "customerInfo">>;
    }
  >({
    mutationFn: ({ id, data }) => updateOrder(id, data),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      queryClient.invalidateQueries({ queryKey: ["order", order.id] });
    },
  });
};
