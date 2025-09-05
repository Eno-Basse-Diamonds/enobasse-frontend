import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const RecentOrdersSection = ({
  orders,
  getStatusColor,
  formatCurrency,
}: {
  orders: any[];
  getStatusColor: (status: string) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}) => (
  <div className="bg-white shadow-sm border border-gray-200 flex flex-col">
    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
      <span className="text-sm text-gray-500">Last {orders.length} orders</span>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="space-y-4 flex-grow">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div>
              <p className="font-medium text-gray-900">#{order.shortId}</p>
              <p className="text-sm text-gray-600">
                {order.customerInfo?.name}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                {formatCurrency(order.total, order.currency)}
              </p>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
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
          className="text-sm text-secondary-500 hover:text-secondary-400 font-medium flex items-center gap-x-2"
        >
          <span>View all orders</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
);
