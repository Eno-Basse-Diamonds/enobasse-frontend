import { api } from "../utils/api";

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
