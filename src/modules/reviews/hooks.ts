import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  AdminReviewFilterOptions,
  CreateReviewData,
  UpdateReviewData,
  createReview,
  deleteReview,
  getReviewsForAdmin,
  updateReview,
} from "./api";

/**
 * Creates a review.
 *
 * @description React Query mutation hook to create a review.
 * @returns Mutation result for review creation
 */
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      reviewData,
    }: {
      productId: string | number;
      reviewData: CreateReviewData;
    }) => createReview(productId, reviewData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/**
 * Fetches reviews for admin.
 *
 * @description React Query hook to fetch reviews for the admin panel.
 * @param options - Admin filter options
 * @returns Query result with admin reviews
 */
export function useReviewsForAdmin(options?: AdminReviewFilterOptions) {
  return useQuery({
    queryKey: ["reviewsForAdmin", options],
    queryFn: async () => {
      const data = await getReviewsForAdmin(options);
      return data;
    },
  });
}

/**
 * Updates a review.
 *
 * @description React Query mutation hook to update a review.
 * @returns Mutation result for review update
 */
export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewData }) => updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewsForAdmin"] });
    },
  });
}

/**
 * Deletes a review.
 *
 * @description React Query mutation hook to delete a review.
 * @returns Mutation result for review deletion
 */
export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewsForAdmin"] });
    },
  });
}
