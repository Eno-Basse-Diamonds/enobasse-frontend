"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon } from "../icons/chevron-left";
import { ChevronRightIcon } from "../icons/chevron-right";

interface CarouselItem {
  href: string;
  image: string;
  alt: string;
  title: string;
  id?: string | number;
}

interface CarouselProps {
  items: CarouselItem[];
  itemsPerPage?: number;
  ariaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS_PER_PAGE = 4;

export const Carousel: React.FC<CarouselProps> = ({
  items,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  ariaLabel = "Collections carousel",
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const totalItems = items.length;
  const totalSlides = Math.ceil(totalItems / itemsPerPage);
  const itemWidthPercentage = 100 / itemsPerPage;

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= totalItems ? 0 : prevIndex + 1
    );
  }, [itemsPerPage, totalItems]);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - itemsPerPage : prevIndex - 1
    );
  }, [itemsPerPage, totalItems]);

  const goToSlide = React.useCallback(
    (slideIndex: number) => {
      setCurrentIndex(slideIndex * itemsPerPage);
    },
    [itemsPerPage]
  );

  const visibleStart = currentIndex + 1;
  const visibleEnd = Math.min(currentIndex + itemsPerPage, totalItems);

  return (
    <div
      className={`relative mx-auto px-4 ${className}`}
      role="region"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-atomic="false"
    >
      <button
        onClick={prevSlide}
        className="absolute top-1/3 md:top-1/2 z-10 -translate-y-1/2 rounded-full bg-white md:bg-[#D1A559]/20 p-2 md:p-3 shadow-md hover:bg-[#502B3A]/90 hover:text-white transition-all duration-300 left-0"
        aria-label="Previous item"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * itemWidthPercentage}%)`,
          }}
          aria-label="Carousel items"
        >
          {items.map((item, index) => (
            <li
              key={item.id ? `item-${item.id}` : `item-${index}`}
              className="flex-shrink-0 px-3"
              style={{ width: `${itemWidthPercentage}%` }}
              aria-hidden={
                index < currentIndex || index >= currentIndex + itemsPerPage
              }
            >
              <Link href={item.href} passHref>
                <div className="cursor-pointer block">
                  <div className="relative w-full pt-[100%] overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover transform scale-100 transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <figcaption className="font-primary mt-4 text-center text-base md:text-lg font-normal text-[#502B3A]">
                    {item.title}
                  </figcaption>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={nextSlide}
        className="absolute top-1/3 md:top-1/2 z-10 -translate-y-1/2 rounded-full bg-white md:bg-[#D1A559]/20 p-2 md:p-3 shadow-md hover:bg-[#502B3A]/90 hover:text-white transition-all duration-300 right-0"
        aria-label="Next item"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>

      <div className="flex justify-center mt-6 space-x-2" role="tablist">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = Math.floor(currentIndex / itemsPerPage) === index;

          return (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                isActive ? "bg-[#502B3A] scale-125" : "bg-gray-300"
              }`}
              role="tab"
              aria-label={`Slide ${index + 1}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
            />
          );
        })}
      </div>

      <p className="sr-only">
        Showing items {visibleStart} to {visibleEnd} of {totalItems}
      </p>
    </div>
  );
};
