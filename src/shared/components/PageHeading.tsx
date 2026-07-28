import React from "react";

import { Breadcrumb, BreadcrumbProps } from "@/shared/components/Breadcrumb";
import { BackButton } from "@/shared/components/Button";

interface PageHeadingProps {
  title?: string;
  breadcrumb?: BreadcrumbProps;
}

/**
 * Page heading with back button and breadcrumb.
 *
 * @description Renders a centered page header with a back button, an optional
 * page title as an h1, and an optional breadcrumb trail. The back button and
 * title are aligned to the left with a responsive spacer for visual balance.
 *
 * @param title - Optional page title displayed as an h1.
 * @param breadcrumb - Optional breadcrumb props passed to Breadcrumb.
 * @returns A page heading layout.
 */
export const PageHeading: React.FC<PageHeadingProps> = ({ title, breadcrumb }) => {
  return (
    <div className="px-4 md:px-6 lg:px-8 text-center">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <div className="flex gap-x-4 items-start justify-between overflow-hidden">
          <BackButton />
          <div className="flex flex-col items-start justify-center gap-3 overflow-x-hidden w-auto">
            {title && (
              <h1 className="truncate w-full text-ellipsis whitespace-nowrap text-2xl sm:text-3xl md:text-4xl md:leading-[3.5rem] font-primary font-semibold">
                {title}
              </h1>
            )}
            {breadcrumb && <Breadcrumb {...breadcrumb} />}
          </div>
          <div aria-hidden className="hidden md:block sm:w-6"></div>
        </div>
      </div>
    </div>
  );
};
