"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Alert, Pagination } from "@/components";
import { AdminHeader } from "../_components/admin-header";
import { useAdminOrders } from "@/lib/hooks/use-orders";
import { AdminFilterSortPanel } from "../_components/admin-filter-sort-panel";
import { Order } from "@/lib/types/orders";
import { OrdersTable } from "./_components/orders-table";
import { OrderModal } from "./_components/order-modal";

export default function AdminOrdersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [alertState, setAlertState] = React.useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "";
  const perPage = Number(searchParams.get("perPage")) || 10;

  const { data, isLoading } = useAdminOrders({
    page: currentPage,
    perPage,
    search: currentSearch || undefined,
    status: currentStatus || undefined,
  });

  const updateURL = React.useCallback(
    (newParams: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === "" || value === undefined) params.delete(key);
        else params.set(key, String(value));
      });
      router.push(`/admin/orders?${params.toString()}`);
    },
    [router, searchParams]
  );

  const [inputValue, setInputValue] = React.useState("");
  React.useEffect(() => {
    setInputValue(currentSearch);
  }, [currentSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: inputValue, page: 1 });
  };

  const clearSearch = () => {
    setInputValue("");
    updateURL({ search: "", page: 1 });
  };

  const sortOptions = [{ value: "createdAt", label: "Date Created" }];
  const filterOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "refunded", label: "Refunded" },
  ];

  const currentFilters = currentStatus ? [currentStatus] : [];

  const handleFilterChange = (filters: string[]) => {
    updateURL({ status: filters[0] || "", page: 1 });
  };

  return (
    <>
      {alertState.visible && (
        <Alert
          type={alertState.type}
          dismissible
          onDismiss={() => setAlertState((s) => ({ ...s, visible: false }))}
          duration={5000}
        >
          {alertState.message}
        </Alert>
      )}

      <AdminHeader
        title="Orders Management"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Orders ({data?.total || 0})
            </h3>
            <p className="text-sm text-gray-500">
              Search by shortId, filter by status
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by ID..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="pl-10 pr-20 w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
            />
            {(currentSearch || inputValue) && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear
              </button>
            )}
          </form>

          <div className="md:w-auto">
            <AdminFilterSortPanel
              sortOptions={sortOptions}
              filterOptions={filterOptions}
              currentSort={"createdAt"}
              currentSortOrder={"DESC"}
              currentFilters={currentFilters}
              onSortChange={() => {}}
              onSortOrderChange={() => {}}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <OrdersTable
          loading={isLoading}
          orders={data?.orders || []}
          onView={(order) => setSelectedOrder(order)}
        />

        {data && data.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={data.page}
              totalPages={data.totalPages}
              hrefBuilder={(page) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(page));
                return `/admin/orders?${params.toString()}`;
              }}
            />
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}
