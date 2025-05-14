export type MetalName = "White Gold" | "Yellow Gold" | "Rose Gold" | "Platinum";

export interface Metal {
  name: MetalName;
  purity?: string | null;
  weight?: string;
}

export interface Gemstone {
  name: string;
  weight?: string;
}

export interface ProductVariant {
  sku: string;
  name: string;
  description: string;
  price: number;
  metal: Metal;
  gemstone: Gemstone;
  images: Array<{ src: string; alt: string; }>;
}

export interface Review {
  id: string | number;
  rating: number;
  customer: {name: string; image: {src: string; alt: string;}},
  date: string;
  title: string;
  content: string;
}

export interface Product {
  id: number | string;
  name: string;
  slug: string;
  priceRange: { min: number; max: number };
  currency: string;
  category: string;
  images: Array<{ src: string; alt: string }>;
  variants: ProductVariant[];
  metals?: Metal[];
  gemstones?: Gemstone[];
  reviews?: Review[];
  ratingDistribution?: [
    { stars: 5, percentage: number; },
    { stars: 4, percentage: number; },
    { stars: 3, percentage: number; },
    { stars: 2, percentage: number; },
    { stars: 1, percentage: number; },
  ];
}

export const product: Product = {
  id: 1,
  name: "Eternity Band",
  slug: "eternity-band",
  category: "ring",
  currency: "$",
  images: [],
  priceRange: { min: 3000, max: 3499 },
  metals: [
    { name: "White Gold", purity: "14K" },
    { name: "White Gold", purity: "18K" },
    { name: "Yellow Gold", purity: "18K" },
    { name: "Rose Gold", purity: "18K" },
    { name: "Platinum", purity: "Pt" },
  ],
  gemstones: [
    { name: "Diamond", weight: "0.25ct" },
    { name: "Diamond", weight: "0.5ct" },
    { name: "Sapphire", weight: "0.5ct" },
    { name: "Sapphire", weight: "1ct" },
  ],
  variants: [
    {
      sku: "RI00021",
      name: "0.25ct Eternity Diamond Band in 14K White Gold",
      description: "Delicate 0.25ct diamond band",
      price: 2800,
      metal: { name: "White Gold", purity: "14K" },
      gemstone: { name: "Diamond", weight: "0.25ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],
    },
    {
      sku: "RI00021",
      name: "0.25ct Eternity Diamond Band in 18K White Gold",
      description: "Delicate 0.25ct diamond band in premium gold",
      price: 3200,
      metal: { name: "White Gold", purity: "18K" },
      gemstone: { name: "Diamond", weight: "0.25ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],

    },
    {
      sku: "RI00021",
      name: "18K Eternity Diamond Band in 18K Yellow Gold",
      description: "Luxurious 0.5ct diamond band",
      price: 5800,
      metal: { name: "Yellow Gold", purity: "18K" },
      gemstone: { name: "Diamond", weight: "0.5ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],
    },
    {
      sku: "RI00021",
      name: "0.5ct Eternity Diamond Band in Platinum",
      description: "0.5ct diamond band in pure platinum",
      price: 8500,
      metal: { name: "Platinum", purity: null },
      gemstone: { name: "Diamond", weight: "0.5ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],
    },
    {
      sku: "RI00021",
      name: "Rose Gold Diamond Band",
      description: "Romantic 0.25ct diamond band in rose gold",
      price: 3500,
      metal: { name: "Rose Gold", purity: "18K" },
      gemstone: { name: "Diamond", weight: "0.25ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],
    },
    {
      sku: "RI00021",
      name: "14K White Gold Sapphire Band",
      description: "0.5ct sapphire eternity band",
      price: 3200,
      metal: { name: "White Gold", purity: "14K" },
      gemstone: { name: "Sapphire", weight: "0.5ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],
    },
    {
      sku: "RI00021",
      name: "18K White Gold Sapphire Band",
      description: "Premium 0.5ct sapphire band",
      price: 3800,
      metal: { name: "White Gold", purity: "18K" },
      gemstone: { name: "Sapphire", weight: "0.5ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],
    },
    {
      sku: "RI00021",
      name: "Platinum Sapphire Band",
      description: "Luxurious 1ct sapphire band",
      price: 9200,
      metal: { name: "Platinum", purity: null },
      gemstone: { name: "Sapphire", weight: "1ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],
    },
    {
      sku: "RI00021",
      name: "Rose Gold Sapphire Band",
      description: "1ct sapphire band in romantic rose gold",
      price: 6500,
      metal: { name: "Rose Gold", purity: "18K" },
      gemstone: { name: "Sapphire", weight: "1ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],
    },
    {
      sku: "RI00021",
      name: "Yellow Gold Sapphire Band",
      description: "Classic 0.5ct sapphire band",
      price: 4200,
      metal: { name: "Yellow Gold", purity: "18K" },
      gemstone: { name: "Sapphire", weight: "0.5ct" },
      images: [
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
        {
          src: "/images/products/product-01.jpg",
          alt: "Solitaire diamond engagement ring",
        },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      customer: {
        name: "Emily Selman",
        image: { src: "/images/reviewer.avif", alt: "" },
      },
      date: "2024-10-01",
      rating: 5.0,
      title: "Perfect for Travel",
      content:
        "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",

    },
    {
      id: 2,
      customer: {
        name: "Hector Gibbons",
        image: { src: "/images/reviewer.avif", alt: "" },
      },
      date: "2024-09-15",
      rating: 4.0,
      title: "No More Crumbs",
      content:
        "Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!",
    },
    {
      id: 3,
      customer: {
        name: "Mark Edwards",
        image: { src: "/images/reviewer.avif", alt: "" },
      },
      date: "2024-08-29",
      rating: 5.0,
      title: "Super Versatile",
      content:
        "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
    },
  ],
  ratingDistribution: [
    { stars: 5, percentage: 63 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 6 },
    { stars: 2, percentage: 12 },
    { stars: 1, percentage: 9 },
  ],
};

export const products: Product[] = [
  {
    id: 101,
    name: "Classic Solitaire Diamond Ring",
    slug: "solitaire-diamond-ring",
    priceRange: { min: 3499, max: 3999 },
    currency: "$",
    category: "ring",
    images: [
      {
        src: "/images/products/product-01.jpg",
        alt: "Solitaire diamond engagement ring",
      },
      { src: "/images/products/product-02.jpg", alt: "Side view of the ring" },
    ],
    variants: [],
  },
  {
    id: 102,
    name: "Halo Rose Gold Engagement Ring",
    slug: "halo-rose-gold-ring",
    priceRange: { min: 3499, max: 3999 },
    currency: "$",
    category: "ring",
    images: [
      {
        src: "/images/products/product-01.jpg",
        alt: "Rose gold halo engagement ring",
      },
      {
        src: "/images/products/product-02.jpg",
        alt: "Rose gold halo engagement ring",
      },
    ],
    variants: [],
  },
  {
    id: 201,
    name: "Pearl & Diamond Bridal Set",
    slug: "pearl-diamond-bridal-set",
    priceRange: { min: 3499, max: 3999 },
    currency: "$",
    category: "neckpiece",
    images: [
      {
        src: "/images/products/product-01.jpg",
        alt: "Bridal pearl necklace and earrings set",
      },
      {
        src: "/images/products/product-02.jpg",
        alt: "Bridal pearl necklace and earrings set",
      },
    ],
    variants: [],
  },
  {
    id: 301,
    name: "Chronograph Leather Strap Watch",
    slug: "mens-chronograph-watch",
    priceRange: { min: 3499, max: 3999 },
    currency: "$",
    category: "watch",
    images: [
      {
        src: "/images/products/product-01.jpg",
        alt: "Men's luxury chronograph watch",
      },
      {
        src: "/images/products/product-02.jpg",
        alt: "Men's luxury chronograph watch",
      },
    ],
    variants: [],
  },
  {
    id: 401,
    name: "Blue Sapphire Statement Ring",
    slug: "blue-sapphire-ring",
    priceRange: { min: 3499, max: 3999 },
    currency: "$",
    category: "ring",
    images: [
      {
        src: "/images/products/product-01.jpg",
        alt: "Blue sapphire gemstone ring",
      },
      {
        src: "/images/products/product-02.jpg",
        alt: "Blue sapphire gemstone ring",
      },
    ],
    variants: [],
  },
  {
    id: 501,
    name: "Thin Gold Stackable Ring",
    slug: "thin-gold-stackable-ring",
    priceRange: { min: 3499, max: 3999 },
    currency: "$",
    category: "ring",
    images: [
      {
        src: "/images/products/product-01.jpg",
        alt: "Minimalist gold stackable ring",
      },
      {
        src: "/images/products/product-02.jpg",
        alt: "Minimalist gold stackable ring",
      },
    ],
    variants: [],
  },
  {
    id: 601,
    name: "Art Deco Diamond Brooch",
    slug: "art-deco-brooch",
    priceRange: { min: 3499, max: 3999 },
    currency: "$",
    category: "brooch",
    images: [
      {
        src: "/images/products/product-01.jpg",
        alt: "Vintage art deco diamond brooch",
      },
      {
        src: "/images/products/product-02.jpg",
        alt: "Vintage art deco diamond brooch",
      },
    ],
    variants: [],
  },
];
