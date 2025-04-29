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
      <article className="hero__content">
        <h1 id="hero-heading" className="hero__title">
          {title}
        </h1>
        <p className="hero__description">{description}</p>

        {buttons.length > 0 && (
          <nav aria-label="Primary actions" className="hero__nav">
            {buttons.map((link, index) => (
              <Link key={index} href={link.href} className="hero__button">
                {link.text}
              </Link>
            ))}
          </nav>
        )}
      </article>

      <figure className="hero__image-container">
        <Image
          src={image.src}
          alt={image.alt}
          title={image.alt}
          height={500}
          width={500}
          className="hero__image"
          quality={100}
          loading="eager"
          priority
        />
      </figure>
    </section>
  );
};
