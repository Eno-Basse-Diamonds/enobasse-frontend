import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  getReviewsForAdmin,
  updateReview,
  deleteReview,
  CreateReviewData,
  AdminReviewFilterOptions,
  UpdateReviewData,
} from "../api/reviews";

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

export function useReviewsForAdmin(options?: AdminReviewFilterOptions) {
  return useQuery({
    queryKey: ["reviewsForAdmin", options],
    queryFn: async () => {
      const data = await getReviewsForAdmin(options);
      return data;
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewData }) =>
      updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewsForAdmin"] });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewsForAdmin"] });
    },
  });
}
