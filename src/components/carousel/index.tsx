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
const SWIPE_THRESHOLD = 50; // Minimum distance to trigger slide change

export const Carousel: React.FC<CarouselProps> = ({
  items,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  ariaLabel = "Collections carousel",
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  
  const totalItems = items.length;
  const totalSlides = Math.ceil(totalItems / itemsPerPage);
  const itemWidthPercentage = 100 / itemsPerPage;

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + itemsPerPage >= totalItems) {
        return 0; // Go back to first slide
      }
      return prevIndex + 1;
    });
  }, [itemsPerPage, totalItems]);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // Go to the last possible slide that shows exactly itemsPerPage items
        const lastPossibleIndex = totalItems - itemsPerPage;
        return Math.max(0, lastPossibleIndex);
      }
      return prevIndex - 1;
    });
  }, [itemsPerPage, totalItems]);

  const goToSlide = React.useCallback(
    (slideIndex: number) => {
      const newIndex = slideIndex * itemsPerPage;
      // Ensure we don't go beyond the last possible index
      const maxIndex = Math.max(0, totalItems - itemsPerPage);
      setCurrentIndex(Math.min(newIndex, maxIndex));
    },
    [itemsPerPage, totalItems]
  );

  // Calculate current slide index for indicators
  const getCurrentSlideIndex = React.useCallback(() => {
    if (totalItems <= itemsPerPage) return 0;
    
    const maxIndex = Math.max(0, totalItems - itemsPerPage);
    const currentSlide = Math.floor(currentIndex / itemsPerPage);
    
    // If we're at or beyond the last possible slide, return the last slide index
    if (currentIndex >= maxIndex) {
      return totalSlides - 1;
    }
    
    return currentSlide;
  }, [currentIndex, itemsPerPage, totalItems, totalSlides]);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > SWIPE_THRESHOLD;
    const isRightSwipe = distance < -SWIPE_THRESHOLD;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  // Mouse event handlers for desktop dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStart || !isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > SWIPE_THRESHOLD;
    const isRightSwipe = distance < -SWIPE_THRESHOLD;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  // Prevent image drag behavior
  const handleImageDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const visibleStart = currentIndex + 1;
  const visibleEnd = Math.min(currentIndex + itemsPerPage, totalItems);
  const currentSlideIndex = getCurrentSlideIndex();

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

      <div 
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ul
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * itemWidthPercentage}%)`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          aria-label="Carousel items"
        >
          {items.map((item, index) => (
            <li
              key={item.id ? `item-${item.id}` : `item-${index}`}
              className="flex-shrink-0 px-3 select-none"
              style={{ width: `${itemWidthPercentage}%` }}
              aria-hidden={
                index < currentIndex || index >= currentIndex + itemsPerPage
              }
            >
              <Link href={item.href} passHref>
                <div 
                  className="cursor-pointer block"
                  draggable="false"
                >
                  <div className="relative w-full pt-[100%] overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover transform scale-100 transition-transform duration-500 ease-in-out group-hover:scale-105"
                        draggable="false"
                        onDragStart={handleImageDragStart}
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
          const isActive = currentSlideIndex === index;

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
