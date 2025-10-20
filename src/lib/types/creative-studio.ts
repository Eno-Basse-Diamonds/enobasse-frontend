export interface Option {
  id: string;
  name: string;
  image: string;
  disabled?: boolean;
}

export interface MetalOption extends Option {
  color: string;
}

export interface KaratOption {
  id: string;
  name: string;
}

export interface FontOption {
  name: string;
  fontFamily: string;
}

export interface RingConfiguration {
  gemstoneShape: string;
  previewSize: string;
  headStyle: string;
  shankStyle: string;
  metalType: string;
  karat: string;
  ringSize: number;
  diamondType: DiamondType;
  engravingText: string;
  engravingFont: string;
}

export interface GeneratedImage {
  src: string;
  alt: string;
}

export interface ImageCacheEntry {
  images: GeneratedImage[];
  timestamp: number;
  lastAccessed: number;
}

export interface CacheStats {
  totalEntries: number;
  totalSize: number;
  oldestEntry: number | null;
}

export interface ThreeDProperties {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export interface MetalMaterial {
  color: string;
  metalness: number;
  roughness: number;
}

export type Shank3DProperties =
  | ThreeDProperties
  | {
      [headStyle: string]:
        | ThreeDProperties
        | { [gemstoneShape: string]: ThreeDProperties };
    };

export type GemstoneShape =
  | "round"
  | "princess"
  | "radiant"
  | "emerald"
  | "marquise"
  | "oval"
  | "pear"
  | "heart"
  | "asscher"
  | "cushion";
export type HeadStyle =
  | "4-prong-nouveau"
  | "classic-bezel"
  | "classic-halo"
  | "hidden-halo"
  | "dual-halo"
  | "three-stone";
export type ShankStyle =
  | "solitaire"
  | "knife-edge-solitaire"
  | "split-ring-solitaire"
  | "french-pave"
  | "cathedral-pave"
  | "baguette-channel"
  | "twist-pave";
export type MetalType = "white-gold" | "yellow-gold" | "rose-gold" | "platinum";
export type Karat = "14k" | "18k";
export type TabType = "diamond" | "head" | "shank" | "metal" | "engraving";

export type DiamondType = "natural" | "lab" | "moissanite";
