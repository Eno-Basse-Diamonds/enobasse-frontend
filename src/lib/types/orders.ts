import { ProductVariant } from "./products";

export interface OrderItem {
  id: string;
  productVariantId: string;
  productVariant: ProductVariant;
  quantity: number;
  price: number;
  originalPrice?: number;
  currency: string;
  productSlug: string;
  productCategory: string;
  size?: number;
  engraving?: { text: string; fontStyle: string };
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  shortId?: string;
  items: OrderItem[];
  total: number;
  billingAddress: BillingAddress;
  accountEmail?: string;
  currency?: string;
  originalPrices?: any;
  customerInfo?: {
    email: string;
    phone: string;
  };
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  createdAt: Date;
}
