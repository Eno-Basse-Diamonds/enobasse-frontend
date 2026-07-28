import { api } from "@/shared/utils/api";

export interface NewsletterSubscription {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetches newsletter subscriptions.
 *
 * @description Fetches all newsletter subscriptions.
 * @returns The list of subscriptions
 */
export async function getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
  return api.get("/newsletter/subscriptions", { cache: false });
}

/**
 * Deletes a newsletter subscription.
 *
 * @description Deletes a newsletter subscription by its ID.
 * @param id - The subscription ID
 */
export async function deleteNewsletterSubscription(id: string): Promise<void> {
  return api.delete(`/newsletter/subscriptions/${id}`);
}
