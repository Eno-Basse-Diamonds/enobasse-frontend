"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { Rating } from "@/components";
import { StarIcon, CloseIcon } from "@/components/icons";
import { Review } from "@/lib/data/products";

interface ReviewsProps {
  reviews: Review[];
  ratingDistribution: [
    { stars: 5; percentage: number },
    { stars: 4; percentage: number },
    { stars: 3; percentage: number },
    { stars: 2; percentage: number },
    { stars: 1; percentage: number },
  ];
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

  const hoverScale = {
    scale: 1.03,
    transition: { duration: 0.2 },
  };

  const tapScale = {
    scale: 0.98,
    transition: { duration: 0.1 },
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
                <Rating rating={4.7} aria-label="Average rating 4.7 stars" />
              </div>
              <span className="reviews__rating-text">
                Based on 1,624 reviews
              </span>
            </div>
          </div>

          <div
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
            <motion.button
              className="reviews__cta-button"
              aria-label="Write a review"
              onClick={() => setIsModalOpen(true)}
              whileHover={hoverScale}
              whileTap={tapScale}
            >
              Write a review
            </motion.button>
          </motion.div>
        </motion.aside>

        <motion.div
          className="reviews__main"
          role="feed"
          aria-labelledby="reviews-heading"
          variants={container}
        >
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              className="reviews__review"
              aria-posinset={index + 1}
              aria-setsize={reviews.length}
              itemScope
              itemType="https://schema.org/Review"
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="reviews__user-info">
                  <div className="reviews__user-container">
                    <motion.div
                      className="reviews__avatar"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ type: "spring" }}
                    >
                      <Image
                        src={review.customer.image.src}
                        alt={`Profile picture of ${review.customer.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        itemProp="image"
                      />
                    </motion.div>
                    <div>
                      <h4
                        className="reviews__user-name"
                        itemProp="author"
                        itemScope
                        itemType="https://schema.org/Person"
                      >
                        <span itemProp="name">{review.customer.name}</span>
                      </h4>
                      <div className="flex items-center mt-1">
                        <Rating
                          rating={review.rating}
                          showRatingNumber={false}
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
                    dateTime={new Date(review.date).toISOString()}
                    itemProp="datePublished"
                  >
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <div className="reviews__review-content">
                  <h5 className="reviews__review-title" itemProp="name">
                    {review.title}
                  </h5>
                  <p className="reviews__review-text" itemProp="reviewBody">
                    {review.content}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
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
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
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
      className="review-modal"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdrop}
    >
      <motion.div
        ref={modalRef}
        className="review-modal__content"
        variants={modal}
      >
        <motion.button
          className="review-modal__close-button"
          onClick={onClose}
          aria-label="Close review form"
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <CloseIcon className="review-modal__close-icon" />
        </motion.button>

        <h3 className="review-modal__title">Write a Review</h3>

        <form onSubmit={handleSubmit}>
          <div className="review-modal__form-grid">
            <motion.div whileHover={{ x: 5 }}>
              <label htmlFor="name" className="review-modal__label">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="review-modal__input"
                required
                aria-required="true"
              />
            </motion.div>
            <motion.div whileHover={{ x: 5 }}>
              <label htmlFor="email" className="review-modal__label">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="review-modal__input"
                required
                aria-required="true"
              />
            </motion.div>
          </div>

          <div className="review-modal__rating-container">
            <label htmlFor="rating" className="review-modal__label">
              Rating
            </label>
            <div className="review-modal__rating-controls">
              <div className="review-modal__stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="review-modal__star-button"
                    aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                    whileHover={starHover}
                    whileTap={starTap}
                    animate={{
                      scale: star <= rating ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <StarIcon
                      className={`review-modal__star-icon ${
                        star <= rating ? "review-modal__star-icon--active" : ""
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <motion.span
                  className="review-modal__rating-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {ratingLabels[rating]}
                </motion.span>
              )}
            </div>
          </div>

          <motion.div className="review-modal__field" whileHover={{ x: 5 }}>
            <label htmlFor="title" className="review-modal__label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="review-modal__input"
              required
              aria-required="true"
            />
          </motion.div>

          <motion.div className="review-modal__field" whileHover={{ x: 5 }}>
            <label htmlFor="content" className="review-modal__label">
              Review *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="review-modal__textarea"
              rows={5}
              required
              aria-required="true"
            />
          </motion.div>

          <div className="review-modal__actions">
            <motion.button
              type="button"
              onClick={onClose}
              className="review-modal__cancel-button"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="review-modal__submit-button"
              disabled={rating === 0}
              aria-disabled={rating === 0}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Review
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

function progressAnimation({ width }: { width: number; }) {
  return {
    hidden: { width: 0 },
    show: {
      width: `${width}%`,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };
}
