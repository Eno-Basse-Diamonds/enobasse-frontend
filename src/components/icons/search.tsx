import React from "react";
import { IconProps } from "./types";

export const SearchIcon: React.FC<IconProps> = ({ className }) => {
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
        d="M10.5 19C15.1944 19 19 15.1944 19 10.5C19 5.8056 15.1944 2 10.5 2C5.8056 2 2 5.8056 2 10.5C2 15.1944 5.8056 19 10.5 19Z"
        stroke="#502B3A"
        strokeLinejoin="round"
      />
      <path
        d="M13.3285 7.17155C12.6046 6.4477 11.6046 6 10.5 6C9.39548 6 8.39548 6.4477 7.67163 7.17155"
        stroke="#502B3A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6104 16.6113L20.853 20.854"
        stroke="#502B3A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
