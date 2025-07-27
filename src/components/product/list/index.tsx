"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { HeartIcon, EyeOpenIcon } from "@/components/icons";
import { ProductQuickView } from "../quickview";
import { Product } from "@/lib/types/products";
import { useWishlistStore } from "@/lib/store/wishlist";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import "./styles.scss";

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
        className="product-list__item group"
        variants={item}
        whileHover={hoverScale}
      >
        <Link href={`/products/${product.slug}`} className="product-list__link">
          <div className="product-list__image-container">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`product-list__image bg-gray-100 ${
                product.images[1] ? "product-list__image--primary" : ""
              }`}
              quality={100}
            />
            {product.images[1] && (
              <Image
                src={product.images[1].url}
                alt={product.images[1].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="product-list__image product-list__image--secondary bg-gray-100"
                quality={100}
              />
            )}
            {!product.isCustomDesign && (
              <span className="product-list__instore-tag">In Store</span>
            )}
          </div>

          <motion.div className="product-list__details">
            <h3 className="product-list__title">{product.name}</h3>
            <p className="product-list__price">
              {product.priceRange.min === product.priceRange.max
                ? `$${product.priceRange.min.toLocaleString()}`
                : `$${product.priceRange.min.toLocaleString()} - $${product.priceRange.max.toLocaleString()}`}
            </p>
          </motion.div>
        </Link>

        <motion.button
          className="product-list__button product-list__button--quick-view"
          onClick={onQuickView}
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
        >
          <EyeOpenIcon className="product-list__icon" />
        </motion.button>

        <motion.button
          className={`product-list__button product-list__button--wishlist ${
            isInWishlist ? "product-list__button--active" : ""
          }`}
          onClick={onWishlistToggle}
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <Heart fill="#D1A559" className="text-secondary-500 h-4 w-4" />
          ) : (
            <HeartIcon className="product-list__icon" />
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
  const { items, addItem, removeItem, hydrated, hydrate } = useWishlistStore();
  const { data: session } = useSession();

  useEffect(() => {
    hydrate(session?.user?.email ?? undefined);
  }, [session, hydrate]);

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
          session?.user?.email ?? undefined
        );
      }
    },
    [hydrated, wishlistProductVariantIds, addItem, removeItem, session]
  );

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  return (
    <motion.div
      className="product-list"
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
