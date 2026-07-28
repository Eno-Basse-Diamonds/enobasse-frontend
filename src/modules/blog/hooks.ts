import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  AdminBlogFilterOptions,
  FormState,
  createBlogPost,
  deleteBlogPost,
  getBlogPost,
  getBlogPosts,
  getBlogPostsForAdmin,
  getPublishedBlogPosts,
  getRelatedBlogPosts,
  updateBlogPost,
} from "./api";
import { BlogPostFormData } from "./types";

/**
 * Fetches paginated blog posts.
 *
 * @description React Query hook to fetch paginated blog posts.
 * @param page - Page number (default 1)
 * @param search - Optional search term
 * @returns Query result with paginated blog posts
 */
export function useBlogPosts(page: number = 1, search?: string) {
  return useQuery({
    queryKey: ["blogPosts", page, search],
    queryFn: async () => {
      const data = await getBlogPosts({ page, perPage: 9, search });
      return data;
    },
  });
}

/**
 * Fetches blog posts for admin.
 *
 * @description React Query hook to fetch blog posts for the admin panel.
 * @param options - Admin filter options
 * @returns Query result with paginated admin blog posts
 */
export function useBlogPostsForAdmin(options?: AdminBlogFilterOptions) {
  return useQuery({
    queryKey: ["blogPostsForAdmin", options],
    queryFn: async () => {
      const data = await getBlogPostsForAdmin(options);
      return data;
    },
  });
}

/**
 * Fetches published blog posts.
 *
 * @description React Query hook to fetch published blog posts.
 * @param page - Page number (default 1)
 * @param perPage - Posts per page (default 9)
 * @returns Query result with published blog posts
 */
export function usePublishedBlogPosts(page: number = 1, perPage: number = 9) {
  return useQuery({
    queryKey: ["publishedBlogPosts", page, perPage],
    queryFn: async () => {
      const data = await getPublishedBlogPosts(page, perPage);
      return data;
    },
  });
}

/**
 * Fetches a blog post by slug.
 *
 * @description React Query hook to fetch a single blog post by slug.
 * @param slug - The blog post slug
 * @returns Query result with the blog post
 */
export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      const data = await getBlogPost(slug);
      return data;
    },
    enabled: !!slug,
  });
}

/**
 * Fetches related blog posts.
 *
 * @description React Query hook to fetch related blog posts for a given slug.
 * @param slug - The blog post slug
 * @returns Query result with related blog posts
 */
export function useRelatedBlogPosts(slug: string) {
  return useQuery({
    queryKey: ["relatedBlogPosts", slug],
    queryFn: async () => {
      const data = await getRelatedBlogPosts(slug);
      return data;
    },
    enabled: !!slug,
  });
}

interface CreateBlogPostInput {
  formData: BlogPostFormData;
  author: { name: string; email: string };
}

interface UpdateBlogPostInput {
  slug: string;
  formData: BlogPostFormData;
}

/**
 * Creates a blog post.
 *
 * @description React Query mutation hook to create a new blog post.
 * @returns Mutation result for blog post creation
 */
export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<FormState, Error, CreateBlogPostInput>({
    mutationFn: ({ formData, author }) => {
      return createBlogPost(formData, author);
    },
    onSuccess: (data) => {
      if (data.success && data.post) {
        queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
        queryClient.invalidateQueries({ queryKey: ["blogPostsForAdmin"] });
        router.push("/admin/blog?page=1");
      }
    },
  });
}

/**
 * Updates a blog post.
 *
 * @description React Query mutation hook to update an existing blog post.
 * @returns Mutation result for blog post update
 */
export function useUpdateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation<FormState, Error, UpdateBlogPostInput>({
    mutationFn: ({ slug, formData }) => {
      return updateBlogPost(slug, formData);
    },
    onSuccess: (data) => {
      if (data.success && data.post) {
        queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
        queryClient.invalidateQueries({ queryKey: ["blogPostsForAdmin"] });
        queryClient.invalidateQueries({
          queryKey: ["blogPost", data.post.slug],
        });
      }
    },
  });
}

/**
 * Deletes a blog post.
 *
 * @description React Query mutation hook to delete a blog post.
 * @param page - Current page number for cache invalidation
 * @returns Mutation result for blog post deletion
 */
export function useDeleteBlogPost(page: number) {
  const queryClient = useQueryClient();

  return useMutation<FormState, Error, string>({
    mutationKey: ["deleteBlogPost", page],
    mutationFn: (slug) => deleteBlogPost(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPostsForAdmin"] });
    },
  });
}
