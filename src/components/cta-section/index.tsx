import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "../icons";
import "./styles.scss";

interface CTASectionProps {
  heading: string;
  button: { text: string; href: string };
  image: { src: string; alt: string };
}

export const CTASection: React.FC<CTASectionProps> = ({
  heading,
  button,
  image,
}) => {
  return (
    <section aria-labelledby="cta-heading" className="cta-section">
      <div className="cta-section__gradient-overlay" />

      <article className="cta-section__content">
        <h2 id="cta-heading" className="cta-section__heading">
          {heading}
        </h2>
        <div className="cta-section__button-wrapper">
          <Link href={button.href} className="cta-section__button">
            {button.text} <ArrowUpRightIcon className="cta-section__button-icon" />
          </Link>
        </div>
      </article>

      <figure className="cta-section__image-container">
        <Image
          src={image.src}
          alt={image.alt}
          height={500}
          width={500}
          loading="lazy"
          className="cta-section__image"
        />
      </figure>
    </section>
  );
};
