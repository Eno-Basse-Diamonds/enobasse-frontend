import { ProductVariant } from "./products";

export interface CartItem {
  id: string;
  productSlug: string;
  productCategory: string;
  productVariant: ProductVariant;
  quantity: number;
  size?: number;
  engraving?: { text: string; fontStyle: string };
  note?: string;
  addedAt: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}
