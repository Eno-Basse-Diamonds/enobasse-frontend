import { WhatsAppButton } from "@/components/button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
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
