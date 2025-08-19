"use client";

import { useState } from "react";
import { CloseIcon, FilterIcon } from "@/components/icons";
import { MetalOptions } from "./elements/metal-options";
import { Gemstones } from "./elements/gemstones";
import "./styles.scss";

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
}

export const FilterPanelMobile: React.FC<FilterPanelProps> = ({
  metalOptions,
  selectedFilters = [],
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] =
    useState<FilterOption[]>(selectedFilters);

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
    onFilterChange?.([]);
  };

  const applyFilters = () => {
    onFilterChange?.(localFilters);
    setIsOpen(false);
  };

  return (
    <div className="product-filter-panel">
      <button
        onClick={() => setIsOpen(true)}
        className="product-filter-panel__button"
      >
        <FilterIcon />
        Filters
      </button>

      {localFilters.length > 0 && (
        <div className="product-filter-panel__tags">
          {localFilters.map((filter) => (
            <div key={filter.name} className="product-filter-panel__tag">
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
        className={`product-filter-panel__mobile-panel ${isOpen ? "active" : ""}`}
      >
        <div className="product-filter-panel__mobile-header">
          <h3>Filters</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="product-filter-panel__close-filter"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="product-filter-panel__mobile-content">
          <MetalOptions
            metalOptions={metalOptions}
            selectedFilters={localFilters}
            toggleFilter={toggleFilter}
          />
          <Gemstones
            selectedFilters={localFilters}
            toggleFilter={toggleFilter}
          />
        </div>

        <div className="product-filter-panel__mobile-footer">
          <button
            onClick={resetFilters}
            className="product-filter-panel__reset-filters"
          >
            Reset Filters
          </button>
          <button
            onClick={applyFilters}
            className="product-filter-panel__apply-filters"
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
}) => {
  const toggleFilter = (filter: FilterOption) => {
    const newFilters = selectedFilters.find((f) => f.name === filter.name)
      ? selectedFilters.filter((f) => f.name !== filter.name)
      : [...selectedFilters, filter];

    onFilterChange?.(newFilters);
  };

  return (
    <>
      <MetalOptions
        metalOptions={metalOptions}
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
      />
      <Gemstones
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
      />
    </>
  );
};
