import { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";
import { ContactDetails } from "./_components/contact-details";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach our jewelry experts for purchases, custom designs, and client services. Visit our showroom, call, or message us directly.",
  keywords: [
    "Eno Basse contact",
    "luxury jewelry inquiries",
    "custom jewelry design",
    "fine jewelry customer service",
    "jewelry showroom appointment",
  ],
  openGraph: {
    title: "Contact - Eno Basse Diamonds",
    description:
      "Connect with our master jewelers for custom commissions, purchases, or client services. Available by appointment at our showroom.",
    url: "https://www.enobasse.com/contact",
  },
  twitter: {
    title: "Contact - Eno Basse Diamonds",
    description:
      "Schedule an appointment or inquire about our luxury jewelry collections. Custom commissions available.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/contact",
  },
};

export default async function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-page__container">
        <div className="contact-page__layout">
          <div className="contact-page__details-wrapper">
            <ContactDetails />
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
