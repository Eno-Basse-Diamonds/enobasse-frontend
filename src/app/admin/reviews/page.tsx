"use client";

import * as React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  Search,
  X,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Alert, Pagination } from "@/components";
import { AdminReviewsSkeletonLoader } from "@/components/loaders";
import { EmptyState } from "@/components/empty-state";
import { AdminHeader } from "../_components/admin-header";
import { ReviewList } from "./_components/review-list";
import { AdminFilterSortPanel } from "../_components/admin-filter-sort-panel";
import { useReviewsForAdmin } from "@/lib/hooks/use-reviews";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminReviewsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const currentVerified = searchParams.get("isVerified");
  const currentRating = searchParams.get("rating");

  const filterOptions = {
    page: currentPage,
    perPage: 9,
    sortBy: currentSort as
      | "authorName"
      | "createdAt"
      | "updatedAt"
      | "rating"
      | "product",
    sortOrder: currentSortOrder,
    search: currentSearch || undefined,
    isVerified: currentVerified ? currentVerified === "true" : undefined,
    rating: currentRating ? Number(currentRating) : undefined,
  };

  const { data, isLoading } = useReviewsForAdmin(filterOptions);
  console.log(data);

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

      router.push(`/admin/reviews?${params.toString()}`);
    },
    [router, searchParams]
  );

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

  const handleRatingFilterChange = (rating: string | number) => {
    updateURL({ rating: rating || "", page: 1 });
  };

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "updatedAt", label: "Last Updated" },
    { value: "authorName", label: "Author Name" },
    { value: "rating", label: "Rating" },
    { value: "product", label: "Product" },
  ];

  const ratingOptions = [
    { value: "", label: "All Ratings" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ];

  const currentFilters = currentVerified === "true" ? ["verified"] : [];

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
        title="Reviews Management"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      {isLoading ? (
        <AdminReviewsSkeletonLoader />
      ) : (
        <>
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Reviews ({data?.total || 0})
                </h3>
                <p className="text-sm text-gray-500">Manage customer reviews</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reviews..."
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

              <div className="flex gap-4">
                <RatingDropdown
                  value={currentRating ?? ""}
                  onChange={handleRatingFilterChange}
                  options={ratingOptions}
                />

                <AdminFilterSortPanel
                  sortOptions={sortOptions}
                  currentSort={currentSort}
                  currentSortOrder={currentSortOrder}
                  currentFilters={currentFilters}
                  onSortChange={handleSortChange}
                  onSortOrderChange={handleSortOrderChange}
                />
              </div>
            </div>

            {!isLoading && data?.reviews && data.reviews.length > 0 ? (
              <ReviewList reviews={data.reviews} />
            ) : !isLoading && data?.reviews && data.reviews.length === 0 ? (
              <EmptyState
                title="No Reviews Found"
                description="Customer reviews will appear here once they are submitted."
                icon={<MessageSquare className="w-16 h-16 text-gray-400" />}
              />
            ) : null}

            {data && data.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.totalPages}
                  hrefBuilder={(page) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", String(page));
                    return `/admin/reviews?${params.toString()}`;
                  }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

interface RatingDropdownProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Array<{ value: string | number; label: string }>;
  className?: string;
}

const RatingDropdown = ({
  value,
  onChange,
  options,
  className = "",
}: RatingDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: any) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 px-3 border border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent bg-white flex items-center justify-between gap-x-2"
      >
        <div className="flex items-center gap-2">
          <span className="text-primary-500">{selectedOption.label}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-primary-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-primary-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
                value === option.value
                  ? "bg-gray-100 text-primary-500"
                  : "text-gray-700"
              }`}
            >
              <span className="text-sm">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
