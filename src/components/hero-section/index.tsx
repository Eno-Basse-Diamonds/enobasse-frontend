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
    </div>
  );
};
