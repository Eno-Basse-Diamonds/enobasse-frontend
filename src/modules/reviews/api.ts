import { api } from "@/shared/utils/api";

import type { Review } from "./types";

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

/**
 * Creates a review.
 *
 * @description Creates a new review for a product.
 * @param productId - The product ID
 * @param reviewData - The review data
 * @returns The created review
 */
export const createReview = async (
  productId: string | number,
  reviewData: CreateReviewData,
): Promise<any> => {
  return api.post(`/reviews/${productId}`, reviewData);
};

/**
 * Fetches reviews for admin.
 *
 * @description Fetches paginated reviews for the admin panel.
 * @param options - Admin filter, pagination, and sort options
 * @returns Paginated reviews response
 */
export const getReviewsForAdmin = async (
  options?: AdminReviewFilterOptions,
): Promise<PaginatedReviewResponse> => {
  return api.get("/reviews", { params: options, cache: false });
};

export interface UpdateReviewData {
  isVerified?: boolean;
}

/**
 * Updates a review.
 *
 * @description Updates a review's verification status.
 * @param id - The review ID
 * @param data - The update data
 * @returns The updated review
 */
export const updateReview = async (id: string, data: UpdateReviewData): Promise<Review> => {
  return api.patch(`/reviews/${id}`, data);
};

/**
 * Deletes a review.
 *
 * @description Deletes a review by its ID.
 * @param id - The review ID
 */
export const deleteReview = async (id: string): Promise<void> => {
  return api.delete(`/reviews/${id}`);
};
