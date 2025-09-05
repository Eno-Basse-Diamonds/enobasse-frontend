export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  cartItems: number;
  wishlistItems: number;
  blogPosts: number;
  collections: number;
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

export interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
