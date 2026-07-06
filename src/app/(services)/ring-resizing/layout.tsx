import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ring Resizing Service",
  description:
    "Get your ring resized to the perfect fit by Eno Bassé's expert jewelers. Fast, precise ring resizing for engagement rings, wedding bands, and fine jewelry.",
  keywords: [
    "ring resizing",
    "ring resize service",
    "engagement ring resizing",
    "wedding band resizing",
    "Eno Bassé services",
  ],
  openGraph: {
    title: "Ring Resizing Service - Eno Bassé Diamonds",
    description:
      "Get your ring resized to the perfect fit by our expert jewelers.",
    url: "https://enobasse.com/ring-resizing",
  },
  twitter: {
    title: "Ring Resizing Service - Eno Bassé Diamonds",
    description:
      "Get your ring resized to the perfect fit by our expert jewelers.",
  },
  alternates: {
    canonical: "https://enobasse.com/ring-resizing",
  },
};

export default function RingResizingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
