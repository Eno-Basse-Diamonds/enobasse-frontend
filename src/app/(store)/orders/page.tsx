"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ShoppingBagIcon } from "lucide-react";

import { useAccountStore } from "@/modules/account/store";
import { useOrdersStore } from "@/modules/orders/store";
import { Order } from "@/modules/orders/types";
import { EmptyState } from "@/shared/components/EmptyState";
import { OrderHistoryLoader } from "@/shared/components/loaders/Orders";
import { getCurrencySymbol } from "@/shared/utils/money";

export default function OrderHistoryPage() {
  const { data: session } = useSession();
  const { orders, loading: storeLoading, hydrateOrders, totalPages, total } = useOrdersStore();
  const { isHydrated } = useAccountStore();
  const accountEmail = session?.user?.email;
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    if (isHydrated) {
      hydrateOrders(accountEmail || undefined, currentPage, perPage);
    }
  }, [accountEmail, isHydrated, hydrateOrders, currentPage]);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isHydrated || storeLoading) {
    return <OrderHistoryLoader />;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBagIcon className="h-16 w-16" />}
        title="No orders yet"
        description="Your order history will appear here once you make a purchase"
        action={{ text: "Browse Products", href: "/products" }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const orderCurrency = order.currency || "USD";
        const currencySymbol = getCurrencySymbol(orderCurrency);

        return (
          <div key={order.id} className="max-w-4xl mx-auto p-4 md:p-6">
            {/* Order Header */}
            <div className="bg-gray-50 p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="grid grid-cols-2 md:flex md:flex-row md:items-center gap-4 md:gap-8 w-full">
                  <div>
                    <p className="text-gray-900 mb-1 font-medium text-sm md:text-base">Order ID</p>
                    <p className="font-medium text-gray-500 text-sm md:text-base">
                      #{order.shortId}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1 font-medium text-sm md:text-base">
                      Date placed
                    </p>
                    <p className="font-medium text-gray-500 text-sm md:text-base">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="col-span-2 md:col-auto">
                    <p className="text-gray-900 mb-1 font-medium text-sm md:text-base">
                      Total amount
                    </p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">
                      {currencySymbol}
                      {order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-6">
              {order.items.map((item, index) => {
                const itemPrice = item.productVariant.price;
                const itemCurrency = item.productVariant.currency;
                const itemCurrencySymbol = getCurrencySymbol(itemCurrency);

                return (
                  <div
                    key={`${item.id}-${index}`}
                    className={`${
                      index < order.items.length - 1 ? "border-b border-gray-200 pb-6" : "pb-2"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="shrink-0 relative w-32 h-32 md:w-40 md:h-40 overflow-hidden border border-gray-200 rounded-sm bg-gray-50 flex items-center justify-center">
                          {item.productVariant.images?.[0]?.url ? (
                            <Image
                              src={item.productVariant.images[0].url}
                              alt={item.productVariant.images[0].alt || "Product image"}
                              fill
                              className="size-full object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 24vw"
                            />
                          ) : (
                            <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div className="mb-4 md:mb-0 flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              {item.productVariant.title}
                            </h3>
                            <div className="text-gray-600 flex flex-row items-center gap-x-4">
                              <p>
                                <span className="text-gray-900">Quantity:</span> {item.quantity}
                              </p>
                              {item.size && (
                                <p>
                                  <span className="text-gray-900">Size:</span> {item.size}
                                </p>
                              )}
                              {item.engraving && (
                                <p>
                                  <span className="text-gray-900">Engraving:</span>{" "}
                                  {item.engraving.text}
                                </p>
                              )}
                            </div>
                            <div className="mt-4">
                              <Link
                                href={`/products/${item.productSlug}`}
                                className=" text-secondary-500 font-medium hover:text-secondary-400"
                              >
                                View Product
                              </Link>
                            </div>
                          </div>
                          <div className="text-left md:text-right mt-4 md:mt-0">
                            <p className="text-lg font-medium">
                              {itemCurrencySymbol}
                              {(itemPrice * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-600 text-nowrap">
                                {itemCurrencySymbol}
                                {itemPrice.toLocaleString()} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <BillingSummary order={order} />
          </div>
        );
      })}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border border-gray-100 bg-white px-4 py-3 sm:px-6 mt-8 max-w-4xl mx-auto rounded-sm shadow-sm">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{totalPages}</span> (
                <span className="font-medium">{total}</span> orders total)
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  &laquo;
                </button>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  const isCurrent = pageNumber === currentPage;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`relative inline-flex items-semibold px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                        isCurrent
                          ? "z-10 bg-[#502B3A] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#502B3A]"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  &raquo;
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const BillingSummary = ({ order }: { order: Order }) => {
  const currencySymbol = getCurrencySymbol(order.currency || "USD");

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0,
  );

  const shipping = "N/A";
  const tax = "N/A";

  return (
    <div className="max-w-4xl mx-auto bg-white border-t border-gray-200 mt-4 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Address Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Billing address</h3>
          <div className="text-gray-700 space-y-1">
            <p className="font-medium">
              {order.billingAddress.firstName} {order.billingAddress.lastName}
            </p>
            <p>{order.billingAddress.street}</p>
            <p>
              {order.billingAddress.city}, {order.billingAddress.state}
            </p>
            <p>
              {order.billingAddress.postalCode}, {order.billingAddress.country}
            </p>
          </div>
        </div>

        {/* Payment Information Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment information</h3>
          <div className="flex items-center space-x-3">
            <p className="text-gray-700">Bank Transfer</p>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">
              {currencySymbol}
              {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900 font-medium">{shipping.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900 font-medium">{tax.toLocaleString()}</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Order total</span>
              <span className="text-xl font-semibold text-secondary-500">
                {currencySymbol}
                {order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
