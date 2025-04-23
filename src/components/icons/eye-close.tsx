import React from "react";
import { IconProps } from "./types";

export const EyeCloseIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Eye close icon"
      className={className}
    >
      <path
        d="M3 8C3.31736 8.60965 3.79823 9.1752 4.41138 9.6777C6.1305 11.0867 8.8895 12 12 12C15.1105 12 17.8695 11.0867 19.5886 9.6777C20.2018 9.1752 20.6826 8.60965 21 8"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M14.4883 12L15.5235 15.8637"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M18.6768 10.6768L21.5052 13.5052"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 13.5051L5.32843 10.6767"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M8.46387 15.8638L9.49912 12.0001"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
};
