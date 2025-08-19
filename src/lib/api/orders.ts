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
    price: number;
    currency: string;
  }>;
  total: number;
  customerInfo?: {
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
}

export const getOrders = async (
  accountEmail?: string,
  status?: string
): Promise<Order[]> => {
  return api.get(`/orders`, {
    params: { accountEmail, status },
  });
};

export const getOrder = async (orderId: string): Promise<Order> => {
  return api.get(`/orders/${orderId}`);
};

export const createOrder = async (
  createOrderDto: CreateOrderDto
): Promise<Order> => {
  return api.post(`/orders`, createOrderDto);
};
