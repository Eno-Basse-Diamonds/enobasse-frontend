import { Review } from "@/lib/types/review";
import { ReviewCard } from "./review-card";
import { memo } from "react";

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = memo(function ReviewList({
  reviews,
}: ReviewListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
});
