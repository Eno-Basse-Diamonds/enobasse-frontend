import type {
  Option,
  MetalOption,
  KaratOption,
  FontOption,
  RingConfiguration,
  MetalMaterial,
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
    id: "6-prong-diamond",
    name: "6 Prong Diamond",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110908/6-prong-diamond_cvvlto.png",
  },
  {
    id: "6-prong-nouveau",
    name: "6 Prong Nouveau",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110906/6-prong-nouveau_bkwxwe.png",
  },
  {
    id: "classic-basket",
    name: "Classic Basket",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110899/classic-basket_yasfzk.png",
  },
  {
    id: "clustered-diamond",
    name: "Clustered Diamond",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110899/clustered-diamond_il3yzr.png",
  },
  {
    id: "diamond-basket",
    name: "Diamond Basket",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110904/diamond-basket_ifmfc9.png",
  },
  {
    id: "diamond-tulip",
    name: "Diamond Tulip",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110901/diamond-tulip_hrha4n.png",
  },
  {
    id: "fancy-halo",
    name: "Fancy Halo",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110900/fancy-halo_kgm1ps.png",
  },
  {
    id: "floral-halo",
    name: "Floral Halo",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110907/floral-halo_gur4as.png",
  },
  {
    id: "surprise-diamond",
    name: "Surprise Diamond",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110904/surprise-diamond_jvx4ll.png",
  },
  {
    id: "vintage-trefoil",
    name: "Vintage Trefoil",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758110905/vintage-trefoil_ale6b6.png",
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
      "https://res.cloudinary.com/enobasse/image/upload/v1758289221/cathedral-pave_xhu5mm.png",
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
  {
    id: "alternating-baguette",
    name: "Alternating Baguette",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289228/alternating-baguette_jhfibh.png",
  },
  {
    id: "alternating-marquise",
    name: "Alternating Marquise",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289230/alternating-marquise_av5eod.png",
  },
  {
    id: "floating-station",
    name: "Floating Station",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289221/floating-station_fegdht.png",
  },
  {
    id: "floral-bypass",
    name: "Floral Bypass",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289221/floral-bypass_rgxrzd.png",
  },
  {
    id: "knife-edge-pave",
    name: "Knife Edge Pavé",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289221/knife-edge-pave_smtjd6.png",
  },
  {
    id: "round-channel",
    name: "Round Channel",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289222/round-channel_axdpvw.png",
  },
  {
    id: "three-stone",
    name: "Three Stone",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289225/three-stone_mssq9o.png",
  },
  {
    id: "triple-row-pave",
    name: "Triple Row Pavé",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1758289227/triple-row-pave_enksqj.png",
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

// Both maps below are derived directly from which gemstone-shape files
// exist in each /models/head/<style> folder — not every head style
// supports every shape (e.g. only 6-prong settings exist for marquise
// and pear; only a handful of styles ship a heart-cut variant).
export const GEMSTONES_BY_HEAD_STYLE: Record<string, string[]> = {
  "4-prong-nouveau": [
    "asscher",
    "cushion",
    "emerald",
    "heart",
    "oval",
    "princess",
    "radiant",
    "round",
  ],
  "6-prong-diamond": ["marquise", "oval", "pear", "round"],
  "6-prong-nouveau": ["marquise", "oval", "pear", "round"],
  "classic-basket": [
    "asscher",
    "cushion",
    "emerald",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "classic-bezel": [
    "asscher",
    "cushion",
    "emerald",
    "heart",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "classic-halo": [
    "asscher",
    "cushion",
    "emerald",
    "heart",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "clustered-diamond": [
    "asscher",
    "cushion",
    "emerald",
    "heart",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "diamond-basket": [
    "asscher",
    "cushion",
    "emerald",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "diamond-tulip": [
    "asscher",
    "cushion",
    "emerald",
    "heart",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "dual-halo": [
    "asscher",
    "cushion",
    "emerald",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "fancy-halo": ["cushion", "oval", "round"],
  "floral-halo": [
    "asscher",
    "cushion",
    "emerald",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "hidden-halo": [
    "asscher",
    "cushion",
    "emerald",
    "heart",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "surprise-diamond": [
    "asscher",
    "cushion",
    "emerald",
    "heart",
    "marquise",
    "oval",
    "pear",
    "princess",
    "radiant",
    "round",
  ],
  "vintage-trefoil": ["asscher", "cushion", "oval", "round"],
};

export const HEAD_STYLES_BY_GEMSTONE: Record<string, string[]> = Object.keys(
  GEMSTONES_BY_HEAD_STYLE,
).reduce(
  (byGemstone, headStyle) => {
    GEMSTONES_BY_HEAD_STYLE[headStyle].forEach((shape) => {
      byGemstone[shape] = [...(byGemstone[shape] || []), headStyle];
    });
    return byGemstone;
  },
  {} as Record<string, string[]>,
);

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

// Real polished jewelry metal is fully metallic (no dielectric diffuse
// component) with a very low roughness — that's what gives it a mirror-like,
// rather than matte, reflection. A slight clearcoat layer on top mimics the
// glassy micro-polish sheen of a finished piece, and envMapIntensity is
// boosted above 1 so the single HDR environment reads as bright studio
// lighting rather than a dim reflection.
export const METAL_MATERIALS: Record<string, MetalMaterial> = {
  "white-gold": {
    color: "#a5a5a5",
    metalness: 1,
    roughness: 0.03,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    envMapIntensity: 2.2,
  },
  "yellow-gold": {
    color: "#d1b36a",
    metalness: 1,
    roughness: 0.04,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    envMapIntensity: 2.2,
  },
  "rose-gold": {
    color: "#c59182",
    metalness: 1,
    roughness: 0.04,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    envMapIntensity: 2.2,
  },
  platinum: {
    color: "#9ca0a3",
    metalness: 1,
    roughness: 0.02,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    envMapIntensity: 2.5,
  },
};

// The /models library rigs every shank/head asset with named socket
// ("MainAnchor"/"ConnectionAnchor") and accent-diamond ("Decoration")
// locator nodes, so placement is read directly off each glTF's node
// transforms instead of hand-tuned per-combination tables. GEM_SCALE is
// the calibration knob needed to reconcile the gemstone library's unit
// scale with the metal parts' unit scale (verified against a real 1ct
// round diamond's ~6.5mm diameter).
export const GEM_SCALE = 0.01;

// Head/shank combinations vary a lot in size (a chunky triple-row-pavé
// shank isn't the same footprint as a plain solitaire), so the ring is
// scaled dynamically per-configuration rather than by one fixed constant:
// its largest bounding-box dimension is scaled to this many scene units.
// Calibrated against the viewer's camera (fov 33, min zoom distance 40)
// so the ring comfortably fits in frame — including while rotating —
// with margin left over.
export const TARGET_RING_SIZE = 20;

// Fallback uniform scale used only if the bounding box can't be computed
// (e.g. geometry not yet loaded).
export const FALLBACK_RING_SCALE = 500;

// Accent-diamond anchors are named "<PREFIX>_SIDE_Anchor_NNN". The prefix
// says which gemstone shape belongs at that socket; the value below maps
// each prefix to the shape file that should be instanced there. There is
// no baguette-cut or tapered-baguette asset in /models/gemstones, so
// "BGT" (baguette-channel) falls back to the emerald (step-cut) shape and
// "TPR" (three-stone's side-stone sockets) falls back to round, as the
// closest available matches. Any other/unrecognized prefix also falls
// back to round in ACCENT_GEM_SHAPES lookups.
export const ACCENT_SHAPE_BY_ANCHOR_PREFIX: Record<string, string> = {
  RND: "round",
  BGT: "emerald",
  MRQ: "marquise",
  PRN: "princess",
  PER: "pear",
};

// Gemstone shapes that need to be preloaded so any accent-diamond anchor
// can be filled, regardless of which shape the user picked for the center
// stone.
export const ACCENT_GEM_SHAPES = ["round", "emerald", "marquise", "princess", "pear"];
