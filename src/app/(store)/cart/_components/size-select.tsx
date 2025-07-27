"use client";

import { ChevronDownIcon } from "@/components/icons";

interface SizeSelectProps {
  id: string | number;
  sizes: number[];
  selectedSize?: number;
  mobile?: boolean;
  onChange?: (size: number) => void;
}

export const SizeSelect = ({
  id,
  sizes,
  selectedSize,
  mobile = false,
  onChange,
}: SizeSelectProps) => {
  return (
    <div className={`${mobile ? "my-2 md:hidden max-w-28" : "w-28"}`}>
      <label
        htmlFor={`size-${mobile ? "mobile" : "desktop"}-${id}`}
        className="sr-only"
      >
        Ring Size
      </label>
      <div className="relative">
        <select
          id={`size-${mobile ? "mobile" : "desktop"}-${id}`}
          className="cart-page__size-select"
          value={selectedSize ?? ""}
          onChange={(e) => onChange && onChange(Number(e.target.value))}
        >
          <option value="">Select Size</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              Size {size}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon className="h-4 w-4 text-[#502B3A]" />
        </div>
      </div>
    </div>
  );
};
