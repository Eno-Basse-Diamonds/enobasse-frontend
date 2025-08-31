import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.scss";

interface HeroSectionProps {
  title: string;
  description: string;
  image: { src: string; alt: string };
  buttons: Array<{
    href: string;
    text: string;
  }>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  image,
  buttons,
}) => {
  return (
    <section aria-labelledby="hero-heading" className="hero">
      <figure className="hero__image-container hero__image-container--mobile">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="hero__image-container__image"
          priority
          sizes="100vw"
        />
      </figure>

      <article className="hero__content">
        <h1 id="hero-heading" className="hero__title">
          {title}
        </h1>
        <p className="hero__description">{description}</p>

        {buttons.length > 0 && (
          <nav aria-label="Primary actions" className="hero__nav">
            {buttons.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hero__button"
                passHref
              >
                {link.text}
              </Link>
            ))}
          </nav>
        )}
      </article>

      <figure className="hero__image-container hero__image-container--desktop">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="hero__image-container__image"
          priority
          sizes="50vw"
        />
      </figure>
    </section>
  );
};
