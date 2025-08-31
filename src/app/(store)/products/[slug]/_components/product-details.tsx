import React from "react";

interface ProductDetailsProps {
  details: Array<{ label: string; value: string | undefined }>;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ details }) => {
  if (details.length === 0) return null;

  return (
    <section aria-labelledby="product-details-heading" className="mt-3">
      <dl className="flex flex-col divide-y divide-[#502B3A]/10">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex flex-col justify-between py-3 sm:flex-row sm:items-center"
            aria-labelledby={`detail-${detail.label
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            <dt
              id={`detail-${detail.label.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-sm md:text-base font-medium text-[#502B3A]/70 min-w-[120px]"
            >
              {detail.label}
            </dt>
            <dd
              className="mt-1 font-medium text-[#502B3A] sm:mt-0"
              aria-live="polite"
            >
              {detail.value || "Not specified"}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
