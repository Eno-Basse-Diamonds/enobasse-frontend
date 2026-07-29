"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { ChevronDownIcon, SearchSlashIcon } from "lucide-react";
import { easeOut } from "motion/react";
import * as motion from "motion/react-client";

import { useAccountStore } from "@/modules/account/store";
import { useCollection } from "@/modules/collections/hooks";
import { FilterOption } from "@/modules/products/types";
import { EmptyState } from "@/shared/components/EmptyState";
import { FilterPanelDesktop, FilterPanelMobile } from "@/shared/components/FilterPanel";
import { PageHeading } from "@/shared/components/PageHeading";
import { Pagination } from "@/shared/components/Pagination";
import { ProductList } from "@/shared/components/ProductList";
import { SectionContainer } from "@/shared/components/SectionContainer";
import { CollectionDetailPageLoader } from "@/shared/components/loaders/Collections";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { CollectionSchema } from "@/shared/components/seo/CollectionSchema";
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

const imageHoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3, ease: easeOut } },
};

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [sortBy, setSortBy] = useState("featured");
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

  const { data, isLoading, isFetching, isError, error } = useCollection(slug, filterOptions);
  const { collection, products = [], meta } = data || {};

  const totalProducts = Number(meta?.total ?? 0);
  const startProduct = products.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endProduct = (currentPage - 1) * pageSize + products.length;

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

  if (isLoading) {
    return <CollectionDetailPageLoader />;
  }

  if (isError) {
    return (
      <SectionContainer id="collection-error">
        <EmptyState
          title="Something went wrong"
          description={error?.message || "Failed to load collection. Please try again."}
          icon={<SearchSlashIcon />}
        />
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
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://enobasse.com" },
          { name: "Collections", item: "https://enobasse.com/collections" },
          {
            name: collection.name,
            item: `https://enobasse.com/collections/${collection.slug}`,
          },
        ]}
      />
      <CollectionSchema
        name={collection.name}
        description={collection.description}
        products={products || []}
        url={`https://enobasse.com/collections/${collection.slug}`}
      />
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
              <h1 className="text-2xl font-primary font-medium mb-3">{collection.name}</h1>
              <p className="text-sm font-light">{collection.description}</p>
            </motion.div>
          </div>
          <div className="hidden lg:block relative h-80 overflow-hidden rounded-sm">
            <motion.div whileHover="hover" variants={imageHoverVariants} className="w-full h-full">
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
                <h1 className="text-3xl font-primary font-medium mb-4">{collection.name}</h1>
                <p className="text-base font-light">{collection.description}</p>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <motion.div variants={containerVariants} className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            variants={itemVariants}
            className="hidden lg:block lg:w-1/4 divide-y divide-gray-200"
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
              {products.length === 0 ? (
                <EmptyState
                  title="No Results Found"
                  description="We couldn't find any products that match your filters."
                  icon={<SearchSlashIcon />}
                />
              ) : (
                <>
                  <ProductList products={products} />
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={meta?.totalPages || 1}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </motion.div>
  );
}
