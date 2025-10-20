"use client";

import React, { useCallback, useState, useMemo } from "react";
import * as motion from "motion/react-client";
import { easeOut } from "motion/react";
import { ChevronDownIcon, SearchSlashIcon } from "lucide-react";
import { useProducts } from "@/lib/hooks/use-products";
import { ProductsResponse, FilterOption } from "@/lib/types/products";
import { filterAndSortProducts } from "@/lib/utils/products";
import { metalOptions } from "@/lib/utils/constants/metal-options";
import { useAccountStore } from "@/lib/store/account";
import { EmptyState } from "@/components/empty-state";
import { ProductListLoader } from "@/components/loaders/products";
import { PageHeading } from "@/components/page-heading";
import { Pagination } from "@/components/pagination";
import { FilterPanelDesktop, FilterPanelMobile } from "@/components/product/filter-panel";
import { ProductList } from "@/components/product/list";
import { SectionContainer } from "@/components/section-container";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

export default function ProductsPage() {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const { preferredCurrency, isHydrated } = useAccountStore();
  const pageSize = 36;

  const { data, isLoading } = useProducts(
    {
      page: currentPage,
      pageSize,
      sortBy,
      currency: preferredCurrency,
      metals: selectedFilters
        .filter((f) => f.type === "metal")
        .map((f) => f.name),
      gemstones: selectedFilters
        .filter((f) => f.type === "gemstone")
        .map((f) => f.name),
    },
    isHydrated
  ) as { data: ProductsResponse; isLoading: boolean };

  const { products, meta } = data || {};

  const filteredAndSortedProducts = useMemo(
    () =>
      filterAndSortProducts({
        products,
        selectedFilters,
        sortBy,
      }),
    [products, selectedFilters, sortBy]
  );

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((filters: FilterOption[]) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="my-12">
      <PageHeading title="All Products" />
      <SectionContainer id="all-products">
        <motion.div
          className="flex flex-col lg:flex-row gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.aside
            className="lg:w-1/4 divide-y divide-gray-200 hidden lg:block"
            variants={itemVariants}
          >
            <FilterPanelDesktop
              metalOptions={metalOptions as FilterOption[]}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </motion.aside>
          <motion.div variants={itemVariants} className="lg:w-3/4">
            <div className="lg:hidden">
              <FilterPanelMobile
                metalOptions={metalOptions as FilterOption[]}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between items-center mb-6"
            >
              <p className="text-gray-600">
                {filteredAndSortedProducts.length}{" "}
                {filteredAndSortedProducts.length === 1
                  ? "product"
                  : "products"}
              </p>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 py-2 pl-3 pr-8 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="in-store">In Store Products</option>
                  <option value="custom-design">Custom Design Products</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </motion.div>

            {isLoading ? (
              <ProductListLoader />
            ) : filteredAndSortedProducts.length === 0 ? (
              <EmptyState
                title="No Results Found"
                description="We couldn't find any products that match your filters."
                icon={<SearchSlashIcon />}
              />
            ) : (
              <>
                <ProductList products={filteredAndSortedProducts} />
                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={Number(meta.currentPage)}
                    totalPages={meta.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </SectionContainer>
    </div>
  );
}
