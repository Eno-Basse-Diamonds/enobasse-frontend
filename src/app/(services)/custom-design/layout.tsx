import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Jewelry Design",
  description:
    "Collaborate with our master jewelers to create one-of-a-kind pieces. From concept to finished heirloom, we bring your vision to life in precious metals and gems.",
  keywords: [
    "custom jewelry design",
    "bespoke engagement rings",
    "Eno Bassé creations",
    "made-to-order jewelry",
    "luxury jewelry commissions",
  ],
  openGraph: {
    title: "Custom Jewelry Design - Eno Bassé Diamonds",
    description:
      "Your dream piece, handcrafted by our artisans. Start your custom jewelry journey with a private consultation.",
    url: "https://www.enobasse.com/custom-design",
  },
  twitter: {
    title: "Custom Jewelry Design - Eno Bassé Diamonds",
    description:
      "From initial sketch to final polish: See how we transform your ideas into wearable art. #BespokeJewelry",
  },
  alternates: {
    canonical: "https://www.enobasse.com/custom-design",
  },
};

export default function CustomDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
