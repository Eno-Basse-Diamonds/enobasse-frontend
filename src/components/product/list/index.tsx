"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import * as motion from "motion/react-client";
import { Heart } from "lucide-react";
import { ProductQuickView } from "../quickview";
import { Product } from "@/lib/types/products";
import { useWishlistStore } from "@/lib/store/wishlist";
import { getCurrencySymbol } from "@/lib/utils/money";
import { useAccountStore } from "@/lib/store/account";
import { easeOut } from "motion/react";
import { EyeOpenIcon } from "@/components/icons/eye-open";
import { HeartIcon } from "@/components/icons/heart";

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

import { useMobileDetection } from "@/lib/hooks/use-mobile-detection";

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
    const [isSecondImageLoading, setIsSecondImageLoading] = useState(
      !!product.images[1],
    );

    const { isMobile } = useMobileDetection();
    const isHoverDevice = !isMobile;

    return (
      <motion.div
        className="group relative flex flex-col overflow-hidden bg-white"
        variants={item}
        whileHover={isHoverDevice ? hoverScale : undefined}
      >
        <Link
          href={`/products/${product.slug}`}
          className="flex h-full flex-col"
        >
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
              src={product.images[0].url}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover bg-gray-100 transition-opacity duration-500 ${
                product.images[1] && isHoverDevice
                  ? "group-hover:opacity-0"
                  : ""
              }`}
              onLoad={() => setIsFirstImageLoading(false)}
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
                  src={product.images[1].url}
                  alt={product.images[1].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  onLoad={() => setIsSecondImageLoading(false)}
                />
              </>
            )}
            {!product.isCustomDesign && (
              <span className="absolute bottom-2 right-2 z-10 bg-secondary-500 px-3 py-1 text-[10px] sm:text-xs font-semibold text-white">
                In Store
              </span>
            )}
          </div>

          <motion.div className="mt-4 flex flex-grow flex-col">
            <h3 className="mb-1 flex-grow text-sm text-gray-700">
              {product.name}
            </h3>
            <p className="mt-auto text-sm font-medium text-gray-900">
              {product.isCustomDesign && product.priceRange.min === 0
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

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const { preferredCurrency, isHydrated } = useAccountStore();
  const { items, addItem, removeItem, hydrated, hydrate } = useWishlistStore();
  const { data: session } = useSession();
  const [lastCurrency, setLastCurrency] = useState(preferredCurrency);

  useEffect(() => {
    if (!isHydrated) return;

    if (
      session?.user?.email &&
      preferredCurrency &&
      preferredCurrency !== lastCurrency
    ) {
      hydrate(session.user.email, preferredCurrency);
      setLastCurrency(preferredCurrency);
    } else if (session?.user?.email && preferredCurrency && !hydrated) {
      hydrate(session.user.email, preferredCurrency);
      setLastCurrency(preferredCurrency);
    }
  }, [session, hydrate, preferredCurrency, hydrated, isHydrated, lastCurrency]);

  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [quickViewProduct]);

  const wishlistProductVariantIds = useMemo(() => {
    const set = new Set<string | number>();
    items.forEach((item) => {
      if (item.productVariant && item.productVariant.id) {
        set.add(item.productVariant.id);
      }
    });
    return set;
  }, [items]);

  const handleWishlistToggle = useCallback(
    (product: Product) => {
      if (!hydrated) return;

      const productVariantId = product.variants[0].id;
      if (wishlistProductVariantIds.has(productVariantId)) {
        removeItem(productVariantId, session?.user?.email ?? undefined);
      } else {
        addItem(
          product.variants[0],
          product.slug,
          product.category,
          session?.user?.email ?? undefined,
          preferredCurrency,
          product.isCustomDesign,
        );
      }
    },
    [
      hydrated,
      wishlistProductVariantIds,
      addItem,
      removeItem,
      session,
      preferredCurrency,
    ],
  );

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  return (
    <motion.div
      className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => {
        const productVariantId = product.variants[0]?.id;
        const isInWishlist = wishlistProductVariantIds.has(productVariantId);
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
