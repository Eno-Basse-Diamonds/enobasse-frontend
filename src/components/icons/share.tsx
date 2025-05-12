import React from "react";
import { IconProps } from "./types";

export const ShareIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Share icon"
      className={className}
    >
      <path d="M21 19V21H3V19" stroke="currentColor" strokeLinejoin="round" />
      <path d="M15 3L20 8L15 13" stroke="currentColor" strokeLinejoin="round" />
      <path
        d="M20 8C10 8 3 9.5 3 16"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
};
