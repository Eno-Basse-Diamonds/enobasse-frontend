import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/button";
import { NewsletterPopup } from "@/components/newsletter";
import { PrivacyConsent } from "@/components/privacy-consent";
import ScrollRestoration from "@/components/scroll-restoration";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ScrollRestoration />
      <Header />
      {children}
      <NewsletterPopup />
      <WhatsAppButton />
      <PrivacyConsent />
      <Footer />
    </>
  );
}
