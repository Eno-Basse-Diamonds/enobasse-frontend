import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTestimonials,
  getTestimonialsForAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  reorderTestimonials,
} from "@/lib/api/testimonials";
import {
  CreateTestimonialData,
  UpdateTestimonialData,
} from "@/lib/types/testimonial";

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });
}

export function useTestimonialsForAdmin() {
  return useQuery({
    queryKey: ["testimonialsForAdmin"],
    queryFn: getTestimonialsForAdmin,
  });
}

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

export function useReorderTestimonials() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (testimonialIds: string[]) =>
      reorderTestimonials(testimonialIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonialsForAdmin"] });
    },
  });
}
