import {
  CreateTestimonialData,
  Testimonial,
  UpdateTestimonialData,
} from "@/modules/testimonials/types";
import { api } from "@/shared/utils/api";

/**
 * Fetches published testimonials.
 *
 * @description Fetches all published testimonials.
 * @returns The list of testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  return api.get("/testimonials");
}

/**
 * Fetches testimonials for admin.
 *
 * @description Fetches all testimonials for the admin panel.
 * @returns The list of all testimonials
 */
export async function getTestimonialsForAdmin(): Promise<Testimonial[]> {
  return api.get("/testimonials/admin/all", { cache: false });
}

/**
 * Creates a testimonial.
 *
 * @description Creates a new testimonial.
 * @param data - The testimonial data
 * @returns The created testimonial
 */
export async function createTestimonial(data: CreateTestimonialData): Promise<Testimonial> {
  return api.post("/testimonials", data);
}

/**
 * Updates a testimonial.
 *
 * @description Updates an existing testimonial.
 * @param id - The testimonial ID
 * @param data - The update data
 * @returns The updated testimonial
 */
export async function updateTestimonial(
  id: string,
  data: UpdateTestimonialData,
): Promise<Testimonial> {
  return api.patch(`/testimonials/${id}`, data);
}

/**
 * Deletes a testimonial.
 *
 * @description Deletes a testimonial by its ID.
 * @param id - The testimonial ID
 */
export async function deleteTestimonial(id: string): Promise<void> {
  return api.delete(`/testimonials/${id}`);
}

/**
 * Reorders testimonials.
 *
 * @description Reorders testimonials by providing an ordered array of IDs.
 * @param testimonialIds - The ordered array of testimonial IDs
 * @returns The reordered testimonials
 */
export async function reorderTestimonials(testimonialIds: string[]): Promise<Testimonial[]> {
  return api.post("/testimonials/reorder", testimonialIds);
}
