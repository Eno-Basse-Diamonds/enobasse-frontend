"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Search, X, Users, Shield, User } from "lucide-react";
import { AdminHeader } from "../_components/admin-header";
import { useAdminAccounts, useDeleteAccount } from "@/lib/hooks/use-accounts";
import { AdminFilterSortPanel } from "../_components/admin-filter-sort-panel";
import { Account } from "@/lib/types/accounts";
import { AccountForm } from "./_components/account-form";
import { DeleteConfirmationModal } from "./_components/delete-confirmation-modal";
import { EmptyState } from "@/components/empty-state";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Pagination } from "@/components/pagination";

export default function AdminAccountsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    accountId: string | null;
  }>({ isOpen: false, accountId: null });

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder =
    (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC";
  const currentIsAdmin = searchParams.get("isAdmin");

  const filterOptions = {
    page: currentPage,
    pageSize: 10,
    sortBy: currentSort as "name" | "email" | "createdAt" | "isAdmin",
    sortOrder: currentSortOrder,
    search: currentSearch || undefined,
    isAdmin: currentIsAdmin ? currentIsAdmin === "true" : undefined,
  };

  const { data, isLoading } = useAdminAccounts(filterOptions);
  const deleteMutation = useDeleteAccount();

  const updateURL = useCallback(
    (newParams: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === "" || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`/admin/accounts?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = (id: string) => {
    setDeleteModalState({ isOpen: true, accountId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteModalState.accountId) {
      deleteMutation.mutate(deleteModalState.accountId, {
        onSuccess: () => {
          setAlertState({
            visible: true,
            type: "success",
            message: "Account deleted successfully!",
          });
          setDeleteModalState({ isOpen: false, accountId: null });
        },
        onError: () => {
          setAlertState({
            visible: true,
            type: "error",
            message: "Failed to delete account. Please try again.",
          });
          setDeleteModalState({ isOpen: false, accountId: null });
        },
      });
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalState({ isOpen: false, accountId: null });
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
    document.body.style.overflow = "auto";
  };

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: inputValue, page: 1 });
  };

  const clearSearch = () => {
    setInputValue("");
    updateURL({ search: "", page: 1 });
  };

  const handleSortChange = (sort: string) => {
    updateURL({ sortBy: sort, page: 1 });
  };

  const handleSortOrderChange = (order: "ASC" | "DESC") => {
    updateURL({ sortOrder: order, page: 1 });
  };

  const handleFilterChange = (filters: string[]) => {
    const adminFilter = filters.includes("admin");
    updateURL({ isAdmin: adminFilter ? "true" : "", page: 1 });
  };

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "isAdmin", label: "Role" },
  ];

  const filterOptionsList = [{ value: "admin", label: "Admin Only" }];

  const currentFilters = currentIsAdmin === "true" ? ["admin"] : [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
        title="Accounts Management"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              User Accounts ({data?.total || 0})
            </h3>
            <p className="text-sm text-gray-500">
              Manage customer and admin accounts
            </p>
          </div>
          <Button
            leadingIcon={<Plus />}
            onClick={() => {
              setIsModalOpen(true);
              document.body.style.overflow = "hidden";
            }}
          >
            New Account
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search accounts by name or email..."
              value={inputValue}
              onChange={handleInputChange}
              className="pl-10 pr-20 w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
            />
            {(currentSearch || inputValue) && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          <div className="md:w-auto">
            <AdminFilterSortPanel
              sortOptions={sortOptions}
              filterOptions={filterOptionsList}
              currentSort={currentSort}
              currentSortOrder={currentSortOrder}
              currentFilters={currentFilters}
              onSortChange={handleSortChange}
              onSortOrderChange={handleSortOrderChange}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        {!isLoading && data?.accounts && data.accounts.length > 0 ? (
          <div className="bg-white rounded-sm border border-primary-500/10 relative overflow-x-auto rounded-sm">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Since
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Currency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.accounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {account.name?.charAt(0).toUpperCase() ||
                                account.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {account.name || "No name"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {account.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {account.isAdmin ? (
                          <>
                            <Shield className="w-4 h-4 text-red-500 mr-2" />
                            <span className="text-sm text-red-600 font-medium">
                              Admin
                            </span>
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="text-sm text-blue-600 font-medium">
                              Customer
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold ${
                          account.isVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {account.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(account.memberSince)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.preferredCurrency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(account)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(account.id)}
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !isLoading && data?.accounts && data.accounts.length === 0 ? (
          <EmptyState
            title="No Accounts Found"
            description="Get started by creating your first account or adjust your search criteria."
            icon={<Users className="w-16 h-16 text-gray-400" />}
          />
        ) : (
          <div className="bg-white border border-primary-500/10 p-6 rounded-sm">
            <div className="animate-pulse space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100" />
              ))}
            </div>
          </div>
        )}

        {data && data.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              hrefBuilder={(page) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(page));
                return `/admin/accounts?${params.toString()}`;
              }}
            />
          </div>
        )}

        {isModalOpen && (
          <AccountForm account={editingAccount} onClose={handleFormClose} />
        )}

        <DeleteConfirmationModal
          isOpen={deleteModalState.isOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      </div>
    </>
  );
}
