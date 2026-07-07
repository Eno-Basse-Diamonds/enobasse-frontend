"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Trash2, Search, X, Mail, Download } from "lucide-react";
import { AdminHeader } from "../_components/admin-header";
import {
  useNewsletterSubscriptions,
  useDeleteNewsletterSubscription,
} from "@/lib/hooks/use-newsletter";
import { EmptyState } from "@/components/empty-state";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Pagination } from "@/components/pagination";

export default function AdminNewsletterPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const { data: subscriptions, isLoading } = useNewsletterSubscriptions();
  const deleteMutation = useDeleteNewsletterSubscription();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this subscription?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          setAlertState({
            visible: true,
            type: "success",
            message: "Subscriber removed successfully!",
          });
        },
        onError: () => {
          setAlertState({
            visible: true,
            type: "error",
            message: "Failed to remove subscriber. Please try again.",
          });
        },
      });
    }
  };

  const handleExportCSV = () => {
    if (!subscriptions || subscriptions.length === 0) return;

    const headers = ["ID", "Email Address", "Date Subscribed"];
    const rows = filteredSubscriptions.map((sub) => [
      sub.id,
      sub.email,
      new Date(sub.createdAt).toISOString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `newsletter_subscribers_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredSubscriptions = useMemo(() => {
    if (!subscriptions) return [];
    if (!searchTerm.trim()) return subscriptions;
    const term = searchTerm.toLowerCase();
    return subscriptions.filter((sub) =>
      sub.email.toLowerCase().includes(term)
    );
  }, [subscriptions, searchTerm]);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredSubscriptions.length / ITEMS_PER_PAGE);

  // Adjust page if deletion leaves the current page out of bounds
  useEffect(() => {
    if (currentPage > 1 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedSubscriptions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSubscriptions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSubscriptions, currentPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      {alertState.visible && (
        <Alert
          type={alertState.type}
          dismissible
          onDismiss={dismissAlert}
          duration={5000}
        >
          {alertState.message}
        </Alert>
      )}

      <AdminHeader
        title="Newsletter Subscriptions"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Newsletter Subscribers ({filteredSubscriptions.length})
            </h3>
            <p className="text-sm text-gray-500">
              View and manage customers subscribed to your newsletter
            </p>
          </div>
          {subscriptions && subscriptions.length > 0 && (
            <Button
              onClick={handleExportCSV}
              variant="outline"
              size="sm"
              leadingIcon={<Download />}
            >
              Export CSV
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search subscribers by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent text-sm"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white border border-primary-500/10 p-6 rounded-sm">
            <div className="animate-pulse space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-sm" />
              ))}
            </div>
          </div>
        ) : filteredSubscriptions.length > 0 ? (
          <>
            <div className="bg-white rounded-sm border border-primary-500/10 relative overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Subscribed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSubscriptions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                              <Mail className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {sub.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(sub.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          size="sm"
                          variant="outline"
                          leadingIcon={<Trash2 />}
                          onClick={() => handleDelete(sub.id)}
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          Unsubscribe
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No Subscribers Found"
            description={
              searchTerm
                ? "No subscribers match your search term. Try adjusting your search."
                : "No customers have subscribed to your newsletter yet."
            }
            icon={<Mail className="w-16 h-16 text-gray-400" />}
          />
        )}
      </div>
    </>
  );
}
