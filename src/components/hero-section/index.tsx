"use client";

import Link from "next/link";
import { useState } from "react";
import "./styles.scss";

export const HeroSection: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  return (
    <div className="hero-section relative h-[94dvh] lg:h-[88dvh] overflow-hidden">
      <img
        src="/images/hero-mobile.webp"
        alt="Hero Background"
        className={`md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <img
        src="/images/hero.webp"
        alt="Hero Background"
        className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
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

      <div className="absolute bottom-24 lg:bottom-28 left-8 right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 z-10 max-w-md md:max-w-lg">
        <div>
          <h2 className="font-primary font-semibold text-2xl md:text-4xl mb-4 text-white drop-shadow-lg hero-text-animate leading-8 md:leading-10">
            You Deserve The Most Unique Jewelry
          </h2>
        </div>
      </div>
    </div>
  );
};
