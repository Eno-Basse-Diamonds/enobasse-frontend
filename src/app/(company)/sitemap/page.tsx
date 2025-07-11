import { Metadata } from "next";
import Link from "next/link";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Complete overview of all pages on Eno Bassé Diamonds website",
  keywords: [
    "Eno Bassé sitemap",
    "jewelry website navigation",
    "diamond collections index",
    "luxury jewelry pages",
    "site structure overview",
  ],
  openGraph: {
    title: "Sitemap - Eno Bassé Diamonds",
    description:
      "Navigate all sections of Eno Bassé Diamonds' online presence including jewelry collections, about us, and client services.",
    url: "https://www.enobasse.com/sitemap",
  },
  twitter: {
    title: "Sitemap - Eno Bassé Diamonds",
    description:
      "Access all areas of our luxury jewelry website through our comprehensive sitemap.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/sitemap",
  },
};

export default async function SitemapPage() {
  const sections = [
    {
      title: "Company",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Our Blog", href: "/blog" },
        { name: "FAQs", href: "/faqs" },
        { name: "Testimonials", href: "/testimonials" },
        { name: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Custom Design", href: "/custom-design" },
        { name: "Ring Resizing", href: "/ring-resizing" },
        { name: "Maintenance/Repairs", href: "/maintenance-repairs" },
      ],
    },
    {
      title: "Store",
      links: [
        { name: "All Collections", href: "/collections" },
        { name: "All Products", href: "/products" },
        { name: "Rings", href: "/collections/rings" },
        { name: "Engagement Rings", href: "/collections/engagement-rings" },
        { name: "Wedding Rings", href: "/collections/wedding-rings" },
        { name: "Neckpieces", href: "/collections/neckpieces" },
        { name: "Necklaces", href: "/collections/necklaces" },
        { name: "Pendants", href: "/collections/pendants" },
        { name: "Earrings", href: "/collections/earrings" },
        { name: "Wristwears", href: "/collections/wristwears" },
        { name: "Bangles", href: "/collections/bangles" },
        { name: "Bracelets", href: "/collections/bracelets" },
      ],
    },
    {
      title: "Policies",
      links: [
        {
          name: "Shipping & Return Policy",
          href: "/shipping-and-return-policy",
        },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms and Conditions", href: "/terms-and-conditions" },
      ],
    },
  ];

  return (
    <div className="sitemap-page">
      <h1>Sitemap</h1>
      <div className="sitemap-grid">
        {sections.map((section) => (
          <div key={section.title} className="sitemap-section">
            <h2>{section.title}</h2>
            <ul>
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
