"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";


const ThreeDRing = dynamic(
  () => import("./three-d-ring").then((mod) => mod.ThreeDRing),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary-500"></div>
      </div>
    )
  }
);

interface ProductGalleryProps {
  gemstoneShape: string;
  headStyle: string;
  shankStyle: string;
  metalType: string;
  productImages: Array<{ src: string; alt: string }>;
}

export function ProductGallery({
  gemstoneShape,
  headStyle,
  shankStyle,
  metalType,
  productImages,
}: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalImages = productImages.length + 1;

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };


  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-sm flex items-center justify-center aspect-square pt-10 relative">
            <ThreeDRing
              gemstoneShape={gemstoneShape}
              headStyle={headStyle}
              shankStyle={shankStyle}
              metalType={metalType}
            />
            <Image
              src="/images/360-degrees.png"
              alt="360 degrees view"
              width={32}
              height={32}
              className="absolute bottom-4 left-4"
            />
          </div>
          {productImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-100 rounded-sm flex items-center justify-center"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                height={200}
                className="object-cover h-full w-auto"
                quality={100}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet View */}
      <div className="lg:hidden">
        <div
          className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden mb-4"
        >
          {currentImageIndex === 0 ? (
            <div className="w-full h-full flex items-center justify-center pt-10">
              <ThreeDRing
                gemstoneShape={gemstoneShape}
                headStyle={headStyle}
                shankStyle={shankStyle}
                metalType={metalType}
              />
            </div>
          ) : (
            <Image
              src={productImages[currentImageIndex - 1].src}
              alt={productImages[currentImageIndex - 1].alt}
              fill
              className="object-contain"
              quality={100}
            />
          )}

          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
            onClick={handlePrevImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
            onClick={handleNextImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            className={`w-16 h-16 border-2 rounded-sm overflow-hidden ${currentImageIndex === 0 ? "border-primary-500" : "border-gray-300"}`}
            onClick={() => handleThumbnailClick(0)}
          >
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Image
                src="/images/360-degrees.png"
                alt="360 degrees view"
                width={24}
                height={24}
              />
            </div>
          </button>

          {productImages.map((image, index) => (
            <button
              key={index}
              className={`w-16 h-16 border-2 rounded-sm overflow-hidden ${currentImageIndex === index + 1 ? "border-primary-500" : "border-gray-300"}`}
              onClick={() => handleThumbnailClick(index + 1)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
