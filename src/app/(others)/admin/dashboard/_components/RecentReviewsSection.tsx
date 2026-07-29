import Image from "next/image";
import Link from "next/link";

import { ChevronRight, Image as ImageIcon, MessageSquare, Star } from "lucide-react";

interface RecentReview {
  id: string;
  product: {
    id: string;
    name: string;
    sku: string;
    images?: Array<{ url: string; alt: string }>;
  };
  rating: number;
  authorName: string;
  content: string;
  createdAt: string;
}

interface RecentReviewsSectionProps {
  reviews: RecentReview[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
};

export const RecentReviewsSection = ({ reviews }: RecentReviewsSectionProps) => (
  <div className="bg-white shadow-sm rounded-sm border border-gray-200 flex flex-col">
    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
      <span className="text-sm text-gray-400">
        {reviews.length > 0 ? `Last ${reviews.length}` : ""}
      </span>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      {reviews.length > 0 ? (
        <>
          <div className="space-y-3 flex-grow">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="py-4 px-3 -mx-3 rounded-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {review.product?.images ? (
                      <div className="w-12 h-12 relative overflow-hidden rounded-sm border border-gray-200">
                        <Image
                          src={review.product.images[0].url}
                          alt={review.product.images[0].alt || review.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-sm border border-gray-200">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {review.product?.name}
                        </h4>
                        <p className="text-xs text-gray-400">by {review.authorName}</p>
                      </div>

                      <div className="flex items-center gap-0.5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < review.rating
                                ? "text-secondary-500 fill-current"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="relative pl-4 border-l-2 border-gray-100">
                      <p className="text-sm text-gray-600 leading-relaxed">"{review.content}"</p>
                    </div>

                    <p className="text-xs text-gray-400 mt-1.5">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-4 border-t border-gray-100">
            <Link
              href="/admin/reviews"
              className="text-sm text-secondary-500 hover:text-secondary-400 font-medium flex items-center gap-x-2 transition-colors"
            >
              <span>View all reviews</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-14 w-14 bg-gray-100 rounded-sm flex items-center justify-center mb-4">
            <MessageSquare className="h-7 w-7 text-gray-400" />
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">No reviews yet</h4>
          <p className="text-sm text-gray-500 max-w-xs">
            Customer reviews will appear here once they start reviewing your products.
          </p>
        </div>
      )}
    </div>
  </div>
);
