import Link from "next/link";
import React from "react";

import { StarIcon } from "@/shared/components/icons/Star";

interface RatingProps {
  rating: number;
  count?: number;
  maxRating?: number;
  showRatingNumber?: boolean;
  showCount?: boolean;
}

/**
 * Star rating display.
 *
 * @description Renders a numeric rating value followed by filled/empty star
 * icons. Optionally shows a "See all N reviews" link that anchors to a reviews
 * section. Stars are gold (#D1A559) when filled and muted when empty.
 *
 * @param rating - The average rating value.
 * @param count - Total number of reviews (shown in the link).
 * @param maxRating - Maximum number of stars (default 5).
 * @param showRatingNumber - Whether to show the numeric rating (default true).
 * @param showCount - Whether to show the review count link (default true).
 * @returns A rating display with stars.
 */
export const Rating: React.FC<RatingProps> = ({
  count,
  rating,
  maxRating = 5,
  showRatingNumber = true,
  showCount = true,
}) => {
  return (
    <div className="flex items-center">
      {showRatingNumber && <span className="text-[#502B3A] mr-2">{rating.toFixed(1)}</span>}
      <div className="flex relative">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = rating >= starValue;

          return (
            <div key={index}>
              <StarIcon
                className={`w-5 h-5 ${isFilled ? "text-[#D1A559]" : "text-[#502B3A]/20"}`}
              />
            </div>
          );
        })}
      </div>
      {count != 0 && showCount && (
        <Link
          href="#reviews-section"
          className="ml-10 text-[#502B3A] font-medium hover:text-[#502B3A]/90"
        >
          See all {count} reviews
        </Link>
      )}
    </div>
  );
};
