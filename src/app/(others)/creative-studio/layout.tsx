import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";
import { WhatsAppButton } from "@/components/button";

export const metadata: Metadata = {
  title: "Design Your Engagement Ring",
  description:
    "Create and customize your perfect engagement ring with our interactive ring configurator. Choose from various diamond shapes, head styles, bands, and metals to design your unique piece.",
  keywords: [
    "3D ring configurator",
    "custom engagement rings",
    "design your ring",
    "ring customization",
    "Creative studio",
    "Eno Bassé ring designer",
    "solitaire engagement rings",
    "diamond ring builder",
  ],
  openGraph: {
    title: "Design Your Engagement Ring - Eno Bassé Diamonds",
    description:
      "Use our advanced ring configurator to design your perfect engagement ring. Customize diamond shapes, settings, metals, and more with real-time preview.",
    url: "https://www.enobasse.com/creative-studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Your Engagement Ring - Eno Bassé Diamonds",
    description:
      "Create your perfect engagement ring with our interactive ring configurator and real-time customization tools.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/creative-studio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CreativeStudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
