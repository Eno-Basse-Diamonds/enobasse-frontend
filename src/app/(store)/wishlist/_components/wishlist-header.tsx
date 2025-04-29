"use client";

type WishlistHeaderProps = {
  itemCount: number;
  onClear?: () => void;
};

export const WishlistHeader: React.FC<WishlistHeaderProps> = ({
  itemCount,
  onClear,
}) => {
  return (
    <div className="wishlist-page__header">
      <p className="wishlist-header__count">
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>
      <button
        type="button"
        className="wishlist-page__clear-btn"
        onClick={onClear}
      >
        Clear Wishlist
      </button>
    </div>
  );
};
