import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  getReviewsForAdmin,
  CreateReviewData,
  AdminReviewFilterOptions,
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
        queryKey: ["product", variables.productId],
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
