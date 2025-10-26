"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export const PrivacyConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("privacyConsent");

    if (!hasConsented) {
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacyConsent", "true");
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleNecessaryOnly = () => {
    localStorage.setItem("privacyConsent", "true");
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full pointer-events-none">
      <div className="relative">
        <div
          className={`
            bg-primary-500 p-6 md:p-8 rounded-none md:rounded-sm shadow-2xl max-w-xl sm:ml-6 sm:mb-6 transition-all duration-300 ease-out pointer-events-auto  ${isAnimating ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"}
          `}
        >
          <div>
            <h3 className="text-lg font-primary font-light mb-3 text-white tracking-wide">
              Privacy & Cookies
            </h3>

            <p className="text-white text-sm leading-relaxed mb-4 font-light">
              We use cookies and similar technologies to enhance your
              experience, analyze site traffic, and personalize content. By
              continuing to browse, you consent to our use of cookies.
            </p>

            <div className="text-xs text-gray-100 mb-4">
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              {" • "}
              <Link href="/terms-and-conditions" className="underline">
                Cookie Policy
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="
                  rounded-sm bg-white text-primary-500 px-4 py-2
                  font-medium text-sm tracking-wide
                  hover:bg-gray-100 transition-all duration-200
                  transform sm:flex-1
                "
              >
                ACCEPT ALL
              </button>

              <button
                onClick={handleNecessaryOnly}
                className="rounded-sm px-4 py-2 border border-white text-white font-medium text-sm tracking-wide sm:flex-1 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              >
                NECESSARY COOKIES ONLY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
