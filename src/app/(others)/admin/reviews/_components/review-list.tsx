import { Review } from "@/lib/types/review";
import { ReviewCard } from "./review-card";
import { memo } from "react";

interface ReviewListProps {
  reviews: Review[];
  onToggleVerified: (review: Review) => void;
  onDelete: (id: string) => void;
  togglingVerifiedId?: string | null;
  deletingId?: string | null;
}

export const ReviewList = memo(function ReviewList({
  reviews,
  onToggleVerified,
  onDelete,
  togglingVerifiedId,
  deletingId,
}: ReviewListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onToggleVerified={onToggleVerified}
          onDelete={onDelete}
          isTogglingVerified={togglingVerifiedId === review.id}
          isDeleting={deletingId === review.id}
        />
      ))}
    </div>
  );
});
