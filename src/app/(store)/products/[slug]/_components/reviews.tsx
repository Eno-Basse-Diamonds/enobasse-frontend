"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { Rating, Button, EmptyState } from "@/components";
import { StarIcon, CloseIcon } from "@/components/icons";
import { Review } from "@/lib/types/reviews";
import { calculateAverageRating } from "@/lib/utils/reviews";
import { RatingDistribution } from "@/lib/types/reviews";
import { dateToOrdinalDayMonthYear } from "@/lib/utils/date";
import { User } from "lucide-react";

interface ReviewsProps {
  reviews: Review[];
  ratingDistribution: RatingDistribution[];
}

export const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  ratingDistribution,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitReview = (review: {
    rating: number;
    title: string;
    content: string;
  }) => {};

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="reviews"
      aria-labelledby="reviews-heading"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="reviews__grid">
        <motion.aside className="reviews__sidebar" variants={item}>
          <div className="reviews__heading">
            <h2 id="reviews-heading">Customer Reviews</h2>
            <div className="reviews__rating-container">
              <div className="flex items-center">
                <Rating
                  rating={calculateAverageRating(ratingDistribution)}
                  showRatingNumber={true}
                  aria-label={`Average rating: ${calculateAverageRating(ratingDistribution)} out of 5 stars`}
                  count={reviews?.length || 0}
                  showCount={false}
                />
              </div>
            </div>
          </div>

          <div
            id="reviews-section"
            className="reviews__distribution"
            aria-label="Rating distribution"
          >
            {ratingDistribution.map((rating) => (
              <motion.div
                key={rating.stars}
                className="reviews__distribution-row"
                variants={item}
              >
                <div className="reviews__stars-container">
                  <span className="reviews__stars-count">{rating.stars}</span>
                  <StarIcon className="reviews__star-icon" aria-hidden="true" />
                </div>
                <div className="reviews__progress-container">
                  <div
                    className="reviews__progress-bar"
                    role="progressbar"
                    aria-valuenow={rating.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${rating.stars} star rating percentage`}
                  >
                    <motion.div
                      className="reviews__progress-fill"
                      style={{ width: `${rating.percentage}%` }}
                      initial="hidden"
                      animate="show"
                      variants={progressAnimation({ width: rating.percentage })}
                      custom={rating.percentage}
                    />
                  </div>
                </div>
                <div className="reviews__percentage">
                  <span className="reviews__percentage-text">
                    {rating.percentage}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="reviews__cta" variants={item}>
            <h3 className="reviews__cta-heading">Share your thoughts</h3>
            <p className="reviews__cta-text">
              If you&#39;ve used this product, share your thoughts with other
              customers
            </p>
            <Button
              variant="outline"
              aria-label="Write a review"
              onClick={() => setIsModalOpen(true)}
              className="reviews__cta-button"
            >
              Write a review
            </Button>
          </motion.div>
        </motion.aside>

        <motion.div
          className="reviews__main"
          role="feed"
          aria-labelledby="reviews-heading"
          variants={container}
        >
          {reviews.length === 0 ? (
            <div>
              <EmptyState
                icon={<StarIcon className="w-12 h-12 text-gray-300" />}
                title="No Reviews Yet"
                description="Be the first to write a review for this product."
              />
            </div>
          ) : (
            reviews.map((review, index) => (
              <motion.article
                key={review.id}
                className="reviews__review"
                aria-posinset={index + 1}
                aria-setsize={reviews.length}
                itemScope
                itemType="https://schema.org/Review"
                variants={item}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="reviews__user-info">
                    <div className="reviews__user-container">
                      <motion.div
                        className="reviews__avatar"
                        transition={{ type: "spring" }}
                      >
                        <ReviewAuthorImage review={review} />
                      </motion.div>
                      <div>
                        <h4
                          className="reviews__user-name"
                          itemProp="author"
                          itemScope
                          itemType="https://schema.org/Person"
                        >
                          <span itemProp="name">{review.authorName}</span>
                        </h4>
                        <div className="flex items-center mt-1">
                          <Rating
                            rating={review.rating}
                            showCount={false}
                            aria-label={`Rating: ${review.rating} out of 5 stars`}
                          />
                          <meta
                            itemProp="ratingValue"
                            content={review.rating.toString()}
                          />
                          <meta itemProp="bestRating" content="5" />
                        </div>
                      </div>
                    </div>
                    <time
                      className="reviews__date"
                      dateTime={review.createdAt}
                      itemProp="datePublished"
                    >
                      {dateToOrdinalDayMonthYear(review.createdAt)}
                    </time>
                  </div>

                  <div className="reviews__review-content">
                    <p className="reviews__review-text" itemProp="reviewBody">
                      {review.content}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>
      </div>

      <ReviewFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReview}
      />
    </motion.section>
  );
};

interface ReviewAuthorImageProps {
  review: Review;
}

function ReviewAuthorImage({ review }: ReviewAuthorImageProps) {
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

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: {
    rating: number;
    name: string;
    email: string;
    title: string;
    content: string;
  }) => void;
}

interface RatingLabel {
  [key: number]: string;
}

export const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const ratingLabels: RatingLabel = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, title, content, name, email });
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Modal animation variants
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modal = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const starHover = {
    scale: 1.2,
    transition: { duration: 0.2 },
  };

  const starTap = {
    scale: 0.9,
    transition: { duration: 0.1 },
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out p-4 md:p-0"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdrop}
    >
      <motion.div
        ref={modalRef}
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl relative"
        variants={modal}
      >
        <motion.button
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-full"
          onClick={onClose}
          aria-label="Close review form"
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <CloseIcon className="w-5 h-5" />
        </motion.button>

        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-xl font-semibold text-[#502B3A] pr-12">
            Write a Review
          </h3>
        </div>

        <div className="p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div className="space-y-2" whileHover={{ x: 2 }}>
                <label
                  htmlFor="name"
                  className="block text-sm md:text-base font-medium text-[#502B3A]"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50 focus:border-[#502B3A]/50 transition-colors duration-200"
                  required
                  aria-required="true"
                />
              </motion.div>
              <motion.div className="space-y-2" whileHover={{ x: 2 }}>
                <label
                  htmlFor="email"
                  className="block text-sm md:text-base font-medium text-[#502B3A]"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50 focus:border-[#502B3A]/50 transition-colors duration-200"
                  required
                  aria-required="true"
                />
              </motion.div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rating"
                className="block text-sm md:text-base font-medium text-[#502B3A]"
              >
                Rating
              </label>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1hover:bg-gray-100 transition-colors duration-200"
                      aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                      whileHover={starHover}
                      whileTap={starTap}
                      animate={{
                        scale: star <= rating ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <StarIcon
                        className={`w-6 h-6 transition-colors duration-200 ${
                          star <= rating
                            ? "text-secondary-500 fill-secondary-500"
                            : "text-gray-300 hover:text-gray-400"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.span
                    className="text-sm font-medium text-[#502B3A]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {ratingLabels[rating]}
                  </motion.span>
                )}
              </div>
            </div>

            <motion.div className="space-y-2" whileHover={{ x: 2 }}>
              <label
                htmlFor="title"
                className="block text-sm md:text-base font-medium text-[#502B3A]"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50 focus:border-[#502B3A]/50 transition-colors duration-200"
                required
                aria-required="true"
              />
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ x: 2 }}>
              <label
                htmlFor="content"
                className="block text-sm md:text-base font-medium text-[#502B3A]"
              >
                Review *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50 focus:border-[#502B3A]/50 transition-colors duration-200 h-24 md:h-32 resize-none"
                rows={5}
                required
                aria-required="true"
              />
            </motion.div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={rating === 0}
                aria-disabled={rating === 0}
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

function progressAnimation({ width }: { width: number }) {
  return {
    hidden: { width: 0 },
    show: {
      width: `${width}%`,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };
}
