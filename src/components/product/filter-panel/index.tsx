"use client";

import { useState } from "react";
import { MetalOptions } from "./elements/metal-options";
import { Gemstones } from "./elements/gemstones";
import { PriceRange } from "./elements/price-range";
import { FilterIcon } from "@/components/icons/filter";
import { CloseIcon } from "@/components/icons/close";

interface FilterOption {
  name: string;
  type: "metal" | "gemstone";
  image?: { src: string; alt: string };
  color?: string;
}

interface FilterPanelProps {
  metalOptions: FilterOption[];
  selectedFilters?: FilterOption[];
  onFilterChange?: (filters: FilterOption[]) => void;
  minPrice?: number;
  maxPrice?: number;
  onPriceChange?: (min: number | undefined, max: number | undefined) => void;
}

export const FilterPanelMobile: React.FC<FilterPanelProps> = ({
  metalOptions,
  selectedFilters = [],
  onFilterChange,
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] =
    useState<FilterOption[]>(selectedFilters);
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

  const handleLocalPriceChange = (
    min: number | undefined,
    max: number | undefined
  ) => {
    setLocalMin(min);
    setLocalMax(max);
  };

  const activeFilterCount =
    localFilters.length +
    (localMin !== undefined || localMax !== undefined ? 1 : 0);

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
              <button
                onClick={() => removeFilter(filter.name)}
                className="hover:text-gray-900"
              >
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
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
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
            <Gemstones
              selectedFilters={localFilters}
              toggleFilter={toggleFilter}
            />
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
        <Gemstones
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
        />
      </div>
    </>
  );
};
