import { WhatsAppButton } from "@/shared/components/Button";
import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";
import { PrivacyConsent } from "@/shared/components/PrivacyConsent";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
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
