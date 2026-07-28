import React, { ReactNode } from "react";

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Section layout wrapper.
 *
 * @description A reusable section wrapper providing consistent horizontal
 * padding, top margin, and accessible ARIA labelling. Links the section to its
 * heading via aria-labelledby using the provided id.
 *
 * @param id - Section ID and heading reference for aria-labelledby.
 * @param children - Content rendered inside the section.
 * @param className - Additional CSS classes for the section element.
 * @returns A styled section element.
 */
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
