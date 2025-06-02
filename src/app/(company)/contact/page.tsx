import { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";
import { ContactDetails } from "./_components/contact-details";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Contact Us",
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
