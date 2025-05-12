import React from "react";
import { IconProps } from "./types";

export const BoxIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
    >
      <path
        d="M22 7L12 2L2 7V17L12 22L22 17V7Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path d="M2 7L12 12" stroke="currentColor" strokeLinejoin="round" />
      <path d="M12 22V12" stroke="currentColor" strokeLinejoin="round" />
      <path d="M22 7L12 12" stroke="currentColor" strokeLinejoin="round" />
      <path d="M17 4.5L7 9.5" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
};
