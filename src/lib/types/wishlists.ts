import { ProductVariant } from "./products";

export interface Wishlist {
  id: string;
  accountId: string;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  addedAt: string;
  productSlug: string;
  productVariant: ProductVariant;
}
