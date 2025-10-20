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
  const isSingleImage = images.length === 1;

  const handleImageClick = (index: number) => {
    setZoomedIndex(index);
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
                  <Image
                    src={img.url}
                    alt={img.alt}
                    width={800}
                    height={800}
                    className="image-gallery__image"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
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
                      <Image
                        src={img.url}
                        alt=""
                        fill
                        className="image-gallery__thumbnail-image"
                        sizes="80px"
                        aria-hidden="true"
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
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="image-gallery__desktop-image"
                sizes="(max-width: 1024px) 50vw, 25vw"
                quality={100}
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
                <Image
                  src={images[zoomedIndex].url}
                  alt={images[zoomedIndex].alt}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
