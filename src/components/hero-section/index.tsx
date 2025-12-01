"use client";

import Link from "next/link";
import { useState } from "react";

export const HeroSection: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  return (
    <div className="hero-section relative h-[94dvh] lg:h-[88dvh] overflow-hidden">
      <img
        src="/images/hero.webp"
        alt="Hero Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        <source src="/videos/hero.mov" type="video/quicktime" />
        <source src="/videos/hero.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-primary-500 bg-opacity-30"></div>

      <div className="absolute top-1/2 -translate-y-1/2 left-8 right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 z-10 max-w-2xl text-center md:text-left">
        <div>
          <h2 className="font-primary font-semibold text-3xl md:text-4xl mb-6 text-white drop-shadow-lg">
            You Deserve The Most Unique Jewelry
          </h2>
          <h3 className="font-light md:text-xl mb-8 text-white drop-shadow-lg">
            We create antique jewellery that can be passed down through
            generations - timeless pieces designed to become family heirlooms.
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-y-4 md:gap-x-4">
            <Link
              href="/collections"
              className="rounded-sm bg-primary-500 text-white px-8 py-3 hover:bg-opacity-90 transition text-center w-full md:w-auto"
            >
              See Collections
            </Link>
            <Link
              href="/products"
              className="rounded-sm bg-primary-500 text-white px-8 py-3 hover:bg-opacity-90 transition text-center w-full md:w-auto"
            >
              See Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
