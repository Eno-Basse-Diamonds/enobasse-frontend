"use client";

import Image from "next/image";
import Link from "next/link";
import { CloseIcon } from "@/components/icons";
import { QuantityControl } from "./quantity-control";
import { SizeSelect } from "./size-select";
import { StockStatus } from "./stock-status";
import { CartItem } from "@/lib/data/cart-items";

interface CartItemCardProps {
  item: CartItem;
  ringSizes: string[];
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onSizeChange?: (id: string, size: string) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  ringSizes,
}) => {
  return (
    <li className="cart-page__item">
      <div className="cart-page__item-content">
        <div className="cart-page__image-container">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            className="size-full object-contain"
          />
        </div>

        <div className="cart-page__details">
          <div className="flex flex-col h-full">
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <Link
                  href={`/products/${item.slug}`}
                  className="hover:underline transition-all"
                >
                  <h3 className="cart-page__title">{item.name}</h3>
                </Link>

                <p className="cart-page__specs">
                  {`${item.gemstone.weight}ct ${item.gemstone.name} | ${item.metal.purity} ${item.metal.name}`}
                </p>

                <p className="cart-page__price">
                  {item.currency}
                  {item.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>

                {item.category === "ring" && (
                  <SizeSelect
                    id={item.id}
                    sizes={ringSizes}
                    selectedSize={item.size || 6}
                    mobile
                  />
                )}
              </div>

              <div className="hidden md:flex flex-col items-end gap-2">
                {item.category === "ring" && (
                  <SizeSelect
                    id={item.id}
                    sizes={ringSizes}
                    selectedSize={item.size || "6"}
                  />
                )}

                <QuantityControl
                  quantity={item.quantity}
                  onDecrement={() => {}}
                  onIncrement={() => {}}
                />
              </div>

              <button className="cart-page__remove-btn" onClick={() => {}}>
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 sm:mt-auto flex items-center justify-between gap-3 flex-wrap">
              <div className="flex md:hidden items-center gap-2">
                <QuantityControl
                  quantity={item.quantity}
                  onDecrement={() => {}}
                  onIncrement={() => {}}
                />
              </div>

              <StockStatus inStock={item.inStock} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
