import type { Metadata } from "next";
import { SizeGuide, PageHeading } from "@/components";

export const metadata: Metadata = {
  title: "Ring Size Guide",
  description:
    "Comprehensive ring size guide with measurement instructions and international conversion charts. Learn how to measure your ring size accurately at home.",
  keywords: [
    "ring size guide",
    "how to measure ring size",
    "ring size chart",
    "find my ring size",
    "international ring sizes",
    "ring size conversion",
    "ring sizing guide",
    "Eno Basse ring sizes",
  ],
  openGraph: {
    title: "Ring Size Guide - Eno Bassé Diamonds",
    description:
      "Learn how to measure your ring size accurately with our comprehensive guide and international conversion charts.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ring Size Guide - Eno Bassé Diamonds",
    description:
      "Comprehensive ring size guide with measurement instructions and international conversion charts.",
  },
  alternates: {
    canonical: "https://enobasse.com/size-guide",
  },
};

export default function SizeGuidePage() {
  return (
    <>
      <div className="mt-6">
        <PageHeading title="Ring Size Guide" />
      </div>
      <SizeGuide />
    </>
  );
}
