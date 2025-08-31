import React from "react";
import Link from "next/link";

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
    <section className="mt-10 md:mt-20 md:px-4 lg:px-8 flex flex-col lg:flex-row gap-y-8 lg:gap-x-8 items-center">
      <div className="w-full lg:max-w-[50%] h-[300px] lg:h-[600px] overflow-hidden flex justify-center">
        <video
          autoPlay={true}
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <article className="px-4 md:px-0 mx-auto max-w-4xl flex flex-col lg:items-start">
        <h2 className="font-primary font-semibold text-2xl md:text-3xl lg:text-4xl text-[#502B3A] mb-6">
          {title}
        </h2>
        <div className="space-y-4 mb-6 md:mb-10">
          {description.map((paragraph, index) => (
            <p
              key={index}
              className="font-light text-base text-[#1B1B1D] max-w-2xl"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="text-left">
          <Link
            href={button.href}
            className="inline-flex items-center gap-x-2 bg-[#502B3A] py-3 px-8 text-white text-center hover:bg-opacity-90 justify-center"
          >
            {button.text}
          </Link>
        </div>
      </article>
    </section>
  );
};
