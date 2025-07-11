import { RatingDistribution, Review } from "./reviews";

export type MetalName = "White Gold" | "Yellow Gold" | "Rose Gold" | "Platinum";

export interface Metal {
  type: MetalName;
  purity?: string | null;
  weight?: string;
}

export interface Gemstone {
  type: string;
  weight?: string;
}

export interface ProductVariant {
  sku: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  metals: Metal[];
  gemstones: Gemstone[];
  images: Array<{ url: string; alt: string }>;
}

export interface Product {
  id: number | string;
  name: string;
  slug: string;
  description: string;
  priceRange: { min: number; max: number; currency: string };
  createdAt: any;
  category: string;
  images: Array<{ url: string; alt: string }>;
  variants: ProductVariant[];
  metals?: Metal[];
  gemstones?: Gemstone[];
  reviews?: Review[];
  ratingDistribution?: RatingDistribution[];
  isCustomDesign?: boolean;
}

export interface ProductFilterOptions {
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  metals?: string[];
  gemstones?: string[];
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface ProductsResponse {
  products: Product[];
  meta: {
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface FilterOption {
  name: string;
  type: "metal" | "gemstone";
  image?: { src: string; alt: string };
  color?: string;
}
