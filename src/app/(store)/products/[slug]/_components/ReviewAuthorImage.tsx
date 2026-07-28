"use client";

import Image from "next/image";
import { useState } from "react";

import { User } from "lucide-react";

import { Review } from "@/modules/reviews/types";

interface ReviewAuthorImageProps {
  review: Review;
}

export function ReviewAuthorImage({ review }: ReviewAuthorImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError || !review.authorImage?.url) {
    return (
      <div className="relative flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
        <User className="w-1/2 h-1/2 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={review.authorImage.url}
        alt={`Profile picture of ${review.authorName}`}
        layout="fill"
        className="rounded-full object-cover"
        itemProp="image"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
