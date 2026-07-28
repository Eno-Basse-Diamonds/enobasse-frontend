import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteNewsletterSubscription, getNewsletterSubscriptions } from "@/modules/newsletter/api";

/**
 * Fetches newsletter subscriptions.
 *
 * @description React Query hook to fetch newsletter subscriptions.
 * @returns Query result with newsletter subscriptions
 */
export function useNewsletterSubscriptions() {
  return useQuery({
    queryKey: ["newsletterSubscriptions"],
    queryFn: getNewsletterSubscriptions,
  });
}

/**
 * Deletes a newsletter subscription.
 *
 * @description React Query mutation hook to delete a newsletter subscription.
 * @returns Mutation result for subscription deletion
 */
export function useDeleteNewsletterSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNewsletterSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletterSubscriptions"] });
    },
  });
}
