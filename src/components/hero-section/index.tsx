"use client";

import Image from "next/image";
import { useState } from "react";
import "./styles.scss";

export const HeroSection: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  return (
    <div className="hero-section relative h-[94dvh] lg:h-[88dvh] overflow-hidden">
      <Image
        src="/images/hero-mobile.webp"
        alt="Hero Background"
        fill
        priority
        sizes="100vw"
        className={`md:hidden object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <Image
        src="/images/hero.webp"
        alt="Hero Background"
        fill
        priority
        sizes="100vw"
        className={`hidden md:block object-cover transition-opacity duration-1000 ${
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
        <source src="/videos/hero.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
