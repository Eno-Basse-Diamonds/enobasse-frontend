import { blogPosts } from "../data/blog-posts";

export interface Post {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  excerpt: string;
  content: string;
  date: string;
  datetime: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: { src: string; alt: string };
}

export const getAllPosts = async (): Promise<Post[]> => {
  return blogPosts;
};

export const getPostBySlug = async (
  slug: string
): Promise<Post | undefined> => {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
};

export const getRelatedPosts = async (): Promise<Post[]> => {
  const posts = await getAllPosts();
  return posts.slice(0, 2);
};
