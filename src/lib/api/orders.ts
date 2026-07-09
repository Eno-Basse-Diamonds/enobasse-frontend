import { api } from "../utils/api";
import { Order } from "../types/orders";

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

export const getOrder = async (orderId: string): Promise<Order> => {
  return api.get(`/orders/${orderId}`);
};

export const createOrder = async (
  createOrderDto: CreateOrderDto,
): Promise<Order> => {
  return api.post(`/orders`, createOrderDto);
};

export interface InitializePaystackResponse {
  order: Order;
  accessCode: string;
  reference: string;
}

/**
 * Creates the order AND initializes the Paystack transaction server-side —
 * the backend recomputes the real total from the product catalog and is the
 * one that tells Paystack what to charge, so the popup can't be tricked into
 * charging less than the order is actually worth.
 */
export const initializePaystackOrder = async (
  createOrderDto: CreateOrderDto,
): Promise<InitializePaystackResponse> => {
  return api.post(`/orders/paystack/initialize`, createOrderDto);
};

/**
 * Minimal, unauthenticated status check for post-payment polling — works for
 * guest checkouts too, unlike `getOrder` which requires a signed-in session.
 */
export const getOrderPaymentStatus = async (
  orderId: string,
): Promise<{ status: string; paymentStatus: string }> => {
  return api.get(`/orders/${orderId}/payment-status`, { cache: false });
};

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

export const updateOrder = async (
  id: string,
  data: Partial<Pick<Order, "status" | "billingAddress" | "customerInfo">>,
): Promise<Order> => {
  return api.patch(`/orders/${id}`, data);
};
