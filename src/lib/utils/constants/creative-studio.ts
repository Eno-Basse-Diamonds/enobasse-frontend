import type {
  Option,
  MetalOption,
  KaratOption,
  FontOption,
  RingConfiguration,
  ThreeDProperties,
  Shank3DProperties,
} from "../../types/creative-studio";

export const GEMSTONE_SHAPES: Option[] = [
  {
    id: "round",
    name: "Round",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107277/round_d5xuet.png",
  },
  {
    id: "princess",
    name: "Princess",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107276/princess_svvsrs.png",
  },
  {
    id: "radiant",
    name: "Radiant",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107276/radiant_h1s2al.png",
  },
  {
    id: "emerald",
    name: "Emerald",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107277/emerald_k83vo7.png",
  },
  {
    id: "marquise",
    name: "Marquise",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107276/marquise_vhc6z3.png",
  },
  {
    id: "oval",
    name: "Oval",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107277/oval_bvzuwq.png",
  },
  {
    id: "pear",
    name: "Pear",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107276/pear_m9mpme.png",
  },
  {
    id: "heart",
    name: "Heart",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107276/heart_g085yq.png",
  },
  {
    id: "asscher",
    name: "Asscher",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107277/asscher_dow4yg.png",
  },
  {
    id: "cushion",
    name: "Cushion",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758107277/cushion_bzf7oa.png",
  },
];

export const PREVIEW_SIZES = [
  "1 ct",
  "1.5 ct",
  "2 ct",
  "2.5 ct",
  "3 ct",
  "3.5 ct",
  "4 ct",
  "4.5 ct",
  "5 ct",
  "5.5 ct",
  "6 ct",
  "6.5 ct",
  "7 ct",
  "7.5 ct",
  "8 ct",
  "8.5 ct",
  "9 ct",
  "9.5 ct",
  "10 ct",
];

export const HEAD_STYLES: Option[] = [
  {
    id: "4-prong-nouveau",
    name: "4 Prong Nouveau",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110902/4-prong-nouveau_bmptye.png",
  },
  {
    id: "classic-bezel",
    name: "Classic Bezel",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110899/classic-bezel_mkmvzu.png",
  },
  {
    id: "classic-halo",
    name: "Classic Halo",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110899/classic-halo_csqh71.png",
  },
  {
    id: "hidden-halo",
    name: "Hidden Halo",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110910/hidden-halo_hbmrjz.png",
  },
  {
    id: "dual-halo",
    name: "Dual Halo",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110909/dual-halo_ofeg6s.png",
  },
  {
    id: "three-stone",
    name: "Three Stone",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110906/6-prong-nouveau_bkwxwe.png",
  },
];

export const SHANK_STYLES: Option[] = [
  {
    id: "solitaire",
    name: "Solitaire",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289224/solitare_hdbuqy.png",
  },
  {
    id: "knife-edge-solitaire",
    name: "Knife Edge Solitaire",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289221/knife-edge-solitare_myigc2.png",
  },
  {
    id: "split-ring-solitaire",
    name: "Split Ring Solitaire",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289224/split-ring-solitare_ludnv3.png",
  },
  {
    id: "french-pave",
    name: "French Pavé",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289221/french-pave_llr4dp.png",
  },
  {
    id: "cathedral-pave",
    name: "Cathedral Pavé",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289221/knife-edge-solitare_myigc2.png",
  },
  {
    id: "baguette-channel",
    name: "Baguette Channel",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289221/baguette-channel_csloyb.png",
  },
  {
    id: "twist-pave",
    name: "Twist Pavé",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289228/twist-pave_b2pz5e.png",
  },
];

export const METAL_TYPES: MetalOption[] = [
  { id: "white-gold", name: "White Gold", color: "#dadada", image: "" },
  { id: "yellow-gold", name: "Yellow Gold", color: "#e9d9ab", image: "" },
  { id: "rose-gold", name: "Rose Gold", color: "#fce3d4", image: "" },
  { id: "platinum", name: "Platinum", color: "#e5e5e5", image: "" },
];

export const KARATS: KaratOption[] = [
  { id: "14k", name: "14K" },
  { id: "18k", name: "18K" },
];

export const ENGRAVING_FONTS: FontOption[] = [
  { name: "Arial", fontFamily: "Arial, sans-serif" },
  { name: "Times New Roman", fontFamily: '"Times New Roman", serif' },
  { name: "Courier New", fontFamily: '"Courier New", monospace' },
  { name: "Georgia", fontFamily: "Georgia, serif" },
  { name: "Verdana", fontFamily: "Verdana, sans-serif" },
  { name: "Dancing Script", fontFamily: '"Dancing Script", cursive' },
];

export const HEAD_STYLES_BY_GEMSTONE: Record<string, string[]> = {
  round: [
    "4-prong-nouveau",
    "classic-halo",
    "hidden-halo",
    "dual-halo",
    "classic-bezel",
    "three-stone",
  ],
  princess: ["4-prong-nouveau", "classic-bezel", "three-stone"],
  radiant: ["4-prong-nouveau", "classic-bezel"],
  emerald: ["4-prong-nouveau", "classic-bezel"],
  marquise: ["4-prong-nouveau", "classic-bezel"],
  oval: ["4-prong-nouveau", "classic-bezel", "three-stone"],
  pear: ["4-prong-nouveau", "classic-bezel"],
  heart: ["4-prong-nouveau", "classic-bezel"],
  asscher: ["4-prong-nouveau", "classic-bezel"],
  cushion: ["4-prong-nouveau", "classic-bezel"],
};

export const GEMSTONES_BY_HEAD_STYLE: Record<string, string[]> = {
  "4-prong-nouveau": [
    "round",
    "princess",
    "radiant",
    "emerald",
    "marquise",
    "oval",
    "pear",
    "heart",
    "asscher",
    "cushion",
  ],
  "classic-halo": ["round"],
  "hidden-halo": ["round"],
  "dual-halo": ["round"],
  "classic-bezel": [
    "round",
    "princess",
    "radiant",
    "emerald",
    "marquise",
    "oval",
    "pear",
    "heart",
    "asscher",
    "cushion",
  ],
  "three-stone": ["round", "princess", "oval"],
};

export const DEFAULT_CONFIGURATION: RingConfiguration = {
  gemstoneShape: "round",
  previewSize: "1 ct",
  headStyle: "4-prong-nouveau",
  shankStyle: "solitaire",
  metalType: "white-gold",
  karat: "14k",
  ringSize: 6.5,
  diamondType: "lab",
  engravingText: "",
  engravingFont: "Arial, sans-serif",
};

export const METAL_MATERIALS = {
  "white-gold": { color: "#dbdbdb", metalness: 0.95, roughness: 0.2 },
  "yellow-gold": { color: "#ffd280", metalness: 0.95, roughness: 0.2 },
  "rose-gold": { color: "#ffbaa3", metalness: 0.95, roughness: 0.2 },
  platinum: { color: "#e5e4e2", metalness: 0.95, roughness: 0.2 },
};

export const GEMSTONE_3D_PROPERTIES: Record<string, ThreeDProperties> = {
  ROUND: { position: [0.001, 9.5, 0.007], scale: 0.78 },
  PRINCESS: {
    position: [0.001, 9.2, 0.007],
    rotation: [Math.PI / 2, 0, 0],
    scale: 0.9,
  },
  RADIANT: {
    position: [0.001, 9.2, 0.007],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1.5,
  },
  EMERALD: {
    position: [-0.07, 9.2, 0.007],
    rotation: [Math.PI / 2, 0, 0],
    scale: [0.9, 0.95, 0.85],
  },
  MARQUISE: {
    position: [0.001, 8.8, 0.007],
    rotation: [Math.PI / 2, 0, 0],
    scale: [0.8, 0.7, 0.7],
  },
  OVAL: {
    position: [0.001, 9.2, 0.007],
    rotation: [Math.PI / 2, 0, 0],
    scale: [0.78, 0.9, 0.78],
  },
  PEAR: {
    position: [0.001, 9.2, -0.3],
    rotation: [Math.PI / 2, 0, 0],
    scale: 0.78,
  },
  HEART: {
    position: [0.001, 9.2, -0.3],
    rotation: [Math.PI / 2, 0, 0],
    scale: 0.78,
  },
  ASSCHER: {
    position: [0.001, 9, 0.007],
    rotation: [Math.PI / 2, 0, 0],
    scale: 0.78,
  },
  CUSHION: {
    position: [0.001, 9.2, 0.007],
    rotation: [Math.PI / 2, 0, 0],
    scale: 0.83,
  },
};

export const SHANK_3D_PROPERTIES: Record<string, Shank3DProperties> = {
  SOLITAIRE: { position: [0, -1.605, 0], scale: [1.21, 1.21, 1.386] },
  "KNIFE-EDGE-SOLITAIRE": { position: [0, -1, 0], scale: 1 },

  "SPLIT-RING-SOLITAIRE": {
    default: { position: [0, -0.2, 0], scale: [1.05, 1.05, 1.286] },
    "4-PRONG-NOUVEAU": { position: [0, -0.2, 0], scale: [1.05, 1.05, 1.286] },
    "CLASSIC-BEZEL": { position: [0, -0.15, 0], scale: [1.08, 1.08, 1.32] },
    "CLASSIC-HALO": { position: [0, -0.25, 0], scale: [1.12, 1.12, 1.35] },
    "HIDDEN-HALO": { position: [0, -0.18, 0], scale: [1.06, 1.06, 1.3] },
    "DUAL-HALO": { position: [0, -0.38, 0], scale: [1.15, 1.15, 1.38] },
    "THREE-STONE": { position: [0, -0.22, 0], scale: [1.1, 1.1, 1.33] },
  },

  "FRENCH-PAVE": { position: [0, -1.605, 0], scale: [1.21, 1.21, 1.386] },
  "CATHEDRAL-PAVE": { position: [0, -1, 0] },
  "BAGUETTE-CHANNEL": { position: [0, -1.3, 0] },

  "TWIST-PAVE": {
    default: { position: [0.031, -0.3, 0], scale: 0.95 },
    "4-PRONG-NOUVEAU": { position: [0.031, -0.3, 0], scale: 0.95 },
    "CLASSIC-BEZEL": { position: [0.035, -0.25, 0], scale: 0.98 },
    "CLASSIC-HALO": { position: [0.028, -1.2, 0], scale: 1.02 },
    "HIDDEN-HALO": { position: [0.033, -0.4, 0], scale: 0.96 },
    "DUAL-HALO": { position: [0.025, -1.2, 0], scale: 1.05 },
    "THREE-STONE": { position: [0.03, -1, 0], scale: 1.0 },
  },
};

export const HEAD_3D_PROPERTIES: Record<
  string,
  Record<string, ThreeDProperties>
> = {
  "4-PRONG-NOUVEAU": {
    ROUND: { position: [0, 0.7, 0], scale: 0.95 },
    PRINCESS: {
      position: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.9,
    },
    RADIANT: {
      position: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.9,
    },
    EMERALD: {
      position: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.9,
    },
    MARQUISE: {
      position: [0, 0.5, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.8,
    },
    OVAL: { position: [0, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 0.9 },
    PEAR: { position: [0, 0, 0.4], rotation: [Math.PI / 2, 0, 0], scale: 0.9 },
    HEART: { position: [0, 0, 0.4], rotation: [Math.PI / 2, 0, 0], scale: 0.9 },
    ASSCHER: {
      position: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.9,
    },
    CUSHION: {
      position: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.9,
    },
  },
  "CLASSIC-BEZEL": {
    ROUND: { position: [0, 9.5, 0], rotation: [Math.PI / 2, 0, 0], scale: 0.9 },
    PRINCESS: {
      position: [0, 9.4, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.96,
    },
    RADIANT: {
      position: [0, 9.3, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.86,
    },
    EMERALD: {
      position: [0, 9.2, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: [0.95, 0.95, 0.8],
    },
    MARQUISE: {
      position: [0, 8.5, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: [0.86, 0.86, 0.6],
    },
    OVAL: {
      position: [0, 9, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: [0.89, 0.86, 0.8],
    },
    PEAR: {
      position: [0, 9, 0.36],
      rotation: [Math.PI / 2, 0, 0],
      scale: [0.9, 0.87, 0.8],
    },
    HEART: {
      position: [0.099, 9, 0.37],
      rotation: [Math.PI / 2, 0, 0],
      scale: [1.1, 1.1, 0.75],
    },
    ASSCHER: {
      position: [0, 9.4, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.91,
    },
    CUSHION: {
      position: [0, 9.5, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: 0.91,
    },
  },
  "CLASSIC-HALO": {},
  "HIDDEN-HALO": {},
  "DUAL-HALO": {},
  "THREE-STONE": {
    ROUND: {},
    PRINCESS: { rotation: [Math.PI / 2, 0, 0], scale: 0.9 },
    RADIANT: {},
    EMERALD: {},
    MARQUISE: {},
    OVAL: { rotation: [Math.PI / 2, 0, 0], scale: [0.9, 0.8, 0.9] },
    PEAR: {},
    HEART: {},
    ASSCHER: {},
    CUSHION: {},
  },
};
