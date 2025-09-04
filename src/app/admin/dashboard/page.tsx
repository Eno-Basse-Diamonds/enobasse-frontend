"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Truck,
  Star,
  MessageSquare,
  FileText,
  Folder,
  Heart,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { AdminHeader } from "../_components/admin-header";
import Link from "next/link";

const mockStats = {
  totalProducts: 156,
  totalOrders: 1247,
  totalCustomers: 892,
  cartItems: 342,
  wishlistItems: 189,
  recentOrders: [
    { id: "ORD-001", customer: "John Doe", amount: 299.99, status: "pending" },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      amount: 149.5,
      status: "confirmed",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      amount: 599.0,
      status: "shipped",
    },
    {
      id: "ORD-004",
      customer: "Sarah Wilson",
      amount: 89.99,
      status: "delivered",
    },
  ],
  recentReviews: [
    {
      product: "Diamond Ring",
      rating: 5,
      customer: "Alice Brown",
      comment: "Absolutely beautiful!",
    },
    {
      product: "Gold Necklace",
      rating: 4,
      customer: "Bob Davis",
      comment: "Great quality, fast shipping.",
    },
    {
      product: "Silver Bracelet",
      rating: 5,
      customer: "Carol White",
      comment: "Perfect gift for my wife.",
    },
    {
      product: "Pearl Earrings",
      rating: 4,
      customer: "David Miller",
      comment: "Lovely design, will buy again.",
    },
  ],
  blogPosts: 24,
  collections: 8,
};

const mockAdmin = {
  name: "Admin User",
  email: "admin@enobasse.com",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Dashboard" admin={mockAdmin} />

      <div className="p-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">500</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cart Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.cartItems}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Wishlist Items
                </p>
                <p className="text-2xl font-bold text-gray-900">300</p>
              </div>
              <div className="h-12 w-12 bg-pink-100 flex items-center justify-center">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Customers
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.totalCustomers}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-pink-600" />
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collections</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.collections}
                </p>
              </div>
              <Folder className="h-8 w-8 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.blogPosts}
                </p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white shadow-sm border border-gray-200 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h3>
              <span className="text-sm text-gray-500">
                Total: {stats.totalOrders.toLocaleString()}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="space-y-4 flex-grow">
                {stats.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(order.amount)}
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href="/admin/orders"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-x-2"
                >
                  <span>View all orders</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Reviews
              </h3>
              <span className="text-sm text-gray-500">
                Total: {stats.recentReviews.length.toLocaleString()}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="space-y-4 flex-grow">
                {stats.recentReviews.map((review, index) => (
                  <div
                    key={index}
                    className="py-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <p className="font-medium text-gray-900 mr-2">
                            {review.product}
                          </p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          "{review.comment}"
                        </p>
                        <p className="text-xs text-gray-500">
                          by {review.customer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href="/admin/reviews"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-x-2"
                >
                  <span>View all reviews</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/products"
              className="bg-white shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <Package className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Add Product</p>
                  <p className="text-sm text-gray-600">Create new product</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/collections"
              className="bg-white shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <Folder className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">New Collection</p>
                  <p className="text-sm text-gray-600">Create collection</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/blog"
              className="bg-white shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Write Post</p>
                  <p className="text-sm text-gray-600">Create blog post</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="bg-white shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">View Orders</p>
                  <p className="text-sm text-gray-600">Manage orders</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
