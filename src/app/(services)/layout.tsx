import { WhatsAppButton } from "@/components/button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
