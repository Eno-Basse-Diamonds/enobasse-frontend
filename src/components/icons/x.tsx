import React from "react";
import { IconProps } from "./types";

export const XIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.52165 6.77486L15.4777 0H14.066L8.89582 5.88229L4.76436 0H0L6.2466 8.896L0 16H1.41166L6.87244 9.78743L11.2356 16H16L9.52165 6.77486ZM7.58885 8.97371L6.95596 8.088L1.91986 1.04H4.08793L8.15117 6.728L8.78406 7.61371L14.0672 15.008H11.8991L7.58885 8.97371Z"
        fill="#502B3A"
        fillOpacity="0.6"
      />
    </svg>
  );
};
