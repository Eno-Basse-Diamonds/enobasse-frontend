export const API_URL = process.env.BACKEND_API_URL || "http://localhost:4000";

export const ringSizes = [
  "3",
  "3.5",
  "4",
  "4.5",
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
];

export const metalOptions = [
  {
    name: "Platinum",
    type: "metal",
    image: { src: "/images/metal-options/platinum.webp", alt: "Platinum" },
  },
  {
    name: "Rose Gold",
    type: "metal",
    image: { src: "/images/metal-options/rose-gold.avif", alt: "Rose Gold" },
  },
  {
    name: "White Gold",
    type: "metal",
    image: { src: "/images/metal-options/white-gold.avif", alt: "White Gold" },
  },
  {
    name: "Yellow Gold",
    type: "metal",
    image: {
      src: "/images/metal-options/yellow-gold.avif",
      alt: "Yellow Gold",
    },
  },
];

export const gemstones = [
  { name: "Diamond", type: "gemstone", color: "text-gray-400" },
  { name: "Ruby", type: "gemstone", color: "text-red-500" },
  { name: "Sapphire", type: "gemstone", color: "text-blue-600" },
  { name: "Emerald", type: "gemstone", color: "text-green-500" },
];
