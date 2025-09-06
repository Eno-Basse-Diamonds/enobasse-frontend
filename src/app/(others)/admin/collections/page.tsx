"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Search, X, Folder } from "lucide-react";
import { Alert, Button, Pagination } from "@/components";
import { AdminCollectionsSkeletonLoader } from "@/components/loaders";
import { EmptyState } from "@/components/empty-state";
import { AdminHeader } from "../_components/admin-header";
import { CollectionForm } from "./_components/collection-form";
import { CollectionList } from "./_components/collection-list";
import { AdminFilterSortPanel } from "../_components/admin-filter-sort-panel";
import { Collection } from "@/lib/types/collections";
import {
  useDeleteCollection,
  useAdminCollections,
} from "@/lib/hooks/use-collections";

export default function AdminCollectionsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");

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
  const currentPublished = searchParams.get("published");

  const filterOptions = {
    page: currentPage,
    pageSize: 12,
    sortBy: currentSort as "name" | "createdAt" | "updatedAt" | "productCount",
    sortOrder: currentSortOrder,
    search: currentSearch || undefined,
    published: currentPublished ? currentPublished === "true" : undefined,
  };

  const { data, isLoading } = useAdminCollections(filterOptions);
  const deleteMutation = useDeleteCollection();

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

      router.push(`/admin/collections?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setAlertState({
          visible: true,
          type: "success",
          message: "Collection deleted successfully!",
        });
      },
      onError: () => {
        setAlertState({
          visible: true,
          type: "error",
          message: "Failed to delete collection. Please try again.",
        });
      },
    });
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setEditingCollection(null);
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
    const publishedFilter = filters.includes("published");
    updateURL({ published: publishedFilter ? "true" : "", page: 1 });
  };

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "updatedAt", label: "Last Updated" },
    { value: "name", label: "Name" },
  ];

  const filterOptionsList = [{ value: "published", label: "Published Only" }];

  const currentFilters = currentPublished === "true" ? ["published"] : [];

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
        title="Collection Management"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      {isLoading ? (
        <AdminCollectionsSkeletonLoader />
      ) : (
        <>
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Collections ({data?.total || 0})
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your jewelry collections
                </p>
              </div>
              <Button
                leadingIcon={<Plus />}
                onClick={() => {
                  setIsModalOpen(true);
                  document.body.style.overflow = "hidden";
                }}
              >
                New Collection
              </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={inputValue}
                  onChange={handleInputChange}
                  className="pl-10 pr-20 w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
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

            {!isLoading && data?.collections && data.collections.length > 0 ? (
              <CollectionList
                collections={data.collections}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : !isLoading && data?.collections && data.collections.length === 0 ? (
              <EmptyState
                title="No Collections Found"
                description="Get started by creating your first jewelry collection to showcase your products."
                icon={<Folder className="w-16 h-16 text-gray-400" />}
              />
            ) : null}

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.totalPages}
                  hrefBuilder={(page) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", String(page));
                    return `/admin/collections?${params.toString()}`;
                  }}
                />
              </div>
            )}
          </div>

          {isModalOpen && (
            <CollectionForm
              collection={editingCollection}
              onClose={handleFormClose}
            />
          )}
        </>
      )}
    </>
  );
}
