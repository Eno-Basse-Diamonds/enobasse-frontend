import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/icons";
import { Header, Footer } from "@/components";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <section
        className="h-[90vh] lg:h-auto  min-h-screen"
        aria-labelledby="not-found-page-heading"
      >
        <header className="w-full flex flex-col items-center justify-center px-4 pt-14">
          <h1 id="error-heading" className="font-primary font-normal text-[#502B3A] text-2xl mb-2">
            Lost in Elegance?
          </h1>
          <p className="text-[#D1A559] font-light text-lg mb-6 text-center">
            It seems this page doesn&#39;t exist, but timeless beauty does.
          </p>
          <nav aria-label="Not found page navigation">
            <ul className="flex items-center justify-center gap-x-9">
              <li>
                <Link
                  href="/"
                  className="flex justify-center items-center gap-x-1.5 font-light text-base text-[#502B3A] hover:underline hover:decoration-1"
                  aria-label="Return to home page"
                >
                  Go to Home <ArrowUpRightIcon />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="flex justify-center items-center gap-x-1.5 font-light text-base text-[#502B3A] hover:underline hover:decoration-1"
                  aria-label="Continue shopping"
                >
                  Continue Shopping <ArrowUpRightIcon />
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <figure className="flex items-center justify-center mt-10">
          <Image
            src="https://res.cloudinary.com/enobasse/image/upload/v1756506783/404_otai1t.png"
            alt="Not found image"
            width={500}
            height={500}
            className="w-[90%] md:w-[60%] lg:w-[50%] h-auto"
            priority
          />
          <figcaption className="sr-only">Not found image</figcaption>
        </figure>
      </section>
      <Footer />
    </>
  );
}
