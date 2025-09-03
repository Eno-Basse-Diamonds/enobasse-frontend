"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useOrdersStore } from "@/lib/store/orders";
import { PageHeading, EmptyState } from "@/components";
import { OrderHistoryLoader } from "@/components/loaders";
import { getCurrencySymbol } from "@/lib/utils/money";
import { ShoppingBagIcon } from "lucide-react";
import { useAccountStore } from "@/lib/store/account";
import { Order } from "@/lib/types/orders";

export default function OrderHistoryPage() {
  const { data: session } = useSession();
  const { orders, loading, getOrdersByAccountEmail } = useOrdersStore();
  const { isHydrated } = useAccountStore();
  const accountEmail = session?.user?.email;

  useEffect(() => {
    if (accountEmail) {
      getOrdersByAccountEmail(accountEmail);
    }
  }, [accountEmail, getOrdersByAccountEmail]);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isHydrated || loading) {
    return (
      <div className="my-6 md:my-12">
        <div className="-mb-6 md:mb-auto">
          <PageHeading title="Order History" />
        </div>
        <OrderHistoryLoader />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="my-6 md:my-12 min-h-screen">
        <div className="-mb-6 md:mb-auto">
          <PageHeading title="Order History" />
        </div>
        <EmptyState
          icon={<ShoppingBagIcon className="h-16 w-16" />}
          title="No orders yet"
          description="Your order history will appear here once you make a purchase"
          action={{ text: "Browse Products", href: "/products" }}
        />
      </div>
    );
  }

  return (
    <div className="my-6 md:my-12 min-h-screen">
      <div className="-mb-6 md:mb-auto">
        <PageHeading title="Order History" />
      </div>
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
                      <p className="text-gray-900 mb-1 font-medium text-sm md:text-base">
                        Order ID
                      </p>
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
                        index < order.items.length - 1
                          ? "border-b border-gray-200 pb-6"
                          : "pb-2"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="shrink-0 relative w-32 h-32 md:w-40 md:h-40 overflow-hidden border border-gray-200">
                            <Image
                              src={item.productVariant.images[0].url}
                              alt={item.productVariant.images[0].alt}
                              fill
                              className="size-full object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 24vw"
                            />
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
                                  <span className="text-gray-900">
                                    Quantity:
                                  </span>{" "}
                                  {item.quantity}
                                </p>
                                {item.size && (
                                  <p>
                                    <span className="text-gray-900">Size:</span>{" "}
                                    {item.size}
                                  </p>
                                )}
                                {item.engraving && (
                                  <p>
                                    <span className="text-gray-900">
                                      Engraving:
                                    </span>{" "}
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
      </div>
    </div>
  );
}

const BillingSummary = ({ order }: { order: Order }) => {
  const currencySymbol = getCurrencySymbol(order.currency || "USD");

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0
  );

  const shipping = "N/A";
  const tax = "N/A";
  console.log(order)

  return (
    <div className="max-w-4xl mx-auto bg-white border-t border-gray-200 mt-4 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Address Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Billing address
          </h3>
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Payment information
          </h3>
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
            <span className="text-gray-900 font-medium">
              {shipping.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900 font-medium">
              {tax.toLocaleString()}
            </span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">
                Order total
              </span>
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
