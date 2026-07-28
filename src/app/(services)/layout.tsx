import { WhatsAppButton } from "@/shared/components/Button";
import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
