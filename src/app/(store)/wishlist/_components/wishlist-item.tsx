"use client";

import Image from "next/image";
import Link from "next/link";
import { WishlistItem as WishlistItemInterface } from "@/lib/types/wishlists";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useSession } from "next-auth/react";
import { getCurrencySymbol } from "@/lib/utils/money";

type WishlistItemProps = {
  item: WishlistItemInterface;
};

export const WishlistItem: React.FC<WishlistItemProps> = ({ item }) => {
  const variant = item.productVariant;
  const { removeItem } = useWishlistStore();
  const { data: session } = useSession();

  return (
    <li className="wishlist-page__item">
      <div className="wishlist-page__item-content">
        <Link
          href={`/products/${item.productSlug}`}
          className="wishlist-page__image-link"
        >
          <Image
            src={variant.images?.[0].url}
            alt={variant.images?.[0]?.alt || variant.title}
            fill
            className="size-full object-contain"
            sizes="(max-width: 768px) 100px, 150px"
          />
        </Link>

        <div className="wishlist-page__details">
          <div className="wishlist-page__title-row">
            <div>
              <h3 className="wishlist-page__title">
                <Link
                  href={`/products/${item.productSlug}`}
                  className="wishlist-page__title-link"
                >
                  {variant.title}
                </Link>
              </h3>
              <p className="wishlist-page__specs">
                {variant.gemstones?.[0] &&
                  (variant.gemstones[0].weight
                    ? `${variant.gemstones[0].weight}ct ${variant.gemstones[0].type}`
                    : variant.gemstones[0].type)}
                {variant.gemstones?.[0] && variant.metals?.[0] ? " | " : null}
                {variant.metals?.[0] &&
                  `${variant.metals[0].purity} ${variant.metals[0].type}`}
              </p>
            </div>
            <p className="wishlist-page__price">
              {getCurrencySymbol(variant.currency)}
              {variant.price?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="wishlist-page__actions-row">
            <div className="wishlist-page__item-actions">
              <button
                type="button"
                className="wishlist-page__add-to-cart"
                onClick={() => {}}
              >
                ADD TO CART
              </button>
              <button
                type="button"
                className="wishlist-page__remove-btn"
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
