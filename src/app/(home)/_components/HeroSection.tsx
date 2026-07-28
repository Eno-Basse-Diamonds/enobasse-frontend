"use client";

import Image from "next/image";
import { useState } from "react";

interface HeroSectionProps {
  /** Cloudinary URL for the hero video – MP4 (H.264) */
  videoMp4Url?: string | null;
  /** Cloudinary URL for the hero video – WebM (VP9) */
  videoWebmUrl?: string | null;
  /** Cloudinary URL for the video poster (first frame) */
  posterUrl?: string | null;
}

/**
 * Hero section with full-screen video and poster fallback.
 *
 * @description Renders a full-viewport hero area with a background video (MP4 + WebM).
 * A static poster image is shown until the video is ready to play. Falls back to static
 * images when no poster URL is provided.
 *
 * @param props.videoMp4Url - Cloudinary URL for the hero video in MP4 (H.264) format.
 * @param props.videoWebmUrl - Cloudinary URL for the hero video in WebM (VP9) format.
 * @param props.posterUrl - Cloudinary URL for the video poster / first-frame image.
 * @returns The rendered hero section.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  videoMp4Url,
  videoWebmUrl,
  posterUrl,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const mp4Src = videoMp4Url || "/videos/hero/hero.mp4";

  const webmSrc = videoWebmUrl || "/videos/hero/hero.webm";

  return (
    <div className="hero-section relative h-[94dvh] lg:h-[88dvh] overflow-hidden">
      {/* Static poster shown until the video can play */}
      {posterUrl ? (
        // Dynamic poster from the admin-uploaded video

        <img
          src={posterUrl}
          alt="Hero Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        // Fallback poster used during development / before admin upload
        <Image
          src={"/images/Hero-Poster.webp"}
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Background video – auto-plays, muted, loops */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>

      {/* Gradient overlay to make content on top readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

      {/* Text content positioned at the bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-20 w-full px-6 text-white text-center">
        <h1 className="font-primary text-3xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-wide">
          Enobasse
        </h1>
        <p className="font-light text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
          Timeless jewellery crafted from diamonds, gemstones, gold and silver.
        </p>
      </div>
    </div>
  );
};
