import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AdminOrdersResponse,
  getAdminOrders,
  updateOrder,
} from "../api/orders";
import { Order } from "../types/orders";

export const useAdminOrders = (params: {
  page?: number;
  perPage?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery<AdminOrdersResponse, Error>({
    queryKey: [
      "adminOrders",
      {
        page: params.page,
        perPage: params.perPage,
        status: params.status,
        search: params.search,
      },
    ],
    queryFn: () => getAdminOrders(params),
    staleTime: 30_000,
  });
};

export const useUpdateOrder = () => {
  const qc = useQueryClient();
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
      qc.invalidateQueries({ queryKey: ["adminOrders"] });
      qc.invalidateQueries({ queryKey: ["order", order.id] });
    },
  });
};
