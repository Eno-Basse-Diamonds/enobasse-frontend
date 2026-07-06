import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jewelry Maintenance & Repairs",
  description:
    "Professional jewelry maintenance and repair services from Eno Bassé's lapidary workshop - cleaning, polishing, and restoration for fine jewelry pieces.",
  keywords: [
    "jewelry repair",
    "jewelry maintenance",
    "jewelry polishing",
    "jewelry restoration",
    "Eno Bassé services",
  ],
  openGraph: {
    title: "Jewelry Maintenance & Repairs - Eno Bassé Diamonds",
    description:
      "Keep your fine jewelry in pristine condition with our expert maintenance and repair services.",
    url: "https://enobasse.com/maintenance-repairs",
  },
  twitter: {
    title: "Jewelry Maintenance & Repairs - Eno Bassé Diamonds",
    description:
      "Keep your fine jewelry in pristine condition with our expert maintenance and repair services.",
  },
  alternates: {
    canonical: "https://enobasse.com/maintenance-repairs",
  },
};

export default function MaintenanceRepairsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
