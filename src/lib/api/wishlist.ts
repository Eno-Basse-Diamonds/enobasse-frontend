import { api } from "../utils/api";
import { Wishlist, WishlistItem } from "../types/wishlists";

export const getWishlist = async (accountEmail: string, currency: string): Promise<Wishlist> => {
  return api.get(`/wishlist`, { params: { accountEmail, currency } });
};

export const addToWishlist = async (
  accountEmail: string,
  productVariantId: string | number,
  productSlug: string,
  productCategory?: string
): Promise<WishlistItem> => {
  return api.post(
    `/wishlist`,
    { productVariantId, productSlug, productCategory },
    { params: { accountEmail } }
  );
};

export const removeFromWishlist = async (
  accountEmail: string,
  productVariantId: string | number
): Promise<void> => {
  return api.delete(`/wishlist/${productVariantId}`, {
    params: { accountEmail },
  });
};

export const clearWishlist = async (accountEmail: string): Promise<void> => {
  return api.delete(`/wishlist/clear`, { params: { accountEmail } });
};
