import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBlogPosts,
  getPublishedBlogPosts,
  getBlogPost,
  getRelatedBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  FormState,
} from "../api/blog-posts";
import { BlogPostFormData } from "../types/blog-post";
import { useRouter } from "next/navigation";

export function useBlogPosts(page: number = 1) {
  return useQuery({
    queryKey: ["blogPosts", page],
    queryFn: async () => {
      const data = await getBlogPosts(page);
      return data;
    },
  });
}

export function usePublishedBlogPosts(page: number = 1) {
  return useQuery({
    queryKey: ["publishedBlogPosts", page],
    queryFn: async () => {
      const data = await getPublishedBlogPosts(page);
      return data;
    },
  });
}

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
  authorId: string;
}

interface UpdateBlogPostInput {
  slug: string;
  formData: BlogPostFormData;
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<FormState, Error, CreateBlogPostInput>({
    mutationFn: ({ formData, authorId }) => {
      return createBlogPost(formData, authorId);
    },
    onSuccess: (data) => {
      if (data.success && data.post) {
        queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
        router.push("/admin/blog?page=1");
      }
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation<FormState, Error, UpdateBlogPostInput>({
    mutationFn: ({ slug, formData }) => {
      return updateBlogPost(slug, formData);
    },
    onSuccess: (data) => {
      if (data.success && data.post) {
        queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
        queryClient.invalidateQueries({ queryKey: ["blogPost", data.post.slug] });
      }
    },
  });
}

export function useDeleteBlogPost(page: number) {
  const queryClient = useQueryClient();

  return useMutation<FormState, Error, string>({
    mutationKey: ["deleteBlogPost", page],
    mutationFn: (slug) => deleteBlogPost(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });
}
