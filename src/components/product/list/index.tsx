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
import { blurDataURL } from "@/lib/utils/constants";
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
  transition: { duration: 0.3, ease: "easeOut" },
};

const buttonHover = {
  scale: 1.1,
  transition: { duration: 0.2 },
};

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
    return (
      <motion.div
        className="group relative flex flex-col overflow-hidden bg-white"
        variants={item}
        whileHover={hoverScale}
      >
        <Link
          href={`/products/${product.slug}`}
          className="flex h-full flex-col"
        >
          <div className="relative aspect-square overflow-hidden border border-gray-200">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover bg-gray-100 transition-opacity duration-500 ${
                product.images[1] ? "group-hover:opacity-0" : ""
              }`}
            />
            {product.images[1] && (
              <Image
                src={product.images[1].url}
                alt={product.images[1].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
            {!product.isCustomDesign && (
              <span className="absolute bottom-2 right-2 z-10 bg-secondary-500 px-3 py-1 text-xs font-semibold text-white">
                In Store
              </span>
            )}
          </div>

          <motion.div className="mt-4 flex flex-grow flex-col">
            <h3 className="mb-1 flex-grow text-gray-700">{product.name}</h3>
            <p className="mt-auto font-medium text-gray-900">
              {product.priceRange.min === product.priceRange.max
                ? `${getCurrencySymbol(
                    product.priceRange.currency
                  )}${product.priceRange.min.toLocaleString()}`
                : `${getCurrencySymbol(
                    product.priceRange.currency
                  )}${product.priceRange.min.toLocaleString()} - ${getCurrencySymbol(
                    product.priceRange.currency
                  )}${product.priceRange.max.toLocaleString()}`}
            </p>
          </motion.div>
        </Link>

        <motion.button
          className="absolute top-2 left-2 rounded-full bg-white/80 p-2 hover:bg-white lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-300"
          onClick={onQuickView}
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
        >
          <EyeOpenIcon className="h-4 w-4 text-gray-700" />
        </motion.button>

        <motion.button
          className={`absolute top-2 right-2 rounded-full bg-white/80 p-2 hover:bg-white ${
            isInWishlist ? "product-list__button--active" : ""
          }`}
          onClick={onWishlistToggle}
          whileHover={buttonHover}
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
  }
);
ProductListItem.displayName = "ProductListItem";

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
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
    async (product: Product) => {
      if (!hydrated) return;

      const productVariantId = product.variants[0].id;
      if (wishlistProductVariantIds.has(productVariantId)) {
        await removeItem(productVariantId, session?.user?.email ?? undefined);
      } else {
        await addItem(
          product.variants[0],
          product.slug,
          product.category,
          session?.user?.email ?? undefined,
          preferredCurrency
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
    ]
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
