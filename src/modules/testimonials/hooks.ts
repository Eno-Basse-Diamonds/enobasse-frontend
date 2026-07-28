import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  getTestimonialsForAdmin,
  reorderTestimonials,
  updateTestimonial,
} from "@/modules/testimonials/api";
import { CreateTestimonialData, UpdateTestimonialData } from "@/modules/testimonials/types";

/**
 * Fetches published testimonials.
 *
 * @description React Query hook to fetch published testimonials.
 * @returns Query result with testimonials
 */
export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });
}

/**
 * Fetches testimonials for admin.
 *
 * @description React Query hook to fetch all testimonials for the admin panel.
 * @returns Query result with all testimonials
 */
export function useTestimonialsForAdmin() {
  return useQuery({
    queryKey: ["testimonialsForAdmin"],
    queryFn: getTestimonialsForAdmin,
  });
}

/**
 * Creates a testimonial.
 *
 * @description React Query mutation hook to create a testimonial.
 * @returns Mutation result for testimonial creation
 */
export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTestimonialData) => createTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonialsForAdmin"] });
    },
  });
}

/**
 * Updates a testimonial.
 *
 * @description React Query mutation hook to update a testimonial.
 * @returns Mutation result for testimonial update
 */
export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTestimonialData }) =>
      updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonialsForAdmin"] });
    },
  });
}

/**
 * Deletes a testimonial.
 *
 * @description React Query mutation hook to delete a testimonial.
 * @returns Mutation result for testimonial deletion
 */
export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonialsForAdmin"] });
    },
  });
}

/**
 * Reorders testimonials.
 *
 * @description React Query mutation hook to reorder testimonials.
 * @returns Mutation result for testimonial reorder
 */
export function useReorderTestimonials() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (testimonialIds: string[]) => reorderTestimonials(testimonialIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonialsForAdmin"] });
    },
  });
}
