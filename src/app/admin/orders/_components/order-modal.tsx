"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components";
import { Order } from "@/lib/types/orders";
import { useUpdateOrder } from "@/lib/hooks/use-orders";
import { getCurrencySymbol } from "@/lib/utils/money";
import { X } from "lucide-react";

export function OrderModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const [status, setStatus] = useState(order.status);
  const [billing, setBilling] = useState(order.billingAddress);
  const [customer, setCustomer] = useState({
    email: order.customerInfo?.email || "",
    phone: order.customerInfo?.phone || "",
  });

  const updateMutation = useUpdateOrder();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(
      {
        id: order.id,
        data: { status, billingAddress: billing, customerInfo: customer },
      },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-4xl h-full flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-primary-500/10 bg-gray-50">
          <h3 className="text-2xl font-semibold text-primary-500">
            Order #{order.shortId}
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-full w-8 h-8"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-8">
            <section>
              <h4 className="text-lg font-semibold text-primary-500 mb-3">
                Items
              </h4>
              <div className="space-y-3">
                {order.items.map((it) => (
                  <div key={it.id} className="flex items-center gap-4 text-sm">
                    <div className="flex-shrink-0 w-16 h-16 relative border border-gray-200">
                      <Image
                        src={
                          it.productVariant?.images[0].url ||
                          "/placeholder-image.jpg"
                        }
                        alt={it.productVariant?.title || "Product image"}
                        fill
                        className="object-cover rounded-md"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="font-medium">
                        {it.productVariant?.title}
                      </div>
                      <div className="text-primary-300">
                        SKU: {it.productVariant?.sku || "-"}
                      </div>
                    </div>
                    <div className="w-24 text-right">x{it.quantity}</div>
                    <div className="w-28 text-right">
                      {getCurrencySymbol(it.productVariant?.currency)}
                      {Number(it.productVariant?.price || 0).toLocaleString()}
                    </div>
                    <div className="w-32 text-right font-semibold">
                      {getCurrencySymbol(it.productVariant?.currency)}
                      {Number(
                        (it.productVariant?.price || 0) * it.quantity
                      ).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-primary-500 mb-3">
                  Order Status
                </h4>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Order["status"])}
                  className="w-full p-2 border border-gray-300 capitalize"
                >
                  {[
                    "pending",
                    "confirmed",
                    "processing",
                    "shipped",
                    "delivered",
                    "cancelled",
                    "refunded",
                  ].map((s) => (
                    <option key={s} value={s} className="capitalize">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-primary-500 mb-3">
                  Customer Info
                </h4>
                <div className="space-y-3">
                  <input
                    type="email"
                    value={customer?.email}
                    onChange={(e) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300"
                  />
                  <input
                    type="tel"
                    value={customer?.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    placeholder="Phone"
                    className="w-full p-2 border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-primary-500 mb-3">
                  Billing Address
                </h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={billing.firstName}
                      onChange={(e) =>
                        setBilling({ ...billing, firstName: e.target.value })
                      }
                      placeholder="First name"
                      className="p-2 border border-gray-300"
                    />
                    <input
                      value={billing.lastName}
                      onChange={(e) =>
                        setBilling({ ...billing, lastName: e.target.value })
                      }
                      placeholder="Last name"
                      className="p-2 border border-gray-300"
                    />
                  </div>
                  <input
                    value={billing.street}
                    onChange={(e) =>
                      setBilling({ ...billing, street: e.target.value })
                    }
                    placeholder="Street"
                    className="w-full p-2 border border-gray-300"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      value={billing.city}
                      onChange={(e) =>
                        setBilling({ ...billing, city: e.target.value })
                      }
                      placeholder="City"
                      className="p-2 border border-gray-300"
                    />
                    <input
                      value={billing.state}
                      onChange={(e) =>
                        setBilling({ ...billing, state: e.target.value })
                      }
                      placeholder="State"
                      className="p-2 border border-gray-300"
                    />
                    <input
                      value={billing.postalCode}
                      onChange={(e) =>
                        setBilling({ ...billing, postalCode: e.target.value })
                      }
                      placeholder="Postal code"
                      className="p-2 border border-gray-300"
                    />
                  </div>
                  <input
                    value={billing.country}
                    onChange={(e) =>
                      setBilling({ ...billing, country: e.target.value })
                    }
                    placeholder="Country"
                    className="w-full p-2 border border-gray-300"
                  />
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-500">Currency</div>
                <div className="text-lg font-semibold text-primary-500">
                  {order.currency}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Order total</div>
                <div className="text-2xl font-semibold text-secondary-500">
                  {getCurrencySymbol(order.currency || "USD")}
                  {Number(order.total).toLocaleString()}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" loading={updateMutation.isPending}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}
