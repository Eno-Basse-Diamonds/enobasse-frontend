import { api } from "@/shared/utils/api";

import { Order } from "./types";

interface CreateOrderDto {
  accountEmail?: string;
  items: Array<{
    productVariant: any;
    productSlug: string;
    productCategory?: string;
    quantity: number;
    size?: number;
    engraving?: { text: string; fontStyle: string };
    amoraOptions?: { selectedLetters: string[]; includeChain: boolean; calculatedPrice: number };
  }>;
  total: number;
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  currency?: string;
  paymentMethod?: "paystack" | "bank_transfer";
  /** paymentStatus intentionally excluded — backend always creates orders as PENDING */
  paymentReference?: string;
}

export interface AdminOrdersResponse {
  orders: Order[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export interface PaginatedOrdersResponse {
  orders: Order[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
}

/**
 * Fetches orders for an account.
 *
 * @description Fetches paginated orders for a given account.
 * @param accountEmail - Optional account email to filter by
 * @param page - Page number
 * @param perPage - Orders per page
 * @param status - Optional order status filter
 * @returns Paginated orders response
 */
export const getOrders = async (
  accountEmail?: string,
  page?: number,
  perPage?: number,
  status?: string,
): Promise<PaginatedOrdersResponse> => {
  return api.get(`/orders`, {
    params: { accountEmail, page, perPage, status },
  });
};

/**
 * Fetches an order by ID.
 *
 * @description Fetches a single order by its ID.
 * @param orderId - The order ID
 * @returns The order
 */
export const getOrder = async (orderId: string): Promise<Order> => {
  return api.get(`/orders/${orderId}`);
};

/**
 * Creates an order.
 *
 * @description Creates a new order.
 * @param createOrderDto - The order creation data
 * @returns The created order
 */
export const createOrder = async (createOrderDto: CreateOrderDto): Promise<Order> => {
  return api.post(`/orders`, createOrderDto);
};

export interface InitializePaystackResponse {
  order: Order;
  accessCode: string;
  reference: string;
}

/**
 * Creates an order and initialises Paystack transaction.
 *
 * @description Creates the order and initialises the Paystack transaction
 * server-side. The backend recomputes the real total from the product catalog
 * and is the one that tells Paystack what to charge, so the popup can't be
 * tricked into charging less than the order is actually worth.
 * @param createOrderDto - The order creation data
 * @returns The order with Paystack access code and reference
 */
export const initializePaystackOrder = async (
  createOrderDto: CreateOrderDto,
): Promise<InitializePaystackResponse> => {
  return api.post(`/orders/paystack/initialize`, createOrderDto);
};

/**
 * Checks order payment status.
 *
 * @description Minimal, unauthenticated status check for post-payment polling.
 * Works for guest checkouts too, unlike `getOrder` which requires a signed-in
 * session.
 * @param orderId - The order ID
 * @returns The order status and payment status
 */
export const getOrderPaymentStatus = async (
  orderId: string,
): Promise<{ status: string; paymentStatus: string }> => {
  return api.get(`/orders/${orderId}/payment-status`, { cache: false });
};

/**
 * Fetches orders for admin.
 *
 * @description Fetches paginated orders for the admin panel.
 * @param params - Filter, pagination, and sort parameters
 * @returns Paginated admin orders response
 */
export const getAdminOrders = async (params: {
  page?: number;
  perPage?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}): Promise<AdminOrdersResponse> => {
  return api.get(`/orders/admin`, { cache: false, params });
};

/**
 * Updates an order.
 *
 * @description Updates an order's status, billing address or customer info.
 * @param id - The order ID
 * @param data - The fields to update
 * @returns The updated order
 */
export const updateOrder = async (
  id: string,
  data: Partial<Pick<Order, "status" | "billingAddress" | "customerInfo">>,
): Promise<Order> => {
  return api.patch(`/orders/${id}`, data);
};
