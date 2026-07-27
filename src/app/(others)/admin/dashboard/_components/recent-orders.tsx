import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";

const statusDot: Record<string, string> = {
  pending: "bg-yellow-400",
  confirmed: "bg-blue-400",
  processing: "bg-purple-400",
  shipped: "bg-indigo-400",
  delivered: "bg-green-400",
  cancelled: "bg-red-400",
  refunded: "bg-gray-400",
};

const statusBg: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-purple-50 text-purple-700 border-purple-200",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  refunded: "bg-gray-50 text-gray-700 border-gray-200",
};

export const RecentOrdersSection = ({
  orders,
  getStatusColor,
  formatCurrency,
}: {
  orders: any[];
  getStatusColor: (status: string) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}) => (
  <div className="bg-white shadow-sm border rounded-sm border-gray-200 flex flex-col">
    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
      <span className="text-sm text-gray-400">
        {orders.length > 0 ? `Last ${orders.length}` : ""}
      </span>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      {orders.length > 0 ? (
        <>
          <div className="space-y-1 flex-grow">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 px-3 -mx-3 rounded-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full ${statusDot[order.status] || "bg-gray-400"}`}
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      #{order.shortId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.customerInfo?.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">
                    {formatCurrency(order.total, order.currency)}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-sm border ${
                      statusBg[order.status] || "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/admin/orders"
              className="text-sm text-secondary-500 hover:text-secondary-400 font-medium flex items-center gap-x-2 transition-colors"
            >
              <span>View all orders</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-14 w-14 bg-gray-100 rounded-sm flex items-center justify-center mb-4">
            <Package className="h-7 w-7 text-gray-400" />
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">
            No orders yet
          </h4>
          <p className="text-sm text-gray-500 max-w-xs">
            When customers place orders, they will appear here for quick access.
          </p>
        </div>
      )}
    </div>
  </div>
);
