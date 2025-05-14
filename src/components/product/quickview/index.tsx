"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import {
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  ChevronDownIcon,
} from "@/components/icons";
import { Product } from "@/lib/data/products";
import "./styles.scss";

interface ProductQuickViewProps {
  product: Product;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const ringSizes = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];

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
                src={product.images[currentImageIndex].src}
                alt={product.images[currentImageIndex].alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {product.images.length > 1 && (
              <>
                <motion.button
                  onClick={handlePrevImage}
                  className="product-quick-view__nav-button product-quick-view__nav-button--prev"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
                </motion.button>
                <motion.button
                  onClick={handleNextImage}
                  className="product-quick-view__nav-button product-quick-view__nav-button--next"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
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
              {product.images.map((image, index) => (
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
                    src={image.src}
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
            className="product-quick-view__content"
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
              <h2 className="product-quick-view__title">{product.name}</h2>
              <p className="product-quick-view__price">
                {product.priceRange.min === product.priceRange.max
                  ? `$${product.priceRange.min.toLocaleString(undefined)}`
                  : `$${product.priceRange.min.toLocaleString(undefined)} - $${product.priceRange.max.toLocaleString(undefined)}`}
              </p>
            </motion.div>

            <motion.div
              className="product-quick-view__section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="flex justify-between items-center w-full mb-2">
                <h3 className="product-quick-view__section-title">Size</h3>
                <Link
                  href="/ring-size-guide"
                  className="product-quick-view__size-guide-link"
                >
                  Size guide
                </Link>
              </div>
              <div className="product-quick-view__size-options">
                {ringSizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`product-quick-view__size-button ${
                      selectedSize === size
                        ? "product-quick-view__size-button--selected"
                        : "product-quick-view__size-button--unselected"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="product-quick-view__section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MetalSelection />
            </motion.div>

            <motion.div
              className="product-quick-view__section flex flex-row items-start gap-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div>
                <h3 className="product-quick-view__section-title">
                  Total Carat Weight
                </h3>
                <div className="product-quick-view__select-wrapper">
                  <select className="product-quick-view__select">
                    <option>0.39 ct</option>
                    <option>0.41 ct</option>
                  </select>
                  <ChevronDownIcon className="product-quick-view__select-icon" />
                </div>
              </div>

              <div>
                <h3 className="product-quick-view__section-title">Quantity</h3>
                <div className="product-quick-view__quantity-controls">
                  <motion.button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="product-quick-view__action-buttons">
                <motion.button
                  className="product-quick-view__action-button product-quick-view__action-button--primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  className="product-quick-view__action-button product-quick-view__action-button--secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Wishlist
                </motion.button>
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

const MetalSelection = () => {
  const [selectedMetal, setSelectedMetal] = useState({
    name: "White Gold",
    purity: "14K",
  });

  const metalOptions = [
    { name: "Rose Gold", purity: "14K", color: "border-[#E1A79F] bg-[#E1A79F]/30" },
    { name: "White Gold", purity: "14K", color: "border-[#D8D8D8] bg-[#D8D8D8]/30" },
    {
      name: "Yellow Gold",
      purity: "14K",
      color: "border-[#EDC789] bg-[#EDC789]/30",
    },
    { name: "Rose Gold", purity: "18K", color: "border-[#E1A79F] bg-[#E1A79F]/30" },
    { name: "White Gold", purity: "18K", color: "border-[#D8D8D8] bg-[#D8D8D8]/30" },
    {
      name: "Yellow Gold",
      purity: "18K",
      color: "border-[#EDC789] bg-[#EDC789]/30",
    },
    { name: "Platinum", purity: "Pt", color: "border-[#757575] bg-[#757575]/30" },
  ];

  return (
    <div className="metal-selection">
      <h3 className="metal-selection__title">
        <span className="metal-selection__title-span">Metal Type: </span> {selectedMetal.purity} {selectedMetal.name}
      </h3>
      <div className="metal-selection__options">
        {metalOptions.map((metal) => (
          <motion.button
            key={`${metal.name}-${metal.purity}`}
            onClick={() => setSelectedMetal(metal)}
            className={`metal-selection__button ${metal.color} ${
              selectedMetal.name === metal.name &&
              selectedMetal.purity === metal.purity
                ? "metal-selection__button--selected"
                : "hover:opacity-90"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {metal.purity}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
