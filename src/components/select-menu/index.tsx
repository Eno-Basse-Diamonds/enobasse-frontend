"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X, Maximize2 } from "lucide-react";
import { SizeGuide } from "../size-guide";
import { ringSizes } from "@/lib/utils/constants/ring-sizes";
import { ChevronDownIcon } from "../icons/chevron-down";

interface RingSizeSelectorProps {
  selectedSize: number | undefined;
  onSetSelectedSize: (value: number) => void;
  isDropdown?: boolean;
  sizeGuideHref?: string;
}

export const RingSizeSelector: React.FC<RingSizeSelectorProps> = ({
  selectedSize,
  onSetSelectedSize,
  isDropdown = false,
  sizeGuideHref = "/size-guide",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullView, setIsFullView] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsFullView(false);
  };
  const toggleFullView = () => setIsFullView(!isFullView);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isModalOpen) {
      setIsModalOpen(true);
      document.addEventListener("mousedown", handleClickOutside);
      const header = document.querySelector("header");
      if (header) header.style.zIndex = "0";
      document.body.style.overflow = "hidden";
    } else {
      const header = document.querySelector("header");
      if (header) header.style.zIndex = "20";
      const timer = setTimeout(() => setIsModalOpen(false), 50);
      return () => clearTimeout(timer);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: number) => {
    onSetSelectedSize(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-row items-center gap-x-3 z-50">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="w-full flex justify-between font-light items-center px-4 py-2 border gap-x-2 text-sm text-[#502B3A] border-primary-500/20"
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
          {ringSizes.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm text-gray-700 hover:bg-[#502B3A] hover:text-white cursor-pointer transition-colors duration-150 ${
                selectedSize === option ? "bg-[#502B3A] text-white" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      {isDropdown ? (
        <button
          onClick={openModal}
          className="font-medium text-[#502B3A] text-sm"
        >
          Size Guide
        </button>
      ) : (
        <Link
          href={sizeGuideHref}
          className="font-medium text-[#502B3A] text-sm hover:underline"
        >
          Size Guide
        </Link>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            className={`bg-white shadow-2xl ${
              isFullView
                ? "w-full h-full max-w-full max-h-full"
                : "w-full max-w-4xl h-5/6 max-h-5/6"
            } flex flex-col transition-all duration-300`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h2 className="text-xl font-semibold text-gray-800">
                Size Guide
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullView}
                  className="p-2 hover:bg-gray-200 transition-colors flex items-center gap-1 text-sm text-gray-600"
                >
                  <Maximize2 size={16} />
                  {isFullView ? "Exit Full View" : "Full View"}
                </button>

                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <SizeGuide />
          </div>
        </div>
      )}
    </div>
  );
};
