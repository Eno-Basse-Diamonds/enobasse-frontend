"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { easeOut } from "motion/react";
import * as motion from "motion/react-client";

import { RequestQuoteModal } from "@/app/(store)/products/[slug]/_components/RequestQuoteModal";
import { useCartStore } from "@/modules/cart/store";
import { Gemstone, Metal, Product, ProductVariant } from "@/modules/products/types";
import { useWishlistStore } from "@/modules/wishlist/store";
import { Button } from "@/shared/components/Button";
import { GemstoneSelector, MetalTypeSelector } from "@/shared/components/Checkbox";
import { RingSizeSelector } from "@/shared/components/SelectMenu";
import { ChevronLeftIcon } from "@/shared/components/icons/ChevronLeft";
import { ChevronRightIcon } from "@/shared/components/icons/ChevronRight";
import { CloseIcon } from "@/shared/components/icons/Close";
import { MinusIcon } from "@/shared/components/icons/Minus";
import { PlusIcon } from "@/shared/components/icons/Plus";
import { useAlertStore } from "@/shared/store/alert";
import { getCurrencySymbol } from "@/shared/utils/money";

interface ProductQuickViewProps {
  product: Product;
  onClose: () => void;
  onWishlistToggle: (product: Product) => void;
}

/**
 * Product quick-view modal overlay.
 *
 * @description Renders a full-screen modal overlay for previewing a product without
 * navigating away. Displays product images with navigation, variant selection (metal,
 * gemstone, size, quantity), add-to-cart / wishlist actions, and a request-quote option
 * for custom designs.
 *
 * @param props.product - The product to display in the quick view.
 * @param props.onClose - Callback invoked when the modal is dismissed.
 * @param props.onWishlistToggle - Callback invoked when the wishlist button is clicked.
 * @returns The rendered quick-view modal.
 */
export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onWishlistToggle,
}) => {
  const router = useRouter();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedMetal, setSelectedMetal] = useState<Metal | undefined>(product.metals?.[0]);
  const [selectedGemstone, setSelectedGemstone] = useState<Gemstone | undefined>(
    product.gemstones?.[0],
  );
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isMainImageLoading, setIsMainImageLoading] = useState(true);
  const [loadingThumbnails, setLoadingThumbnails] = useState<Set<number>>(
    new Set(selectedVariant.images.map((_, index) => index)),
  );

  const hasMultipleVariants = product.variants.length > 1;
  const isRing = product.category === "Rings";

  const uniqueGemstones = Array.from(
    new Set(product.gemstones?.map((gemstone) => gemstone.type) || []),
  );

  const { items } = useWishlistStore();
  const isInWishlist = items.some((item) => item.productVariant?.id === selectedVariant.id);

  const { addItem } = useCartStore();
  const { data: session } = useSession();
  const addAlert = useAlertStore((state) => state.addAlert);

  const onAddToCart = () => {
    addItem(
      selectedVariant,
      product.slug,
      product.category,
      quantity,
      session?.user?.email ?? undefined,
      selectedSize,
    );
    addAlert({
      type: "success",
      title: "Added to Cart",
      message: `${selectedVariant.title || product.name} has been added to your cart.`,
      duration: 4000,
      dismissible: true,
    });
  };

  useEffect(() => {
    const matchingVariant = product.variants.find((v) => {
      const matchMetal =
        !selectedMetal ||
        (Array.isArray(v.metals) && v.metals.some((m) => m.type === selectedMetal.type));
      const matchGemstone =
        !selectedGemstone ||
        (Array.isArray(v.gemstones) && v.gemstones.some((g) => g.type === selectedGemstone.type));

      return matchMetal && matchGemstone;
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      setCurrentImageIndex(0);
      setIsMainImageLoading(true);
      setLoadingThumbnails(new Set(matchingVariant.images.map((_, index) => index)));
    } else if (selectedVariant?.id) {
      const variantById = product.variants.find((v) => v.id === selectedVariant.id);
      if (variantById) {
        setSelectedVariant(variantById);
      }
    }
  }, [selectedMetal, selectedGemstone, product]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? selectedVariant.images.length - 1 : prev - 1));
    setIsMainImageLoading(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === selectedVariant.images.length - 1 ? 0 : prev + 1));
    setIsMainImageLoading(true);
  };

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
      transition: { duration: 0.3, ease: easeOut },
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
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="fixed inset-0 bg-gray-600/90 transition-opacity duration-300"
        onClick={onClose}
        variants={backdrop}
      />

      <div className="relative w-full h-full md:h-[80vh] md:px-4 lg:h-[85vh]">
        <motion.div
          className="relative w-full h-full bg-white flex flex-col overflow-hidden md:flex-row md:mx-auto md:w-[90%] lg:w-[80%] lg:max-w-[80rem]"
          variants={modal}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-200 hover:bg-white"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            <CloseIcon className="h-5 w-5 text-gray-800" />
          </motion.button>

          <div className="relative flex-shrink-0 w-full h-[35vh] md:w-1/2 md:h-full">
            {isMainImageLoading && (
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
            <motion.div
              key={currentImageIndex}
              initial="exit"
              animate="enter"
              exit="exit"
              variants={imageTransition}
              className="relative w-full h-full"
            >
              <Image
                src={selectedVariant.images[currentImageIndex].url}
                alt={selectedVariant.images[currentImageIndex].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-contain"
                priority={currentImageIndex === 0}
                loading="eager"
                onLoad={() => setIsMainImageLoading(false)}
              />
            </motion.div>

            {selectedVariant.images.length > 1 && (
              <>
                <motion.button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 -translate-y-1/2 p-2 bg-gray-100 transition-colors duration-200 rounded-full hover:bg-gray-50 left-4"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
                </motion.button>
                <motion.button
                  onClick={handleNextImage}
                  className="absolute top-1/2 -translate-y-1/2 p-2 bg-gray-100 transition-colors duration-200 rounded-full hover:bg-gray-50 right-4"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-800" />
                </motion.button>
              </>
            )}

            <motion.div
              className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {selectedVariant.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsMainImageLoading(true);
                  }}
                  className={`relative w-12 h-12 overflow-hidden ${
                    currentImageIndex === index ? "border-2 border-primary-500" : "opacity-70"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loadingThumbnails.has(index) && (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                      <svg
                        className="animate-spin h-3 w-3 text-primary-500"
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
                    src={image.url}
                    alt={image.alt}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                    onLoad={() => {
                      setLoadingThumbnails((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(index);
                        return newSet;
                      });
                    }}
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="w-full p-6 overflow-y-auto bg-slate-50 md:w-1/2 md:p-8 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold md:text-2xl font-primary text-primary-500">
                {selectedVariant.title}
              </h2>
              {product.isCustomDesign && selectedVariant?.price === 0 ? (
                <div>
                  <p className="text-primary-500 text-lg font-semibold">
                    Price available upon request
                  </p>
                </div>
              ) : (
                <p className="md:text-xl font-medium text-primary-500 mt-2">
                  {getCurrencySymbol(product.priceRange.currency)}
                  {selectedVariant.price.toLocaleString(undefined)}
                </p>
              )}
            </motion.div>

            {hasMultipleVariants && product.metals && product.metals.length > 1 && (
              <motion.div
                className="mb-6"
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

            {hasMultipleVariants && product.gemstones && uniqueGemstones.length > 1 && (
              <motion.div
                className="mb-6"
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
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-2">Quantity</h3>
                  <div className="flex items-center gap-2 p-1 border border-primary-500/20 w-fit rounded-sm">
                    <motion.button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="p-2 text-primary-500 transition-colors duration-200 hover:bg-primary-500/10"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <MinusIcon className="h-3 w-3" />
                    </motion.button>
                    <span className="px-4 font-medium">{quantity}</span>
                    <motion.button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="p-2 text-primary-500 transition-colors duration-200 hover:bg-primary-500/10"
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
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <h3 className="text-sm font-medium text-gray-800 mb-2">Size</h3>
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
              {!product.isCustomDesign || selectedVariant?.price !== 0 ? (
                <>
                  <div className="grid-cols-2 gap-4 mb-4 hidden md:grid">
                    {selectedVariant?.inventory?.inStock === false ||
                    selectedVariant?.inventory?.quantity === 0 ? (
                      <Button
                        size="lg"
                        disabled
                        className="bg-red-600/50 cursor-not-allowed hover:bg-red-600/50"
                      >
                        Sold
                      </Button>
                    ) : (
                      <Button size="lg" onClick={onAddToCart}>
                        Add to Cart
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => onWishlistToggle(product)}
                      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <span className="ml-2">
                        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                      </span>
                    </Button>
                  </div>
                  <div className="grid-cols-2 gap-4 mb-4 grid md:hidden">
                    {selectedVariant?.inventory?.inStock === false ||
                    selectedVariant?.inventory?.quantity === 0 ? (
                      <Button
                        variant="outline"
                        disabled
                        className="bg-red-600/50 cursor-not-allowed hover:bg-red-600/50"
                      >
                        Sold
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={onAddToCart}>
                        Add to Cart
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => onWishlistToggle(product)}
                      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <span className="ml-2">
                        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                      </span>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="mb-4">
                  <Button size="lg" onClick={() => setIsQuoteModalOpen(true)} className="w-full">
                    Request a Quote
                  </Button>
                </div>
              )}
              <Link
                className="inline-block w-full text-center font-medium text-primary-500 no-underline hover:underline hover:h-[1px] hover:underline-offset-2"
                href={`/products/${product.slug}`}
              >
                View full details
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={product}
        variantImage={selectedVariant?.images?.[0]?.url}
      />
    </motion.div>
  );
};
