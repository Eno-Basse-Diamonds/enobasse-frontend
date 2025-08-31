"use client";

import { MinusIcon, PlusIcon } from "@/components/icons";

interface QuantityControlProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onChange?: (value: number) => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  onChange,
}) => {
  return (
    <div className="flex items-center h-8">
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center border border-gray-300 bg-gray-100 hover:bg-gray-200"
        onClick={onDecrement}
      >
        <MinusIcon className="h-3 w-3 text-[#502B3A]" />
      </button>
      <input
        type="text"
        className="w-12 text-center text-sm font-medium text-[#502B3A] h-8"
        value={quantity}
        readOnly={!onChange}
        onChange={
          onChange ? (e) => onChange(Number(e.target.value)) : undefined
        }
      />
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center border border-gray-300 bg-gray-100 hover:bg-gray-200"
        onClick={onIncrement}
      >
        <PlusIcon className="h-3 w-3 text-[#502B3A]" />
      </button>
    </div>
  );
};
