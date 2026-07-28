import { API_URL } from "@/shared/constants/url";
import { api } from "@/shared/utils/api";

import { CartItem } from "./types";

/**
 * Fetches the cart.
 *
 * @description Fetches the cart for a given account email and currency.
 * @param accountEmail - The account email address
 * @param currency - Currency code (default "USD")
 * @returns The cart items
 */
export const getCart = async (
  accountEmail: string,
  currency: string = "USD",
): Promise<{ items: CartItem[] }> => {
  return api.get(`/cart`, { params: { accountEmail, currency }, cache: false });
};

/**
 * Sends abandoned cart reminders.
 *
 * @description Triggers abandoned cart reminder emails.
 * @returns The count of reminders sent
 */
export const sendAbandonedCartReminders = async () => {
  try {
    const apiUrl = `${API_URL}/cart/abandoned/remind`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.count;
  } catch (error) {
    throw error;
  }
};

/**
 * Adds an item to the cart.
 *
 * @description Adds a product variant to the cart.
 * @param accountEmail - The account email address
 * @param productVariantId - The product variant ID
 * @param productSlug - The product slug
 * @param productCategory - The product category
 * @param quantity - The quantity to add
 * @param size - Optional ring size
 * @param engraving - Optional engraving details
 * @param amoraOptions - Optional Amora charm options
 * @returns The created cart item
 */
export const addToCart = async (
  accountEmail: string,
  productVariantId: string | number,
  productSlug: string,
  productCategory: string,
  quantity: number,
  size?: number,
  engraving?: { text: string; fontStyle: string },
  amoraOptions?: {
    selectedLetters: string[];
    includeChain: boolean;
    calculatedPrice: number;
  },
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
      amoraOptions,
    },
    { params: { accountEmail } },
  );
};

/**
 * Removes an item from the cart.
 *
 * @description Removes a product variant from the cart.
 * @param accountEmail - The account email address
 * @param productVariantId - The product variant ID to remove
 */
export const removeFromCart = async (
  accountEmail: string,
  productVariantId: string | number,
): Promise<void> => {
  return api.delete(`/cart/${productVariantId}`, { params: { accountEmail } });
};

/**
 * Updates a cart item.
 *
 * @description Updates quantity, size, engraving or note of a cart item.
 * @param accountEmail - The account email address
 * @param productVariantId - The product variant ID to update
 * @param update - The fields to update
 * @param update.quantity - New quantity
 * @param update.size - New ring size
 * @param update.engraving - New engraving details
 * @param update.note - New note
 * @returns The updated cart item
 */
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

/**
 * Clears the cart.
 *
 * @description Removes all items from the cart.
 * @param accountEmail - The account email address
 */
export const clearCart = async (accountEmail: string): Promise<void> => {
  return api.delete(`/cart/clear`, { params: { accountEmail } });
};
