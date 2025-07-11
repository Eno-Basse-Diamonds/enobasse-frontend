import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Become an Eno Bassé insider for first access to new collections, private events, and bespoke design opportunities. Create your account in moments.",
  keywords: [
    "Eno Bassé membership",
    "luxury jewelry newsletter",
    "designer jewelry updates",
    "exclusive jewelry offers",
    "fine jewelry account",
  ],
  openGraph: {
    title: "Sign Up - Eno Bassé Diamonds",
    description:
      "Unlock doors to our most coveted pieces and experiences. Your invitation to the world of Eno Bassé begins here.",
    url: "https://www.enobasse.com/sign-up",
    images: [
      {
        url: "https://www.enobasse.com/images/auth/sign-up.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up - Eno Bassé Diamonds",
    description:
      "Join our circle of collectors for early access to heirloom pieces and atelier experiences. #JewelryConnoisseur",
    images: ["https://www.enobasse.com/images/auth/sign-up.webp"],
  },
  alternates: {
    canonical: "https://www.enobasse.com/sign-up",
  },
};

export default function SignUpLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}
