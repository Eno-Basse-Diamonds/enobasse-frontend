"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Search, X, MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { AdminHeader } from "../_components/admin-header";
import { TestimonialForm } from "./_components/testimonial-form";
import { TestimonialList } from "./_components/testimonial-list";
import { Testimonial } from "@/lib/types/testimonial";
import {
  useTestimonialsForAdmin,
  useDeleteTestimonial,
} from "@/lib/hooks/use-testimonials";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { AdminFilterSortPanel } from "../_components/admin-filter-sort-panel";
import { Pagination } from "@/components/pagination";
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal";

export default function AdminTestimonialsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
  const currentActive = searchParams.get("isActive");

  const { data, isLoading } = useTestimonialsForAdmin();
  const deleteMutation = useDeleteTestimonial();

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
      router.push(`/admin/testimonials?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Client-side filtering
  const filteredTestimonials = React.useMemo(() => {
    if (!data) return [];
    let list = data;

    if (currentSearch) {
      const term = currentSearch.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.text.toLowerCase().includes(term) ||
          (t.handle && t.handle.toLowerCase().includes(term))
      );
    }

    if (currentActive === "true") {
      list = list.filter((t) => t.isActive);
    } else if (currentActive === "false") {
      list = list.filter((t) => !t.isActive);
    }

    list.sort((a, b) => {
      let cmp = 0;
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      if (currentSort === "name") cmp = a.name.localeCompare(b.name);
      else if (currentSort === "order") cmp = (a.order ?? 0) - (b.order ?? 0);
      else cmp = dateA - dateB;
      return currentSortOrder === "ASC" ? cmp : -cmp;
    });

    return list;
  }, [data, currentSearch, currentActive, currentSort, currentSortOrder]);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE);
  const paginated = filteredTestimonials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        setAlertState({
          visible: true,
          type: "success",
          message: "Testimonial deleted successfully!",
        });
        setDeleteId(null);
      },
      onError: () => {
        setAlertState({
          visible: true,
          type: "error",
          message: "Failed to delete testimonial. Please try again.",
        });
        setDeleteId(null);
      },
    });
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
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
    const activeFilter = filters.includes("active")
      ? "true"
      : filters.includes("inactive")
        ? "false"
        : "";
    updateURL({ isActive: activeFilter, page: 1 });
  };

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "name", label: "Name" },
    { value: "order", label: "Display Order" },
  ];

  const filterOptionsList = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const currentFilters =
    currentActive === "true" ? ["active"] : currentActive === "false" ? ["inactive"] : [];

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
        title="Testimonials Management"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Customer Testimonials ({filteredTestimonials.length})
            </h3>
            <p className="text-sm text-gray-500">
              Manage customer testimonials and reviews
            </p>
          </div>
          <Button
            leadingIcon={<Plus />}
            onClick={() => {
              setIsModalOpen(true);
              document.body.style.overflow = "hidden";
            }}
          >
            New Testimonial
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search testimonials..."
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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white shadow animate-pulse p-6">
                <div className="h-4 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : paginated.length > 0 ? (
          <TestimonialList
            testimonials={paginated}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState
            title="No Testimonials Found"
            description="Start building trust with your customers by adding testimonials and reviews."
            icon={<MessageSquare className="w-16 h-16 text-gray-400" />}
          />
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              hrefBuilder={(page) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(page));
                return `/admin/testimonials?${params.toString()}`;
              }}
            />
          </div>
        )}

        <DeleteConfirmationModal
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          onConfirm={handleConfirmDelete}
          title="Delete Testimonial"
          isDeleting={deleteMutation.isPending}
        />

        {isModalOpen && (
          <TestimonialForm
            testimonial={editingTestimonial}
            onClose={handleFormClose}
          />
        )}
      </div>
    </>
  );
}
