"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageGalleryProps {
  images: Array<{ url: string; alt: string }>;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const [loadingImages, setLoadingImages] = useState<Set<number>>(
    new Set(images.map((_, index) => index))
  );
  const [loadingThumbnails, setLoadingThumbnails] = useState<Set<number>>(
    new Set(images.map((_, index) => index))
  );
  const [loadingZoomed, setLoadingZoomed] = useState(false);
  const isSingleImage = images.length === 1;

  const handleImageClick = (index: number) => {
    setZoomedIndex(index);
    setLoadingZoomed(true);
    document.body.style.overflow = "hidden";
  };

  const closeZoom = () => {
    setZoomedIndex(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <section aria-label="Image gallery" className="image-gallery">
        <div className="image-gallery__mobile mt-4">
          <figure className="image-gallery__main-container">
            <div
              role="group"
              aria-label="Main image carousel"
              className="image-gallery__carousel"
              style={{ transform: `translateX(-${selectedImageIndex * 100}%)` }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="image-gallery__slide"
                  aria-hidden={selectedImageIndex !== index}
                >
                  {loadingImages.has(index) && (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                      <svg
                        className="animate-spin h-8 w-8 text-primary-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          className="opacity-75"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          d="M12 2a10 10 0 0 1 10 10"
                        />
                      </svg>
                    </div>
                  )}
                  <Image
                    src={img.url}
                    alt={img.alt}
                    width={800}
                    height={800}
                    className="image-gallery__image"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    onLoad={() => {
                      setLoadingImages((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(index);
                        return newSet;
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </figure>

          {!isSingleImage && (
            <nav
              aria-label="Image thumbnails"
              className="image-gallery__thumbnails"
            >
              <ul className="image-gallery__thumbnails-list">
                {images.map((img, i) => (
                  <li
                    key={`mobile-${i}`}
                    className="image-gallery__thumbnails-item"
                  >
                    <button
                      onClick={() => setSelectedImageIndex(i)}
                      className={`image-gallery__thumbnail-button rounded-sm ${
                        selectedImageIndex === i
                          ? "image-gallery__thumbnail-button--selected"
                          : ""
                      }`}
                      aria-label={`View image ${i + 1}: ${img.alt}`}
                      aria-current={selectedImageIndex === i}
                    >
                      {loadingThumbnails.has(i) && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                          <svg
                            className="animate-spin h-3 w-3 text-primary-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              className="opacity-75"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              d="M12 2a10 10 0 0 1 10 10"
                            />
                          </svg>
                        </div>
                      )}
                      <Image
                        src={img.url}
                        alt=""
                        fill
                        className="image-gallery__thumbnail-image"
                        sizes="80px"
                        aria-hidden="true"
                        onLoad={() => {
                          setLoadingThumbnails((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(i);
                            return newSet;
                          });
                        }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div
          className="image-gallery__desktop"
          role="grid"
          aria-label="Image grid"
          data-single-image={isSingleImage}
        >
          {images.map((img, index) => (
            <figure
              key={`desktop-${index}`}
              onClick={() => handleImageClick(index)}
              className={`image-gallery__desktop-item cursor-zoom-in ${
                isSingleImage ? "no-border" : ""
              } rounded-sm overflow-hidden`}
              aria-label={`Image ${index + 1}: ${img.alt}`}
              role="gridcell"
            >
              {loadingImages.has(index) && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                  <svg
                    className="animate-spin h-8 w-8 text-primary-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      className="opacity-75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M12 2a10 10 0 0 1 10 10"
                    />
                  </svg>
                </div>
              )}
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="image-gallery__desktop-image"
                sizes="(max-width: 1024px) 50vw, 25vw"
                quality={100}
                onLoad={() => {
                  setLoadingImages((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(index);
                    return newSet;
                  });
                }}
              />
              <figcaption className="image-gallery__caption">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {zoomedIndex !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeZoom}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={closeZoom}
            >
              <div className="relative w-full max-w-4xl aspect-square rounded-sm overflow-hidden">
                {loadingZoomed && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                    <svg
                      className="animate-spin h-12 w-12 text-primary-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        className="opacity-75"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M12 2a10 10 0 0 1 10 10"
                      />
                    </svg>
                  </div>
                )}
                <Image
                  src={images[zoomedIndex].url}
                  alt={images[zoomedIndex].alt}
                  fill
                  className="object-contain"
                  quality={100}
                  onLoad={() => setLoadingZoomed(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
