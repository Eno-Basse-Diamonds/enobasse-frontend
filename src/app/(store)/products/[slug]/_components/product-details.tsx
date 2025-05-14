import React from 'react';

interface ProductDetailsProps {
  details: Array<{ label: string; value: string | undefined }>;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ details }) => {
  if (details.length === 0) return null;

  return (
    <section
      aria-labelledby="product-details-heading"
      className="product-details"
    >
      <dl className="product-details__list">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="product-details__item"
            aria-labelledby={`detail-${detail.label.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <dt
              id={`detail-${detail.label.replace(/\s+/g, '-').toLowerCase()}`}
              className="product-details__label"
            >
              {detail.label}
            </dt>
            <dd
              className="product-details__value"
              aria-live="polite"
            >
              {detail.value || 'Not specified'}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
