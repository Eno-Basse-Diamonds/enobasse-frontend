import { z } from "zod";

const ImageSchema = z.object({
  src: z.string().min(1, "Image source is required"),
  alt: z.string().min(1, "Image alt text is required"),
});

export const BlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  slug: z.string().min(1, "Slug is required"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(160, "Excerpt is too long"),
  content: z.string().min(1, "Content is required"),
  isPublished: z.boolean(),
  image: ImageSchema,
});

export type BlogPostFormData = z.infer<typeof BlogPostSchema>;
