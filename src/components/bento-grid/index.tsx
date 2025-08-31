import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BentoItem {
  id: string;
  title: string;
  href: string;
  image: { src: string; alt: string };
}

export const BentoGrid: React.FC<{ items: BentoItem[] }> = ({ items }) => {
  const getGridLayout = (index: number) => {
    switch (index) {
      case 0:
        return "lg:col-span-1";
      case 1:
        return "md:col-span-2";
      case 2:
        return "md:col-span-2";
      case 3:
        return "lg:col-span-1";
      default:
        return "";
    }
  };

  const getTextPosition = (index: number) => {
    return index % 2 !== 0 ? "md:left-auto md:right-6" : "md:left-6";
  };

  return (
    <div
      role="grid"
      aria-label="collections"
      className="grid grid-cols-1 gap-y-6 lg:gap-y-8 mt-8 lg:grid-cols-3 lg:gap-x-8"
    >
      {items.slice(0, 4).map((item, index) => (
        <div
          key={item.id}
          className={`h-full relative overflow-hidden ${getGridLayout(index)}`}
        >
          <Link href={item.href} className="block h-full">
            <figure className="relative h-64 w-full md:h-[447px]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                title={item.image.alt}
                height={1000}
                width={1000}
                loading="lazy"
                quality={100}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              />
              <h3
                className={`absolute bottom-4 text-center text-sm md:text-lg font-light mb-2 bg-white px-9 py-2 text-[#502B3A] left-1/2 transform -translate-x-1/2 w-[calc(100%-3rem)] md:w-auto md:transform-none ${getTextPosition(
                  index
                )}`}
              >
                {item.title}
              </h3>
            </figure>
          </Link>
        </div>
      ))}
    </div>
  );
};
