"use client";

import { useCallback, useMemo, useState } from "react";

import { ChevronDownIcon, SearchSlashIcon } from "lucide-react";
import { easeOut } from "motion/react";
import * as motion from "motion/react-client";

import { useAccountStore } from "@/modules/account/store";
import { useProducts } from "@/modules/products/hooks";
import { FilterOption } from "@/modules/products/types";
import { EmptyState } from "@/shared/components/EmptyState";
import { FilterPanelDesktop, FilterPanelMobile } from "@/shared/components/FilterPanel";
import { PageHeading } from "@/shared/components/PageHeading";
import { Pagination } from "@/shared/components/Pagination";
import { ProductList } from "@/shared/components/ProductList";
import { SectionContainer } from "@/shared/components/SectionContainer";
import { ProductListLoader } from "@/shared/components/loaders/Products";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { ItemListSchema } from "@/shared/components/seo/ItemListSchema";
import { METAL_OPTIONS } from "@/shared/constants/metals";

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
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const { preferredCurrency } = useAccountStore();
  const pageSize = 36;

  const filterOptions = useMemo(
    () => ({
      page: currentPage,
      pageSize,
      sortBy,
      currency: preferredCurrency,
      metals: selectedFilters.filter((f) => f.type === "metal").map((f) => f.name),
      gemstones: selectedFilters.filter((f) => f.type === "gemstone").map((f) => f.name),
      minPrice,
      maxPrice,
    }),
    [currentPage, pageSize, sortBy, preferredCurrency, selectedFilters, minPrice, maxPrice],
  );

  const { data, isLoading, isFetching, isError, error } = useProducts(filterOptions);

  const { products = [], meta } = data || {
    meta: {
      total: 0,
      currentPage: 1,
      totalPages: 1,
      pageSize: 36,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };

  // Products come pre-sorted and pre-filtered from the server.
  // No client-side sort/filter needed — we display them as-is.
  const displayProducts = products;

  const totalProducts = meta.total;
  const startProduct = displayProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endProduct = (currentPage - 1) * pageSize + displayProducts.length;

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((filters: FilterOption[]) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
  }, []);

  const handlePriceChange = useCallback((min: number | undefined, max: number | undefined) => {
    setMinPrice(min);
    setMaxPrice(max);
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
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://enobasse.com" },
          { name: "Products", item: "https://enobasse.com/products" },
        ]}
      />
      {displayProducts.length > 0 && (
        <ItemListSchema
          items={displayProducts.map((product) => ({
            name: product.name,
            url: `https://enobasse.com/products/${product.slug}`,
            image: product.images?.[0]?.url,
          }))}
        />
      )}
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
              metalOptions={METAL_OPTIONS as FilterOption[]}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
            />
          </motion.aside>
          <motion.div variants={itemVariants} className="lg:w-3/4">
            <div className="lg:hidden">
              <FilterPanelMobile
                metalOptions={METAL_OPTIONS as FilterOption[]}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={handlePriceChange}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between items-center mb-6"
            >
              <p className="text-gray-600 text-sm">
                {totalProducts > 0
                  ? `Showing ${startProduct}-${endProduct} of ${totalProducts} products`
                  : "0 products"}
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

            <div
              className={`transition-opacity duration-300 ${isFetching ? "opacity-50 pointer-events-none" : "opacity-100"}`}
            >
              {isLoading && !displayProducts.length ? (
                <ProductListLoader />
              ) : isError ? (
                <EmptyState
                  title="Something went wrong"
                  description={error?.message || "Failed to load products. Please try again."}
                  icon={<SearchSlashIcon />}
                />
              ) : displayProducts.length === 0 ? (
                <EmptyState
                  title="No Results Found"
                  description="We couldn't find any products that match your filters."
                  icon={<SearchSlashIcon />}
                />
              ) : (
                <>
                  <ProductList products={displayProducts} />
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={Number(meta.currentPage)}
                      totalPages={meta.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </div>
  );
}
