"use server";

import { BlogPostFormData, BlogPostSchema } from "@/lib/validations/blog";
import type { BlogPost } from "../types/blog-post";
import { calculateReadingTime } from "../helpers/blog-post";
import { api, ApiError } from "../utils/api";

const parseBlogPostDates = (post: BlogPost): BlogPost => {
  return {
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  };
};

export type PaginatedBlogResponse = {
  posts: BlogPost[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export interface AdminBlogFilterOptions {
  page?: number;
  perPage?: number;
  sortBy?: "title" | "createdAt" | "updatedAt" | "readingTime" | "author";
  sortOrder?: "ASC" | "DESC";
  search?: string;
  isPublished?: boolean;
  authorId?: string;
}

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
  post?: BlogPost;
}

export const getBlogPosts = async (options?: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<PaginatedBlogResponse> => {
  const { page = 1, perPage = 9, search } = options || {};

  const data = await api.get<PaginatedBlogResponse>("/blog/posts", {
    params: { page, perPage, search },
  });
  return {
    ...data,
    posts: data.posts.map(parseBlogPostDates),
  };
};

export const getBlogPostsForAdmin = async (
  options?: AdminBlogFilterOptions,
): Promise<PaginatedBlogResponse> => {
  const data = await api.get<PaginatedBlogResponse>("/blog/posts/admin", {
    params: options,
    cache: false,
  });
  return {
    ...data,
    posts: data.posts.map(parseBlogPostDates),
  };
};

export const getPublishedBlogPosts = async (
  page = 1,
  perPage = 9,
): Promise<PaginatedBlogResponse> => {
  const data = await api.get<PaginatedBlogResponse>("/blog/posts/published", {
    params: { page, perPage },
  });
  return {
    ...data,
    posts: data.posts.map(parseBlogPostDates),
  };
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const post = await api.get<BlogPost>(`/blog/posts/${slug}`);
  return parseBlogPostDates(post);
};

export const getRelatedBlogPosts = async (
  slug: string,
): Promise<BlogPost[]> => {
  const posts = await api.get<BlogPost[]>(`/blog/posts/${slug}/related`);
  return posts.map(parseBlogPostDates);
};

export async function createBlogPost(
  formData: FormData | BlogPostFormData,
  author: { name: string; email: string },
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
    const post = await api.post<BlogPost>("/blog/posts", {
      ...validatedData.data,
      author,
      readingTime: calculateReadingTime(validatedData.data.content),
    });

    return {
      success: true,
      message: "Blog post created successfully",
      errors: {},
      post,
    };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateBlogPost(
  slug: string,
  formData: FormData | BlogPostFormData,
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
    const post = await api.patch<BlogPost>(
      `/blog/posts/${slug}`,
      updatedData.data,
    );

    return {
      success: true,
      message: "Blog post updated successfully",
      errors: {},
      post,
    };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteBlogPost(slug: string): Promise<FormState> {
  try {
    await api.delete(`/blog/posts/${slug}`);
    return {
      success: true,
      message: "Blog post deleted successfully",
      errors: {},
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
