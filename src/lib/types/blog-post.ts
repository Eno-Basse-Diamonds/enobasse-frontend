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
