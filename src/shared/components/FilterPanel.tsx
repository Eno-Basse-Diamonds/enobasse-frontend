"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { easeOut } from "motion/react";
import * as motion from "motion/react-client";

import { CloseIcon } from "@/shared/components/icons/Close";
import { DiamondIcon } from "@/shared/components/icons/Diamond";
import { FilterIcon } from "@/shared/components/icons/Filter";
import type { FilterOption } from "@/modules/products/types";

// ─── PriceRange ──────────────────────────────────────────────

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

const PriceRange: React.FC<PriceRangeProps> = ({ minPrice, maxPrice, onPriceChange }) => {
  const [minInput, setMinInput] = useState(minPrice !== undefined ? String(minPrice) : "");
  const [maxInput, setMaxInput] = useState(maxPrice !== undefined ? String(maxPrice) : "");

  const isPresetActive = (preset: (typeof PRICE_PRESETS)[0]) =>
    preset.min === minPrice && preset.max === maxPrice;

  const handlePreset = (preset: (typeof PRICE_PRESETS)[0]) => {
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
          <button onClick={handleClear} className="text-xs text-[#502B3A] hover:underline">
            Clear
          </button>
        )}
      </div>
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
      <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Custom Range</p>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
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
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
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

// ─── MetalOptions ────────────────────────────────────────────

const metalHoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: easeOut },
  },
};

interface MetalOptionProps {
  metalOptions: FilterOption[];
  selectedFilters: FilterOption[];
  toggleFilter: (metal: FilterOption) => void;
}

const MetalOptions: React.FC<MetalOptionProps> = ({
  metalOptions,
  selectedFilters,
  toggleFilter,
}) => {
  return (
    <div className="pb-4 lg:pb-8">
      <h3 className="text-base font-semibold mb-4">Metal Options</h3>
      <div className="grid grid-cols-4 lg:grid-cols-3 gap-3">
        {metalOptions.map((metal) => (
          <motion.label
            key={metal.name}
            whileHover="hover"
            variants={metalHoverVariants}
            className={`flex flex-col items-center gap-2 p-3 transition text-center cursor-pointer hover:bg-gray-50 ${
              selectedFilters.some((f) => f.name === metal.name) ? "bg-gray-100" : ""
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedFilters.some((f) => f.name === metal.name)}
              onChange={() => toggleFilter(metal)}
            />
            <motion.div whileHover={{ rotate: 5 }} className="w-12 h-12 flex items-center justify-center">
              <Image
                src={metal.image!.src}
                alt={metal.image!.alt}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </motion.div>
            <span className="text-xs font-medium">{metal.name}</span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};

// ─── Gemstones ───────────────────────────────────────────────

const hoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: easeOut },
  },
};

interface GemstonesProps {
  selectedFilters: FilterOption[];
  toggleFilter: (metal: FilterOption) => void;
}

const Gemstones: React.FC<GemstonesProps> = ({ selectedFilters, toggleFilter }) => {
  const gemstones: FilterOption[] = [
    { name: "Diamond", type: "gemstone", color: "text-gray-300" },
    { name: "Ruby", type: "gemstone", color: "text-red-600" },
    { name: "Sapphire", type: "gemstone", color: "text-blue-700" },
    { name: "Emerald", type: "gemstone", color: "text-green-600" },
    { name: "Moissanite", type: "gemstone", color: "text-gray-400" },
    { name: "Pearl", type: "gemstone", color: "text-amber-300" },
    { name: "Tourmaline", type: "gemstone", color: "text-pink-500" },
    { name: "Malachite", type: "gemstone", color: "text-green-500" },
    { name: "Tiger's Eye", type: "gemstone", color: "text-amber-600" },
  ];

  return (
    <div className="pb-4 lg:pb-8 pt-8">
      <h3 className="text-base font-semibold mb-4">Gemstones</h3>
      <div className="grid grid-cols-4 lg:grid-cols-3 gap-3">
        {gemstones.map((gemstone) => (
          <motion.label
            key={gemstone.name}
            whileHover="hover"
            variants={hoverVariants}
            className={`flex flex-col items-center gap-2 p-3 transition text-center cursor-pointer hover:bg-gray-50 ${
              selectedFilters.some((f) => f.name === gemstone.name) ? "bg-gray-100" : ""
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedFilters.some((f) => f.name === gemstone.name)}
              onChange={() => toggleFilter(gemstone)}
            />
            <motion.div whileHover={{ rotate: 10 }} className="w-12 h-12 flex items-center justify-center">
              <DiamondIcon className={`w-10 h-10 ${gemstone.color}`} />
            </motion.div>
            <span className="text-xs font-medium">{gemstone.name}</span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};

// ─── FilterPanel (mobile + desktop) ──────────────────────────

interface FilterPanelProps {
  metalOptions: FilterOption[];
  selectedFilters?: FilterOption[];
  onFilterChange?: (filters: FilterOption[]) => void;
  minPrice?: number;
  maxPrice?: number;
  onPriceChange?: (min: number | undefined, max: number | undefined) => void;
}

/**
 * Mobile filter panel with bottom-sheet drawer.
 *
 * @description Renders a full-screen bottom-sheet filter interface for mobile viewports.
 * Includes price range, metal, and gemstone filter sections with local state management
 * and apply / reset controls.
 *
 * @param props.metalOptions - Available metal filter options.
 * @param props.selectedFilters - Currently selected filter options.
 * @param props.onFilterChange - Callback invoked when filters change.
 * @param props.minPrice - Current minimum price filter value.
 * @param props.maxPrice - Current maximum price filter value.
 * @param props.onPriceChange - Callback invoked when the price range changes.
 * @returns The rendered mobile filter panel.
 */
export const FilterPanelMobile: React.FC<FilterPanelProps> = ({
  metalOptions,
  selectedFilters = [],
  onFilterChange,
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOption[]>(selectedFilters);
  const [localMin, setLocalMin] = useState<number | undefined>(minPrice);
  const [localMax, setLocalMax] = useState<number | undefined>(maxPrice);

  const toggleFilter = (filter: FilterOption) => {
    const newFilters = localFilters.find((f) => f.name === filter.name)
      ? localFilters.filter((f) => f.name !== filter.name)
      : [...localFilters, filter];

    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const removeFilter = (filterName: string) => {
    const newFilters = localFilters.filter((f) => f.name !== filterName);
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    setLocalFilters([]);
    setLocalMin(undefined);
    setLocalMax(undefined);
    onFilterChange?.([]);
    onPriceChange?.(undefined, undefined);
  };

  const applyFilters = () => {
    onFilterChange?.(localFilters);
    onPriceChange?.(localMin, localMax);
    setIsOpen(false);
  };

  const handleLocalPriceChange = (min: number | undefined, max: number | undefined) => {
    setLocalMin(min);
    setLocalMax(max);
  };

  const activeFilterCount =
    localFilters.length + (localMin !== undefined || localMax !== undefined ? 1 : 0);

  return (
    <div className="w-full flex flex-col gap-y-4 items-center mb-6">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-sm border border-primary-300 w-full flex flex-row gap-x-4 items-center justify-center mx-auto text-primary-500 px-5 py-3 lg:hidden"
      >
        <FilterIcon />
        Filters
        {activeFilterCount > 0 && (
          <span className="ml-1 bg-[#502B3A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {localFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 lg:hidden">
          {localFilters.map((filter) => (
            <div
              key={filter.name}
              className="bg-gray-100 text-gray-700 px-3 py-1 text-sm flex items-center gap-2"
            >
              <span>{filter.name}</span>
              <button onClick={() => removeFilter(filter.name)} className="hover:text-gray-900">
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3>Filters</h3>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-8rem)]">
          <PriceRange
            minPrice={localMin}
            maxPrice={localMax}
            onPriceChange={handleLocalPriceChange}
          />
          <div className="py-6 border-b border-gray-200">
            <MetalOptions
              metalOptions={metalOptions}
              selectedFilters={localFilters}
              toggleFilter={toggleFilter}
            />
          </div>
          <div className="py-6">
            <Gemstones selectedFilters={localFilters} toggleFilter={toggleFilter} />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-4">
          <button
            onClick={resetFilters}
            className="rounded-sm flex-1 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Reset Filters
          </button>
          <button
            onClick={applyFilters}
            className="rounded-sm flex-1 py-3 bg-[#502B3A] text-white hover:bg-[#502B3A]/90"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Desktop filter panel sidebar.
 *
 * @description Renders a sidebar filter panel for desktop viewports. Includes price range,
 * metal, and gemstone filter sections with immediate filter application on change.
 *
 * @param props.metalOptions - Available metal filter options.
 * @param props.selectedFilters - Currently selected filter options.
 * @param props.onFilterChange - Callback invoked when filters change.
 * @param props.minPrice - Current minimum price filter value.
 * @param props.maxPrice - Current maximum price filter value.
 * @param props.onPriceChange - Callback invoked when the price range changes.
 * @returns The rendered desktop filter panel.
 */
export const FilterPanelDesktop: React.FC<FilterPanelProps> = ({
  metalOptions,
  selectedFilters = [],
  onFilterChange,
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const toggleFilter = (filter: FilterOption) => {
    const newFilters = selectedFilters.find((f) => f.name === filter.name)
      ? selectedFilters.filter((f) => f.name !== filter.name)
      : [...selectedFilters, filter];

    onFilterChange?.(newFilters);
  };

  return (
    <>
      <PriceRange
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={(min, max) => onPriceChange?.(min, max)}
      />
      <div className="py-6 border-b border-gray-200">
        <MetalOptions
          metalOptions={metalOptions}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
        />
      </div>
      <div className="py-6">
        <Gemstones selectedFilters={selectedFilters} toggleFilter={toggleFilter} />
      </div>
    </>
  );
};
