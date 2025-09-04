"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Search, X, Package } from "lucide-react";
import { Alert, Button, Pagination } from "@/components";
import { AdminHeader } from "../_components/admin-header";
import { useAdminProducts, useDeleteProduct } from "@/lib/hooks/use-products";
import { AdminFilterSortPanel } from "../_components/admin-filter-sort-panel";
import { Product } from "@/lib/types/products";
import { ProductList } from "./_components/product-list";
import { ProductForm } from "./_components/product-form";
import { EmptyState } from "@/components/empty-state";
import { AdminProductsSkeletonLoader } from "@/components/loaders";
import { useAdminCollections } from "@/lib/hooks/use-collections";

const PRODUCT_COLLECTIONS = ["Rings", "Earrings", "Wristwears", "Neckpieces"];

export default function AdminProductsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [inputValue, setInputValue] = useState("");

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder =
    (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC";

  const filterOptions = {
    page: currentPage,
    pageSize: 21,
    sortBy: currentSort as
      | "name"
      | "createdAt"
      | "updatedAt"
      | "category"
      | "price",
    sortOrder: currentSortOrder,
    search: currentSearch || undefined,
    category: currentCategory || undefined,
  };

  const { data, isLoading } = useAdminProducts(filterOptions);
  const { data: collections, isLoading: isCollectionsLoading } =
    useAdminCollections({
      page: 1,
      pageSize: 50,
    });
  const deleteMutation = useDeleteProduct();

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

      router.push(`/admin/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setAlertState({
          visible: true,
          type: "success",
          message: "Product deleted successfully!",
        });
      },
      onError: () => {
        setAlertState({
          visible: true,
          type: "error",
          message: "Failed to delete product. Please try again.",
        });
      },
    });
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
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

  const handleCategoryClick = (category: string) => {
    if (currentCategory === category) {
      updateURL({ category: "", page: 1 });
    } else {
      updateURL({ category, page: 1 });
    }
  };

  const handleSortChange = (sort: string) => {
    updateURL({ sortBy: sort, page: 1 });
  };

  const handleSortOrderChange = (order: "ASC" | "DESC") => {
    updateURL({ sortOrder: order, page: 1 });
  };

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "updatedAt", label: "Last Updated" },
    { value: "name", label: "Name" },
    { value: "category", label: "Category" },
    { value: "price", label: "Price" },
  ];

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
        title="Products Management"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      {isLoading || isCollectionsLoading ? (
        <AdminProductsSkeletonLoader />
      ) : (
        <>
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Products ({data?.meta.total || 0})
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your jewelry products and variants
                </p>
              </div>
              <Button
                leadingIcon={<Plus />}
                onClick={() => {
                  setIsModalOpen(true);
                  document.body.style.overflow = "hidden";
                }}
              >
                New Product
              </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products by name, variant title, or SKU..."
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
                  currentSort={currentSort}
                  currentSortOrder={currentSortOrder}
                  onSortChange={handleSortChange}
                  onSortOrderChange={handleSortOrderChange}
                />
              </div>
            </div>

            {/* Category Filter Buttons */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {PRODUCT_COLLECTIONS.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 text-sm font-medium border transition-colors ${
                      currentCategory === category
                        ? "bg-primary-500 text-white border-primary-500"
                        : "bg-white text-primary-500 border-primary-300 hover:bg-primary-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
                {currentCategory && (
                  <button
                    onClick={() => updateURL({ category: "", page: 1 })}
                    className="px-4 py-2 text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            {!isLoading && data?.products && data.products.length > 0 ? (
              <ProductList
                products={data.products}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : !isLoading && data?.products && data.products.length === 0 ? (
              <EmptyState
                title="No Products Found"
                description="Start building your product catalog by creating your first product."
                icon={<Package className="w-16 h-16 text-gray-400" />}
              />
            ) : null}

            {data && data.meta.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.meta.totalPages}
                  hrefBuilder={(page) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", String(page));
                    return `/admin/products?${params.toString()}`;
                  }}
                />
              </div>
            )}
          </div>

          {isModalOpen && (
            <ProductForm product={editingProduct} onClose={handleFormClose} />
          )}
        </>
      )}
    </>
  );
}
