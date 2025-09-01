import { api } from "../utils/api";
import { CartItem } from "../types/carts";

export const getCart = async (
  accountEmail: string,
  currency: string = "USD",
): Promise<{ items: CartItem[] }> => {
  return api.get(`/cart`, { params: { accountEmail, currency }, cache: false });
};

export const addToCart = async (
  accountEmail: string,
  productVariantId: string | number,
  productSlug: string,
  productCategory: string,
  quantity: number,
  size?: number,
  engraving?: { text: string; fontStyle: string },
): Promise<CartItem> => {
  return api.post(
    `/cart`,
    {
      productVariantId,
      productSlug,
      quantity,
      size,
      engraving,
      productCategory,
    },
    { params: { accountEmail } },
  );
};

export const removeFromCart = async (
  accountEmail: string,
  productVariantId: string | number,
): Promise<void> => {
  return api.delete(`/cart/${productVariantId}`, { params: { accountEmail } });
};

export const updateCartItem = async (
  accountEmail: string,
  productVariantId: string | number,
  update: {
    quantity?: number;
    size?: number;
    engraving?: { text: string; fontStyle: string };
    note?: string;
  },
): Promise<CartItem> => {
  return api.patch(`/cart/${productVariantId}`, update, {
    params: { accountEmail },
  });
};

export const clearCart = async (accountEmail: string): Promise<void> => {
  return api.delete(`/cart/clear`, { params: { accountEmail } });
};
