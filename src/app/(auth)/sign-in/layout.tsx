import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Access your Eno Bassé account to view order history, saved designs, and exclusive member benefits. Secure 256-bit encryption enabled.",
  keywords: [
    "Eno Bassé login",
    "Eno Bassé sign in",
    "luxury jewelry account",
    "secure client portal",
    "jewelry order tracking",
    "saved designs access",
  ],
  openGraph: {
    title: "Sign In - Eno Bassé Diamonds",
    description:
      "Your secure gateway to purchased pieces, design consultations, and collection wishlists.",
    url: "https://www.enobasse.com/sign-in",
    type: "website",
    images: [
      {
        url: "https://www.enobasse.com/images/auth/sign-in.webp",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "Eno Bassé Diamonds",
  },
  twitter: {
    title: "Sign In - Eno Bassé Diamonds",
    description:
      "Securely access your heirloom jewelry records and upcoming appointments.",
    images: ["https://www.enobasse.com/images/auth/sign-in.webp"],
  },
  alternates: {
    canonical: "https://www.enobasse.com/sign-in",
  },
};

export default function SignInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
