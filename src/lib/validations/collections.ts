import { z } from "zod";

const ImageSchema = z.object({
  url: z.string().min(1, "Image URL is required"),
  alt: z.string().min(1, "Image alt text is required"),
});

export const CollectionFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  slug: z.string().min(1, "Slug is required").max(100, "Slug is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
  published: z.boolean(),
  image: ImageSchema,
});

export type CollectionFormData = z.infer<typeof CollectionFormSchema>;
