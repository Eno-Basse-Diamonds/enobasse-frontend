"use client";

import {
  Package,
  Users,
  ShoppingCart,
  FileText,
  Folder,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useDashboardStats } from "@/lib/hooks/use-dashboard";
import { AdminHeader } from "../_components/admin-header";
import { StatsCard } from "./_components/stats-card";
import { QuickActionsSection } from "./_components/quick-actions-section";
import { RecentOrdersSection } from "./_components/recent-orders";
import { RecentReviewsSection } from "./_components/recent-reviews-section";
import { DashboardSkeleton } from "@/components/loaders/dashboard";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const { data: stats, isLoading, error } = useDashboardStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader
          title="Dashboard"
          admin={{
            name: session?.user?.name || "Admin User",
            email: session?.user?.email || "admin@example.com",
          }}
        />
        <DashboardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader
          title="Dashboard"
          admin={{
            name: session?.user?.name || "Admin User",
            email: session?.user?.email || "admin@example.com",
          }}
        />
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 p-4">
            <p className="text-red-800">
              Error loading dashboard: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Dashboard"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            icon={<ShoppingCart className="h-6 w-6 text-blue-600" />}
            bgColor="bg-blue-100"
          />

          <StatsCard
            title="Total Products"
            value={stats?.totalProducts || 0}
            icon={<Package className="h-6 w-6 text-purple-600" />}
            bgColor="bg-purple-100"
          />

          <StatsCard
            title="Cart Items"
            value={stats?.cartItems || 0}
            icon={<ShoppingBag className="h-6 w-6 text-orange-600" />}
            bgColor="bg-orange-100"
          />

          <StatsCard
            title="Wishlist Items"
            value={stats?.wishlistItems || 0}
            icon={<Heart className="h-6 w-6 text-pink-600" />}
            bgColor="bg-pink-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Customers"
            value={stats?.totalCustomers || 0}
            icon={<Users className="h-6 w-6 text-pink-600" />}
            bgColor="bg-pink-100"
            compact
          />

          <StatsCard
            title="Collections"
            value={stats?.collections || 0}
            icon={<Folder className="h-6 w-6 text-indigo-600" />}
            bgColor="bg-indigo-100"
            compact
          />

          <StatsCard
            title="Blog Posts"
            value={stats?.blogPosts || 0}
            icon={<FileText className="h-6 w-6 text-green-600" />}
            bgColor="bg-green-100"
            compact
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentOrdersSection
            orders={stats?.recentOrders || []}
            getStatusColor={getStatusColor}
            formatCurrency={formatCurrency}
          />

          <RecentReviewsSection reviews={stats?.recentReviews || []} />
        </div>

        <QuickActionsSection />
      </div>
    </div>
  );
}
