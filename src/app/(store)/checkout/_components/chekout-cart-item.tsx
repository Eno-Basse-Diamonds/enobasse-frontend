"use client";

import Image from "next/image";
import Link from "next/link";
import { CloseIcon } from "@/components/icons";
import { Engraving } from "@/components";
import { QuantityControl } from "../../cart/_components/quantity-control";
import { SizeSelect } from "../../cart/_components/size-select";
import { CartItem } from "@/lib/types/carts";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { getCurrencySymbol } from "@/lib/utils/money";

interface CheckoutCartItemProps {
  item: CartItem;
  ringSizes: number[];
}

export function CheckoutCartItem({ item, ringSizes }: CheckoutCartItemProps) {
  const { removeItem, updateItem } = useCartStore();
  const { data: session } = useSession();
  const accountEmail = session?.user?.email ?? undefined;

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateItem(
        item.productVariant.id,
        { quantity: item.quantity - 1 },
        accountEmail
      );
    }
  };

  const handleIncrement = () => {
    updateItem(
      item.productVariant.id,
      { quantity: item.quantity + 1 },
      accountEmail
    );
  };

  const handleRemove = () => {
    removeItem(item.productVariant.id, accountEmail);
  };

  const imageUrl =
    item.productVariant.images?.[0]?.url || "/images/cart-item.png";
  const imageAlt = item.productVariant.images?.[0]?.alt || "Product image";
  const title = item.productVariant.title || "Product";
  const price = item.productVariant.price || 0;
  const currency = item.productVariant.currency || "$";
  const metals = item.productVariant.metals;
  const gemstones = item.productVariant.gemstones;
  const metalStr =
    metals && metals.length > 0
      ? `${metals[0].purity || ""} ${metals[0].type || ""}`
      : "";
  const gemstoneStr =
    gemstones && gemstones.length > 0
      ? `${gemstones[0].weightCarat ? `${gemstones[0].weightCarat}ct ` : ""}${gemstones[0].type || ""}`
      : "";

  const engravableProducts = ["Rings", "Wristwears", "Neckpieces"];
  const canBeEngraved = engravableProducts.includes(item.productCategory);
  const isRing = item.productCategory === "Rings";

  return (
    <li className="py-4 flex items-start">
      <div className="flex-shrink-0 h-24 w-24 overflow-hidden border border-gray-200 relative">
        <Link href={`/products/${item.productSlug}`}>
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
        </Link>
      </div>

      <div className="ml-4 flex-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <Link
              href={`/products/${item.productSlug}`}
              className="font-medium text-base text-[#502B3A] hover:underline transition-all"
            >
              <h3>{title}</h3>
            </Link>

            <p className="text-sm text-[#502B3A]/80 mt-1">
              {gemstoneStr && metalStr
                ? `${gemstoneStr} | ${metalStr}`
                : metalStr || gemstoneStr}
            </p>

            <div className="my-3 flex items-center gap-4 justify-between">
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
              <Engraving
                engraving={item.engraving}
                setEngraving={(val) =>
                  updateItem(
                    item.productVariant.id,
                    { engraving: val },
                    accountEmail
                  )
                }
              />
            )}

            <div className="flex flex-row w-full justify-between items-end gap-x-4 mt-2">
              <p className="text-xs text-gray-500 mt-1">
                {item.quantity > 1 && (
                  <>
                    {getCurrencySymbol(currency)}
                    {price} each
                  </>
                )}
              </p>
              <p className="text-base font-medium text-[#502B3A] mt-2">
                {getCurrencySymbol(currency)}
                {(price * item.quantity).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={handleRemove}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
