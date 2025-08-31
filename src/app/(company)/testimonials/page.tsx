import { Metadata } from "next";
import Image from "next/image";

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
    <div className="pt-12 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-lg font-semibold leading-8 tracking-tight text-secondary-500">
            Testimonials
          </h1>
          <h2 className="mt-2 text-3xl md:text-4xl font-primary font-semibold tracking-tight text-primary-500">
            Read what our customers are saying about us!
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-8 text-sm leading-6 flex flex-col h-full"
              >
                <blockquote className="text-primary-500 flex-grow">
                  <p>"{testimonial.text}"</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-x-4">
                  {testimonial.avatar ? (
                    <Image
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                      <span className="text-sm font-medium text-primary-500">
                        {getInitials(testimonial.name)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-primary-500">
                      {testimonial.name}
                    </div>
                    <div className="text-primary-400">{testimonial.handle}</div>
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
