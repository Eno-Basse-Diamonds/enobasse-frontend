import { Metadata } from "next";
import Script from "next/script";
import { Lora, Gantari, Dancing_Script } from "next/font/google";
import { QueryProvider } from "../lib/providers/query-provider";
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/providers/session-provider";
import { AppAlert } from "@/components/alert";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { domAnimation, LazyMotion } from "motion/react";
import "./globals.scss";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: 'swap',
});

const gantari = Gantari({
  variable: "--font-gantari",
  subsets: ["latin"],
  display: 'swap',
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default:
      "Eno Bassé Diamonds - Handcrafted Fine Jewelry & Diamond Collections",
    template: "%s - Eno Bassé Diamonds",
  },
  description:
    "Discover exquisite handcrafted Eno Bassé jewellery pieces at Eno Bassé Jewellery. Shop our curated collection of diamond rings, gold necklaces, and custom engagement rings. Ethical sourcing, artisan craftsmanship.",
  keywords: [
    "fine Eno Bassé jewellery",
    "diamond rings",
    "gold necklaces",
    "engagement rings",
    "handmade Eno Bassé jewellery",
    "luxury Eno Bassé jewellery",
    "custom Eno Bassé jewellery",
    "ethical diamonds",
    "artisan Eno Bassé jewellery",
  ],
  openGraph: {
    title: "Eno Bassé Diamonds - Handcrafted Fine Jewelry",
    description:
      "Exquisite handcrafted Eno Bassé jewellery pieces with ethical sourcing and artisan craftsmanship.",
    url: "https://enobasse.com",
    siteName: "Eno Bassé Diamonds",
    images: [
      {
        url: "https://res.cloudinary.com/enobasse/image/upload/v1756511099/og-image_wrcfog.png",
        width: 1200,
        height: 630,
        alt: "Eno Bassé Jewellery Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eno Bassé Diamonds - Handcrafted Fine Jewelry",
    description:
      "Exquisite handcrafted Eno Bassé jewellery pieces with ethical sourcing and artisan craftsmanship.",
    images: [
      "https://res.cloudinary.com/enobasse/image/upload/v1756511103/twitter-image_spmjkj.png",
    ],
    creator: "@EnoBasseDiamond",
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
  category: "Eno Bassé jewellery",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${gantari.variable} ${dancingScript.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <QueryProvider>
            <LazyMotion features={domAnimation}>
              <AppAlert />
              {children}
            </LazyMotion>
          </QueryProvider>
        </SessionProvider>
        <Script
          src="https://cloud.umami.is/script.js"
          strategy="afterInteractive"
          data-website-id="5e014b11-092d-4049-bcdd-5af656e31c6e"
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
