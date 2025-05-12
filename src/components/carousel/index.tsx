"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import "./styles.scss";

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
      prevIndex + itemsPerPage >= totalItems ? 0 : prevIndex + 1,
    );
  }, [itemsPerPage, totalItems]);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - itemsPerPage : prevIndex - 1,
    );
  }, [itemsPerPage, totalItems]);

  const goToSlide = React.useCallback(
    (slideIndex: number) => {
      setCurrentIndex(slideIndex * itemsPerPage);
    },
    [itemsPerPage],
  );

  const visibleStart = currentIndex + 1;
  const visibleEnd = Math.min(currentIndex + itemsPerPage, totalItems);

  return (
    <div
      className={`carousel ${className}`}
      role="region"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-atomic="false"
    >
      <button
        onClick={prevSlide}
        className="carousel__button carousel__button--prev"
        aria-label="Previous item"
        disabled={currentIndex === 0}
      >
        <ChevronLeftIcon className="carousel__button-icon" />
      </button>

      <div className="carousel__container">
        <ul
          className="carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidthPercentage}%)`,
          }}
          aria-label="Carousel items"
        >
          {items.map((item, index) => (
            <li
              key={item.id ? `item-${item.id}` : `item-${index}`}
              className="carousel__item"
              style={{ width: `${itemWidthPercentage}%` }}
              aria-hidden={
                index < currentIndex || index >= currentIndex + itemsPerPage
              }
            >
              <Link href={item.href} passHref legacyBehavior>
                <a className="carousel__link">
                  <div className="carousel__image-container">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      title={item.alt}
                      height={500}
                      width={500}
                      loading="lazy"
                      quality={100}
                      className="carousel__image"
                    />
                  </div>
                  <figcaption className="carousel__caption">
                    {item.title}
                  </figcaption>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={nextSlide}
        className="carousel__button carousel__button--next"
        aria-label="Next item"
        disabled={currentIndex >= totalItems - itemsPerPage}
      >
        <ChevronRightIcon className="carousel__button-icon" />
      </button>

      <div className="carousel__indicators" role="tablist">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive =
            currentIndex >= index * itemsPerPage &&
            currentIndex < (index + 1) * itemsPerPage;

          return (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={`carousel__indicator ${
                isActive ? "carousel__indicator--active" : ""
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
