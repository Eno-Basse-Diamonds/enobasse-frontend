import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Eno Bassé protects your personal information. Our commitment to your privacy and data security in all transactions.",
  keywords: [
    "jewelry privacy policy",
    "data security fine jewelry",
    "Eno Bassé data protection",
    "secure jewelry transactions",
    "online jewelry privacy",
  ],
  openGraph: {
    title: "Privacy Policy - Eno Bassé Fine Diamonds",
    description:
      "Your privacy matters. Learn how we protect your personal information in all Eno Bassé jewelry transactions and website interactions.",
    url: "https://www.enobasse.com/privacy-policy",
  },
  twitter: {
    title: "Privacy Policy - Eno Bassé Fine Diamonds",
    description:
      "How we protect your data when you shop for fine jewelry online. Your privacy is our priority.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="privacy-policy">
      <h1 className="privacy-policy__title">Privacy Policy</h1>
      <p className="privacy-policy__last-modified">
        Last modified: June 3, 2025.
      </p>

      <div className="privacy-policy__content">
        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Introduction</h2>
          <p className="privacy-policy__paragraph">
            Eno Bassé, Inc. ("Eno Bassé," "we," "our," or "us"), respects your
            privacy and is committed to protecting your privacy. This Privacy
            Policy describes the information we may collect from you or that you
            may provide to us when you visit www.enobasse.com ("Website") and
            our practices for collecting, using, maintaining, protecting, and
            disclosing that information.
          </p>
          <p className="privacy-policy__paragraph">
            This policy applies to information we collect:
          </p>
          <ul className="privacy-policy__list">
            <li className="privacy-policy__list-item">On this Website.</li>
            <li className="privacy-policy__list-item">
              In email, text, and other electronic messages between you and this
              Website.
            </li>
          </ul>
          <p className="privacy-policy__paragraph">
            This policy does not apply to information collected by:
          </p>
          <ul className="privacy-policy__list">
            <li className="privacy-policy__list-item">
              Us offline or through any other means, including on any other
              website operated by Eno Bassé or any third party, including our
              affiliates and subsidiaries.
            </li>
            <li className="privacy-policy__list-item">
              Any third party, including our affiliates and subsidiaries,
              including through any application or content (including
              advertising) that may link to or be accessible from or through
              this Website.
            </li>
          </ul>
          <p className="privacy-policy__paragraph">
            Please read this policy carefully to understand our policies and
            practices regarding your information and what we will do with it. If
            you do not agree with our policies and practices, you may choose not
            to use the Website. By accessing or using this Website, you agree to
            this Privacy Policy. This Privacy Policy may change from time to
            time (see the "Changes to Our Privacy Policy" section). Your
            continued use of this Website after we make changes means that you
            accept and agree to those changes, so please check this Privacy
            Policy periodically for updates.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Information We Collect</h2>
          <p className="privacy-policy__paragraph">
            We collect several types of information from and about users of our
            Website, including:
          </p>
          <ul className="privacy-policy__list">
            <li className="privacy-policy__list-item">
              Information by which you may be personally identified, such as
              name, postal address, email address, telephone number,
              government-issued identification information, or any other
              identifier by which you may be contacted online or offline
              ("personal information").
            </li>
            <li className="privacy-policy__list-item">
              Information that is about you but individually does not identify
              you, such as account access credentials, demographic data, profile
              data, payment and transaction data, and content provided from
              contacting or interacting with us.
            </li>
            <li className="privacy-policy__list-item">
              Data about your internet connection, location, usage of the
              Website, device connectivity and configurations, IP addresses and
              device identifiers, and other information collected through
              cookies, web beacons, and other tracking technologies.
            </li>
          </ul>
          <p className="privacy-policy__paragraph">
            We collect this information:
          </p>
          <ul className="privacy-policy__list">
            <li className="privacy-policy__list-item">
              Directly from you when you provide it to us.
            </li>
            <li className="privacy-policy__list-item">
              Automatically as you navigate through the site.
            </li>
            <li className="privacy-policy__list-item">
              From third parties, for example, our business partners.
            </li>
          </ul>

          <h3 className="privacy-policy__subheading">
            Information You Provide
          </h3>
          <p className="privacy-policy__paragraph">
            The information we collect on or through our Website includes:
          </p>
          <div className="privacy-policy__data-group">
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Contact Data.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We collect contact information that you provide by filling in
                forms on our Website. This includes information provided at the
                time of registering to use our Website, posting material, or
                requesting further services. We may also ask you for information
                when you enter a contest or promotion sponsored by us or when
                you report a problem with our Website.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Account Credentials.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We collect passwords and other information for authentication
                and account access.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Demographic Data.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We collect demographic information such as your age, birth month
                and day, gender, and country.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Profile Data.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We collect your interests, favorites, wish lists, ring size
                preferences, and other profile data.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Payment and Transaction Data.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We collect payment data, including credit card numbers and bank
                account numbers and any associated security codes and expiration
                dates.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Content.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We collect the content you provide from contacting or
                interacting with us. For example, if you contact us, we collect
                records and copies of your correspondence (including email
                addresses).
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Contacts.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We collect information about your contacts to fulfill a request
                by you. For example, when you email a product to a friend or
                refer a friend through the Website, we request that you provide
                your and your friend's names and email addresses. This
                information will be used in ways consistent with this Privacy
                Policy.
              </span>
            </div>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">
            Information Collected Automatically
          </h2>
          <p className="privacy-policy__paragraph">
            As you navigate through and interact with our Website, we may use
            automatic data collection technologies to collect certain
            information about your device, browsing actions, and patterns,
            including:
          </p>
          <div className="privacy-policy__data-group">
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Service Use Data.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We collect details of your visits to our Website, including
                traffic data, location data, logs, and other communication data
                and the resources that you access and use on the Website.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Device Connectivity and Configuration Data.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We collect information about your device and internet
                connection, including your IP address, operating system, and
                browser type.
              </span>
            </div>
          </div>
          <p className="privacy-policy__paragraph">
            Information collected automatically may include personal
            information. Such information helps us to improve our Website and to
            deliver a better and more personalized service, including by
            enabling us to:
          </p>
          <ul className="privacy-policy__list">
            <li className="privacy-policy__list-item">
              Estimate our audience size and usage patterns.
            </li>
            <li className="privacy-policy__list-item">
              Store information about your preferences, allowing us to customize
              our Website according to your individual interests.
            </li>
            <li className="privacy-policy__list-item">
              Speed up your searches.
            </li>
            <li className="privacy-policy__list-item">
              Recognize you when you return to our Website.
            </li>
          </ul>
          <p className="privacy-policy__paragraph">
            The technologies we use for this automatic data collection include:
          </p>
          <div className="privacy-policy__data-group">
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Cookies.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                A cookie is a small file stored by your browser on your device's
                hard drive. You may refuse to accept browser cookies by
                activating the appropriate setting on your browser. However, if
                you select this setting you may be unable to access certain
                parts of our Website. Unless you have adjusted your browser
                setting so that it will refuse cookies, our system will issue
                cookies when you direct your browser to our Website.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Web Beacons.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                Pages of our Website may contain small electronic files known as
                web beacons (also referred to as clear gifs, pixel tags, and
                single-pixel gifs) that permit us, for example, to count users
                who have visited those pages and for other related website
                statistics, such as the popularity of certain website content.
              </span>
            </div>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Use of Your Information</h2>
          <p className="privacy-policy__paragraph">
            We collect and use your information for business purposes, including
            to:
          </p>
          <ul className="privacy-policy__list">
            <li className="privacy-policy__list-item">
              Improve our products and services, marketing and promotional
              efforts, and our Website and its contents.
            </li>
            <li className="privacy-policy__list-item">
              Provide you with information, products, or services that you
              request from us, such as to process and fulfill your order, to
              respond to your comments, question, and requests, and to provide
              customer service.
            </li>
            <li className="privacy-policy__list-item">
              Develop and send you direct marketing, including advertisements
              and communications about our products, promotions, events, and
              services, through different channels such as email, SMS/MMS text
              messaging, and postal mail, to the extent you have opted into such
              communications as may be required by law.
            </li>
            <li className="privacy-policy__list-item">
              Conduct market research.
            </li>
            <li className="privacy-policy__list-item">
              Monitor and analyze usage, activities, patterns, and trends. We
              may anonymize your information so that it can no longer be
              associated with you.
            </li>
            <li className="privacy-policy__list-item">
              Carry out our obligations and enforce our rights arising from any
              contracts entered into between you and us, including for billing
              and collection.
            </li>
            <li className="privacy-policy__list-item">
              Notify you about changes to our Website or any products or
              services we offer or provide though it.
            </li>
            <li className="privacy-policy__list-item">
              Fulfill any other business or commercial purpose disclosed to you
              with your consent.
            </li>
          </ul>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">
            Sharing of Your Information
          </h2>
          <p className="privacy-policy__paragraph">
            We may share aggregated information about our users without
            restriction.
          </p>
          <p className="privacy-policy__paragraph">
            We may share your personal information as follows:
          </p>
          <div className="privacy-policy__data-group">
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Service Providers.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We may share your information with contractors and other service
                providers for various aspects of our business, including but not
                limited to shipping, data management, web hosting, fulfillment,
                assembly, marketing, emailing, mailing, and payment processing.
                These service providers receive personal information only as
                needed to perform their services and are not authorized to use
                any personal information for any other purpose.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Affiliates.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We may share your information with related entities such as
                parent or subsidiary companies for business purposes.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Business Partners.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We may share your information with our business partners in
                connection with joint marketing activities. For example, we may
                share your information with a business partner for purposes of
                providing financing for the purchase of Eno Bassé products.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Special Events:
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                If you choose to participate in a special event, such as a
                promotion, contest, or sweepstakes, we may share your personal
                information with organizations participating in the event.
                Unless we tell you otherwise, these third parties do not use
                your information for any purpose other than to manage the event.
                In some cases, these promotional partners may send you
                information about products and services that may be of interest
                to you.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Business Transfer.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We may share your information with a buyer or other successor in
                any merger, divestiture, restructuring, reorganization,
                dissolution, or other sale or transfer of some or all of Eno
                Basse's assets, whether as a going concern or as part of
                bankruptcy, liquidation, or similar proceeding, in which
                personal information held by Eno Bassé about our Website users
                is among the assets transferred.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Security, Compliance with Law, and Fraud Protection:
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We may share your information as we deem necessary, in our sole
                discretion, to comply with any court order, law, or legal
                process, including to respond to any governmental or regulatory
                request. We may also share your information to investigate,
                prevent, or take action regarding suspected illegal activity
                such as fraud or to protect the rights, property, or safety of
                us, our employees, customers, or any other person. We may also
                share your information with other companies or organizations for
                fraud protection and credit-risk reduction. We may also share
                your information to enforce any agreement we have with you,
                including for billing and collection purposes.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Consent.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We may share your information for any other business or
                commercial purpose disclosed to you and with your consent.
              </span>
            </div>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Children</h2>
          <p className="privacy-policy__paragraph">
            Our Website is not intended for children under the age of 16. We do
            not knowingly collect personal information from children under 16.
            If you are under 16, do not use or provide any information on this
            Website or through any of its features, register on the Website,
            make any purchases through the Website, use any of the interactive
            or public comment features of this Website, or provide any
            information about yourself to us, including your name, postal
            address, telephone number, email address, or any screen name or user
            name you may use. If we learn we have collected or received personal
            information from a child under 16 without verification of parental
            consent, we will delete that information. If you believe we might
            have any information from or about a child under 16, please contact
            us at contact@enobasse.com.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Your Rights and Choices</h2>
          <div className="privacy-policy__data-group">
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Tracking Technologies.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                You can set your browser to refuse all or some browser cookies
                or to alert you when cookies are being sent. Please note that if
                you disable or refuse cookies, some parts of this Website may
                not function properly.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Do Not Track.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                Your browser settings may allow you to automatically transmit
                do-not-track requests to websites you visit. No industry
                consensus yet exists for how website operators should respond to
                such requests. Accordingly, unless the law is interpreted to
                require us to do so, we do not monitor or respond to
                do-not-track signals or other similar mechanisms. For more
                information on "Do Not Track," visit www.allaboutdnt.com.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Promotional Communications.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                To opt out of receiving promotional emails, mailings, telephone
                calls, or other communications, please follow the unsubscribe
                instructions in the email or contact us at contact@enobasse.com.
                Opting out of promotional communications does not affect our
                non-promotional communications with you, including those related
                to your account, a product purchase, or other business
                transactions.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Third-Party Advertising.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                If you do not want us to share your personal information with
                unaffiliated or non-agent third parties for marketing purposes,
                you can opt out by sending us an email with your request to
                contact@enobasse.com.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Targeted Advertising.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                If you do not want us to use information that we collect or that
                you provide to us to deliver advertisements according to our
                advertisers' target-audience preferences, you can opt out by
                sending us an email with your request to contact@enobasse.com.
              </span>
            </div>
            <div className="privacy-policy__data-item">
              <strong className="privacy-policy__data-item-label">
                Online Behavioral Advertising.
              </strong>
              <span className="privacy-policy__data-item-value">
                {" "}
                We do not control third parties' collection or use of your
                information to deliver online behavioral advertising, also
                called interest-based advertising. However, these third parties
                may provide you with ways to choose not to have your information
                collected or used in this way. You can opt out of receiving
                targeted advertising from members of the Network Advertising
                Initiative (NAI) or Digital Advertising Alliance (DAA) on their
                respective websites.
              </span>
            </div>
          </div>
          <p className="privacy-policy__paragraph">
            Residents of certain states, such as Nevada, may have additional
            rights. Please see the "Nevada Privacy Rights" section for more
            information.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">
            Accessing and Correcting Your Information
          </h2>
          <p className="privacy-policy__paragraph">
            You can review and change your personal information by logging into
            the Website and visiting your account page. You may also send an
            email to contact@enobasse.com to request access to, correct, or
            delete any personal information you have provided to us. We cannot
            delete your personal information except by also deleting your user
            account. We may not grant a request to change information if we
            believe the change would violate any law or cause the information to
            be incorrect.
          </p>
          <p className="privacy-policy__paragraph">
            Residents of certain states, such as Nevada, may have additional
            rights. Please see the "Nevada Privacy Rights" section for more
            information.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Data Security</h2>
          <p className="privacy-policy__paragraph">
            No transmission of information over the internet can be guaranteed
            to be completely secure. Although we do our best to protect your
            personal information, we cannot guarantee the security of your
            personal information transmitted to our Website. Any transmission of
            personal information is at your own risk.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">International Transfer</h2>
          <p className="privacy-policy__paragraph">
            This Website is operated from the United States. Information
            collected on this Website may be stored and processed in the United
            States or any other country in which Eno Bassé or its affiliates,
            subsidiaries, service providers, or agents maintain facilities. Data
            protection laws in the U.S. and other jurisdictions may be different
            from those of your country of residence. By using this Website, you
            consent to the transfer to and from, processing, usage, sharing, and
            storage of your information in the U.S. and other jurisdictions as
            set forth in this Privacy Policy.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">
            Changes to Our Privacy Policy
          </h2>
          <p className="privacy-policy__paragraph">
            The date this Privacy Policy was last revised is identified at the
            top of the page. We may occasionally revise this Privacy Policy to
            reflect changes in our practices. Any revised privacy policy will be
            posted on this page with a revised "last modified" date. If any
            changes are material, we may notify you by email at your account's
            designated email address. You are responsible for ensuring that we
            have a valid email address for you and for periodically visiting our
            Website and Privacy Policy to check for any changes.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Contact Us</h2>
          <p className="privacy-policy__paragraph">
            If you have questions or comments about this Privacy Policy, contact
            us at{" "}
            <Link
              href="mailto:info@enobasse.com"
              className="privacy-policy__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              info@enobasse.com
            </Link>
            ,{" "}
            <Link
              href="tel:+2349164886579"
              className="privacy-policy__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              +234 916 488 6579
            </Link>
            , or{" "}
            <Link
              href="https://www.google.com/search?sca_esv=2fa4110dc5a9b4b6&rlz=1C1GCEU_enNG1161NG1161&sxsrf=AE3TifPzAC7YZrNK0Pe8khDAgNMzcMiZWg:1748787201283&q=Admiralty+Mall+Lekki&ludocid=16645864384511966876&lsig=AB86z5UgHAChSHfgbFgwATQi8D5M&sa=X&ved=2ahUKEwj5jq7_s9CNAxUtQEEAHTsdPRIQ8G0oAHoECEMQAQ&biw=1536&bih=776&dpr=1.25"
              target="_blank"
              rel="noopener noreferrer"
              className="privacy-policy__link"
            >
              Admiralty Mall, Lekki Phase 1, Lekki, Lagos.
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
