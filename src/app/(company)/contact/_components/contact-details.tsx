import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export const ContactDetails = () => {
  return (
    <div className="contact-details">
      <div>
        <h1 className="contact-details__header">Contact</h1>
        <p className="contact-details__description">
          Your questions or feedback are always welcome at Eno Basse. Join in a
          conversation with one of our Diamond and Jewelry Consultants to help
          you make the right decision.
        </p>
      </div>

      <div className="contact-details__info-group">
        <div className="contact-details__item">
          <MapPin strokeWidth={1.5} className="contact-details__icon mt-1" />
          <Link
            href="https://www.google.com/search?sca_esv=2fa4110dc5a9b4b6&rlz=1C1GCEU_enNG1161NG1161&sxsrf=AE3TifPzAC7YZrNK0Pe8khDAgNMzcMiZWg:1748787201283&q=Admiralty+Mall+Lekki&ludocid=16645864384511966876&lsig=AB86z5UgHAChSHfgbFgwATQi8D5M&sa=X&ved=2ahUKEwj5jq7_s9CNAxUtQEEAHTsdPRIQ8G0oAHoECEMQAQ&biw=1536&bih=776&dpr=1.25"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="contact-details__address">
              Admiralty Mall, Lekki Phase 1
            </p>
            <p className="contact-details__location">Lekki, Lagos</p>
          </Link>
        </div>

        <div className="contact-details__item contact-details__item--centered">
          <Phone strokeWidth={1.5} className="contact-details__icon" />
          <Link
            href="tel:+2349164886579"
            className="contact-details__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            +234 916 488 6579
          </Link>
        </div>

        <div className="contact-details__item contact-details__item--centered">
          <Mail strokeWidth={1.5} className="contact-details__icon" />
          <Link
            href="mailto:info@enobasse.com"
            className="contact-details__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            info@enobasse.com
          </Link>
        </div>
      </div>
    </div>
  );
};
