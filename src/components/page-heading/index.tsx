import React, { ReactNode } from "react";
import { BackButton } from "../button";
import { Breadcrumb, BreadcrumbProps } from "../breadcrumb";
import "./styles.scss";

interface PageHeadingProps {
  title?: string;
  breadcrumb?: BreadcrumbProps;
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  breadcrumb,
}) => {
  return (
    <div className="page-heading">
      <div className="page-heading__container">
        <div className="page-heading__header">
          <BackButton />
          <div className="flex flex-col items-start justify-center gap-3 overflow-x-hidden w-auto">
            {title && (
              <h1 className="page-heading__title truncate w-full text-ellipsis whitespace-nowrap">
                {title}
              </h1>
            )}
            {breadcrumb && <Breadcrumb {...breadcrumb} />}
          </div>
          <div aria-hidden className="page-heading__spacer"></div>
        </div>
      </div>
    </div>
  );
};
