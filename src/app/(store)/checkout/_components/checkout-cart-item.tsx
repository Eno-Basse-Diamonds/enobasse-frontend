"use client";

import Image from "next/image";
import Link from "next/link";
import { QuantityControl } from "../../cart/_components/quantity-control";
import { SizeSelect } from "../../cart/_components/size-select";
import { CartItem } from "@/lib/types/carts";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { getCurrencySymbol } from "@/lib/utils/money";
import { CloseIcon } from "@/components/icons/close";
import { Engraving } from "@/components/modal";

interface CheckoutCartItemProps {
  item: CartItem;
  ringSizes: number[];
  currency: string;
}

export function CheckoutCartItem({
  item,
  ringSizes,
  currency,
}: CheckoutCartItemProps) {
  const { removeItem, updateItem } = useCartStore();
  const { data: session } = useSession();
  const accountEmail = session?.user?.email ?? undefined;

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateItem(
        item.productVariant.id,
        { quantity: item.quantity - 1 },
        accountEmail,
      );
    }
  };

  const handleIncrement = () => {
    updateItem(
      item.productVariant.id,
      { quantity: item.quantity + 1 },
      accountEmail,
    );
  };

  const handleRemove = () => {
    removeItem(item.productVariant.id, accountEmail);
  };

  const imageUrl = item.productVariant.images?.[0]?.url;
  const imageAlt = item.productVariant.images?.[0]?.alt || "Product image";
  const title = item.productVariant.title || "Product";
  const price = item.productVariant.price || 0;
  const metals = item.productVariant.metals;
  const gemstones = item.productVariant.gemstones;
  const metalStr =
    metals && metals.length > 0
      ? `${metals[0].purity || ""} ${metals[0].type || ""}`
      : "";
  const gemstoneStr =
    gemstones && gemstones.length > 0
      ? `${gemstones[0].weightCarat ? `${gemstones[0].weightCarat}ct ` : ""}${
          gemstones[0].type || ""
        }`
      : "";

  const engravableProducts = ["Rings", "Wristwears", "Neckpieces"];
  const canBeEngraved = engravableProducts.includes(item.productCategory);
  const isRing = item.productCategory === "Rings";

  return (
    <li className="py-4 flex items-start gap-4">
      <div className="flex-shrink-0 h-20 w-20 sm:h-24 sm:w-24 overflow-hidden border border-gray-200 relative rounded-sm">
        <Link
          href={`/products/${item.productSlug}`}
          className="relative block w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 80px, 96px"
          />
        </Link>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <Link
              href={`/products/${item.productSlug}`}
              className="font-medium text-sm sm:text-base text-[#502B3A] hover:underline transition-all block truncate"
            >
              <h3>{title}</h3>
            </Link>

            <p className="text-xs sm:text-sm text-[#502B3A]/80 mt-1 truncate">
              {gemstoneStr && metalStr
                ? `${gemstoneStr} | ${metalStr}`
                : metalStr || gemstoneStr}
            </p>

            <div className="my-2 sm:my-3 flex flex-wrap items-center gap-3 sm:gap-4 justify-between">
              <QuantityControl
                quantity={item.quantity}
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
              />

              {isRing && (
                <SizeSelect
                  id={`checkout-size-${item.productVariant.id}`}
                  sizes={ringSizes}
                  selectedSize={item.size}
                  onChange={(size) =>
                    updateItem(item.productVariant.id, { size }, accountEmail)
                  }
                />
              )}
            </div>

            {canBeEngraved && (
              <div className="mb-2">
                <Engraving
                  engraving={item.engraving}
                  setEngraving={(val) =>
                    updateItem(
                      item.productVariant.id,
                      { engraving: val },
                      accountEmail,
                    )
                  }
                />
              </div>
            )}

            <div className="flex flex-row w-full justify-between items-end gap-x-2 mt-1 sm:mt-2">
              <p className="text-[10px] sm:text-xs text-gray-500">
                {item.quantity > 1 && (
                  <>
                    {getCurrencySymbol(currency)}
                    {price.toLocaleString()} each
                  </>
                )}
              </p>
              <p className="text-sm sm:text-base font-medium text-[#502B3A]">
                {getCurrencySymbol(currency)}
                {(price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 ml-2">
            <button
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
