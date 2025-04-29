import { blogPosts, Post } from "../data/blog-posts";

export const getAllPosts = async (): Promise<Post[]> => {
  return blogPosts;
};

export const getPostBySlug = async (
  slug: string,
): Promise<Post | undefined> => {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
};

export const getRelatedPosts = async (): Promise<Post[]> => {
  const posts = await getAllPosts();
  return posts.slice(0, 2);
};
