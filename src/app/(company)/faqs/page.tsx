import { Metadata } from "next";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
};

export default async function FAQsPage() {
  const faqs = [
    {
      question: "Do you ship internationally?",
      answer:
        "We are proud to offer our unique and extraordinary pieces to the world. All of our international orders are shipped through DHL, fully insured. Orders outside Nigeria are generally delivered within 3–5 working days. Your package is handled with the utmost care throughout the shipping process and delivery is guaranteed. Clients can work with DHL to clear the package through customs and process any duties directly with them.",
    },
    {
      question: "What are your shipping terms and do you offer insurance?",
      answer:
        "All packages are shipped and fully insured. We use GIG for local deliveries and DHL for international shipments. As always your shipping charges are free! Shipments are one hundred percent guaranteed and risk-free. Packages must be signed for at time of delivery.",
    },
    {
      question: "Do you offer fraud protection?",
      answer:
        "We are very careful with all shipments and each and every package must go through a series of fraud protection initiatives before the package is sent out. We only ship to the billing address associated with your credit card. Clients that can not sign for and receive their package at their billing address can choose to pick up their package at their closest GIG (local) or DHL (international) location. Clients paying via bank wire transfer can choose to ship the package anywhere. Wire transfer payments are eligible for shipment to any address.",
    },
    {
      question: "Do you charge tax for international orders?",
      answer:
        "Value added tax (VAT) is charged to all international clients by your local customs or duties office. VAT charges are based on the location of the recipient. Please contact your local DHL office to find out the exact rate charged at the time of delivery.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept payments by all major credit cards such as Visa or Master Card. We also accept payment by wire/bank transfer. Our preferred method of payment for all international clients is wire/bank transfer. It is the easiest and quickest form of payment.",
    },
    {
      question: "Do you provide certification for your diamonds?",
      answer:
        "A full detailed Appraisal Certificate will accompany each and every item purchased from Eno Bassé.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Every Eno Bassé piece undergoes a meticulous quality-control process. In the unlikely event of an issue, our team must be notified within 24 hours of delivery. The piece must be returned in pristine, unworn condition with original packaging. Refunds apply exclusively to ready pieces purchased from our in-store collection when a resolution cannot be achieved. Approved refunds are processed within 7 working days.",
    },
    {
      question: "Do you do custom orders and how does the process work?",
      answer:
        "We specialize in custom pieces and can create any piece to your desired specifications. Bespoke pieces require 4–5 weeks for design, production, and delivery. An express service is available (2 weeks) for an additional fee. Custom orders are not eligible for full refunds; however, if cancelled exceptionally, 80% may be refunded (20% is non-refundable). Once production has commenced, cancellations or refunds may no longer be possible.",
    },
    {
      question: "Are your diamonds natural or lab grown?",
      answer:
        "We now proudly offer both lab-grown and natural earth-mined diamonds. Any of our designs with a larger center stone will come with a diamond certificate from a gemological company, like the world renowned GIA, certifying its specifications.",
    },
  ];

  return (
    <div className="min-h-screen pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://enobasse.com" },
          { name: "FAQs", item: "https://enobasse.com/faqs" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-primary text-3xl md:text-4xl font-semibold text-primary-500 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-primary-400 max-w-3xl mx-auto leading-relaxed">
            Get answers to all your questions about luxury jewelry at Eno Bassé.
            Explore our FAQ page for details on products, services, shipping,
            and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-primary text-lg font-semibold text-primary-500 leading-tight">
                {faq.question}
              </h3>
              <p className="text-primary-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
