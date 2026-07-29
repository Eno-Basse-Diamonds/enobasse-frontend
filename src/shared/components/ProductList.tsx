"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Heart } from "lucide-react";
import { easeOut } from "motion/react";
import * as motion from "motion/react-client";

import { useAccountStore } from "@/modules/account/store";
import { Product } from "@/modules/products/types";
import { isProductCustomDesign, isQuoteOnlyProduct } from "@/modules/products/utils";
import { useWishlistStore } from "@/modules/wishlist/store";
import { ProductQuickView } from "@/shared/components/ProductQuickView";
import { EyeOpenIcon } from "@/shared/components/icons/EyeOpen";
import { HeartIcon } from "@/shared/components/icons/Heart";
import { useMobileDetection } from "@/shared/hooks/useMobileDetection";
import { useAlertStore } from "@/shared/store/alert";
import { getCurrencySymbol } from "@/shared/utils/money";

interface ProductListProps {
  products: Product[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.3, ease: easeOut },
};

const buttonHover = {
  scale: 1.1,
  transition: { duration: 0.2 },
};

const FALLBACK_IMAGE = "https://res.cloudinary.com/enobasse/image/upload/v1756512499/collection-fallback_syzbce.png";

const ProductListItem = React.memo(
  ({
    product,
    isInWishlist,
    onWishlistToggle,
    onQuickView,
  }: {
    product: Product;
    isInWishlist: boolean;
    onWishlistToggle: (e: React.MouseEvent) => void;
    onQuickView: (e: React.MouseEvent) => void;
  }) => {
    const [isFirstImageLoading, setIsFirstImageLoading] = useState(true);
    const [isSecondImageLoading, setIsSecondImageLoading] = useState(!!product.images[1]);
    const [firstImageError, setFirstImageError] = useState(false);
    const [secondImageError, setSecondImageError] = useState(false);

    const { isMobile } = useMobileDetection();
    const isHoverDevice = !isMobile;
    const isCustom = isProductCustomDesign(product);
    const isQuoteOnly = isQuoteOnlyProduct(product);

    return (
      <motion.div
        className="group relative flex flex-col overflow-hidden bg-white"
        variants={item}
        whileHover={isHoverDevice ? hoverScale : undefined}
      >
        <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
          <div className="relative aspect-square overflow-hidden border border-gray-200">
            {isFirstImageLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <svg
                  className="animate-spin h-8 w-8 text-primary-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    className="opacity-75"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M12 2a10 10 0 0 1 10 10"
                  />
                </svg>
              </div>
            )}
            <Image
              src={firstImageError ? FALLBACK_IMAGE : (product.images[0]?.url || FALLBACK_IMAGE)}
              alt={product.images[0]?.alt || product.name || "Product image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover bg-gray-100 transition-opacity duration-500 ${
                product.images[1] && isHoverDevice ? "group-hover:opacity-0" : ""
              }`}
              onLoad={() => setIsFirstImageLoading(false)}
              onError={() => setFirstImageError(true)}
            />
            {product.images[1] && isHoverDevice && (
              <>
                {isSecondImageLoading && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100">
                    <svg
                      className="animate-spin h-8 w-8 text-primary-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        className="opacity-75"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M12 2a10 10 0 0 1 10 10"
                      />
                    </svg>
                  </div>
                )}
                <Image
                  src={secondImageError ? FALLBACK_IMAGE : (product.images[1]?.url || FALLBACK_IMAGE)}
                  alt={product.images[1]?.alt || product.name || "Product image"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  onLoad={() => setIsSecondImageLoading(false)}
                  onError={() => setSecondImageError(true)}
                />
              </>
            )}
            {product.variants &&
            product.variants.length > 0 &&
            product.variants.every((v) => v.inventory?.inStock === false) ? (
              <span className="absolute bottom-2 right-2 z-10 bg-red-600 px-3 py-1 text-[10px] sm:text-xs font-semibold text-white uppercase">
                Sold
              </span>
            ) : isCustom ? (
              <span className="absolute bottom-2 right-2 z-10 bg-primary-500 px-3 py-1 text-[10px] sm:text-xs font-semibold text-white">
                Custom Design
              </span>
            ) : (
              <span className="absolute bottom-2 right-2 z-10 bg-secondary-500 px-3 py-1 text-[10px] sm:text-xs font-semibold text-white">
                In Store
              </span>
            )}
          </div>

          <motion.div className="mt-4 flex flex-grow flex-col">
            <h3 className="mb-1 flex-grow text-sm text-gray-700">{product.name}</h3>
            <p className="mt-auto text-sm font-medium text-gray-900">
              {isQuoteOnly
                ? "Contact us for pricing"
                : product.priceRange.min === product.priceRange.max
                  ? `${getCurrencySymbol(
                      product.priceRange.currency,
                    )}${product.priceRange.min.toLocaleString()}`
                  : `${getCurrencySymbol(
                      product.priceRange.currency,
                    )}${product.priceRange.min.toLocaleString()} - ${getCurrencySymbol(
                      product.priceRange.currency,
                    )}${product.priceRange.max.toLocaleString()}`}
            </p>
          </motion.div>
        </Link>

        <motion.button
          className={`absolute top-2 left-2 rounded-full bg-white/80 p-2 hover:bg-white transition-all duration-300 ${
            isHoverDevice
              ? "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              : "opacity-100 visible"
          }`}
          onClick={onQuickView}
          whileHover={isHoverDevice ? buttonHover : undefined}
          whileTap={{ scale: 0.95 }}
        >
          <EyeOpenIcon className="h-4 w-4 text-gray-700" />
        </motion.button>

        <motion.button
          className={`absolute top-2 right-2 rounded-full bg-white/80 p-2 hover:bg-white z-10 ${
            isInWishlist ? "product-list__button--active" : ""
          }`}
          onClick={onWishlistToggle}
          whileHover={isHoverDevice ? buttonHover : undefined}
          whileTap={{ scale: 0.95 }}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <Heart fill="#D1A559" className="h-4 w-4 text-secondary-500" />
          ) : (
            <HeartIcon className="h-4 w-4 text-gray-700" />
          )}
        </motion.button>
      </motion.div>
    );
  },
);
ProductListItem.displayName = "ProductListItem";

/**
 * Product listing grid with wishlist and quick-view support.
 *
 * @description Renders a responsive grid of product cards. Each card supports image hover
 * transitions, a wishlist toggle, and a quick-view button. Duplicate products are filtered
 * by id.
 *
 * @param props.products - Array of products to display in the grid.
 * @returns The rendered product list.
 */
export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const hasAnimatedOnce = React.useRef(false);
  const { preferredCurrency, isHydrated } = useAccountStore();
  const { items, addItem, removeItem, hydrated, hydrate } = useWishlistStore();
  const { data: session } = useSession();
  const [lastCurrency, setLastCurrency] = useState(preferredCurrency);

  const addAlert = useAlertStore((state) => state.addAlert);

  useEffect(() => {
    if (!isHydrated) return;

    if (preferredCurrency && (!hydrated || preferredCurrency !== lastCurrency)) {
      hydrate(session?.user?.email ?? undefined, preferredCurrency);
      setLastCurrency(preferredCurrency);
    }
  }, [session, hydrate, preferredCurrency, hydrated, isHydrated, lastCurrency]);

  useEffect(() => {
    if (!quickViewProduct) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [quickViewProduct]);

  const wishlistProductVariantIds = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.productVariant && item.productVariant.id != null) {
        set.add(String(item.productVariant.id));
      }
    });
    return set;
  }, [items]);

  const handleWishlistToggle = useCallback(
    (product: Product) => {
      const variant = product.variants?.[0];
      if (!variant) return;

      const productVariantId = variant.id;
      const variantIdStr = String(productVariantId);

      if (wishlistProductVariantIds.has(variantIdStr)) {
        removeItem(productVariantId, session?.user?.email ?? undefined);
        addAlert({
          type: "info",
          title: "Removed from Wishlist",
          message: `${product.name} has been removed from your wishlist.`,
          duration: 3000,
          dismissible: true,
        });
      } else {
        addItem(
          variant,
          product.slug,
          product.category,
          session?.user?.email ?? undefined,
          preferredCurrency,
          product.isCustomDesign,
        );
        addAlert({
          type: "success",
          title: "Added to Wishlist",
          message: `${product.name} has been added to your wishlist.`,
          duration: 3000,
          dismissible: true,
        });
      }
    },
    [wishlistProductVariantIds, addItem, removeItem, session, preferredCurrency, addAlert],
  );

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const uniqueProducts = useMemo(() => {
    const seen = new Set<string>();
    return products.filter((product) => {
      if (!product.id) return false;
      const idStr = String(product.id);
      if (seen.has(idStr)) return false;
      seen.add(idStr);
      return true;
    });
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      hasAnimatedOnce.current = true;
    }
  }, [products]);

  return (
    <motion.div
      className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4"
      variants={container}
      initial={hasAnimatedOnce.current ? false : "hidden"}
      animate="show"
    >
      {uniqueProducts.map((product) => {
        const productVariantId = product.variants[0]?.id;
        const isInWishlist =
          productVariantId != null && wishlistProductVariantIds.has(String(productVariantId));
        return (
          <ProductListItem
            key={product.id}
            product={product}
            isInWishlist={isInWishlist}
            onWishlistToggle={(e) => {
              e.preventDefault();
              handleWishlistToggle(product);
            }}
            onQuickView={(e) => {
              e.preventDefault();
              handleQuickView(product);
            }}
          />
        );
      })}

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onWishlistToggle={handleWishlistToggle}
        />
      )}
    </motion.div>
  );
};
