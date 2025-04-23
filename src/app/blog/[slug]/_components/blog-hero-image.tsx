import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  XIcon,
  InstagramIcon,
  TiktokIcon,
} from "@/components/icons";

interface BlogHeroImageProps {
  src: string;
  alt: string;
  author: string;
  date: string;
}

export const BlogHeroImage = ({ src, alt, author, date }: BlogHeroImageProps) => (
  <>
    <div className="blog-detail__hero--desktop">
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        quality={100}
        className="blog-detail__hero--desktop-image"
        priority />
      <p className="blog-detail__hero--desktop-meta">
        By: {author} | {date}
      </p>
      <ShareButtons />
    </div>
    <div className="blog-detail__hero--mobile">
      <div className="blog-detail__hero--mobile-container">
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          quality={100}
          className="blog-detail__hero--mobile-image"
          priority />
      </div>
      <p className="blog-detail__hero--mobile-meta">
        By: {author} | {date}
      </p>
      <ShareButtons />
    </div>
  </>
);

const ShareButtons = () => (
  <div className="blog-detail__hero-share">
    <Link
      href="#"
      aria-label="Share on Facebook"
      className="blog-detail__share-link blog-detail__share-link--facebook"
    >
      <FacebookIcon />
    </Link>
    <Link
      href="#"
      aria-label="Share on Instagram"
      className="blog-detail__share-link blog-detail__share-link--instagram"
    >
      <InstagramIcon />
    </Link>
    <Link
      href="#"
      aria-label="Share on X"
      className="blog-detail__share-link blog-detail__share-link--x"
    >
      <XIcon />
    </Link>
    <Link
      href="#"
      aria-label="Share on TikTok"
      className="blog-detail__share-link blog-detail__share-link--tiktok"
    >
      <TiktokIcon />
    </Link>
  </div>
);
