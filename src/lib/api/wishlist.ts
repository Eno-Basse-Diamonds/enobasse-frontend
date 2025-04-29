import { wishlistItems, WishlistItem } from "../data/wishlist-items";

export const getWishlistItems = async (): Promise<WishlistItem[]> => {
  return wishlistItems;
};
