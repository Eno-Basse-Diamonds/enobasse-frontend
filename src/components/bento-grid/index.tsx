import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.scss";

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
        return "bento-grid__item--span-1";
      case 1:
        return "bento-grid__item--span-2";
      case 2:
        return "bento-grid__item--span-2";
      case 3:
        return "bento-grid__item--span-1";
      default:
        return "";
    }
  };

  const getTextPosition = (index: number) => {
    return index % 2 !== 0
      ? "bento-grid__title--right"
      : "bento-grid__title--left";
  };

  return (
    <div role="grid" aria-label="collections" className="bento-grid">
      {items.slice(0, 4).map((item, index) => (
        <div
          key={item.id}
          className={`bento-grid__item ${getGridLayout(index)}`}
        >
          <Link href={item.href} className="bento-grid__link">
            <figure className="bento-grid__figure">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                height={500}
                width={500}
                loading="lazy"
                quality={100}
                className="bento-grid__image"
              />
              <h3 className={`bento-grid__title ${getTextPosition(index)}`}>
                {item.title}
              </h3>
            </figure>
          </Link>
        </div>
      ))}
    </div>
  );
};
