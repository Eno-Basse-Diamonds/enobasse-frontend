import Image from "next/image";

import type { Option } from "@/modules/creative-studio/types";

interface OptionGridProps {
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabledIds?: string[];
  columns?: number;
  imageSize?: number;
  className?: string;
}

/**
 * Selectable option grid.
 *
 * @description Renders a CSS grid of selectable option cards, each with an
 * optional image and label. Supports selected, disabled, and hover states.
 * @param options - Array of Option objects with id, name, and optional
 * image and disabled flag.
 * @param selectedId - Currently selected option ID.
 * @param onSelect - Callback when an option is selected.
 * @param disabledIds - IDs of options to render as non-interactive.
 * @param columns - Number of grid columns (3-6; default 5).
 * @param imageSize - Pixel size for option images (default 40).
 * @param className - Additional CSS classes.
 * @returns A grid of selectable option buttons.
 */
export function OptionGrid({
  options,
  selectedId,
  onSelect,
  disabledIds = [],
  columns = 5,
  imageSize = 40,
  className = "",
}: OptionGridProps) {
  const gridCols = {
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-3 ${className}`}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const isDisabled = disabledIds.includes(option.id) || option.disabled;

        return (
          <button
            key={option.id}
            onClick={() => !isDisabled && onSelect(option.id)}
            className={`
              p-3 rounded-sm text-center flex flex-col items-center gap-2
              ${
                isSelected
                  ? "border border-gray-300 bg-gray-50"
                  : "border border-transparent hover:border-gray-300"
              }
              ${isDisabled ? "cursor-not-allowed opacity-50 border-none" : ""}
            `}
            disabled={isDisabled}
            title={option.name}
          >
            {option.image ? (
              <Image src={option.image} alt={option.name} height={imageSize} width={imageSize} />
            ) : (
              <div
                className="flex items-center justify-center rounded-sm bg-gray-100 text-gray-400 text-[10px] font-medium uppercase"
                style={{ height: imageSize, width: imageSize }}
              >
                {option.name.slice(0, 2)}
              </div>
            )}
            <p className="text-xs">{option.name}</p>
          </button>
        );
      })}
    </div>
  );
}
