"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/icons";

interface RingSizeOption {
  value: string;
  label: string;
}

export const RingSizeSelector: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sizeOptions: RingSizeOption[] = [
    { value: "4", label: "4" },
    { value: "4.5", label: "4.5" },
    { value: "5", label: "5" },
    { value: "5.5", label: "5.5" },
    { value: "6", label: "6" },
    { value: "6.5", label: "6.5" },
    { value: "7", label: "7" },
    { value: "7.5", label: "7.5" },
    { value: "8", label: "8" },
    { value: "8.5", label: "8.5" },
    { value: "9", label: "9" },
    { value: "9.5", label: "9.5" },
    { value: "10", label: "10" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelectedSize(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-row items-center gap-x-3 z-50">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="w-full flex justify-between font-light items-center px-4 py-2 border border-[#502B3A]/40 gap-x-2 text-sm text-[#502B3A] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#502B3A] transition-all duration-200"
          onClick={toggleDropdown}
        >
          {selectedSize ? `Size ${selectedSize}` : "Ring Size"}
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`absolute z-[100] mt-1 w-full bg-white shadow-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-x-hidden overflow-y-scroll transition-all duration-200 ease-out [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D1A559] ${
            isOpen
              ? "max-h-60 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {sizeOptions.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 text-sm text-gray-700 hover:bg-[#502B3A] hover:text-white cursor-pointer transition-colors duration-150 ${
                selectedSize === option.value ? "bg-[#502B3A] text-white" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>

      <Link
        className="font-medium text-[#502B3A] text-sm hover:underline"
        href="/blog/ring-size-guide"
      >
        Ring Size Help
      </Link>
    </div>
  );
};
