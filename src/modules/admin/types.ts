export interface BillingAddress {
  firstName?: string;
  lastName?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
  phone?: string;
  preferredCurrency?: string;
  billingAddress?: BillingAddress;
  isVerified?: boolean;
  isAdmin?: boolean;
  memberSince?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountData {
  name: string;
  email: string;
  password: string;
  role?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  preferredCurrency?: string;
  billingAddress?: BillingAddress;
}

export interface UpdateAccount {
  name?: string;
  email?: string;
  phone?: string;
  preferredCurrency?: string;
  billingAddress?: BillingAddress;
  password?: string;
}

export interface AccountsResponse {
  accounts: Account[];
  total: number;
  totalPages: number;
  meta: {
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

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
