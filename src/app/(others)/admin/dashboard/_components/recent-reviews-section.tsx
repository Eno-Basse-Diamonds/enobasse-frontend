import { Star, ChevronRight, Image as ImageIcon, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export const RecentReviewsSection = ({
  reviews,
}: RecentReviewsSectionProps) => (
  <div className="bg-white shadow-sm rounded-sm border border-gray-200 flex flex-col">
    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
      <span className="text-sm text-gray-500">
        {reviews.length > 0 ? `Last ${reviews.length} reviews` : "No reviews yet"}
      </span>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      {reviews.length > 0 ? (
        <>
          <div className="space-y-4 flex-grow">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="py-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {review.product?.images ? (
                      <div className="w-16 h-16 relative overflow-hidden border border-gray-200">
                        <Image
                          src={review.product.images[0].url}
                          alt={review.product.images[0].alt || review.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 flex items-center justify-center border border-gray-200">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {review.product?.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          SKU: {review.product?.sku || "N/A"}
                        </p>
                      </div>

                      <div className="flex items-center ml-3 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-secondary-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      "{review.content}"
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        by {review.authorName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/admin/reviews"
              className="text-sm text-secondary-500 hover:text-secondary-400 font-medium flex items-center gap-x-2"
            >
              <span>View all reviews</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h4>
          <p className="text-gray-500 mb-6 max-w-sm">
            Customer reviews will appear here once they start reviewing your products.
          </p>
        </div>
      )}
    </div>
  </div>
);
