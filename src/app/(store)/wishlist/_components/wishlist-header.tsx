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
    <div className="flex justify-between items-center mb-6">
      <p className="text-[#502B3A]">
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>
      <button
        type="button"
        className="font-medium text-sm text-gray-500 underline"
        onClick={onClear}
      >
        Clear Wishlist
      </button>
    </div>
  );
};
