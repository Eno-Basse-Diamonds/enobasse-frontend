export interface Review {
  id: string;
  authorName: string;
  authorImage: { url: string; alt: string };
  authorEmail: string;
  rating: number;
  content: string;
  isVerified: boolean;
  product?: {
    id: string;
    name: string;
    slug: string;
    sku?: string;
    price?: number;
    images?: Array<{ url: string; alt: string }>;
  };
  createdAt: Date;
  updatedAt: Date;
}
