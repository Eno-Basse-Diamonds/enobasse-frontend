import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/button";
import { NewsletterPopup } from "@/components/newsletter";
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
