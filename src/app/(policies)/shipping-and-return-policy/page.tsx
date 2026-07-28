import { Metadata } from "next";

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
    url: "https://enobasse.com/shipping-and-return-policy",
  },
  twitter: {
    title: "Shipping & Purchase Policy - Eno Bassé Fine Jewelry",
    description:
      "Learn about our final sale policy, complimentary shipping, and lifetime craftsmanship guarantee for all Eno Bassé jewelry pieces.",
  },
  alternates: {
    canonical: "https://enobasse.com/shipping-and-return-policy",
  },
};

export default function shippingPage() {
  return (
    <main className="shipping">
      <h1 className="shipping__title">Shipping & Return Policy</h1>

      <p className="shipping__paragraph text-center max-w-2xl mx-auto mb-12">
        At Eno Bassé Diamonds, every piece is crafted and handled with the utmost care. Our policies
        are designed to ensure a seamless experience while preserving the integrity of our
        craftsmanship.
      </p>

      <section className="shipping__section">
        <h2 className="shipping__heading">Delivery Timelines</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Lagos Deliveries (Ready Pieces):</h3>
            <p className="shipping__paragraph">
              Orders of in-store items are dispatched within 48 hours of confirmation, with same-day
              delivery where possible. Delivery timelines exclude weekends and public holidays.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Outside Lagos (Ready Pieces):</h3>
            <p className="shipping__paragraph">Orders are delivered within 3–5 working days.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Custom Orders:</h3>
            <p className="shipping__paragraph">
              Bespoke pieces require 4–5 weeks for design, production, and delivery. For clients
              requiring an accelerated timeline, an express service is available. Express orders are
              completed within 2 weeks, subject to design approval and material availability, and
              attract an additional fee.
            </p>
          </div>
        </div>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Quality Assurance & Returns</h2>
        <p className="shipping__paragraph">
          Every Eno Bassé piece undergoes a meticulous quality-control process before leaving our
          atelier. In the unlikely event a client observes an issue:
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-primary-400">
          <li>Our team must be notified within 24 hours of delivery.</li>
          <li>
            The piece must be returned in pristine, unworn condition, accompanied by its original
            packaging, certificates, and accessories.
          </li>
          <li>
            Upon receipt, our artisans will assess and resolve the concern within 1–2 weeks,
            depending on the complexity.
          </li>
          <li>
            Eno Bassé Diamonds reserves the right to determine the most suitable resolution,
            including repair or replacement.
          </li>
        </ul>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Refunds</h2>
        <p className="shipping__paragraph">
          Refunds apply exclusively to ready pieces purchased from our in-store collection and only
          when our team confirms that a resolution cannot be achieved after assessment. Approved
          refunds are processed within 7 working days to the original payment account.
        </p>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Custom Orders:</h3>
          <p className="shipping__paragraph">
            Bespoke designs are created uniquely for each client and are therefore not eligible for
            full refunds. Where cancellations are exceptionally approved, 80% of the order value
            will be refunded. The remaining 20% is non-refundable, covering design development,
            craftsmanship, and material commitments already undertaken. Once production has
            commenced, cancellations or refunds may no longer be possible.
          </p>
        </div>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Additional Notes</h2>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-primary-400">
          <li>
            Delivery timelines may shift due to courier schedules or unforeseen circumstances.
          </li>
          <li>Items returned without prior authorization will not be accepted.</li>
          <li>
            By completing a purchase with Eno Bassé Diamonds, clients acknowledge and agree to these
            terms.
          </li>
        </ul>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Lifetime Warranty</h2>
        <p className="shipping__paragraph">
          At Eno Bassé we are committed to a superior quality standard. Each piece is handcrafted
          and quality inspected before shipment. We take pride in our standard for diamond quality
          and skilled craftsmanship. We are pleased to offer a three-month warranty against any
          manufacturing defects and a lifetime warranty on the precious metal and diamond
          authenticity. Free lifetime in-store cleaning and inspection are always available. We
          recommend having your piece deep cleaned and refinished once every year to two years
          depending on wear. We do offer this service at a nominal fee. Shipping and insurance are
          extra.
        </p>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Insuring Your Jewelry</h2>
        <p className="shipping__paragraph">
          Eno Bassé recommends independently insuring the ring with your homeowner's or renter's
          insurance against loss, theft, or damage. There are also specialty jewelry insurance
          companies, like Jeweler's Mutual, that will insure all exquisite Eno Bassé pieces.
        </p>
      </section>

      <section className="shipping__section shipping__section--spaced">
        <h2 className="shipping__heading">Keeping your info safe</h2>
        <p className="shipping__paragraph">
          Enobasse.com uses the most current encryption technology to provide you with the safest,
          most secure shopping experience possible. This technology enables the encryption of
          sensitive information, including passwords and credit card numbers, during your online
          transactions. All of the forms on our site are secured so your personal information stays
          safe and out of malicious hands.
        </p>
      </section>
    </main>
  );
}
