import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/lib/utils/constants";

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
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="w-full h-full object-cover"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </figure>
    </section>
  );
};

export const RingCustomizationCTASection: React.FC = () => {
  return (
    <section className="flex items-center justify-center bg-[#502B3A] mt-8  -mb-10 md:-mb-16">
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 text-center px-6 py-16 md:py-24">
          <h2 className="font-primary font-semibold text-3xl md:text-4xl text-white mb-6">
            Customize Your Dream Ring in 3D
          </h2>
          <p className="font-light md:text-lg lg:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Our revolutionary 3D ring customization feature is coming soon. Be
            the first to create a truly unique piece that reflects your style.
          </p>
          <button
            className="bg-white text-[#502B3A] font-semibold py-3 px-8 hover:bg-gray-100 transition-colors cursor-not-allowed"
            disabled
          >
            Coming Soon
          </button>
        </div>

        <div className="absolute w-full -bottom-[5rem] md:w-auto md:right-[8vw] h-64 md:h-80 lg:h-96 overflow-hidden">
          <Image
            src="https://res.cloudinary.com/enobasse/image/upload/v1756680507/3d-ring-customization-cta_pcu2wz.webp"
            alt="3D Ring Customization Preview"
            className="w-full h-full object-contain object-center"
            height={300}
            width={300}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#502B3A] via-transparent to-transparent pointer-events-none"></div>
      </section>
    </section>
  );
};
