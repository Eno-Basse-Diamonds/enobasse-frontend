"use client";

import React, { useState, useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import { easeOut } from "motion/react";
import { useSession } from "next-auth/react";
import { useAccountStore } from "@/lib/store/account";
import { useAccountByEmail } from "@/lib/hooks/use-accounts";
import { Button } from "@/components/button";
import { CloseIcon } from "@/components/icons/close";
import { StarIcon } from "@/components/icons/star";

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

const ratingLabels: RatingLabel = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

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
  const { data: session } = useSession();
  const { isHydrated, billingAddress: savedBillingAddress } = useAccountStore();
  const { data: dbAccount } = useAccountByEmail(session?.user?.email);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (isOpen && isHydrated && !hasInitializedRef.current && (session === undefined || dbAccount !== undefined)) {
      const emailVal = session?.user?.email || savedBillingAddress?.email || "";
      let nameVal = "";

      if (dbAccount && dbAccount.name) {
        nameVal = dbAccount.name;
      } else if (savedBillingAddress?.firstName) {
        nameVal = `${savedBillingAddress.firstName} ${savedBillingAddress.lastName || ""}`.trim();
      } else if (session?.user?.name) {
        nameVal = session.user.name;
      }

      setEmail(emailVal);
      setName(nameVal);
      hasInitializedRef.current = true;
    }
  }, [isOpen, isHydrated, session, dbAccount, savedBillingAddress]);

  useEffect(() => {
    if (!isOpen) {
      hasInitializedRef.current = false;
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !name.trim() || !email.trim() || !content.trim()) {
      setAlertState({ visible: true, type: "error", message: "Please fill in all required fields." });
      return;
    }

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

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out p-4 md:p-0"
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
