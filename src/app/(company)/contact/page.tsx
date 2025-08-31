import { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";
import { ContactDetails } from "./_components/contact-details";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach our jewelry experts for purchases, custom designs, and client services. Visit our showroom, call, or message us directly.",
  keywords: [
    "Eno Bassé contact",
    "luxury jewelry inquiries",
    "custom jewelry design",
    "fine jewelry customer service",
    "jewelry showroom appointment",
  ],
  openGraph: {
    title: "Contact - Eno Bassé Diamonds",
    description:
      "Connect with our master jewelers for custom commissions, purchases, or client services. Available by appointment at our showroom.",
    url: "https://www.enobasse.com/contact",
  },
  twitter: {
    title: "Contact - Eno Bassé Diamonds",
    description:
      "Schedule an appointment or inquire about our luxury jewelry collections. Custom commissions available.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/contact",
  },
};

export default async function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-100 py-12 px-0 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="px-4 sm:px-6 md:px-0">
            <ContactDetails />
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
