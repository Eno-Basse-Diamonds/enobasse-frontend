import Link from "next/link";
import { Metadata } from "next";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Shipping & Purchase Policy",
  description:
    "Eno Bassé's shipping and purchase policies. All sales are final with complimentary expedited shipping, lifetime craftsmanship warranty, and secure transactions.",
  keywords: [
    "jewelry purchase policy",
    "fine jewelry shipping",
    "no returns jewelry",
    "Eno Bassé warranty",
    "Eno Bassé shipping",
    "Eno Bassé return policy",
    "secure jewelry purchase",
  ],
  openGraph: {
    title: "Shipping & Purchase Policy - Eno Bassé Fine Jewelry",
    description:
      "Learn about our final sale policy, complimentary shipping, and lifetime craftsmanship guarantee for all Eno Bassé jewelry pieces.",
    url: "https://www.enobasse.com/shipping-and-return-policy",
  },
  twitter: {
    title: "Shipping & Purchase Policy - Eno Bassé Fine Jewelry",
    description:
      "Learn about our final sale policy, complimentary shipping, and lifetime craftsmanship guarantee for all Eno Bassé jewelry pieces.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/shipping-and-return-policy",
  },
};

export default function shippingPage() {
  return (
    <main className="shipping">
      <h1 className="shipping__title">Shipping and Return Policy</h1>

      <section className="shipping__section">
        <h2 className="shipping__heading">
          Free Shipping. Secure Shopping. Satisfaction Guaranteed.
        </h2>
        <p className="shipping__paragraph">
          Enjoy free expedited shipping with every new purchase. All shipments
          are fully insured and shipped via{" "}
          <span className="shipping__highlight">FedEx</span> 2nd Day Air
          Delivery. International orders are shipped{" "}
          <span className="shipping__highlight">FedEx</span> International
          Priority.
        </p>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Purchase Policy</h2>
        <p className="shipping__paragraph">
          All sales are final. Once an item has been purchased, it cannot be
          returned or exchanged. We carefully craft each piece to order,
          ensuring the highest quality and perfect fit for our customers.
        </p>
        <p className="shipping__paragraph">
          Our in-stock ring size is 6.5. Please contact us for details about
          custom sizing options before placing your order. We want to be sure
          you are completely satisfied with your purchase. In the rare case that
          there's an issue with your order, we will work with you to resolve it.
        </p>
        <p className="shipping__paragraph">
          For any questions or concerns about your order, please contact us at
          {" "}
          <Link
            href="tel:+2349164886579"
            target="_blank"
            rel="noopener noreferrer"
          >
            +234 916 488 6579
          </Link>{" "}
          within 7 days of receiving your item.
        </p>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Lifetime Warranty</h2>
        <p className="shipping__paragraph">
          At Eno Bassé we are committed to a superior quality standard. Each
          piece is handcrafted and quality inspected before shipment. We take
          pride in our standard for diamond quality and skilled craftsmanship.
          We are pleased to offer a three-month warranty against any
          manufacturing defects and a lifetime warranty on the precious metal
          and diamond authenticity. Free lifetime in-store cleaning and
          inspection are always available. We recommend having your piece deep
          cleaned and refinished once every year to two years depending on wear.
          We do offer this service at a nominal fee. Shipping and insurance are
          extra.
        </p>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Insuring Your Jewelry</h2>
        <p className="shipping__paragraph">
          Eno Bassé recommends independently insuring the ring with your
          homeowner's or renter's insurance against loss, theft, or damage.
          There are also specialty jewelry insurance companies, like Jeweler's
          Mutual, that will insure all exquisite Eno Bassé pieces.
        </p>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Keeping your info safe</h2>
        <p className="shipping__paragraph">
          Enobasse.com uses the most current encryption technology to provide
          you with the safest, most secure shopping experience possible. This
          technology enables the encryption of sensitive information, including
          passwords and credit card numbers, during your online transactions.
          All of the forms on our site are secured so your personal information
          stays safe and out of malicious hands.
        </p>
      </section>
    </main>
  );
}
