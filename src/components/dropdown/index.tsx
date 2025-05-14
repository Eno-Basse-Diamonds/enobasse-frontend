"use client";

import { useState, useRef, useEffect } from "react";
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
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
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
        className={`share-dropdown__toggle ${isOpen ? "share-dropdown__toggle--active" : ""}`}
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
