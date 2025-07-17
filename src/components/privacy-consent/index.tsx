"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export const PrivacyConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasConsented = sessionStorage.getItem("privacyConsent");

    if (!hasConsented) {
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("privacyConsent", "true");
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleDecline = () => {
    sessionStorage.setItem("privacyConsent", "false");
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full pointer-events-none">
      <div className="relative">
        <div
          className={`
            bg-primary-500 p-6 shadow-2xl max-w-xl sm:ml-6 sm:mb-6 transition-all duration-300 ease-out pointer-events-auto  ${isAnimating ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"}
          `}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white transition-colors duration-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="pr-8">
            <h3 className="text-lg font-primary font-light mb-3 text-white tracking-wide">
              Privacy & Cookies
            </h3>

            <p className="text-white text-sm leading-relaxed mb-4 font-light">
              We use cookies and similar technologies to enhance your
              experience, analyze site traffic, and personalize content. By
              continuing to browse, you consent to our use of cookies.
            </p>

            <div className="text-xs text-gray-100 mb-4">
              <Link
                href="/privacy-policy"
                className="underline"
              >
                Privacy Policy
              </Link>
              {" • "}
              <Link
                href="/terms-and-conditions"
                className="underline"
              >
                Cookie Policy
              </Link>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="
                  flex-1 bg-white text-primary-500 px-4 py-2
                  font-medium text-sm tracking-wide
                  hover:bg-gray-100 transition-all duration-200
                  transform
                "
              >
                ACCEPT
              </button>

              <button
                onClick={handleDecline}
                className=" px-4 py-2 border border-white text-white font-medium text-sm tracking-wide"
              >
                DECLINE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
