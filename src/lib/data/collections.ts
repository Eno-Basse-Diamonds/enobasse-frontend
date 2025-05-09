import { Product, products } from "./products";

export interface Collection {
  id: number | string;
  name: string;
  slug: string;
  description?: string;
  image: { src: string; alt: string };
  itemsCount: number;
  products?: Product[];
}

export const collections: Collection[] = [
  {
    id: 1,
    name: "Engagement Rings",
    slug: "engagement-rings",
    image: {
      src: "/images/collection.jpg",
      alt: "Engagement rings collection",
    },
    itemsCount: 42,
  },
  {
    id: 2,
    name: "Bridal Jewellery",
    slug: "bridal-jewellery",
    image: {
      src: "/images/collection.jpg",
      alt: "Bridal jewellery collection",
    },
    itemsCount: 28,
  },
  {
    id: 3,
    name: "Men's Luxury Watches",
    slug: "mens-watches",
    image: {
      src: "/images/collection.jpg",
      alt: "Men's watches collection",
    },
    itemsCount: 15,
  },
  {
    id: 4,
    name: "Gemstone Treasures",
    slug: "gemstone-treasures",
    image: {
      src: "/images/collection.jpg",
      alt: "Gemstone jewellery collection",
    },
    itemsCount: 36,
  },
  {
    id: 5,
    name: "Minimalist Collection",
    slug: "minimalist-jewellery",
    image: {
      src: "/images/collection.jpg",
      alt: "Minimalist jewellery collection",
    },
    itemsCount: 22,
  },
  {
    id: 6,
    name: "Vintage Revival",
    slug: "vintage-revival",
    image: {
      src: "/images/collection.jpg",
      alt: "Vintage jewellery collection",
    },
    itemsCount: 19,
  },
];

export const collectionsWithProducts: Collection[] = [
  {
    id: 1,
    name: "Engagement Rings",
    slug: "engagement-rings",
    description:
      "Timeless diamond and gemstone rings designed for lifelong commitment. Handcrafted in premium metals.",
    image: {
      src: "/images/collection.jpg",
      alt: "Engagement rings collection",
    },
    itemsCount: 12,
    products: products,
  },
  {
    id: 2,
    name: "Bridal Jewellery",
    slug: "bridal-jewellery",
    description:
      "Celebrate your relationship with the perfect wedding ring. Our men's and women's wedding bands feature the finest platinum, gold and contemporary metals. From modern wedding rings to classic designs, you’re sure to find your fit in our wedding ring collection.",
    image: {
      src: "/images/collection.jpg",
      alt: "Bridal jewellery collection",
    },
    itemsCount: 8,
    products: products,
  },
  {
    id: 3,
    name: "Men's Luxury Watches",
    slug: "mens-watches",
    description:
      "Precision-crafted timepieces for the modern gentleman, featuring leather and metal straps.",
    image: { src: "/images/collection.jpg", alt: "Men's watches collection" },
    itemsCount: 5,
    products: products,
  },
  {
    id: 4,
    name: "Gemstone Treasures",
    slug: "gemstone-treasures",
    description:
      "Vibrant sapphires, rubies, and emeralds set in 18K gold and platinum designs.",
    image: {
      src: "/images/collection.jpg",
      alt: "Gemstone jewellery collection",
    },
    itemsCount: 15,
    products: products,
  },
  {
    id: 5,
    name: "Minimalist Collection",
    slug: "minimalist-jewellery",
    description:
      "Delicate, understated pieces for everyday elegance. Ideal for layering and stacking.",
    image: {
      src: "/images/collection.jpg",
      alt: "Minimalist jewellery collection",
    },
    itemsCount: 10,
    products: products,
  },
  {
    id: 6,
    name: "Vintage Revival",
    slug: "vintage-revival",
    description:
      "Heirloom-quality pieces inspired by Art Deco, Victorian, and Retro eras.",
    image: {
      src: "/images/collection.jpg",
      alt: "Vintage jewellery collection",
    },
    itemsCount: 7,
    products: products,
  },
];
