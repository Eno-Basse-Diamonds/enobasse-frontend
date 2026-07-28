import { Wishlist, WishlistItem } from "@/modules/wishlist/types";
import { api } from "@/shared/utils/api";

/**
 * Fetches the wishlist.
 *
 * @description Fetches the wishlist for a given account email and currency.
 * @param accountEmail - The account email address
 * @param currency - The currency code
 * @returns The wishlist with items
 */
export const getWishlist = async (accountEmail: string, currency: string): Promise<Wishlist> => {
  const response = await api.get<Wishlist>(`/wishlist`, {
    params: { accountEmail, currency },
  });

  if (response && Array.isArray(response.items)) {
    response.items = response.items.map((item: any) => ({
      ...item,
      isCustomDesign: item.isCustomDesign ?? item.productVariant?.product?.isCustomDesign,
    }));
  }

  return response;
};

/**
 * Adds an item to the wishlist.
 *
 * @description Adds a product variant to the wishlist.
 * @param accountEmail - The account email address
 * @param productVariantId - The product variant ID
 * @param productSlug - The product slug
 * @param productCategory - Optional product category
 * @returns The created wishlist item
 */
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
      response.isCustomDesign ?? (response.productVariant as any)?.product?.isCustomDesign,
  };

  return itemWithCustomDesign;
};

/**
 * Removes an item from the wishlist.
 *
 * @description Removes a product variant from the wishlist.
 * @param accountEmail - The account email address
 * @param productVariantId - The product variant ID to remove
 */
export const removeFromWishlist = async (
  accountEmail: string,
  productVariantId: string | number,
): Promise<void> => {
  return api.delete(`/wishlist/${productVariantId}`, {
    params: { accountEmail },
  });
};

/**
 * Clears the wishlist.
 *
 * @description Removes all items from the wishlist.
 * @param accountEmail - The account email address
 */
export const clearWishlist = async (accountEmail: string): Promise<void> => {
  return api.delete(`/wishlist/clear`, { params: { accountEmail } });
};
