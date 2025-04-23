import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";

interface ServicesSectionProps {
  title: string;
  description: string[];
  button: { text: string; href: string };
  videoSrc: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  title,
  description,
  button,
  videoSrc,
}) => {
  return (
    <section className="services-section">
      <div className="services-section__video-container">
        <video autoPlay={true} muted loop className="services-section__video">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <article className="services-section__content">
        <h2 className="services-section__title">{title}</h2>
        <div className="services-section__description">
          {description.map((paragraph, index) => (
            <p key={index} className="services-section__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="services-section__button-wrapper">
          <Link href={button.href} className="services-section__button">
            {button.text}{" "}
            <ArrowUpRightIcon className="services-section__button-icon" />
          </Link>
        </div>
      </article>
    </section>
  );
};
