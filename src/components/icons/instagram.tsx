import React from "react";
import { IconProps } from "./types";

export const InstagramIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 1.5H7C3.96243 1.5 1.5 3.96243 1.5 7V13C1.5 16.0376 3.96243 18.5 7 18.5H13C16.0376 18.5 18.5 16.0376 18.5 13V7C18.5 3.96243 16.0376 1.5 13 1.5Z"
        stroke="#502B3A"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.6056C11.9916 13.6056 13.606 11.9911 13.606 9.99955C13.606 8.00802 11.9916 6.39355 10 6.39355C8.0085 6.39355 6.39404 8.00802 6.39404 9.99955C6.39404 11.9911 8.0085 13.6056 10 13.6056Z"
        stroke="#502B3A"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.894 6.13617C15.4629 6.13617 15.924 5.67502 15.924 5.10617C15.924 4.53732 15.4629 4.07617 14.894 4.07617C14.3252 4.07617 13.864 4.53732 13.864 5.10617C13.864 5.67502 14.3252 6.13617 14.894 6.13617Z"
        fill="#502B3A"
        fillOpacity="0.6"
      />
    </svg>
  );
}
