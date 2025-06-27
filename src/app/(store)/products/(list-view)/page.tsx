"use client";

import React, { useCallback, useState, useMemo } from "react";
import * as motion from "motion/react-client";
import { SearchSlashIcon } from "lucide-react";
import {
  PageHeading,
  SectionContainer,
  ProductList,
  FilterPanelMobile,
  FilterPanelDesktop,
  EmptyState,
  Pagination,
} from "@/components";
import { ProductListLoader } from "@/components/loaders";
import { ChevronDownIcon } from "@/components/icons";
import { useProducts } from "@/lib/hooks/use-products";
import { ProductsResponse, FilterOption } from "@/lib/types/products";
import { filterAndSortProducts } from "@/lib/utils/products";
import { metalOptions, gemstones } from "@/lib/utils/constants";
import "./styles.scss";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProductsPage() {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 36;

  const { data, isLoading } = useProducts({
    page: currentPage,
    pageSize,
    sortBy,
    metals: selectedFilters
      .filter((f) => f.type === "metal")
      .map((f) => f.name),
    gemstones: selectedFilters
      .filter((f) => f.type === "gemstone")
      .map((f) => f.name),
  }) as { data: ProductsResponse; isLoading: boolean };

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
  }, []);

  return (
    <div className="products-page">
      <PageHeading title="All Products" />
      <SectionContainer id="all-products">
        <motion.div
          className="products-page__container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.aside
            className="products-page__sidebar"
            variants={itemVariants}
          >
            <FilterPanelDesktop
              metalOptions={metalOptions as FilterOption[]}
              gemstones={gemstones as FilterOption[]}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}

            />
          </motion.aside>
          <motion.div
            variants={itemVariants}
            className="collection-detail__products-container"
          >
            <div className="lg:hidden">
              <FilterPanelMobile
                metalOptions={metalOptions as FilterOption[]}
                gemstones={gemstones as FilterOption[]}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="collection-detail__products-header"
            >
              <p className="collection-detail__products-count">
                {filteredAndSortedProducts.length}{" "}
                {filteredAndSortedProducts.length === 1
                  ? "product"
                  : "products"}
              </p>
              <div className="relative">
                <select
                  className="collection-detail__sort-select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <ChevronDownIcon className="collection-detail__sort-icon" />
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
