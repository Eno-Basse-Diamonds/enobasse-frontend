import React from "react";

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Enobasse",
    url: "https://enobasse.com",
    logo: "https://enobasse.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-234-567-890",
      contactType: "customer service",
    },
    sameAs: [
      "https://facebook.com/enobasse",
      "https://instagram.com/enobasse",
      "https://twitter.com/enobasse",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
