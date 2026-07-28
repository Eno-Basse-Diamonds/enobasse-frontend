import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BentoItem {
  id: string;
  title: string;
  href: string;
  image: { src: string; alt: string };
}

/**
 * Responsive bento-grid layout for collections.
 *
 * @description Renders a dynamic grid of collection cards where items alternate between
 * single- and double-column spans to create a bento-style layout. Each card displays an
 * image and a linked title overlay.
 *
 * @param props.items - Array of bento grid items with id, title, href, and image.
 * @param props.items[].id - Unique identifier for the item.
 * @param props.items[].title - Display title shown on the card overlay.
 * @param props.items[].href - Link destination when the card is clicked.
 * @param props.items[].image - Object containing the card image src and alt.
 * @returns The rendered bento grid.
 */
export const BentoGrid: React.FC<{ items: BentoItem[] }> = ({ items }) => {
  const getGridLayout = (index: number) => {
    const mod = index % 4;
    switch (mod) {
      case 0:
        return "md:col-span-1";
      case 1:
        return "md:col-span-2";
      case 2:
        return "md:col-span-2";
      case 3:
        return "md:col-span-1";
      default:
        return "";
    }
  };

  const getTextAlignment = (index: number) => {
    return index % 2 !== 0 ? "md:justify-end" : "md:justify-start";
  };

  return (
    <div
      role="grid"
      aria-label="collections"
      className="grid grid-cols-1 gap-y-6 md:gap-y-8 mt-8 md:grid-cols-3 md:gap-x-8"
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`rounded-sm bg-gray-100 h-full relative overflow-hidden ${getGridLayout(index)}`}
        >
          <Link href={item.href} className="block h-full">
            <figure className="relative h-64 w-full md:h-111.75">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                title={item.image.alt}
                fill
                sizes={
                  index % 4 === 1 || index % 4 === 2
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
              <div
                className={`absolute inset-x-0 bottom-5 flex justify-center px-6 ${getTextAlignment(
                  index,
                )}`}
              >
                <h3 className="rounded-sm max-w-full text-center text-sm md:text-lg font-light bg-white px-9 py-2 text-[#502B3A]">
                  {item.title}
                </h3>
              </div>
            </figure>
          </Link>
        </div>
      ))}
    </div>
  );
};
