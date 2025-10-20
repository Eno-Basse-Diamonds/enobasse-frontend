import Image from "next/image";
import { User, Calendar, Star, Barcode } from "lucide-react";
import { Review } from "@/lib/types/review";
import { useState, memo } from "react";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = memo(function ReviewCard({
  review,
}: ReviewCardProps) {
  const [imageError, setImageError] = useState(false);
  const [productImageError, setProductImageError] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-secondary-500 fill-secondary-500" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white shadow overflow-hidden hover:shadow-md transition-all duration-300 rounded-sm border border-primary-500/10 flex flex-col h-full">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex items-center mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
              {review.authorImage?.url && !imageError ? (
                <Image
                  src={review.authorImage.url}
                  alt={review.authorImage.alt || review.authorName}
                  fill
                  className="object-cover"
                  sizes="48px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-primary-500">
                {review.authorName}
              </h4>
              <p className="text-sm text-primary-300">{review.authorEmail}</p>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <div className="flex mr-2">{renderStars(review.rating)}</div>
            <span className="text-sm text-gray-500">({review.rating}/5)</span>
          </div>

          <p className="text-primary-300 text-sm mb-4 leading-relaxed line-clamp-4">
            {review.content}
          </p>

          {review.product && (
            <div className="mb-4 p-3 bg-gray-50 border rounded-sm">
              <p className="text-xs font-medium text-gray-700 mb-2">Product:</p>

              <div className="flex items-start gap-3">
                <div className="relative w-16 h-16 overflow-hidden flex-shrink-0 border">
                  {review.product.images && !productImageError ? (
                    <Image
                      src={review.product.images[0].url}
                      alt={review.product.images[0].alt || review.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                      onError={() => setProductImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="w-6 h-6 text-gray-400">
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {review.product.name}
                  </p>

                  {review.product.sku && (
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Barcode className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{review.product.sku}</span>
                    </div>
                  )}

                  {review.product.price && (
                    <p className="text-sm font-semibold text-primary-500 mt-1">
                      ${review.product.price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm text-primary-300 mb-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
