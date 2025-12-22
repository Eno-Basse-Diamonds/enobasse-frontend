"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { WishlistItem as WishlistItemInterface } from "@/lib/types/wishlists";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/lib/store/cart";
import { getCurrencySymbol } from "@/lib/utils/money";
import { useState } from "react";
import { RequestQuoteModal } from "@/app/(store)/products/[slug]/_components/request-quote-modal";
import { useAlertStore } from "@/lib/store/alert";

type WishlistItemProps = {
  item: WishlistItemInterface;
  currentCurrency: string;
};

export const WishlistItem: React.FC<WishlistItemProps> = ({
  item,
  currentCurrency,
}) => {
  const router = useRouter();
  const variant = item.productVariant;
  const { removeItem } = useWishlistStore();
  const { data: session } = useSession();
  const { addItem: addCartItem, loading: cartLoading } = useCartStore();
  const quantity = 1;
  const [isRequestQuoteOpen, setIsRequestQuoteOpen] = useState(false);
  const addAlert = useAlertStore((state) => state.addAlert);

  const handleAddToCart = () => {
    addCartItem(
      variant,
      item.productSlug,
      item.productCategory,
      quantity,
      session?.user?.email ?? undefined
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

  const displayCurrency = currentCurrency || variant.currency;
  const displayPrice = variant.price;

  return (
    <li className="py-4 transition-colors">
      <div className="flex gap-4">
        <Link
          href={`/products/${item.productSlug}`}
          className="shrink-0 relative size-24 md:size-40 overflow-hidden border border-gray-200"
        >
          <Image
            src={variant.images?.[0].url}
            alt={variant.images?.[0]?.alt || variant.title}
            fill
            className="size-full object-cover"
            sizes="(max-width: 768px) 100px, 150px"
          />
        </Link>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <div>
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
                {variant.metals?.[0] &&
                  `${variant.metals[0].purity} ${variant.metals[0].type}`}
              </p>
            </div>
            <p className="font-medium text-[#502B3A] whitespace-nowrap">
              {item.isCustomDesign ? (
                "Contact us for pricing"
              ) : (
                <>
                  {getCurrencySymbol(displayCurrency)}
                  {displayPrice?.toLocaleString()}
                </>
              )}
            </p>
          </div>

          <div className="mt-auto pt-4 flex justify-between items-center">
            <div className="flex gap-3">
              {!item.isCustomDesign ? (
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
                      product={(item.productVariant as any).product}
                      variantImage={item.productVariant.images[0]?.url}
                    />
                  )}
                </>
              )}
              <button
                type="button"
                className="font-medium rounded-sm text-sm text-red-500 hover:underline"
                onClick={async () => {
                  await removeItem(
                    variant.id,
                    session?.user?.email ?? undefined
                  );
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
