import { Product } from "./products";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: { url: string; alt: string };
  productCount?: number;
}

export interface CollectionWithProducts {
  collection: Collection;
  products: Product[];
  meta: {
    total: string;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
