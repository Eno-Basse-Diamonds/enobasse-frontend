import { Header, Footer, NewsletterPopup } from "@/components";
import { WhatsAppButton } from "@/components/button";
import { PrivacyConsent } from "@/components/privacy-consent";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <NewsletterPopup />
      <WhatsAppButton />
      <PrivacyConsent />
      <Footer />
    </>
  );
}
