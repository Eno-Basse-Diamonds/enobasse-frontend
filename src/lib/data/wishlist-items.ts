export interface WishlistItem {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  metal: { name: string; purity: string };
  gemstone: { name: string; weight: number };
  image: { src: string; alt: string };
  inStock: boolean;
}

export const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Diamond Solitaire Necklace",
    slug: "diamond-solitaire-necklace",
    price: 1299.99,
    currency: "$",
    metal: { name: "White Gold", purity: "18K" },
    gemstone: { name: "Diamond", weight: 0.5 },
    image: { src: "/images/cart-item.png", alt: "Diamond solitaire necklace" },
    inStock: true,
  },
  {
    id: 2,
    name: "Pearl Drop Earrings",
    slug: "pearl-drop-earrings",
    price: 249.99,
    currency: "$",
    metal: { name: "White Gold", purity: "18K" },
    gemstone: { name: "Pearl", weight: 1.2 },
    image: { src: "/images/cart-item.png", alt: "Pearl drop earrings" },
    inStock: true,
  },
  {
    id: 3,
    name: "Infinity Love Bracelet",
    slug: "infinity-love-bracelet",
    price: 179.99,
    currency: "$",
    metal: { name: "White Gold", purity: "18K" },
    gemstone: { name: "Diamond", weight: 0.25 },
    image: { src: "/images/cart-item.png", alt: "Infinity love bracelet" },
    inStock: true,
  },
  {
    id: 4,
    name: "Vintage Cocktail Ring",
    slug: "vintage-cocktail-ring",
    price: 349.99,
    currency: "$",
    metal: { name: "White Gold", purity: "18K" },
    gemstone: { name: "Sapphire", weight: 1.8 },
    image: { src: "/images/cart-item.png", alt: "Vintage cocktail ring" },
    inStock: false,
  },
];
