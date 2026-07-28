import { Metadata } from "next";

import { NewsletterPopup } from "@/shared/components/Newsletter";
import { WhatsAppButton } from "@/shared/components/Button";
import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";
import { PrivacyConsent } from "@/shared/components/PrivacyConsent";

export const metadata: Metadata = {
  title: {
    absolute: "Eno Bassé Diamonds - Handcrafted Fine Jewelry & Diamond Collections",
  },
  description:
    "Discover exquisite handcrafted Eno Bassé jewellery pieces. Shop our curated collection of diamond rings, gold necklaces, and custom engagement rings. Ethical sourcing, artisan craftsmanship.",
  keywords: [
    "fine jewelry Lagos",
    "diamond rings Nigeria",
    "engagement rings Lagos",
    "custom jewelry design",
    "Eno Bassé Diamonds",
  ],
  openGraph: {
    title: "Eno Bassé Diamonds - Handcrafted Fine Jewelry",
    description:
      "Exquisite handcrafted Eno Bassé jewellery pieces with ethical sourcing and artisan craftsmanship.",
    url: "https://enobasse.com",
  },
  twitter: {
    title: "Eno Bassé Diamonds - Handcrafted Fine Jewelry",
    description:
      "Exquisite handcrafted Eno Bassé jewellery pieces with ethical sourcing and artisan craftsmanship.",
  },
  alternates: {
    canonical: "https://enobasse.com",
  },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <NewsletterPopup />
      <WhatsAppButton />
      <PrivacyConsent />
      <Footer />
    </>
  );
}
