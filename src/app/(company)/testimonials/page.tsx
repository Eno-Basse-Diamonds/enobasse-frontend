import { Metadata } from "next";
import Image from "next/image";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read authentic stories from our clients about their Eno Bassé jewelry experiences. Discover why collectors trust our craftsmanship and service.",
  keywords: [
    "Eno Bassé reviews",
    "luxury jewelry testimonials",
    "diamond jewelry feedback",
    "client success stories",
    "fine jewelry customer experiences",
  ],
  openGraph: {
    title: "Testimonials - Eno Bassé Diamonds",
    description:
      "Real experiences from Eno Bassé collectors. See how our custom jewelry has become part of their life stories.",
    url: "https://www.enobasse.com/testimonials",
  },
  twitter: {
    title: "Testimonials - Eno Bassé Diamonds",
    description: "Hear from our clients about their bespoke jewelry journeys.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/testimonials",
  },
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      text: "My ring came more beautiful than I expected. The process was smooth and fast. Good attention to details. Great price for value.",
      name: "Maryam",
      handle: "@maryam80",
      avatar: null,
    },
    {
      id: 2,
      text: "I recently purchased beautiful diamond studs for my daughter and I must say I couldn't be happier with my experience! From start to finish, the process was seamless and enjoyable.",
      name: "Rukkayya",
      handle: "@rukkaya",
      avatar: null,
    },
    {
      id: 3,
      text: "I highly recommend Eno Bassé to anyone looking for high-quality, beautifully designed jewellery, diamond engagement rings, earrings, necklaces. Their attention to detail and commitment to customer satisfaction make them stand out",
      name: "David Udo",
      handle: "@_davidudo",
      avatar: null,
    },
    {
      id: 4,
      text: "The earrings are outstanding, the craftmanship is evident in every detail. And the packaging wow! That's a package of luxury in every sense of the word.",
      name: "Rukkayya",
      handle: "@rukkaya",
      avatar: null,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__header">
          <h1 className="testimonials__subtitle">Testimonials</h1>
          <h2 className="testimonials__title">
            Read what our customers are saying about us!
          </h2>
        </div>

        <div className="testimonials__content">
          <div className="testimonials__grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonials__card">
                <blockquote className="testimonials__card-quote">
                  <p>"{testimonial.text}"</p>
                </blockquote>
                <div className="testimonials__card-footer">
                  {testimonial.avatar ? (
                    <Image
                      className="testimonials__card-avatar"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="testimonials__card-initials">
                      <span className="testimonials__card-initial">
                        {getInitials(testimonial.name)}
                      </span>
                    </div>
                  )}
                  <div className="testimonials__card-info">
                    <div className="testimonials__card-name">
                      {testimonial.name}
                    </div>
                    <div className="testimonials__card-handle">
                      {testimonial.handle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
