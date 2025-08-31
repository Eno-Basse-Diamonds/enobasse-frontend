import React from "react";
import Image from "next/image";
import Link from "next/link";

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
    <section
      aria-labelledby="cta-heading"
      className="relative mt-10 md:mt-20 flex flex-col-reverse lg:flex-row items-center justify-between bg-[#502B3A] overflow-hidden z-10 lg:bg-gradient-to-r lg:from-[#502B3A] lg:via-[#502B3A]/90 lg:via-70% lg:to-transparent"
    >
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#502B3A] via-[#502B3A] via-[80%] to-transparent z-10 w-[70%]" />

      <article className="relative text-center lg:text-left z-20 px-6 py-12 lg:py-24 lg:pl-8 lg:pr-0 max-w-lg">
        <h2
          id="cta-heading"
          className="font-primary font-semibold text-3xl md:text-4xl text-white mb-10"
        >
          {heading}
        </h2>
        <div className="mx-auto lg:mx-0">
          <Link
            href={button.href}
            className="inline-flex items-center gap-x-2 bg-white text-[#502B3A] py-3 px-8 font-medium hover:bg-opacity-90 transition-colors"
          >
            {button.text}
          </Link>
        </div>
      </article>

      <figure className="w-full h-[250px] relative z-0 lg:w-[50%] lg:h-[400px]">
        <Image
          src={image.src}
          alt={image.alt}
          height={500}
          width={500}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </figure>
    </section>
  );
};
