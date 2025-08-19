import { Header, Footer } from "@/components";
import { WhatsAppButton } from "@/components/button";

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
