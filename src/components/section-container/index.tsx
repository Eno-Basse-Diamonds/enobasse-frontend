import React, { ReactNode } from "react";

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
      className={`px-4 lg:px-8 mt-10 md:mt-16 ${className}`}
    >
      {children}
    </section>
  );
};
