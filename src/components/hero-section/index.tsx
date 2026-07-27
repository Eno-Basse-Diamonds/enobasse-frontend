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
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterUrl}
          alt="Hero Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        <>
          <Image
            src="/images/hero/hero-mobile.webp"
            alt="Hero Background"
            fill
            priority
            sizes="100vw"
            className={`md:hidden object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src="/images/hero/hero.webp"
            alt="Hero Background"
            fill
            priority
            sizes="100vw"
            className={`hidden md:block object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-0" : "opacity-100"
            }`}
          />
        </>
      )}

      <video
        autoPlay
        loop
        muted
        playsInline
        poster={posterUrl || undefined}
        onCanPlay={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
