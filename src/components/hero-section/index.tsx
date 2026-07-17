"use client";

import Image from "next/image";
import { useState } from "react";

interface HeroSectionProps {
  /** Cloudinary URL for the hero video (MP4). Falls back to the static /videos/hero.mp4 if not provided. */
  videoUrl?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ videoUrl }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const mp4Src = videoUrl || "/videos/hero.mp4";
  // Derive a WebM variant from Cloudinary by swapping the format extension if it's a Cloudinary URL;
  // otherwise fall back to the static WebM file.
  const webmSrc =
    videoUrl && videoUrl.includes("cloudinary.com")
      ? videoUrl.replace(/\.(mp4|mov|avi)(\?.*)?$/, ".webm")
      : "/videos/hero.webm";

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
        <source src={mp4Src} type="video/mp4" />
        <source src={webmSrc} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
