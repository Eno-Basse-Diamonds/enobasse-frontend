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
    className: "blog-detail__share-link--facebook",
    href: "https://www.facebook.com/sharer/sharer.php?u={url}",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    ariaLabel: "Share on Instagram",
    className: "blog-detail__share-link--instagram",
    href: "https://www.instagram.com/direct/new/?text={url}",
  },
  {
    name: "Twitter",
    icon: <XIcon />,
    ariaLabel: "Share on Twitter",
    className: "blog-detail__share-link--x",
    href: "https://twitter.com/intent/tweet?url={url}&text={title}",
  },
  {
    name: "TikTok",
    icon: <TiktokIcon />,
    ariaLabel: "Share on TikTok",
    className: "blog-detail__share-link--tiktok",
    href: "https://www.tiktok.com/share?url={url}&text={title}",
  },
];

const ShareButtons: React.FC<{ url: string; title: string }> = ({ url, title }) => (
  <div className="blog-detail__hero-share">
    {socialMediaPlatforms.map((platform, index) => {
      const href = platform.href
        .replace("{url}", encodeURIComponent(url))
        .replace("{title}", encodeURIComponent(title));

      return (
        <Link
          key={index}
          href={href}
          aria-label={platform.ariaLabel}
          className={`blog-detail__share-link ${platform.className}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {platform.icon}
        </Link>
      );
    })}
  </div>
);

export const BlogHeroImage = ({
  src,
  alt,
  author,
  date,
  share: { url, title },
}: BlogHeroImageProps) => {
  const [desktopImageError, setDesktopImageError] = useState(false);
  const [mobileImageError, setMobileImageError] = useState(false);

  return (
    <>
      <div className="blog-detail__hero--desktop">
        {desktopImageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            title={alt}
            width={1920}
            height={1080}
            quality={100}
            className="blog-detail__hero--desktop-image"
            priority
            onError={() => setDesktopImageError(true)}
          />
        )}
        <p className="blog-detail__hero--desktop-meta">
          By: {author} | {date}
        </p>
        <ShareButtons url={url} title={title} />
      </div>

      <div className="blog-detail__hero--mobile">
        <div className="blog-detail__hero--mobile-container">
          {mobileImageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              quality={100}
              className="blog-detail__hero--mobile-image"
              priority
              onError={() => setMobileImageError(true)}
            />
          )}
        </div>
        <p className="blog-detail__hero--mobile-meta">
          By: {author} | {date}
        </p>
        <ShareButtons url={url} title={title} />
      </div>
    </>
  );
};
