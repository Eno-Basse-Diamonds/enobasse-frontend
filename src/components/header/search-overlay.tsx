"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SearchSlashIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useInfiniteProductsSearch } from "@/lib/hooks/use-products";
import { useAccountStore } from "@/lib/store/account";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { ProductList } from "@/components/product/list";
import { ProductListLoader } from "@/components/loaders/products";
import { EmptyState } from "@/components/empty-state";
import { LogoLink } from "./logo-link";
import { CloseIcon } from "../icons/close";
import { SearchIcon } from "../icons/search";

interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isVisible,
  onClose,
  initialQuery = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { preferredCurrency } = useAccountStore();

  useEffect(() => {
    if (isVisible) {
      const savedSearches = localStorage.getItem("recentSearches");
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } else {
      setSearchQuery("");
    }
  }, [isVisible]);

  const saveRecentSearch = (term: string) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    const updatedSearches = [
      trimmedTerm,
      ...recentSearches.filter((s) => s !== trimmedTerm),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const shouldFetch = isVisible && debouncedQuery.trim().length > 0;

  const searchParams = shouldFetch
    ? {
        search: debouncedQuery,
        pageSize: 12,
        currency: preferredCurrency,
      }
    : undefined;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProductsSearch(searchParams, shouldFetch);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
    root: scrollContainerRef.current,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page.products) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
    }
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchQuery(term);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`header__search-overlay ${
        isVisible ? "header__search-overlay--visible" : ""
      }`}
    >
      <div className="header__search-overlay-container">
        <div className="header__search-overlay-header">
          <LogoLink href="/" />
          <button
            onClick={handleClose}
            className="header__search-overlay-close"
            aria-label="Close search"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="header__search-overlay-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header__search-overlay-input"
          />
          <button
            type="submit"
            className="header__search-overlay-submit"
            aria-label="Submit search"
          >
            <SearchIcon />
          </button>
        </form>

        {searchQuery.trim().length === 0 ? (
          <div className="header__search-overlay-recent mt-8 px-4">
            {recentSearches.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-[#D1A559] hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(term)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-sm text-sm text-gray-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="header__search-overlay-results">
            {isLoading && <ProductListLoader />}
            {products && products.length > 0 ? (
              <>
                <ProductList products={products} />
                <div
                  ref={loadMoreRef}
                  className="h-10 w-full flex items-center justify-center py-4"
                >
                  {isFetchingNextPage && (
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-[#D1A559] rounded-full animate-spin" />
                  )}
                </div>
              </>
            ) : (
              !isLoading && (
                <EmptyState
                  title="No Results Found"
                  description={`We couldn't find any products matching "${searchQuery}".`}
                  icon={<SearchSlashIcon />}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
