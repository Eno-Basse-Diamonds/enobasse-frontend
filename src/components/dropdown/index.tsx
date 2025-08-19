"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAccountStore } from "@/lib/store/account";
import {
  FacebookIcon,
  XIcon,
  InstagramIcon,
  TiktokIcon,
  LinkIcon,
  ShareIcon,
} from "../icons";
import "./styles.scss";

interface ShareDropdownProps {
  url: string;
  label?: string;
}

export const ShareDropdown: React.FC<ShareDropdownProps> = ({
  url,
  label = "Share",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
    }
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: (
        <FacebookIcon className="share-dropdown__icon" aria-hidden="true" />
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "X",
      icon: <XIcon className="share-dropdown__icon" aria-hidden="true" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Instagram",
      icon: (
        <InstagramIcon className="share-dropdown__icon" aria-hidden="true" />
      ),
      url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "TikTok",
      icon: <TiktokIcon className="share-dropdown__icon" aria-hidden="true" />,
      url: `https://www.tiktok.com/?link=${encodeURIComponent(url)}`,
    },
    {
      name: "Copy Link",
      icon: <LinkIcon className="share-dropdown__icon" aria-hidden="true" />,
      action: () => {
        navigator.clipboard.writeText(url);
        setIsOpen(false);
      },
    },
  ];

  return (
    <div
      ref={dropdownRef}
      className="share-dropdown"
      aria-label="Share options"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`share-dropdown__toggle ${
          isOpen ? "share-dropdown__toggle--active" : ""
        }`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={label}
      >
        <ShareIcon className="share-dropdown__toggle-icon" aria-hidden="true" />
        <span className="share-dropdown__label">{label}</span>
      </button>

      {isMounted && (
        <ul
          role="menu"
          className={`share-dropdown__menu ${
            isOpen
              ? "share-dropdown__menu--open"
              : "share-dropdown__menu--closed"
          }`}
          onAnimationEnd={handleAnimationEnd}
        >
          {shareLinks.map((item, index) => (
            <li key={index} role="none" className="share-dropdown__item">
              {item.action ? (
                <button
                  role="menuitem"
                  onClick={item.action}
                  className="share-dropdown__link"
                >
                  {item.icon}
                  {item.name}
                </button>
              ) : (
                <a
                  href={item.url}
                  role="menuitem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-dropdown__link"
                >
                  {item.icon}
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const CurrencyDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const preferredCurrency = useAccountStore((state) => state.preferredCurrency);
  const isHydrated = useAccountStore((state) => state.isHydrated);
  const setPreferredCurrency = useAccountStore(
    (state) => state.setPreferredCurrency
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies = [
    { value: "USD", label: "USD", flag: "/images/flags/usd.png" },
    { value: "NGN", label: "NGN", flag: "/images/flags/ngn.webp" },
  ];

  const handleCurrencyChange = async (currency: string) => {
    if (currency !== preferredCurrency) {
      await setPreferredCurrency(currency);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isHydrated) {
    return (
      <div className="relative">
        <button className="flex items-center space-x-1 px-1 py-1 text-sm font-medium text-gray-700">
          <span className="flex flex-row items-center mr-2">
            <div className="h-4 w-6 bg-gray-200 animate-pulse mr-2" />
            <div className="h-4 w-8 bg-gray-200 animate-pulse" />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-1 py-1 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span className="flex flex-row items-center mr-2">
          <Image
            src={
              currencies.find((c) => c.value === preferredCurrency)?.flag || ""
            }
            alt={`${preferredCurrency} Flag`}
            height={50}
            width={100}
            className="h-4 w-auto mr-2"
          />{" "}
          {preferredCurrency}
        </span>
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[7.2rem] bg-white shadow-md border border-gray-200 z-10">
          {currencies.map((currency) => (
            <button
              key={currency.value}
              onClick={() => handleCurrencyChange(currency.value)}
              className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                preferredCurrency === currency.value
                  ? "bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Image
                src={currency.flag}
                alt={`${currency.label} Flag`}
                height={50}
                width={100}
                className="h-4 w-auto mr-2"
              />
              {currency.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
