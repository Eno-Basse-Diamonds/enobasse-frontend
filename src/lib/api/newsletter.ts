import { api } from "../utils/api";

export interface NewsletterSubscription {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export async function getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
  return api.get("/newsletter/subscriptions", { cache: false });
}

export async function deleteNewsletterSubscription(id: string): Promise<void> {
  return api.delete(`/newsletter/subscriptions/${id}`);
}
