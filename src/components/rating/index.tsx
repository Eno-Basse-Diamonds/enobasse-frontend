import React from "react";
import { StarIcon } from "../icons";
import Link from "next/link";

interface RatingProps {
  rating: number;
  count?: number;
  maxRating?: number;
  showRatingNumber?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  count,
  rating,
  maxRating = 5,
  showRatingNumber = true,
}) => {
  return (
    <div className="flex items-center">
      {showRatingNumber && (
        <span className="text-[#502B3A] mr-2">{rating}</span>
      )}
      <div className="flex relative">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = rating >= starValue;

          return (
            <div key={index}>
              <StarIcon
                className={`w-5 h-5 ${
                  isFilled ? "text-[#D1A559]" : "text-[#502B3A]/20"
                }`}
              />
            </div>
          );
        })}
      </div>
      {count && (
        <Link
          href=""
          className="ml-10 text-[#502B3A] font-medium hover:text-[#502B3A]/90"
        >
          See all {count} reviews
        </Link>
      )}
    </div>
  );
};
