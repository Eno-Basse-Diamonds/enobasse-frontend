import { api } from "../utils/api";
import { Wishlist, WishlistItem } from "../types/wishlists";

export const getWishlist = async (
  accountEmail: string,
  currency: string,
): Promise<Wishlist> => {
  const response = await api.get<Wishlist>(`/wishlist`, {
    params: { accountEmail, currency },
  });

  if (response && Array.isArray(response.items)) {
    response.items = response.items.map((item: any) => ({
      ...item,
      isCustomDesign:
        item.isCustomDesign ?? item.productVariant?.product?.isCustomDesign,
    }));
  }

  return response;
};

export const addToWishlist = async (
  accountEmail: string,
  productVariantId: string | number,
  productSlug: string,
  productCategory?: string,
): Promise<WishlistItem> => {
  const response = await api.post<WishlistItem>(
    `/wishlist`,
    { productVariantId, productSlug, productCategory },
    { params: { accountEmail } },
  );

  const itemWithCustomDesign = {
    ...response,
    isCustomDesign:
      response.isCustomDesign ??
      (response.productVariant as any)?.product?.isCustomDesign,
  };

  return itemWithCustomDesign;
};

export const removeFromWishlist = async (
  accountEmail: string,
  productVariantId: string | number,
): Promise<void> => {
  return api.delete(`/wishlist/${productVariantId}`, {
    params: { accountEmail },
  });
};

export const clearWishlist = async (accountEmail: string): Promise<void> => {
  return api.delete(`/wishlist/clear`, { params: { accountEmail } });
};
