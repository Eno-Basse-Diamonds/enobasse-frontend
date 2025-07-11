import { Header } from "@/components";
import { Footer } from "@/components";
import { WhatsAppButton } from "@/components/button";
import { PrivacyConsent } from "@/components/privacy-consent";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <WhatsAppButton />
      <PrivacyConsent />
      <Footer />
    </>
  );
}
