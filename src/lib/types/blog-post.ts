export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  excerpt: string;
  content: string;
  readingTime: string;
  isPublished: boolean;
  author: {
    id: string;
    name: string;
    avatar: { src: string; alt: string };
  };
  image: { src: string; alt: string };
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostFormData {
  title: string;
  slug: string;
  tags: string[];
  excerpt: string;
  content: string;
  isPublished: boolean;
  image: { src: string; alt: string };
}

export interface FormState {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
  post?: BlogPost;
}
