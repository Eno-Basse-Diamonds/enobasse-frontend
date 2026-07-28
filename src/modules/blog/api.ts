import { BlogPostFormData, BlogPostSchema } from "@/modules/blog/schemas";
import { ApiError, api } from "@/shared/utils/api";

import { calculateReadingTime } from "./helpers";
import type { BlogPost } from "./types";

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

/**
 * Fetches paginated blog posts.
 *
 * @description Fetches a paginated list of blog posts.
 * @param options - Pagination and search options
 * @param options.page - Page number (default 1)
 * @param options.perPage - Posts per page (default 9)
 * @param options.search - Optional search term
 * @returns Paginated blog posts with parsed dates
 */
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

/**
 * Fetches blog posts for admin.
 *
 * @description Fetches paginated blog posts for the admin panel with extended
 * filters.
 * @param options - Admin filter, pagination, and sort options
 * @returns Paginated blog posts
 */
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

/**
 * Fetches published blog posts.
 *
 * @description Fetches only published blog posts.
 * @param page - Page number (default 1)
 * @param perPage - Posts per page (default 9)
 * @returns Paginated published blog posts
 */
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

/**
 * Fetches a blog post by slug.
 *
 * @description Fetches a single blog post by its slug.
 * @param slug - The blog post slug
 * @returns The blog post with parsed dates
 */
export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const post = await api.get<BlogPost>(`/blog/posts/${slug}`);
  return parseBlogPostDates(post);
};

/**
 * Fetches related blog posts.
 *
 * @description Fetches related blog posts for a given slug.
 * @param slug - The blog post slug
 * @returns Array of related blog posts
 */
export const getRelatedBlogPosts = async (slug: string): Promise<BlogPost[]> => {
  const posts = await api.get<BlogPost[]>(`/blog/posts/${slug}/related`);
  return posts.map(parseBlogPostDates);
};

/**
 * Creates a new blog post.
 *
 * @description Creates a new blog post with validation.
 * @param formData - The blog post data as FormData or parsed object
 * @param author - The post author's name and email
 * @returns The creation result with success state
 */
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

/**
 * Updates a blog post.
 *
 * @description Updates an existing blog post with partial validation.
 * @param slug - The blog post slug
 * @param formData - The updated blog post data
 * @returns The update result with success state
 */
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
    const post = await api.patch<BlogPost>(`/blog/posts/${slug}`, updatedData.data);

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

/**
 * Deletes a blog post.
 *
 * @description Deletes a blog post by its slug.
 * @param slug - The blog post slug
 * @returns The deletion result with success state
 */
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
