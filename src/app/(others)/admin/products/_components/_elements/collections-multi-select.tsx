"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";

interface CollectionsMultiSelectProps {
  collections: Array<{ id: string; name: string }>;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  error?: string;
}

export function CollectionsMultiSelect({
  collections,
  selectedIds,
  onChange,
  error,
}: CollectionsMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = collections.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    onChange(next);
  };

  const remove = (id: string) => {
    onChange(selectedIds.filter((x) => x !== id));
  };

  const selectedItems = collections.filter((c) => selectedIds.includes(c.id));

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-semibold text-primary-400 mb-2">
        Collections *
      </label>

      <div
        className="flex items-center flex-wrap gap-1.5 min-h-[42px] w-full p-2 border border-primary-100 text-sm cursor-pointer focus-within:ring-1 focus-within:ring-primary-300 focus-within:border-primary-300"
        onClick={() => setOpen(!open)}
      >
        {selectedItems.slice(0, 3).map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center gap-1 bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded-sm"
          >
            {item.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                remove(item.id);
              }}
              className="hover:text-primary-800"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {selectedItems.length > 3 && (
          <span className="text-xs text-gray-400">+{selectedItems.length - 3} more</span>
        )}
        {selectedItems.length === 0 && (
          <span className="text-gray-400">Select collections...</span>
        )}
        <ChevronDown className="w-4 h-4 ml-auto text-gray-400 shrink-0" />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {open && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-primary-100 shadow-lg rounded-sm max-h-60 flex flex-col">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-300"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No collections found</p>
            ) : (
              filtered.map((c) => {
                const selected = selectedIds.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                      selected ? "bg-primary-50 text-primary-700" : "text-gray-700"
                    }`}
                    onClick={() => toggle(c.id)}
                  >
                    <span className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center mr-3 shrink-0">
                      {selected && <Check className="w-3 h-3 text-primary-600" />}
                    </span>
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}