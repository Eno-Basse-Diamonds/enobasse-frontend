import React from "react";

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
    <header className="flex flex-col pt-6 pb-4 gap-y-4 items-center text-center">
      <h2
        id={id}
        className="font-primary font-semibold text-2xl md:text-3xl lg:text-4xl text-[#502B3A]"
      >
        {title}
      </h2>
      {description && (
        <p className="font-light md:text-lg lg:text-xl text-[#1B1B1D] max-w-2xl">
          {description}
        </p>
      )}
    </header>
  );
};
