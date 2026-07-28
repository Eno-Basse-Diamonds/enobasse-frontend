interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

/**
 * FAQPage structured data (JSON-LD).
 *
 * @description Generates schema.org FAQPage markup from an array of
 * question/answer pairs. Each question is rendered as a Question type with
 * its accepted answer.
 *
 * @param faqs - Array of FAQ objects with question and answer strings.
 * @returns A JSON-LD script tag for FAQPage.
 */
export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
