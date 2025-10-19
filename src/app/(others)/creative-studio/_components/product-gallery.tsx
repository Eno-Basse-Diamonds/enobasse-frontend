"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useCreativeStudioImageCache,
  createConfigKey,
  createGeneratedImage,
} from "@/lib/store/creative-studio-images";
import { LoadingSpinner } from "./shared/loading-spinner";

const ThreeDRing = dynamic(
  () => import("./three-d-ring").then((mod) => mod.ThreeDRing),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner size="md" />
      </div>
    ),
  }
);

interface ProductGalleryProps {
  gemstoneShape: string;
  headStyle: string;
  shankStyle: string;
  metalType: string;
}

export function ProductGallery({
  gemstoneShape,
  headStyle,
  shankStyle,
  metalType,
}: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<
    Array<{ src: string; alt: string }>
  >([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { getCachedImages, setCachedImages } = useCreativeStudioImageCache();

  useEffect(() => {
    const configKey = createConfigKey(
      gemstoneShape,
      headStyle,
      shankStyle,
      metalType
    );

    const cachedImages = getCachedImages(configKey);
    if (cachedImages) {
      setGeneratedImages(cachedImages);
      setImagesReady(true);
      setIsGenerating(false);
      setCurrentImageIndex(0);
    } else {
      setGeneratedImages([]);
      setImagesReady(false);
      setIsGenerating(false);
      setCurrentImageIndex(0);
    }

    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [gemstoneShape, headStyle, shankStyle, metalType, getCachedImages]);

  const handleImagesGenerated = (images: { src: string; alt: string }[]) => {
    const configKey = createConfigKey(
      gemstoneShape,
      headStyle,
      shankStyle,
      metalType
    );

    // Convert to cache format and store in cache
    const cacheImages = images.map((img, index) =>
      createGeneratedImage(img.src, img.alt || `Product view ${index + 1}`)
    );

    setCachedImages(configKey, cacheImages);
    setGeneratedImages(images);
    setIsGenerating(false);
    setImagesReady(true);
  };

  const handleImageGenerationStart = () => {
    setIsGenerating(true);
    setImagesReady(false);
  };

  const allImages = generatedImages;
  const totalImages = allImages.length + 1;

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNextImage();
    } else if (touchEnd - touchStart > 50) {
      handlePrevImage();
    }
  };

  const renderLoadingState = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-sm -mt-10">
      <LoadingSpinner size="md" text="Generating image..." />
    </div>
  );

  useEffect(() => {
    if (generatedImages.length > 0) {
      setImagesReady(true);
      setIsGenerating(false);
    }
  }, [generatedImages]);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-sm flex items-center justify-center aspect-square pt-10 relative overflow-hidden">
            <div
              className={`w-full h-full ${isInitialLoad && !imagesReady ? "filter blur-md" : ""}`}
            >
              <ThreeDRing
                gemstoneShape={gemstoneShape}
                headStyle={headStyle}
                shankStyle={shankStyle}
                metalType={metalType}
                onImagesGenerated={handleImagesGenerated}
                onImageGenerationStart={handleImageGenerationStart}
                imagesReady={imagesReady}
              />
            </div>

            {isInitialLoad && !imagesReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                <LoadingSpinner size="lg" text="Generating product views..." />
              </div>
            )}

            <Image
              src="/images/360-degrees.png"
              alt="360 degrees view"
              width={32}
              height={32}
              className="absolute bottom-4 left-4 z-20"
            />
          </div>

          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="aspect-square bg-gray-100 rounded-sm flex items-center justify-center pt-10 overflow-hidden"
            >
              {allImages[index] ? (
                <Image
                  src={allImages[index].src}
                  alt={allImages[index].alt}
                  width={200}
                  height={200}
                  className="object-cover h-full w-auto"
                  quality={100}
                />
              ) : (
                renderLoadingState()
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet View */}
      <div className="lg:hidden">
        <div
          className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden mb-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`w-full h-full ${isInitialLoad && currentImageIndex === 0 && !imagesReady ? "filter blur-md" : ""}`}
          >
            {currentImageIndex === 0 ? (
              <div className="w-full h-full flex items-center justify-center mt-6">
                <ThreeDRing
                  gemstoneShape={gemstoneShape}
                  headStyle={headStyle}
                  shankStyle={shankStyle}
                  metalType={metalType}
                  onImagesGenerated={handleImagesGenerated}
                  onImageGenerationStart={handleImageGenerationStart}
                  imagesReady={imagesReady}
                />
              </div>
            ) : allImages[currentImageIndex - 1] ? (
              <Image
                src={allImages[currentImageIndex - 1].src}
                alt={allImages[currentImageIndex - 1].alt}
                fill
                className="object-contain mt-6"
                quality={100}
              />
            ) : (
              renderLoadingState()
            )}
          </div>

          {isInitialLoad && currentImageIndex === 0 && !imagesReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
              <LoadingSpinner size="lg" text="Generating product views..." />
            </div>
          )}

          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-20"
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
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-20"
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

          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`w-16 h-16 border-2 rounded-sm pt-2 bg-gray-200 overflow-hidden ${currentImageIndex === index + 1 ? "border-primary-500" : "border-gray-300"}`}
              onClick={() => handleThumbnailClick(index + 1)}
            >
              {allImages[index] ? (
                <Image
                  src={allImages[index].src}
                  alt={allImages[index].alt}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center -mt-2">
                  <LoadingSpinner size="sm" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
