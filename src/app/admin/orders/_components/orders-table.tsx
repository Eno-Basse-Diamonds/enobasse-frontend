import Image from "next/image";
import { Button } from "@/components";
import { Order } from "@/lib/types/orders";
import { getCurrencySymbol } from "@/lib/utils/money";

export function OrdersTable({
  orders,
  loading,
  onView,
}: {
  orders: Order[];
  loading?: boolean;
  onView: (order: Order) => void;
}) {
  if (loading) {
    return (
      <div className="bg-white border border-primary-500/10 p-6">
        <div className="animate-pulse space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white border border-primary-500/10 p-6 text-center text-primary-300">
        No orders found.
      </div>
    );
  }

  return (
    <div className="bg-white border border-primary-500/10 relative overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <Th>Order</Th>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th>Total</Th>
            <Th>Status</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {orders.map((order) => (
            <tr key={order.id} className="align-top">
              <Td>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">
                    #{order.shortId}
                  </div>
                  <div className="text-xs text-gray-500">
                    {/* Use a consistent date format to avoid hydration mismatch */}
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              </Td>
              <Td>
                <div className="text-sm text-gray-900">
                  {order.billingAddress.firstName}{" "}
                  {order.billingAddress.lastName}
                </div>
                <div className="text-xs text-gray-500">
                  {order.customerInfo?.email}
                </div>
              </Td>
              <Td>
                <div className="space-y-3 max-w-md">
                  {order.items.map((it, idx) => (
                    <div
                      key={`${it.id}-${idx}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative w-12 h-12 border border-gray-200 flex-shrink-0 overflow-hidden">
                        {it.productVariant?.images?.[0]?.url ? (
                          <Image
                            src={it.productVariant.images[0].url}
                            alt={
                              it.productVariant.images[0].alt ||
                              it.productVariant.title
                            }
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {it.productVariant?.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          SKU: {it.productVariant?.sku || "-"}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {getCurrencySymbol(it.productVariant?.currency)}
                          {Number(
                            it.productVariant?.price || 0
                          ).toLocaleString()}{" "}
                          × {it.quantity} =
                          <span className="font-medium ml-1">
                            {getCurrencySymbol(it.productVariant?.currency)}
                            {Number(
                              (it.productVariant?.price || 0) * it.quantity
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Td>
              <Td>
                <div className="text-sm font-semibold text-gray-900">
                  {getCurrencySymbol(order.currency || "USD")}
                  {Number(order.total).toLocaleString()}
                </div>
              </Td>
              <Td>
                <span className="text-xs px-2 py-1 border capitalize">
                  {order.status}
                </span>
              </Td>
              <Td>
                <Button
                  className="text-nowrap"
                  size="sm"
                  onClick={() => onView(order)}
                >
                  View Order
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  if (children) {
    return (
      <th
        scope="col"
        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {children}
      </th>
    );
  }

  return (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    ></th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 align-top">{children}</td>;
}

function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
