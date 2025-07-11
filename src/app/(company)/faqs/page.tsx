import { Metadata } from "next";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
};

export default async function FAQsPage() {
  const faqs = [
    {
      question: "Do you ship internationally?",
      answer:
        "We are proud to offer our unique and extraordinary pieces to the world. All of our orders are shipped through GIG, fully insured. Your package is handled with the utmost care throughout the shipping process and delivery is guaranteed. Clients can work with GIG to clear the package through customs and process any duties directly with them.",
    },
    {
      question: "What are your shipping terms and do you offer insurance?",
      answer:
        "All packages are shipped and fully insured through GIG. As always your shipping charges are free! Shipments are one hundred percent guaranteed and risk-free. Packages must be signed for at time of delivery.",
    },
    {
      question: "Do you offer fraud protection?",
      answer:
        "We are very careful with all shipments and each and every package must go through a series of fraud protection initiatives before the package is sent out. We only ship to the billing address associated with your credit card. Clients that can not sign for and receive their package at their billing address can choose to pick up their package at their closest GIG location. Clients paying via bank wire transfer can choose to ship the package anywhere. Wire transfer payments are eligible for shipment to any address.",
    },
    {
      question: "Do you charge tax for international orders?",
      answer:
        "Value added tax (VAT) is charged to all international clients by your local customs or duties office. VAT charges are based on the location of the recipient. Please contact your local GIG office to find out the exact rate charged at the time of delivery.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept payments by all major credit cards such as Visa or Master Card. We also accept payment by wire/bank transfer. Our preferred method of payment for all international clients is wire/bank transfer. It is the easiest and quickest form of payment.",
    },
    {
      question: "Do you provide certification for your diamonds?",
      answer:
        "A full detailed Appraisal Certificate will accompany each and every item purchased from Eno Basse.",
    },
    {
      question: "What is your return policy?",
      answer:
        "All sales are final. Once an item has been shipped and delivered to the customer, it CANNOT BE RETURNED, EXCHANGED, or REFUNDED. We strongly recommend carefully reviewing product details before completing your purchase. If there is an issue with your order (e.g., damage or incorrect item), please contact us within 24 hours of delivery with supporting evidence (photos/videos) for resolution.",
    },
    {
      question: "Do you do custom orders and how does the process work?",
      answer:
        "We specialize in custom pieces and can create any piece to your desired specifications. Our professional design consultants are available to guide you step by step in order to achieve your dream ring. Our custom pieces generally take 4 weeks for completion but can be expedited. Select pieces may take longer.",
    },
    {
      question: "Are your diamonds natural or lab grown?",
      answer:
        "We now proudly offer both lab-grown and natural earth-mined diamonds. Any of our designs with a larger center stone will come with a diamond certificate from a gemological company, like the world renowned GIA, certifying its specifications.",
    },
  ];

  return (
    <div className="faqs-page">
      <div className="faqs-page__container">
        <div className="faqs-page__header">
          <h1 className="faqs-page__title">Frequently Asked Questions</h1>
          <p className="faqs-page__description">
            Get answers to all your questions about luxury jewelry at Eno Basse.
            Explore our FAQ page for details on products, services, shipping,
            and more.
          </p>
        </div>

        <div className="faqs-page__grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faqs-page__item">
              <h3 className="faqs-page__question">{faq.question}</h3>
              <p className="faqs-page__answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
