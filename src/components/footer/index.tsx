import Link from "next/link";
import { Logo } from "../logo";
import {
  ArrowRightIcon,
  FacebookIcon,
  XIcon,
  TiktokIcon,
  InstagramIcon,
} from "../icons";
import "./styles.scss";

export function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div>
        <nav aria-label="Footer navigation">
          <div className="footer__container">
            <Navigation />
            <div className="footer__socials-and-newsletter">
              <Socials />
              <Newsletter />
            </div>
          </div>
        </nav>
        <div className="footer__logo-and-copyright" role="contentinfo">
          <div>
            <Logo className="footer__logo" />
          </div>
          <Copyright />
        </div>
      </div>
    </footer>
  );
}

function Navigation() {
  const navigation = [
    {
      title: "Company",
      id: "company-heading",
      navItems: [
        { label: "About Us", href: "/about", ariaLabel: "About us" },
        { label: "Contact Us", href: "/contact", ariaLabel: "Contact us" },
        { label: "Our Blog", href: "/blog", ariaLabel: "Our blog" },
        { label: "FAQs", href: "/faqs", ariaLabel: "FAQs" },
        {
          label: "Testimonials",
          href: "/testimonials",
          ariaLabel: "Testimonials",
        },
        { label: "Sitemaps", href: "/sitemaps", ariaLabel: "Sitemaps" },
      ],
    },
    {
      title: "Services/Education",
      id: "services-heading",
      navItems: [
        {
          label: "Custom Design",
          href: "/custom-design",
          ariaLabel: "Custom design",
        },
        {
          label: "Jewellery Education",
          href: "/jewellery-education",
          ariaLabel: "Jewellery education",
        },
        {
          label: "Gemstone Education",
          href: "/gemstone-education",
          ariaLabel: "Gemstone education",
        },
        {
          label: "Ring Resizing",
          href: "/ring-resizing",
          ariaLabel: "Ring resizing",
        },
        {
          label: "Maintenance/Repairs",
          href: "/maintenance-repairs",
          ariaLabel: "Maintenance and repairs",
        },
        { label: "Financing", href: "/financing", ariaLabel: "Financing" },
      ],
    },
    {
      title: "Policies",
      id: "policies-heading",
      navItems: [
        {
          label: "Shipping & Return Policy",
          href: "/shipping-and-return",
          ariaLabel: "Shipping and return policy",
        },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
          ariaLabel: "Privacy policy",
        },
        {
          label: "Terms of Service",
          href: "/terms-of-service",
          ariaLabel: "Terms of service",
        },
        {
          label: "Shipping & Warranty",
          href: "/shipping-and-warranty",
          ariaLabel: "Shipping and warranty",
        },
      ],
    },
  ];

  return (
    <div className="footer__navigation">
      {navigation.map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id} className="footer__navigation-title">
            {section.title}
          </h2>
          <ul className="footer__navigation-links">
            {section.navItems.map((item) => (
              <li key={item.href} className="footer__navigation-link-item">
                <Link
                  href={item.href}
                  className="footer__navigation-link"
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Newsletter() {
  return (
    <section aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="footer__newsletter-heading">
        Subscribe to Our Newsletter
      </h2>
      <p className="footer__newsletter-subheading">
        Signup for our newsletter to stay up to date on news and events.
      </p>
      <form
        className="footer__newsletter-form"
        aria-label="Newsletter subscription"
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="footer__newsletter-form-input"
          placeholder="Enter email address"
          required
          aria-required="true"
        />
        <button
          type="submit"
          className="footer__newsletter-form-button"
          aria-label="Subscribe"
        >
          <ArrowRightIcon />
        </button>
      </form>
    </section>
  );
}

function Socials() {
  return (
    <nav aria-label="Social media links">
      <div className="footer__socials">
        <Link href="#" aria-label="Facebook">
          <FacebookIcon />
        </Link>
        <Link href="#" aria-label="Instagram">
          <InstagramIcon />
        </Link>
        <Link href="#" aria-label="Twitter">
          <XIcon />
        </Link>
        <Link href="#" aria-label="TikTok">
          <TiktokIcon />
        </Link>
      </div>
    </nav>
  );
}

function Copyright() {
  return (
    <div>
      <span className="footer__copyright-text--desktop">
        © 2025 EnoBasse, LLC. All rights reserved.
      </span>
      <span className="footer__copyright-mobile">© 2025 EnoBasse, LLC.</span>
    </div>
  );
}
