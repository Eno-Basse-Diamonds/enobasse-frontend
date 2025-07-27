"use client";

import Image from "next/image";
import Link from "next/link";
import { CloseIcon } from "@/components/icons";
import { QuantityControl } from "./quantity-control";
import { SizeSelect } from "./size-select";
import { CartItem } from "@/lib/types/carts";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { getCurrencySymbol } from "@/lib/utils/money";
import { Engraving } from "@/app/(store)/products/[slug]/_components/engraving";

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
  console.log(item.productCategory)
  const canBeEngraved = engravableProducts.includes(item.productCategory);
  const isRing = item.productCategory === "Rings" ? true : false;

  return (
    <li className="cart-page__item">
      <div className="cart-page__item-content">
        <Link
          href={`/products/${item.productSlug}`}
          className="cart-page__image-container"
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="size-full object-cover"
          />
        </Link>

        <div className="cart-page__details">
          <div className="flex flex-col h-full">
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <Link
                  href={`/products/${item.productSlug}`}
                  className="hover:underline transition-all"
                >
                  <h3 className="cart-page__title">{title}</h3>
                </Link>

                <p className="cart-page__specs">
                  {gemstoneStr && metalStr
                    ? `${gemstoneStr} | ${metalStr}`
                    : metalStr || gemstoneStr}
                </p>

                <p className="cart-page__price">
                  {getCurrencySymbol(currency)}
                  {price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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

              <button className="cart-page__remove-btn" onClick={handleRemove}>
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
                <div className="cart-page__total-price text-primary-500 text-base whitespace-nowrap">
                  <span className="font-semibold">Total:</span>{" "}
                  {getCurrencySymbol(currency)}
                  {(price * item.quantity).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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
