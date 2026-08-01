"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { Heart, User } from "lucide-react";

import { AdminHeader } from "@/app/(others)/admin/_components/AdminHeader";
import { useDashboardWishlists } from "@/modules/admin/hooks";
import { EmptyState } from "@/shared/components/EmptyState";

const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AdminWishlistsPage() {
  const { data: session } = useSession();
  const { data: wishlists, isLoading, error } = useDashboardWishlists();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Wishlists"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900">
            Customer Wishlists ({wishlists?.length || 0})
          </h3>
          <p className="text-sm text-gray-500">
            Wishlist items belonging to signed-in users
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 p-4">
            <p className="text-red-800">Error loading wishlists: {error.message}</p>
          </div>
        ) : isLoading ? (
          <div className="bg-white border border-primary-500/10 p-6 rounded-sm">
            <div className="animate-pulse space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100" />
              ))}
            </div>
          </div>
        ) : wishlists && wishlists.length > 0 ? (
          <div className="space-y-6">
            {wishlists.map((wishlist) => (
              <div key={wishlist.id} className="bg-white border border-primary-500/10 rounded-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-full bg-primary-500 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {wishlist.account.name}
                      </div>
                      <div className="text-sm text-gray-500">{wishlist.account.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="inline-flex items-center px-2 py-1 bg-pink-50 text-pink-700 font-medium">
                      <Heart className="w-3.5 h-3.5 mr-1" />
                      {wishlist.itemCount} {wishlist.itemCount === 1 ? "item" : "items"}
                    </span>
                    <span>Last updated {formatDate(wishlist.updatedAt)}</span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {wishlist.items.length === 0 ? (
                    <div className="px-6 py-6 text-sm text-gray-500">No items in this wishlist.</div>
                  ) : (
                    wishlist.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4 px-6 py-4">
                        <div className="flex-shrink-0 h-16 w-16 bg-gray-100 overflow-hidden">
                          {item.productVariant.images?.[0]?.url ? (
                            <Image
                              src={item.productVariant.images[0].url}
                              alt={item.productVariant.images[0].alt || item.productVariant.title}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.productVariant.product.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {item.productVariant.title}
                              </p>
                              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                                <span>SKU: {item.productVariant.sku}</span>
                                <span>Category: {item.productCategory || "-"}</span>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(item.productVariant.price, item.productVariant.currency)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Wishlists Found"
            description="Wishlists belonging to signed-in users will appear here."
            icon={<Heart className="w-16 h-16 text-gray-400" />}
          />
        )}
      </div>
    </div>
  );
}
