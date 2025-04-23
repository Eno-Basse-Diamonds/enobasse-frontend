import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";

interface AboutSectionProps {
  title: string;
  description: string[];
  button: { text: string; href: string };
  image: { src: string; alt: string };
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  description,
  button,
  image,
}) => {
  return (
    <section className="about-section">
      <article className="about-section__content">
        <h2 className="about-section__title">{title}</h2>
        <div className="about-section__description">
          {description.map((paragraph, index) => (
            <p key={index} className="about-section__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="about-section__button-wrapper">
          <Link href={button.href} className="about-section__button">
            {button.text}{" "}
            <ArrowUpRightIcon className="about-section__button-icon" />
          </Link>
        </div>
      </article>
      <figure className="about-section__image-container">
        <Image
          src={image.src}
          alt={image.alt}
          height={500}
          width={500}
          loading="lazy"
          quality={100}
          className="about-section__image"
        />
      </figure>
    </section>
  );
};
