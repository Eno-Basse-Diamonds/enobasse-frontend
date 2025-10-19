"use client";

import React, { useCallback, useState, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import * as motion from "motion/react-client";
import { easeOut } from "motion/react";
import { ChevronDownIcon, SearchSlashIcon } from "lucide-react";
import { FilterOption } from "@/lib/types/products";
import { useCollection } from "@/lib/hooks/use-collections";
import { useAccountStore } from "@/lib/store/account";
import { filterAndSortProducts } from "@/lib/utils/products";
import { metalOptions } from "@/lib/utils/constants/metal-options";
import { EmptyState } from "@/components/empty-state";
import { ProductsPageLoader } from "@/components/loaders/products";
import { PageHeading } from "@/components/page-heading";
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

const imageHoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3, ease: easeOut } },
};

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const { preferredCurrency, isHydrated } = useAccountStore();

  const { data, isLoading } = useCollection(
    slug,
    {
      currency: preferredCurrency,
    },
    isHydrated
  );
  const { collection, products } = data || {};

  const filteredAndSortedProducts = useMemo(
    () =>
      filterAndSortProducts({
        products: products || [],
        selectedFilters,
        sortBy,
      }),
    [products, selectedFilters, sortBy]
  );

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const handleFilterChange = useCallback((filters: FilterOption[]) => {
    setSelectedFilters(filters);
  }, []);

  if (isLoading) {
    return (
      <SectionContainer id="collection-products">
        <ProductsPageLoader />
      </SectionContainer>
    );
  }

  if (!collection) {
    return notFound();
  }

  const breadcrumbItems = [
    { label: "Collections", href: "/collections" },
    { label: collection.name, href: "#" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-12 mb-24"
    >
      <PageHeading breadcrumb={{ items: breadcrumbItems }} />
      <SectionContainer id="collection-products">
        <motion.header variants={itemVariants} className="mb-6 lg:mb-12">
          <div className="lg:hidden">
            <div className="h-48 w-full relative overflow-hidden rounded-sm">
              <Image
                src={collection.image.url}
                alt={collection.image.alt}
                fill
                sizes="100%"
                className="object-cover"
                priority
                quality={100}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#502B3A] p-6 text-white mt-2 rounded-sm"
            >
              <h1 className="text-2xl font-primary font-medium mb-3">
                {collection.name}
              </h1>
              <p className="text-sm font-light">{collection.description}</p>
            </motion.div>
          </div>
          <div className="hidden lg:block relative h-80 overflow-hidden rounded-sm">
            <motion.div
              whileHover="hover"
              variants={imageHoverVariants}
              className="w-full h-full"
            >
              <Image
                src={collection.image.url}
                alt={collection.image.alt}
                fill
                sizes="100%"
                priority
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 px-8 bg-black/30 flex items-center justify-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white max-w-2xl bg-[#502B3A] p-8 rounded-sm"
              >
                <h1 className="text-3xl font-primary font-medium mb-4">
                  {collection.name}
                </h1>
                <p className="text-base font-light">{collection.description}</p>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <motion.div
          variants={containerVariants}
          className="flex flex-col lg:flex-row gap-8"
        >
          <motion.aside
            variants={itemVariants}
            className="hidden lg:block lg:w-1/4 divide-y divide-gray-200"
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
                  className="appearance-none bg-white border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50"
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

            {filteredAndSortedProducts.length === 0 ? (
              <EmptyState
                title="No Results Found"
                description="We couldn't find any products that match your filters."
                icon={<SearchSlashIcon />}
              />
            ) : (
              <ProductList products={filteredAndSortedProducts} />
            )}
          </motion.div>
        </motion.div>
      </SectionContainer>
    </motion.div>
  );
}
