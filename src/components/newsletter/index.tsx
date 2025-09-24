"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

export const NewsletterPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedHasShown = localStorage.getItem("newsletterPopupShown");
    if (storedHasShown === "true") {
      setHasShown(true);
      return;
    }

    const handleScroll = () => {
      if (hasShown) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercentage >= 40 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem("newsletterPopupShown", "true");
        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown]);

  const closePopup = () => {
    setIsVisible(false);
    document.body.style.overflow = "unset";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await axios.post("/api/subscribe", { email });
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => {
        closePopup();
      }, 3000);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setError("You are already subscribed to our newsletter!");
      } else {
        setError("Failed to subscribe. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closePopup}
      />

      <div className="relative bg-white shadow-2xl max-w-4xl w-full mx-4 overflow-hidden transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-90">
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close newsletter popup"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-gray-50">
            <Image
              src="https://res.cloudinary.com/enobasse/image/upload/v1752330904/women-wedding-ring_co47p3.webp"
              alt="Newsletter"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-8">
            {isSuccess ? (
              <div className="text-center py-6 md:py-8">
                <div className="text-green-500 mb-4">
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-primary font-bold text-primary-500 mb-2">
                  Thank You!
                </h3>
                <p className="text-primary-300 text-sm md:text-base">
                  You've successfully subscribed to our newsletter.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-primary font-bold text-primary-500 mb-2">
                    Join Our Newsletter
                  </h2>
                  <p className="text-primary-300 text-sm md:text-base mb-4 md:mb-6">
                    Subscribe to get exclusive updates, tips, and special offers
                    delivered straight to your inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-primary-300 focus:ring-1 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm md:text-base"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-sm w-full bg-primary-500 text-white py-3 px-6 hover:bg-primary-400 disabled:bg-primary-300 transition-colors font-medium flex items-center justify-center text-sm md:text-base"
                    disabled={isSubmitting || !email}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe Now"
                    )}
                  </button>

                  {error && (
                    <p className="text-red-600 text-sm text-center mt-2">
                      {error}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
