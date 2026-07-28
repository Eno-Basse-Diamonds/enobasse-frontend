"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { easeInOut } from "motion/react";
import * as motion from "motion/react-client";

import { useAccountStore } from "@/modules/account/store";
import { useCreateReview } from "@/modules/reviews/hooks";
import { RatingDistribution, Review } from "@/modules/reviews/types";
import { calculateAverageRating } from "@/modules/reviews/utils";
import { Button } from "@/shared/components/Button";
import { EmptyState } from "@/shared/components/EmptyState";
import { Rating } from "@/shared/components/Rating";
import { StarIcon } from "@/shared/components/icons/Star";
import { dateToOrdinalDayMonthYear } from "@/shared/utils/date";
import { logger } from "@/shared/utils/logger";

import { ReviewAuthorImage } from "./ReviewAuthorImage";
import { ReviewFormModal } from "./ReviewFormModal";

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
  const { isHydrated, billingAddress: savedBillingAddress } = useAccountStore();
  const createReviewMutation = useCreateReview();

  const userEmail = session?.user?.email || savedBillingAddress?.email || "";
  const hasReviewed = userEmail
    ? reviews.some((r) => r.authorEmail.toLowerCase() === userEmail.toLowerCase())
    : false;

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
    } catch (error: any) {
      logger.error("Failed to submit review:", error);
      const message =
        error instanceof Error ? error.message : "Failed to submit review. Please try again.";
      setAlertState({ visible: true, type: "error", message });
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
                    ratingDistribution,
                  )} out of 5 stars`}
                  count={reviews?.length || 0}
                  showCount={false}
                />
              </div>
            </div>
          </div>

          <div id="reviews-section" className="mb-6 md:mb-8" aria-label="Rating distribution">
            {ratingDistribution.map((rating) => (
              <motion.div
                key={rating.stars}
                className="flex items-center mb-2 md:mb-3"
                variants={item}
              >
                <div className="flex items-center w-10 md:w-12">
                  <span className="text-[#502B3A] w-4">{rating.stars}</span>
                  <StarIcon className="text-[#D1A559] ml-1 h-4 w-4" aria-hidden="true" />
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
              {hasReviewed
                ? "You have already shared your thoughts on this product. Thank you!"
                : session
                  ? "If you've used this product, share your thoughts with other customers"
                  : "Sign in to share your thoughts about this product with other customers"}
            </p>
            {hasReviewed ? (
              <Button
                variant="outline"
                disabled
                className="w-full sm:w-auto text-gray-400 border-gray-200 cursor-not-allowed text-sm md:text-base"
              >
                Review already submitted
              </Button>
            ) : (
              <Button
                variant="outline"
                aria-label={session ? "Write a review" : "Sign in to write a review"}
                onClick={() => (session ? setIsModalOpen(true) : null)}
                className="w-full sm:w-auto text-[#502B3A] text-sm md:text-base"
              >
                {session ? "Write a review" : "Sign in to write a review"}
              </Button>
            )}
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
                          <meta itemProp="ratingValue" content={review.rating.toString()} />
                          <meta itemProp="bestRating" content="5" />
                        </div>
                      </div>
                    </div>
                    <time
                      className="text-xs md:text-sm text-[#502B3A]/70"
                      dateTime={new Date(review.createdAt).toISOString()}
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

function progressAnimation({ width }: { width: number }) {
  return {
    hidden: { width: 0 },
    show: {
      width: `${width}%`,
      transition: { duration: 1, ease: easeInOut },
    },
  };
}
