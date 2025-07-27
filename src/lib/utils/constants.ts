export const API_URL = process.env.BACKEND_API_URL || "http://localhost:4000";

export const ringSizes = [
  3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
  12, 12.5, 13,
];

export const ringSizeGuide = [
  ["3", "44", "F", "14", "4", "4"],
  ["3.25", "45.78", "F-½", "14.1/4", "4.5/8", "—"],
  ["3.50", "45.1/4", "G", "14.1/2", "5.1/4", "5"],
  ["3.75", "45.7/8", "G-½", "14.3/4", "5.7/8", "6"],
  ["4", "46.1/2", "H", "15", "6.1/2", "7"],
  ["4.25", "47.1/8", "H-½", "—", "7.1/8", "—"],
  ["4.50", "47.3/4", "I", "15.1/4", "7.3/4", "8"],
  ["4.75", "48.3/8", "J", "15.1/2", "8.3/8", "—"],
  ["5", "49", "J-½", "15.3/4", "9", "9"],
  ["5.25", "49.5/8", "K", "16", "9.5/8", "—"],
  ["5.50", "50.1/4", "K-½", "16.1/4", "10.1/4", "10"],
  ["5.75", "50.7/8", "L", "—", "10.7/8", "11"],
  ["6", "51.1/2", "L-½", "16.1/2", "11.1/2", "12"],
  ["6.25", "52.1/8", "M", "16.3/4", "12.1/8", "—"],
  ["6.50", "52.3/4", "M-½", "17", "12.3/4", "13"],
  ["6.75", "53.3/8", "N", "—", "13.3/8", "—"],
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
