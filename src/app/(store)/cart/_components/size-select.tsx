"use client";

import { ChevronDownIcon } from "@/components/icons";

interface SizeSelectProps {
  id: string | number;
  sizes: string[] | number[];
  selectedSize: string | number;
  mobile?: boolean;
  onChange?: (size: string) => void;
}

export const SizeSelect = ({
  id,
  sizes,
  selectedSize,
  mobile = false,
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
          defaultValue={selectedSize}
          onChange={(e) => {}}
        >
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
