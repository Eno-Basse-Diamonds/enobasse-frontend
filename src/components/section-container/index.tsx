import React, { ReactNode } from "react";
import "./styles.scss";

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  className = "",
}) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`section-container ${className}`}
    >
      {children}
    </section>
  );
};
