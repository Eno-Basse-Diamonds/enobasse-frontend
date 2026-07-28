"use client";

import Image from "next/image";
import { useState } from "react";

interface HeroSectionProps {
  videoMp4Url?: string | null;
  videoWebmUrl?: string | null;
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
          src={"/images/hero/hero.webp"}
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
    </div>
  );
};
