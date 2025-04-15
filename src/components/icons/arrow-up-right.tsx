import React from "react";
import { IconProps } from "./types";

export const ArrowUpRightIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.5 5.5H18.5V14.5"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M5.77148 18.2279L18.4994 5.5"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
};
