import React from "react";

interface SectionHeadingProps {
  id: string;
  title: string;
  description?: string;
}

/**
 * Section heading.
 *
 * @description Renders a centered section title as an h2 with an optional
 * description paragraph below it. Designed to pair with SectionContainer via
 * shared id for accessible labelling.
 *
 * @param id - Unique ID matching the parent section's aria-labelledby.
 * @param title - Section heading text.
 * @param description - Optional supporting text below the title.
 * @returns A centered heading block.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({ id, title, description }) => {
  return (
    <header className="flex flex-col pt-6 pb-4 gap-y-4 items-center text-center">
      <h2
        id={id}
        className="font-primary font-semibold text-2xl md:text-3xl lg:text-4xl text-[#502B3A]"
      >
        {title}
      </h2>
      {description && (
        <p className="font-light md:text-lg lg:text-xl text-[#1B1B1D] max-w-2xl">{description}</p>
      )}
    </header>
  );
};
