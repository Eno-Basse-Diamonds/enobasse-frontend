"use client";

import Image from "next/image";
import Link from "next/link";
import { CloseIcon } from "@/components/icons";
import { Engraving } from "@/components";
import { QuantityControl } from "./quantity-control";
import { SizeSelect } from "./size-select";
import { CartItem } from "@/lib/types/carts";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { getCurrencySymbol } from "@/lib/utils/money";
import { useAccountStore } from "@/lib/store/account";

interface CartItemCardProps {
  item: CartItem;
  ringSizes: number[];
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  ringSizes,
}) => {
  const { removeItem, updateItem } = useCartStore();
  const { data: session } = useSession();
  const { preferredCurrency } = useAccountStore();
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
  const isRing = item.productCategory === "Rings" ? true : false;

  return (
    <li className="py-6 transition-colors">
      <div className="flex gap-4">
        <Link
          href={`/products/${item.productSlug}`}
          className="shrink-0 relative w-32 h-32 md:w-40 md:h-40 overflow-hidden border border-gray-200"
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="size-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 24vw"
          />
        </Link>

        <div className="flex flex-col flex-1 justify-between">
          <div className="flex flex-col h-full">
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <Link
                  href={`/products/${item.productSlug}`}
                  className="hover:underline transition-all"
                >
                  <h3 className="font-medium text-[#502B3A]">{title}</h3>
                </Link>

                <p className="text-sm text-[#502B3A]/70 mt-1 mb-2">
                  {gemstoneStr && metalStr
                    ? `${gemstoneStr} | ${metalStr}`
                    : metalStr || gemstoneStr}
                </p>

                <p className="font-medium text-[#502B3A]">
                  {getCurrencySymbol(preferredCurrency)}
                  {price.toLocaleString()}
                </p>
              </div>

              <div className="hidden md:flex flex-col items-end gap-2">
                <QuantityControl
                  quantity={item.quantity}
                  onDecrement={handleDecrement}
                  onIncrement={handleIncrement}
                />
                {isRing && (
                  <SizeSelect
                    id="cart-ring-size"
                    sizes={ringSizes}
                    selectedSize={item.size}
                    onChange={(size) =>
                      updateItem(item.productVariant.id, { size }, accountEmail)
                    }
                  />
                )}
              </div>

              <button
                className="text-gray-500 hover:text-gray-600 h-5 w-5 self-start ml-6"
                onClick={handleRemove}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 sm:mt-auto flex items-center justify-between gap-3 flex-wrap">
              <div className="flex md:hidden items-center gap-2">
                <QuantityControl
                  quantity={item.quantity}
                  onDecrement={handleDecrement}
                  onIncrement={handleIncrement}
                />
                {isRing && (
                  <SizeSelect
                    id="cart-ring-size-mobile"
                    sizes={ringSizes}
                    selectedSize={item.size}
                    mobile
                    onChange={(size) =>
                      updateItem(item.productVariant.id, { size }, accountEmail)
                    }
                  />
                )}
              </div>

              <div className="flex flex-row flex-wrap sm:items-center gap-2 sm:gap-4 w-full justify-between">
                <div className="text-[#502B3A] text-base whitespace-nowrap">
                  <span className="font-semibold">Total:</span>{" "}
                  {getCurrencySymbol(preferredCurrency)}
                  {(price * item.quantity).toLocaleString()}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
