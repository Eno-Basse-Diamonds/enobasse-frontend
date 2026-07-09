"use client";

import { useState } from "react";
import Image from "next/image";

import { Order } from "@/lib/types/orders";
import { useUpdateOrder } from "@/lib/hooks/use-orders";
import { getCurrencySymbol } from "@/lib/utils/money";
import { Button } from "@/components/button";
import { PaymentStatusBadge } from "@/components/badge/payment-status-badge";
import { AdminModal } from "../../products/_components/_elements/admin-modal";

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
    name: order.customerInfo?.name || "",
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

  const ORDER_STATUSES = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
  ] as const;

  return (
    <AdminModal
      title={
        <div className="flex items-center gap-3">
          <span>Order #{order.shortId}</span>
          <PaymentStatusBadge paymentStatus={order.paymentStatus} />
        </div>
      }
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" onClick={handleSubmit as any} loading={updateMutation.isPending}>
            Save Changes
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Items */}
        <section>
          <h4 className="text-base font-semibold text-primary-500 mb-3">
            Items
          </h4>
          <div className="divide-y divide-gray-100 border border-gray-200">
            {order.items.map((it) => (
              <div key={it.id} className="flex items-center gap-4 p-3 text-sm">
                <div className="w-14 h-14 relative border border-gray-200 shrink-0">
                  <Image
                    src={
                      it.productVariant?.images?.[0]?.url ||
                      "/placeholder-image.jpg"
                    }
                    alt={it.productVariant?.title || "Product image"}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {it.productVariant?.title}
                  </div>
                  <div className="text-gray-500 text-xs">
                    SKU: {it.productVariant?.sku || "-"} &middot; x{it.quantity}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold">
                    {getCurrencySymbol(it.productVariant?.currency)}
                    {Number(
                      (it.productVariant?.price || 0) * it.quantity
                    ).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getCurrencySymbol(it.productVariant?.currency)}
                    {Number(it.productVariant?.price || 0).toLocaleString()} each
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-3 text-sm">
            <span className="text-gray-500">{order.currency}</span>
            <div className="text-right">
              <span className="text-gray-500 mr-2">Total</span>
              <span className="text-xl font-semibold text-secondary-500">
                {getCurrencySymbol(order.currency || "USD")}
                {Number(order.total).toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* Edit fields */}
        <div className="grid sm:grid-cols-3 gap-6">
          <section>
            <h4 className="text-base font-semibold text-primary-500 mb-3">
              Order Status
            </h4>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Order["status"])}
              className="w-full p-2 border border-gray-300 text-sm capitalize focus:outline-none focus:ring-1 focus:ring-primary-300"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </select>
          </section>

          <section>
            <h4 className="text-base font-semibold text-primary-500 mb-3">
              Customer Info
            </h4>
            <div className="space-y-2">
              <input
                type="text"
                value={customer?.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                placeholder="Name"
                className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
              />
              <input
                type="email"
                value={customer?.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                placeholder="Email"
                className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
              />
              <input
                type="tel"
                value={customer?.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                placeholder="Phone"
                className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
              />
            </div>
          </section>

          <section>
            <h4 className="text-base font-semibold text-primary-500 mb-3">
              Billing Address
            </h4>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={billing.firstName}
                  onChange={(e) =>
                    setBilling({ ...billing, firstName: e.target.value })
                  }
                  placeholder="First name"
                  className="p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
                />
                <input
                  value={billing.lastName}
                  onChange={(e) =>
                    setBilling({ ...billing, lastName: e.target.value })
                  }
                  placeholder="Last name"
                  className="p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
                />
              </div>
              <input
                value={billing.street}
                onChange={(e) =>
                  setBilling({ ...billing, street: e.target.value })
                }
                placeholder="Street"
                className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  value={billing.city}
                  onChange={(e) =>
                    setBilling({ ...billing, city: e.target.value })
                  }
                  placeholder="City"
                  className="p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
                />
                <input
                  value={billing.state}
                  onChange={(e) =>
                    setBilling({ ...billing, state: e.target.value })
                  }
                  placeholder="State"
                  className="p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
                />
                <input
                  value={billing.postalCode}
                  onChange={(e) =>
                    setBilling({ ...billing, postalCode: e.target.value })
                  }
                  placeholder="Postal code"
                  className="p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
                />
              </div>
              <input
                value={billing.country}
                onChange={(e) =>
                  setBilling({ ...billing, country: e.target.value })
                }
                placeholder="Country"
                className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
              />
            </div>
          </section>
        </div>
      </form>
    </AdminModal>
  );
}