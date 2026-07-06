import React from "react";

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: "Eno Bassé Diamonds",
    url: "https://enobasse.com",
    logo: "https://res.cloudinary.com/enobasse/image/upload/v1756506781/logo_gvieez.png",
    image: "https://res.cloudinary.com/enobasse/image/upload/v1756506781/logo_gvieez.png",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Admiralty Mall, Lekki Phase 1",
      addressLocality: "Lekki",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-916-488-6579",
      contactType: "customer service",
      email: "info@enobasse.com",
    },
    sameAs: [
      "https://www.facebook.com/eno.basse",
      "https://www.instagram.com/eno.basse",
      "https://x.com/EnoBasseDiamond",
      "https://www.linkedin.com/in/eno-bass%C3%A9-diamonds-650b60299/",
      "https://www.tiktok.com/@eno.basse.diamonds",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
