"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { HeartIcon, EyeOpenIcon } from "@/components/icons";
import { ProductQuickView } from "../quickview";
import { Product } from "@/lib/data/products";
import "./styles.scss";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

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

  return (
    <motion.div
      className="product-list"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="product-list__item group"
          variants={item}
          whileHover={hoverScale}
        >
          <Link
            href={`/products/${product.slug}`}
            className="product-list__link"
          >
            <div className="product-list__image-container">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="product-list__image product-list__image--primary"
              />
              <Image
                src={product.images[1]?.src || product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="product-list__image product-list__image--secondary"
              />
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
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            whileHover={buttonHover}
            whileTap={{ scale: 0.95 }}
          >
            <EyeOpenIcon className="product-list__icon" />
          </motion.button>

          <motion.button
            className="product-list__button product-list__button--wishlist"
            onClick={(e) => e.preventDefault()}
            whileHover={buttonHover}
            whileTap={{ scale: 0.95 }}
          >
            <HeartIcon className="product-list__icon" />
          </motion.button>
        </motion.div>
      ))}

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </motion.div>
  );
};
