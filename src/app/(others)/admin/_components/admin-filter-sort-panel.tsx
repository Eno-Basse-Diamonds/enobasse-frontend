"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/button";


export interface SortOption {
  value: string;
  label: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

interface AdminFilterSortPanelProps {
  sortOptions?: SortOption[];
  filterOptions?: FilterOption[];
  currentSort?: string;
  currentSortOrder?: "ASC" | "DESC";
  currentFilters?: string[];
  onSortChange?: (sort: string) => void;
  onSortOrderChange?: (order: "ASC" | "DESC") => void;
  onFilterChange?: (filters: string[]) => void;
  className?: string;
}

export function AdminFilterSortPanel({
  sortOptions,
  filterOptions,
  currentSort,
  currentSortOrder = "ASC",
  currentFilters = [],
  onSortChange,
  onSortOrderChange,
  onFilterChange,
  className = "",
}: AdminFilterSortPanelProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortOrderToggle = () => {
    if (!onSortOrderChange) return;
    onSortOrderChange(currentSortOrder === "ASC" ? "DESC" : "ASC");
  };

  const handleFilterToggle = (filterValue: string) => {
    if (!onFilterChange) return;

    const newFilters = currentFilters.includes(filterValue)
      ? currentFilters.filter((f) => f !== filterValue)
      : [...currentFilters, filterValue];

    onFilterChange(newFilters);
  };

  const hasSortFunctionality = sortOptions && onSortChange && currentSort;
  const hasSortOrderFunctionality = onSortOrderChange;
  const hasFilterFunctionality = filterOptions && onFilterChange;

  return (
    <div className={`flex flex-wrap gap-3 items-center ${className}`}>
      {hasFilterFunctionality && (
        <div className="relative" ref={filterRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-white"
          >
            <span className="flex flex-row items-center gap-2 p-1">
              Filters
              {currentFilters.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-primary-500 text-white rounded-full">
                  {currentFilters.length}
                </span>
              )}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </Button>

          {isFilterOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg z-10">
              {filterOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={currentFilters.includes(option.value)}
                    onChange={() => handleFilterToggle(option.value)}
                    className="mr-3 border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {hasSortFunctionality && (
        <div className="relative" ref={sortRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 bg-white"
          >
            <span className="flex flex-row items-center gap-2 p-1">
              Sort by:{" "}
              {sortOptions.find((opt) => opt.value === currentSort)?.label ||
                "Latest"}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </Button>

          {isSortOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    currentSort === option.value
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {hasSortOrderFunctionality && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleSortOrderToggle}
          className="flex items-center gap-2 bg-white"
        >
          <span className="flex flex-row items-center gap-2 p-1">
            {currentSortOrder === "ASC" ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
            {currentSortOrder === "ASC" ? "Ascending" : "Descending"}
          </span>
        </Button>
      )}
    </div>
  );
}
