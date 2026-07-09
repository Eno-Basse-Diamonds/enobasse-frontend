"use client";

import { useState, useCallback } from "react";

interface PriceRangeProps {
  minPrice?: number;
  maxPrice?: number;
  onPriceChange: (min: number | undefined, max: number | undefined) => void;
}

const PRICE_PRESETS = [
  { label: "Under $500", min: undefined, max: 500 },
  { label: "$500 – $1,500", min: 500, max: 1500 },
  { label: "$1,500 – $5,000", min: 1500, max: 5000 },
  { label: "$5,000 – $10,000", min: 5000, max: 10000 },
  { label: "Over $10,000", min: 10000, max: undefined },
];

export const PriceRange: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [minInput, setMinInput] = useState(
    minPrice !== undefined ? String(minPrice) : ""
  );
  const [maxInput, setMaxInput] = useState(
    maxPrice !== undefined ? String(maxPrice) : ""
  );

  const isPresetActive = (preset: (typeof PRICE_PRESETS)[0]) =>
    preset.min === minPrice && preset.max === maxPrice;

  const handlePreset = (preset: (typeof PRICE_PRESETS)[0]) => {
    // Toggle off if already active
    if (isPresetActive(preset)) {
      setMinInput("");
      setMaxInput("");
      onPriceChange(undefined, undefined);
    } else {
      setMinInput(preset.min !== undefined ? String(preset.min) : "");
      setMaxInput(preset.max !== undefined ? String(preset.max) : "");
      onPriceChange(preset.min, preset.max);
    }
  };

  const handleApplyCustom = useCallback(() => {
    const min = minInput !== "" ? Number(minInput) : undefined;
    const max = maxInput !== "" ? Number(maxInput) : undefined;
    onPriceChange(min, max);
  }, [minInput, maxInput, onPriceChange]);

  const handleClear = () => {
    setMinInput("");
    setMaxInput("");
    onPriceChange(undefined, undefined);
  };

  const hasActive = minPrice !== undefined || maxPrice !== undefined;

  return (
    <div className="py-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Price Range</h3>
        {hasActive && (
          <button
            onClick={handleClear}
            className="text-xs text-[#502B3A] hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Preset buttons */}
      <div className="flex flex-col gap-2 mb-4">
        {PRICE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePreset(preset)}
            className={`text-left text-sm px-3 py-2 rounded-sm border transition-colors duration-150 ${
              isPresetActive(preset)
                ? "bg-[#502B3A] text-white border-[#502B3A]"
                : "border-gray-200 text-gray-700 hover:border-[#502B3A]/40 hover:bg-[#502B3A]/5"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom range inputs */}
      <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
        Custom Range
      </p>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            $
          </span>
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            className="w-full pl-6 pr-2 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50"
          />
        </div>
        <span className="text-gray-400 text-sm">–</span>
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            $
          </span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            className="w-full pl-6 pr-2 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50"
          />
        </div>
        <button
          onClick={handleApplyCustom}
          className="px-3 py-2 text-sm bg-[#502B3A] text-white rounded-sm hover:bg-[#502B3A]/90 transition-colors whitespace-nowrap"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
