import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export const ContactDetails = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-primary text-3xl md:text-4xl font-semibold text-primary-500 mb-6">
          Contact
        </h1>
        <p className="text-primary-400 leading-relaxed">
          Your questions or feedback are always welcome at Eno Bassé. Join in a
          conversation with one of our Diamond and Jewelry Consultants to help
          you make the right decision.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <MapPin
            strokeWidth={1.5}
            className="w-6 h-6 text-primary-200 flex-shrink-0 mt-1"
          />
          <Link
            href="https://www.google.com/search?sca_esv=2fa4110dc5a9b4b6&rlz=1C1GCEU_enNG1161NG1161&sxsrf=AE3TifPzAC7YZrNK0Pe8khDAgNMzcMiZWg:1748787201283&q=Admiralty+Mall+Lekki&ludocid=16645864384511966876&lsig=AB86z5UgHAChSHfgbFgwATQi8D5M&sa=X&ved=2ahUKEwj5jq7_s9CNAxUtQEEAHTsdPRIQ8G0oAHoECEMQAQ&biw=1536&bih=776&dpr=1.25"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-primary-500 font-medium">
              Admiralty Mall, Lekki Phase 1
            </p>
            <p className="text-primary-400">Lekki, Lagos</p>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Phone
            strokeWidth={1.5}
            className="w-6 h-6 text-primary-200 flex-shrink-0"
          />
          <Link
            href="tel:+2349164886579"
            className="text-primary-400 hover:text-primary-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            +234 916 488 6579
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Mail
            strokeWidth={1.5}
            className="w-6 h-6 text-primary-200 flex-shrink-0"
          />
          <Link
            href="mailto:info@enobasse.com"
            className="text-primary-400 hover:text-primary-500"
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
