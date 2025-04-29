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
          {title && <h1 className="page-heading__title">{title}</h1>}
          <div aria-hidden className="page-heading__spacer"></div>
        </div>
        {breadcrumb && <Breadcrumb {...breadcrumb} />}
      </div>
    </div>
  );
};
