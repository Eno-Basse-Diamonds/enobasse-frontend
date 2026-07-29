"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { RequestQuoteModal } from "@/app/(store)/products/[slug]/_components/RequestQuoteModal";
import { useCartStore } from "@/modules/cart/store";
import { useWishlistStore } from "@/modules/wishlist/store";
import { WishlistItem as WishlistItemInterface } from "@/modules/wishlist/types";
import { isProductCustomDesign, isQuoteOnlyProduct } from "@/modules/products/utils";
import { useAlertStore } from "@/shared/store/alert";
import { getCurrencySymbol } from "@/shared/utils/money";

type WishlistItemProps = {
  item: WishlistItemInterface;
  currentCurrency: string;
};

const FALLBACK_IMAGE = "https://res.cloudinary.com/enobasse/image/upload/v1756512499/collection-fallback_syzbce.png";

export const WishlistItem: React.FC<WishlistItemProps> = ({ item, currentCurrency }) => {
  const router = useRouter();
  const variant = item.productVariant;
  const { removeItem } = useWishlistStore();
  const { data: session } = useSession();
  const { addItem: addCartItem, loading: cartLoading } = useCartStore();
  const quantity = 1;
  const [isRequestQuoteOpen, setIsRequestQuoteOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const addAlert = useAlertStore((state) => state.addAlert);

  const displayCurrency = currentCurrency || variant.currency;
  const displayPrice = variant.price;
  const productRef = {
    isCustomDesign: item.isCustomDesign,
    category: item.productCategory,
    priceRange: { min: displayPrice },
  };
  const isCustomDesign = isProductCustomDesign(productRef);
  const isQuoteOnly = isQuoteOnlyProduct(productRef, displayPrice);

  const handleAddToCart = () => {
    if (isQuoteOnly) {
      setIsRequestQuoteOpen(true);
      return;
    }
    addCartItem(
      variant,
      item.productSlug,
      item.productCategory,
      quantity,
      session?.user?.email ?? undefined,
    );
    removeItem(variant.id, session?.user?.email ?? undefined);
    addAlert({
      type: "success",
      title: "Added to Cart",
      message: `${variant.title} has been added to your cart.`,
      duration: 4000,
      dismissible: true,
    });
  };

  return (
    <li className="py-4 transition-colors">
      <div className="flex gap-4">
        <Link
          href={`/products/${item.productSlug}`}
          className="shrink-0 relative size-24 md:size-40 overflow-hidden border border-gray-200"
        >
          <Image
            src={imageError ? FALLBACK_IMAGE : (variant.images?.[0]?.url || FALLBACK_IMAGE)}
            alt={variant.images?.[0]?.alt || variant.title}
            fill
            className="size-full object-cover"
            sizes="(max-width: 768px) 100px, 150px"
            onError={() => setImageError(true)}
          />
        </Link>

        <div className="flex flex-col flex-1">
          <h3 className="font-medium text-[#502B3A]">
            <Link
              href={`/products/${item.productSlug}`}
              className="hover:underline transition-all"
            >
              {variant.title}
            </Link>
          </h3>
          <p className="text-sm text-[#502B3A]/70 mt-1">
            {variant.gemstones?.[0] &&
              (variant.gemstones[0].weightCarat
                ? `${variant.gemstones[0].weightCarat}ct ${variant.gemstones[0].type}`
                : variant.gemstones[0].type)}
            {variant.gemstones?.[0] && variant.metals?.[0] ? " | " : null}
            {variant.metals?.[0] && `${variant.metals[0].purity} ${variant.metals[0].type}`}
          </p>
          <p className="font-medium text-[#502B3A] mt-1">
            {isQuoteOnly ? (
              "Contact us for pricing"
            ) : (
              <>
                {getCurrencySymbol(displayCurrency)}
                {displayPrice?.toLocaleString()}
              </>
            )}
          </p>

          <div className="mt-auto pt-4 flex justify-between items-center">
            <div className="flex gap-3">
              {!isQuoteOnly ? (
                <button
                  type="button"
                  className="font-medium text-sm rounded-sm text-[#D1A559] border-[#D1A559] hover:underline"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="font-medium text-sm rounded-sm text-[#D1A559] border-[#D1A559] hover:underline"
                    onClick={() => setIsRequestQuoteOpen(true)}
                  >
                    REQUEST A QUOTE
                  </button>
                  {isRequestQuoteOpen && (
                    <RequestQuoteModal
                      isOpen={isRequestQuoteOpen}
                      onClose={() => setIsRequestQuoteOpen(false)}
                      product={
                        (item.productVariant as any).product || {
                          id: variant.id,
                          name: variant.title,
                          slug: item.productSlug,
                          description: variant.description || "",
                          priceRange: {
                            min: variant.price,
                            max: variant.price,
                            currency: variant.currency,
                          },
                          category: item.productCategory,
                          images: variant.images || [],
                          variants: [variant],
                          createdAt: new Date(),
                        }
                      }
                      variantImage={item.productVariant.images[0]?.url}
                    />
                  )}
                </>
              )}
              <button
                type="button"
                className="font-medium rounded-sm text-sm text-red-500 hover:underline"
                onClick={async () => {
                  await removeItem(variant.id, session?.user?.email ?? undefined);
                }}
              >
                REMOVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
