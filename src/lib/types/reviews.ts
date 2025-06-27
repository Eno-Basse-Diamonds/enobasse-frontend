export interface RatingDistribution {
  stars: 1 | 2 | 3 | 4 | 5;
  percentage: number;
}

export interface Review {
  id: string | number;
  rating: number;
  authorImage: { url: string; alt: string };
  authorName: string;
  authorEmail: string;
  title: string;
  content: string;
  createdAt: string;
}
