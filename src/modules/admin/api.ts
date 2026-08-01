import { ApiError, api } from "@/shared/utils/api";

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  cartItems: number;
  wishlistItems: number;
  collections: number;
  blogPosts: number;
  recentOrders: RecentOrder[];
  recentReviews: RecentReview[];
}

export interface RecentOrder {
  id: string;
  shortId: string;
  customerInfo: {
    name: string;
    email: string;
  };
  total: number;
  currency: string;
  status: string;
  createdAt: string;
}

export interface RecentReview {
  id: string;
  product: {
    id: string;
    name: string;
    sku: string;
    images?: Array<{ url: string; alt: string }>;
  };
  rating: number;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface DashboardCartItem {
  id: string;
  productSlug: string;
  productCategory?: string;
  quantity: number;
  size?: number;
  engraving?: { text: string; fontStyle: string };
  addedAt: string;
  productVariant: {
    id: string;
    sku: string;
    title: string;
    price: number;
    currency: string;
    images?: Array<{ url: string; alt: string }>;
    product: {
      id: string;
      name: string;
      sku: string;
      slug: string;
    };
  };
}

export interface DashboardCart {
  id: string;
  account: {
    id: string;
    name: string;
    email: string;
  };
  items: DashboardCartItem[];
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardWishlistItem {
  id: string;
  productSlug: string;
  productCategory?: string;
  addedAt: string;
  productVariant: {
    id: string;
    sku: string;
    title: string;
    price: number;
    currency: string;
    images?: Array<{ url: string; alt: string }>;
    product: {
      id: string;
      name: string;
      sku: string;
      slug: string;
    };
  };
}

export interface DashboardWishlist {
  id: string;
  account: {
    id: string;
    name: string;
    email: string;
  };
  items: DashboardWishlistItem[];
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetches dashboard statistics.
 *
 * @description Fetches dashboard statistics for the admin panel.
 * @returns Dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    return await api.get("/dashboard/stats");
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch dashboard statistics");
  }
}

/**
 * Fetches all customer carts with their items.
 *
 * @description Fetches every cart belonging to a registered account,
 * including the customer details and the products in each cart.
 * @returns An array of carts with account and item details
 */
export async function getDashboardCarts(): Promise<DashboardCart[]> {
  try {
    return await api.get("/dashboard/carts");
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch carts");
  }
}

/**
 * Fetches all customer wishlists with their items.
 *
 * @description Fetches every wishlist belonging to a registered account,
 * including the customer details and the products in each wishlist.
 * @returns An array of wishlists with account and item details
 */
export async function getDashboardWishlists(): Promise<DashboardWishlist[]> {
  try {
    return await api.get("/dashboard/wishlists");
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch wishlists");
  }
}
