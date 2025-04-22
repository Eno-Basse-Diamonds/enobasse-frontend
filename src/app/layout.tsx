import type { Metadata } from "next";
import { Lora, Gantari } from "next/font/google";
import { Header, Footer } from "@/components";
import "./globals.scss";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const gantari = Gantari({
  variable: "--font-gantari",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Eno Basse Jewellery | Handcrafted Fine Jewelry & Diamond Collections",
    template: "%s | Eno Basse Jewellery",
  },
  description:
    "Discover exquisite handcrafted Eno Basse jewellery pieces at Eno Basse Jewellery. Shop our curated collection of diamond rings, gold necklaces, and custom engagement rings. Ethical sourcing, artisan craftsmanship.",
  keywords: [
    "fine Eno Basse jewellery",
    "diamond rings",
    "gold necklaces",
    "engagement rings",
    "handmade Eno Basse jewellery",
    "luxury Eno Basse jewellery",
    "custom Eno Basse jewellery",
    "ethical diamonds",
    "artisan Eno Basse jewellery",
  ],
  openGraph: {
    title: "Eno Basse Jewellery | Handcrafted Fine Jewelry",
    description:
      "Exquisite handcrafted Eno Basse jewellery pieces with ethical sourcing and artisan craftsmanship.",
    url: "https://enobasse.com",
    siteName: "Eno Basse Jewellery",
    images: [
      {
        url: "https://enobasse.com/images/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eno Basse Jewellery Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eno Basse Jewellery | Handcrafted Fine Jewelry",
    description:
      "Exquisite handcrafted Eno Basse jewellery pieces with ethical sourcing and artisan craftsmanship.",
    images: ["https://enobasse.com/images/seo/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/images/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/images/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/images/favicons/apple-touch-icon.png",
        type: "image/png",
      },
      {
        url: "/images/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/images/favicons/favicon-16x16.png",
    apple: "/images/favicons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://enobasse.com"),
  alternates: {
    canonical: "/",
  },
  category: "Eno Basse jewellery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${gantari.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
