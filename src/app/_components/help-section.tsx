import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";

interface HelpSectionProps {
  title: string;
  body: string[];
  button: { text: string; href: string };
  image: { src: string; alt: string };
}

export const HelpSection: React.FC<HelpSectionProps> = ({
  title,
  body,
  button,
  image,
}) => {
  return (
    <section className="help-section">
      <figure className="help-section__image-container">
        <Image
          src={image.src}
          alt={image.alt}
          height={500}
          width={500}
          loading="lazy"
          quality={100}
          className="help-section__image"
        />
      </figure>
      <article className="help-section__content">
        <h2 className="help-section__title">{title}</h2>
        <div className="help-section__body">
          {body.map((paragraph, index) => (
            <p key={index} className="help-section__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="help-section__button-wrapper">
          <Link href={button.href} className="help-section__button">
            {button.text}{" "}
            <ArrowUpRightIcon className="help-section__button-icon" />
          </Link>
        </div>
      </article>
    </section>
  );
};
