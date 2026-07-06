import { z } from "zod";

export const ReviewSchema = z.object({
  rating: z.number().int().min(1, "Rating must be at least 1 star").max(5, "Rating cannot exceed 5 stars"),
  content: z.string().min(1, "Review content is required").max(1000, "Review content is too long"),
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Please enter a valid email address").trim(),
});

export type ReviewInput = z.infer<typeof ReviewSchema>;
