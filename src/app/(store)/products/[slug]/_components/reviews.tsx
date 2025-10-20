"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { easeInOut, easeOut } from "motion/react";
import { Review } from "@/lib/types/reviews";
import { calculateAverageRating } from "@/lib/utils/reviews";
import { RatingDistribution } from "@/lib/types/reviews";
import { dateToOrdinalDayMonthYear } from "@/lib/utils/date";
import { User } from "lucide-react";
import { useCreateReview } from "@/lib/hooks/use-reviews";
import { useSession } from "next-auth/react";
import { Rating } from "@/components/rating";
import { StarIcon } from "@/components/icons/star";
import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { CloseIcon } from "@/components/icons/close";

interface ReviewsProps {
  reviews: Review[];
  ratingDistribution: RatingDistribution[];
  productId: string | number;
  setAlertState: (state: { visible: boolean; type: "success" | "error"; message: string }) => void;
  dismissAlert: () => void;
}

export const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  ratingDistribution,
  productId,
  setAlertState,
  dismissAlert,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const createReviewMutation = useCreateReview();

  const handleSubmitReview = async (review: {
    rating: number;
    content: string;
    name: string;
    email: string;
  }) => {
    try {
      await createReviewMutation.mutateAsync({
        productId,
        reviewData: {
          authorName: review.name,
          authorEmail: review.email,
          rating: review.rating,
          content: review.content,
          authorImage: {
            url: "https://via.placeholder.com/40x40",
            alt: review.name,
          },
        },
      });

      setIsModalOpen(false);
      setAlertState({ visible: true, type: "success", message: "Review submitted successfully!" });
    } catch (error) {
      console.error("Failed to submit review:", error);
      setAlertState({ visible: true, type: "error", message: "Failed to submit review. Please try again." });
    }
  };

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
      className="w-full max-w-[1550px] mx-auto"
      aria-labelledby="reviews-heading"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-5 lg:gap-24">
        <motion.aside className="lg:col-span-2" variants={item}>
          <div className="reviews__heading">
            <h2
              id="reviews-heading"
              className="font-primary text-2xl md:text-3xl lg:text-4xl text-[#502B3A] mb-3"
            >
              Customer Reviews
            </h2>
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <div className="flex items-center">
                <Rating
                  rating={calculateAverageRating(ratingDistribution)}
                  showRatingNumber={true}
                  aria-label={`Average rating: ${calculateAverageRating(
                    ratingDistribution
                  )} out of 5 stars`}
                  count={reviews?.length || 0}
                  showCount={false}
                />
              </div>
            </div>
          </div>

          <div
            id="reviews-section"
            className="mb-6 md:mb-8"
            aria-label="Rating distribution"
          >
            {ratingDistribution.map((rating) => (
              <motion.div
                key={rating.stars}
                className="flex items-center mb-2 md:mb-3"
                variants={item}
              >
                <div className="flex items-center w-10 md:w-12">
                  <span className="text-[#502B3A] w-4">{rating.stars}</span>
                  <StarIcon
                    className="text-[#D1A559] ml-1 h-4 w-4"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 mx-2 md:mx-3">
                  <div
                    className="w-full bg-gray-100 h-2 md:h-2.5"
                    role="progressbar"
                    aria-valuenow={rating.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${rating.stars} star rating percentage`}
                  >
                    <motion.div
                      className="bg-[#D1A559] h-2 md:h-2.5 transition-all duration-300"
                      style={{ width: `${rating.percentage}%` }}
                      initial="hidden"
                      animate="show"
                      variants={progressAnimation({ width: rating.percentage })}
                      custom={rating.percentage}
                    />
                  </div>
                </div>
                <div className="w-8 md:w-10 text-right">
                  <span className="text-[#502B3A]/80 text-xs md:text-sm font-medium">
                    {rating.percentage}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-6 md:mt-8 lg:mt-12" variants={item}>
            <h3 className="text-lg lg:text-xl font-semibold text-[#502B3A] mb-2">
              Share your thoughts
            </h3>
            <p className="text-[#502B3A]/80 text-sm md:text-base mb-4">
              {session ?
                "If you've used this product, share your thoughts with other customers" :
                "Sign in to share your thoughts about this product with other customers"
              }
            </p>
            <Button
              variant="outline"
              aria-label={session ? "Write a review" : "Sign in to write a review"}
              onClick={() => session ? setIsModalOpen(true) : null}
              className="w-full sm:w-auto text-[#502B3A] text-sm md:text-base"
            >
              {session ? "Write a review" : "Sign in to write a review"}
            </Button>
          </motion.div>
        </motion.aside>

        <motion.div
          className="space-y-6 md:space-y-8 lg:col-span-3"
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
                className="border-b border-gray-200 pb-6 md:pb-8 last:border-b-0"
                aria-posinset={index + 1}
                aria-setsize={reviews.length}
                itemScope
                itemType="https://schema.org/Review"
                variants={item}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col items-stretch justify-between gap-y-3 md:gap-y-4 w-full md:w-52">
                    <div className="flex flex-row items-center gap-x-2">
                      <motion.div
                        className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden bg-gray-100"
                        transition={{ type: "spring" }}
                      >
                        <ReviewAuthorImage review={review} />
                      </motion.div>
                      <div>
                        <h4
                          className="text-sm md:text-base font-semibold text-[#502B3A]"
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
                      className="text-xs md:text-sm text-[#502B3A]/70"
                      dateTime={review.createdAt}
                      itemProp="datePublished"
                    >
                      {dateToOrdinalDayMonthYear(review.createdAt)}
                    </time>
                  </div>

                  <div className="flex-1">
                    <p
                      className="text-[#502B3A]/80 text-sm md:text-base leading-relaxed"
                      itemProp="reviewBody"
                    >
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
        isOpen={isModalOpen && !!session}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReview}
        isLoading={createReviewMutation.isPending}
        setAlertState={setAlertState}
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
    content: string;
  }) => void;
  isLoading: boolean;
  setAlertState: (state: { visible: boolean; type: "success" | "error"; message: string }) => void;
}

interface RatingLabel {
  [key: number]: string;
}

export const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  setAlertState,
}) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

    // Basic validation
    if (!rating || !name.trim() || !email.trim() || !content.trim()) {
      setAlertState({ visible: true, type: "error", message: "Please fill in all required fields." });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertState({ visible: true, type: "error", message: "Please enter a valid email address." });
      return;
    }

    onSubmit({ rating, content, name, email });
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
      transition: { duration: 0.3, ease: easeOut },
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
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl relative rounded-sm"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50 focus:border-[#502B3A]/50 transition-colors duration-200"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50 focus:border-[#502B3A]/50 transition-colors duration-200"
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
                htmlFor="content"
                className="block text-sm md:text-base font-medium text-[#502B3A]"
              >
                Review *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#502B3A]/50 focus:border-[#502B3A]/50 transition-colors duration-200 h-24 md:h-32 resize-none"
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
                disabled={rating === 0 || isLoading}
                aria-disabled={rating === 0 || isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Review"}
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
      transition: { duration: 1, ease: easeInOut },
    },
  };
}
