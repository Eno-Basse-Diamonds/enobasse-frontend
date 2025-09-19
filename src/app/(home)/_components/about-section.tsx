import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/lib/utils/constants/blur-data-url";

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
    <section className="mt-10 md:mt-20 md:px-4 lg:px-8 flex flex-col-reverse lg:flex-row gap-y-8 lg:gap-x-8 items-center">
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
            {button.text}{" "}
          </Link>
        </div>
      </article>
      <figure className="w-full lg:max-w-[50%] flex justify-center">
        <Image
          src={image.src}
          alt={image.alt}
          height={600}
          width={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
          className="w-full h-auto"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </figure>
    </section>
  );
};
