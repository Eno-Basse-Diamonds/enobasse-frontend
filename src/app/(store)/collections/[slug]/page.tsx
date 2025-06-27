"use client";

import React, { useCallback, useState, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import * as motion from "motion/react-client";
import { SearchSlashIcon } from "lucide-react";
import {
  PageHeading,
  SectionContainer,
  ProductList,
  FilterPanelMobile,
  FilterPanelDesktop,
  EmptyState,
} from "@/components";
import { ChevronDownIcon } from "@/components/icons";
import { ProductsPageLoader } from "@/components/loaders";
import { FilterOption } from "@/lib/types/products";
import { useCollection } from "@/lib/hooks/use-collections";
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

const imageHoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const { data, isLoading } = useCollection(slug);
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
      className="collection-detail"
    >
      <PageHeading breadcrumb={{ items: breadcrumbItems }} />
      <SectionContainer id="collection-products">
        <motion.header
          variants={itemVariants}
          className="collection-detail__header"
        >
          <div className="collection-detail__header--mobile">
            <div className="collection-detail__image-container">
              <Image
                src={collection.image.url}
                alt={collection.image.alt}
                fill
                sizes="100%"
                className="collection-detail__image"
                priority
                quality={100}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="collection-detail__info-panel"
            >
              <h1 className="collection-detail__title">{collection.name}</h1>
              <p className="collection-detail__description">
                {collection.description}
              </p>
            </motion.div>
          </div>
          <div className="collection-detail__header--desktop">
            <motion.div
              whileHover="hover"
              variants={imageHoverVariants}
              className="collection-detail__image-container--desktop"
            >
              <Image
                src={collection.image.url}
                alt={collection.image.alt}
                fill
                sizes="100%"
                priority
                className="collection-detail__image"
              />
            </motion.div>
            <div className="collection-detail__info-panel--desktop">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="collection-detail__info-panel-content"
              >
                <h1 className="collection-detail__title collection-detail__title--desktop">
                  {collection.name}
                </h1>
                <p className="collection-detail__description collection-detail__description--desktop">
                  {collection.description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <motion.div
          variants={containerVariants}
          className="collection-detail__content"
        >
          <motion.aside
            variants={itemVariants}
            className="collection-detail__sidebar hidden lg:block"
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
