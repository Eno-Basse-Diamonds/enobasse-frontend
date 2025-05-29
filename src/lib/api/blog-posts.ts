"use server";

import { BlogPostFormData, BlogPostSchema } from "@/lib/validations/blog";
import type { BlogPost } from "../types/blog-post";
import { calculateReadingTime } from "../helpers/blog-post";
import { Http, ApiError } from "../utils/http";

type PaginatedBlogResponse = {
  posts: BlogPost[];
  page: number;
  perPage: number;
  totalPages: number;
};

export interface FormErrors {
  title?: string[];
  slug?: string[];
  tags?: string[];
  excerpt?: string[];
  content?: string[];
  image?: string[];
  isPublished?: string[];
}


export interface FormState {
  errors: FormErrors;
  message: string;
  success: boolean;
}

export async function getBlogPosts(
  page = 1,
  perPage = 9
): Promise<PaginatedBlogResponse> {
  return Http.get("/blog/posts", { params: { page, perPage } });
}

export async function getPublishedBlogPosts(
  page = 1,
  perPage = 9
): Promise<PaginatedBlogResponse> {
  return Http.get("/blog/posts/published", { params: { page, perPage } });
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  return Http.get(`/blog/posts/${slug}`);
}

export async function getRelatedBlogPosts(slug: string): Promise<BlogPost[]> {
  return Http.get(`/blog/posts/${slug}/related`);
}

export async function createBlogPost(
  formData: FormData | BlogPostFormData,
  authorId: string
): Promise<FormState> {
  const data = transformFormData(formData);
  const validatedData = BlogPostSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    await Http.post("/blog/posts", {
      ...validatedData.data,
      authorId,
      readingTime: calculateReadingTime(validatedData.data.content),
    });

    return {
      success: true,
      message: "Blog post created successfully",
      errors: {},
    };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateBlogPost(
  slug: string,
  formData: FormData | BlogPostFormData
): Promise<FormState> {
  const data = transformFormData(formData);
  const validatedData = BlogPostSchema.partial().safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const updatedData = {
    ...validatedData,
    ...(validatedData.data.content && {
      readingTime: calculateReadingTime(validatedData.data.content),
    }),
  };

  try {
    await Http.patch<BlogPost>(`/blog/posts/${slug}`, updatedData.data);

    return {
      success: true,
      message: "Blog post updated successfully",
      errors: {},
    };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteBlogPost(slug: string) {
  try {
    await Http.delete(`/blog/posts/${slug}`);
    return {
      success: true,
      message: "Blog post deleted successfully",
    };
  } catch (error) {
    return handleApiError(error);
  }
}

const handleApiError = (error: unknown): FormState => {
  if (error instanceof ApiError) {
    return {
      success: false,
      message: error.message,
      errors: error.errors || {},
    };
  }

  return {
    success: false,
    message: "An unexpected error occurred",
    errors: {},
  };
};

function transformFormData(formData: FormData | BlogPostFormData) {
  if (formData instanceof FormData) {
    return {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      tags: formData.getAll("tags") as string[],
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      isPublished: formData.get("isPublished") === "true",
      image: {
        src: formData.get("image.src") as string,
        alt: formData.get("image.alt") as string,
      },
    };
  }
  return formData;
}
