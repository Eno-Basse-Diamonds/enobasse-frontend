"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  XIcon,
  InstagramIcon,
  TiktokIcon,
} from "@/components/icons";
import { Image as ImageIcon } from "lucide-react";
import { blurDataURL } from "@/lib/utils/constants";

interface BlogHeroImageProps {
  src: string;
  alt: string;
  author: string;
  date: string;
  share: { url: string; title: string };
}

const socialMediaPlatforms = [
  {
    name: "Facebook",
    icon: <FacebookIcon />,
    ariaLabel: "Share on Facebook",
    className: "w-4 h-4 sm:w-5 sm:h-5",
    href: "https://www.facebook.com/sharer/sharer.php?u={url}",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    ariaLabel: "Share on Instagram",
    className: "w-4 h-4 sm:w-5 sm:h-5",
    href: "https://www.instagram.com/direct/new/?text={url}",
  },
  {
    name: "Twitter",
    icon: <XIcon />,
    ariaLabel: "Share on Twitter",
    className: "w-3 h-3 sm:w-4 sm:h-4",
    href: "https://twitter.com/intent/tweet?url={url}&text={title}",
  },
  {
    name: "TikTok",
    icon: <TiktokIcon />,
    ariaLabel: "Share on TikTok",
    className: "w-4 h-4 sm:w-5 sm:h-5",
    href: "https://www.tiktok.com/share?url={url}&text={title}",
  },
];

const ShareButtons: React.FC<{
  url: string;
  title: string;
  variant: "desktop" | "mobile";
}> = ({ url, title, variant }) => {
  const wrapperClass =
    variant === "desktop"
      ? "absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 bg-white text-primary-300 p-2 sm:p-3 flex items-center gap-x-2 sm:gap-x-3 md:gap-x-4 shadow"
      : "text-primary-300 p-2 flex items-center justify-center gap-x-6";

  return (
    <div className={wrapperClass}>
      {socialMediaPlatforms.map((platform, index) => {
        const href = platform.href
          .replace("{url}", encodeURIComponent(url))
          .replace("{title}", encodeURIComponent(title));

        return (
          <Link
            key={index}
            href={href}
            aria-label={platform.ariaLabel}
            className={`hover:text-secondary-500 transition-colors ${platform.className}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {platform.icon}
          </Link>
        );
      })}
    </div>
  );
};

export const BlogHeroImage = ({
  src,
  alt,
  author,
  date,
  share: { url, title },
}: BlogHeroImageProps) => {
  const [imageError, setImageError] = useState(false);
  const metaText = `By: ${author} | ${date}`;

  return (
    <>
      <div className="hidden sm:block relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
            loading="eager"
            onError={() => setImageError(true)}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        )}
        <p className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 text-primary-300 text-xs sm:text-sm md:text-base font-light bg-white p-2 sm:p-3 shadow">
          {metaText}
        </p>
        <ShareButtons url={url} title={title} variant="desktop" />
      </div>

      <div className="sm:hidden">
        <div className="relative w-full h-[200px] overflow-hidden">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              loading="eager"
              onError={() => setImageError(true)}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          )}
        </div>
        <p className="text-primary-300 text-base font-light p-2 text-center mt-2">
          {metaText}
        </p>
        <ShareButtons url={url} title={title} variant="mobile" />
      </div>
    </>
  );
};
