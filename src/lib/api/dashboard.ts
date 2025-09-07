import { api, ApiError } from "../utils/api";

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
