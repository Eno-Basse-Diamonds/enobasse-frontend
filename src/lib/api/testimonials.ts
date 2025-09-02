"use server";

import {
  Testimonial,
  CreateTestimonialData,
  UpdateTestimonialData,
} from "@/lib/types/testimonial";
import { api } from "../utils/api";

export async function getTestimonials(): Promise<Testimonial[]> {
  return api.get("/testimonials");
}

export async function getTestimonialsForAdmin(): Promise<Testimonial[]> {
  return api.get("/testimonials/admin/all", { cache: false });
}

export async function createTestimonial(
  data: CreateTestimonialData,
): Promise<Testimonial> {
  return api.post("/testimonials", data);
}

export async function updateTestimonial(
  id: string,
  data: UpdateTestimonialData,
): Promise<Testimonial> {
  return api.patch(`/testimonials/${id}`, data);
}

export async function deleteTestimonial(id: string): Promise<void> {
  return api.delete(`/testimonials/${id}`);
}

export async function reorderTestimonials(
  testimonialIds: string[],
): Promise<Testimonial[]> {
  return api.post("/testimonials/reorder", testimonialIds);
}
