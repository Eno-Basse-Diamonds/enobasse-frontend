"use client";

import Image from "next/image";
import Link from "next/link";
import { WishlistItem as WishlistItemInterface } from "@/lib/data/wishlist-items";

type WishlistItemProps = {
  item: WishlistItemInterface;
  onRemove?: (id: string | number) => void;
  onAddToCart?: (id: string | number) => void;
};

export const WishlistItem: React.FC<WishlistItemProps> = ({
  item,
  onRemove,
  onAddToCart,
}) => {
  return (
    <li className="wishlist-page__item">
      <div className="wishlist-page__item-content">
        <Link
          href={`/products/${item.slug}`}
          className="wishlist-page__image-link"
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
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
                  href={`/products/${item.slug}`}
                  className="wishlist-page__title-link"
                >
                  {item.name}
                </Link>
              </h3>
              <p className="wishlist-page__specs">
                {`${item.gemstone.weight}ct`} {item.gemstone.name} |{" "}
                {item.metal.purity} {item.metal.name}
              </p>
            </div>
            <p className="wishlist-page__price">
              {item.currency}
              {item.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="wishlist-page__actions-row">
            <div className="wishlist-page__stock-status">
              {item.inStock ? (
                <span className="wishlist-page__in-stock">
                  <span className="wishlist-page__stock-dot"></span>
                  In Stock
                </span>
              ) : (
                <span className="wishlist-page__out-of-stock">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="wishlist-page__item-actions">
              <button
                type="button"
                className="wishlist-page__add-to-cart"
                disabled={!item.inStock}
                onClick={() => {}}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="wishlist-page__remove-btn"
                onClick={() => {}}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
