export interface Testimonial {
  id: string;
  text: string;
  name: string;
  handle?: string;
  avatar?: {
    url: string;
    alt: string;
  } | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialData {
  text: string;
  name: string;
  handle?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  isActive: boolean;
  order: number;
}

export interface UpdateTestimonialData extends Partial<CreateTestimonialData> {}
