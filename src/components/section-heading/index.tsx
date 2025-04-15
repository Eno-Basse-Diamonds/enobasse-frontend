import React from "react";
import "./styles.scss";

interface SectionHeadingProps {
  id: string;
  title: string;
  description?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  title,
  description,
}) => {
  return (
    <header className="section-heading">
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {description && (
        <p className="section-heading__description">{description}</p>
      )}
    </header>
  );
};
