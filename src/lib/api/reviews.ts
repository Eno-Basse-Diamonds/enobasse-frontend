import type { Review } from "../types/review";
import { api } from "../utils/api";

export type PaginatedReviewResponse = {
  reviews: Review[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export interface AdminReviewFilterOptions {
  page?: number;
  perPage?: number;
  sortBy?: "authorName" | "createdAt" | "updatedAt" | "rating" | "product";
  sortOrder?: "ASC" | "DESC";
  search?: string;
  isVerified?: boolean;
  rating?: number;
}

export interface CreateReviewData {
  authorName: string;
  authorEmail: string;
  rating: number;
  content: string;
  authorImage: {
    url: string;
    alt: string;
  };
}

export const createReview = async (
  productId: string | number,
  reviewData: CreateReviewData,
): Promise<any> => {
  return api.post(`/reviews/${productId}`, reviewData);
};

export const getReviewsForAdmin = async (
  options?: AdminReviewFilterOptions,
): Promise<PaginatedReviewResponse> => {
  return api.get("/reviews", { params: options, cache: false });
};
