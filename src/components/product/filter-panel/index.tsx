"use client";

import { useState } from "react";
import { CloseIcon, FilterIcon } from "@/components/icons";
import { PriceRange } from "./elements/price-range";
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
  gemstones: FilterOption[];
}

export const FilterPanelMobile: React.FC<FilterPanelProps> = ({
  metalOptions,
  gemstones,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

  const toggleFilter = (filter: FilterOption) => {
    setSelectedFilters((prev) => {
      const exists = prev.find((f) => f.name === filter.name);
      if (exists) {
        return prev.filter((f) => f.name !== filter.name);
      }
      return [...prev, filter];
    });
  };

  const removeFilter = (filterName: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f.name !== filterName));
  };

  const resetFilters = () => {
    setSelectedFilters([]);
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

      {selectedFilters.length > 0 && (
        <div className="product-filter-panel__tags">
          {selectedFilters.map((filter) => (
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
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
          />
          <Gemstones
            gemstones={gemstones}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
          />
          <PriceRange />
        </div>

        <div className="product-filter-panel__mobile-footer">
          <button
            onClick={resetFilters}
            className="product-filter-panel__reset-filters"
          >
            Reset Filters
          </button>
          <button
            onClick={() => setIsOpen(false)}
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
  gemstones,
}) => {
  return (
    <>
      <MetalOptions
        metalOptions={metalOptions}
        selectedFilters={[]}
        toggleFilter={() => {}}
      />
      <Gemstones
        gemstones={gemstones}
        selectedFilters={[]}
        toggleFilter={() => {}}
      />
      <PriceRange />
    </>
  );
};
