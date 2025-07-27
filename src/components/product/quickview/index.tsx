"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Button } from "@/components/button";
import {
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
} from "@/components/icons";
import { MetalTypeSelector, GemstoneSelector } from "@/components/checkbox";
import { RingSizeSelector } from "@/components/select-menu";
import { Product, ProductVariant, Metal, Gemstone } from "@/lib/types/products";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import "./styles.scss";

interface ProductQuickViewProps {
  product: Product;
  onClose: () => void;
  onWishlistToggle: (product: Product) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onWishlistToggle,
}) => {
  const router = useRouter();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [selectedMetal, setSelectedMetal] = useState<Metal | undefined>(
    product.metals?.[0]
  );
  const [selectedGemstone, setSelectedGemstone] = useState<
    Gemstone | undefined
  >(product.gemstones?.[0]);

  const hasMultipleVariants = product.variants.length > 1;
  const isRing = product.category === "Rings";

  const uniqueGemstones = Array.from(
    new Set(product.gemstones?.map((gemstone) => gemstone.type) || [])
  );

  const { items } = useWishlistStore();
  const isInWishlist = items.some(
    (item) => item.productVariant?.id === selectedVariant.id
  );

  const { addItem } = useCartStore();
  const { data: session } = useSession();

  const onAddToCart = () => {
    addItem(
      selectedVariant,
      product.slug,
      product.category,
      quantity,
      session?.user?.email ?? undefined,
      selectedSize
    );
    router.push("/cart");
  };

  useEffect(() => {
    const matchingVariant = product.variants.find(
      (v) =>
        Array.isArray(v.metals) &&
        v.metals.some((m) => m.type === selectedMetal?.type) &&
        Array.isArray(v.gemstones) &&
        v.gemstones.some((g) => g.type === selectedGemstone?.type)
    );
    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      setCurrentImageIndex(0);
    }
  }, [selectedMetal?.type, selectedGemstone?.type, product.variants]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedVariant.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedVariant.images.length - 1 ? 0 : prev + 1
    );
  };

  // Animation variants
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modal = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const imageTransition = {
    enter: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const buttonTap = {
    scale: 0.95,
    transition: { duration: 0.1 },
  };

  return (
    <motion.div
      className="product-quick-view"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="product-quick-view__backdrop"
        onClick={onClose}
        variants={backdrop}
      ></motion.div>

      <div className="product-quick-view__container">
        <motion.div
          className="product-quick-view__modal"
          variants={modal}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            onClick={onClose}
            className="product-quick-view__close-button"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            <CloseIcon className="h-5 w-5 text-gray-800" />
          </motion.button>

          <div className="product-quick-view__image-container">
            <motion.div
              key={currentImageIndex}
              initial="exit"
              animate="enter"
              exit="exit"
              variants={imageTransition}
              className="product-quick-view__image"
            >
              <Image
                src={selectedVariant.images[currentImageIndex].url}
                alt={selectedVariant.images[currentImageIndex].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-contain"
                priority={currentImageIndex === 0}
                loading="eager"
              />
            </motion.div>

            {selectedVariant.images.length > 1 && (
              <>
                <motion.button
                  onClick={handlePrevImage}
                  className="product-quick-view__nav-button product-quick-view__nav-button--prev"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
                </motion.button>
                <motion.button
                  onClick={handleNextImage}
                  className="product-quick-view__nav-button product-quick-view__nav-button--next"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-800" />
                </motion.button>
              </>
            )}

            <motion.div
              className="product-quick-view__thumbnail-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {selectedVariant.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`product-quick-view__thumbnail-button ${
                    currentImageIndex === index
                      ? "product-quick-view__thumbnail-button--active"
                      : "product-quick-view__thumbnail-button--inactive"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="product-quick-view__content bg-slate-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="product-quick-view__header"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="product-quick-view__title">
                {selectedVariant.title}
              </h2>
              <p className="product-quick-view__price">
                ${selectedVariant.price.toLocaleString(undefined)}
              </p>
            </motion.div>

            {hasMultipleVariants &&
              product.metals &&
              product.metals.length > 1 && (
                <motion.div
                  className="product-quick-view__section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <MetalTypeSelector
                    metalOptions={product.metals}
                    selectedMetal={selectedMetal}
                    onSelectMetal={setSelectedMetal}
                  />
                </motion.div>
              )}

            {hasMultipleVariants &&
              product.gemstones &&
              uniqueGemstones.length > 1 && (
                <motion.div
                  className="product-quick-view__section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <GemstoneSelector
                    gemstoneOptions={product.gemstones}
                    selectedGemstone={selectedGemstone}
                    onSelectGemstone={setSelectedGemstone}
                  />
                </motion.div>
              )}

            <div className="flex flex-row justify-between gap-x-2">
              <motion.div
                className="product-quick-view__section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div>
                  <h3 className="product-quick-view__section-title">
                    Quantity
                  </h3>
                  <div className="product-quick-view__quantity-controls">
                    <motion.button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="product-quick-view__quantity-button"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <MinusIcon className="h-3 w-3" />
                    </motion.button>
                    <span className="product-quick-view__quantity-value">
                      {quantity}
                    </span>
                    <motion.button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="product-quick-view__quantity-button"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <PlusIcon className="h-3 w-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {isRing && (
                <motion.div
                  className="product-quick-view__section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <h3 className="product-quick-view__section-title">Size</h3>
                  <RingSizeSelector
                    selectedSize={selectedSize}
                    onSetSelectedSize={setSelectedSize}
                  />
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <div className="product-quick-view__action-buttons hidden md:grid ">
                <Button size="lg" onClick={onAddToCart}>
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onWishlistToggle(product)}
                  aria-label={
                    isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <span className="ml-2">
                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  </span>
                </Button>
              </div>
              <div className="product-quick-view__action-buttons grid md:hidden">
                <Button variant="outline" onClick={onAddToCart}>
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onWishlistToggle(product)}
                  aria-label={
                    isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <span className="ml-2">
                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  </span>
                </Button>
              </div>
              <Link
                className="product-quick-view__details-link"
                href={`/products/${product.slug}`}
              >
                View full details
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
