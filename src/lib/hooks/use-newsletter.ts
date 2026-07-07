import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNewsletterSubscriptions,
  deleteNewsletterSubscription,
} from "@/lib/api/newsletter";

export function useNewsletterSubscriptions() {
  return useQuery({
    queryKey: ["newsletterSubscriptions"],
    queryFn: getNewsletterSubscriptions,
  });
}

export function useDeleteNewsletterSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNewsletterSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletterSubscriptions"] });
    },
  });
}
