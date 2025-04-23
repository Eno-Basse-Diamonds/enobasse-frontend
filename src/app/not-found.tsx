import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/icons";
import "./not-found.scss";
import { Header, Footer } from "@/components";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="not-found" aria-labelledby="not-found-page-heading">
        <header className="not-found__header">
          <h1 id="error-heading" className="not-found__title">
            Lost in Elegance?
          </h1>
          <p className="not-found__subtitle">
            It seems this page doesn&#39;t exist, but timeless beauty does.
          </p>
          <nav aria-label="Not found page navigation">
            <ul className="not-found__links">
              <li>
                <Link
                  href="/"
                  className="not-found__link"
                  aria-label="Return to home page"
                >
                  Go to Home <ArrowUpRightIcon />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="not-found__link"
                  aria-label="Continue shopping"
                >
                  Continue Shopping <ArrowUpRightIcon />
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <figure className="not-found__image-wrapper">
          <Image
            src="/images/404.png"
            alt="Not found image"
            width={500}
            height={500}
            className="not-found__image"
            priority
          />
          <figcaption className="sr-only">Not found image</figcaption>
        </figure>
      </section>
      <Footer />
    </>
  );
}
