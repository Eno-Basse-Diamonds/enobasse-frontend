"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "../logo";
import {
  ArrowRightIcon,
  FacebookIcon,
  XIcon,
  TiktokIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons";
import "./styles.scss";

interface NavItem {
  label: string;
  href: string;
  ariaLabel: string;
}

interface NavSection {
  title: string;
  id: string;
  navItems: NavItem[];
}

interface FooterProps {
  companyName?: string;
  copyrightYear?: number;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  companyName = "EnoBasse, LLC",
  copyrightYear = new Date().getFullYear(),
  className = "",
}) => {
  return (
    <footer className={`footer ${className}`} aria-label="Site footer">
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
            <Logo className="footer__logo" aria-hidden="true" />
          </div>
          <Copyright companyName={companyName} year={copyrightYear} />
        </div>
      </div>
    </footer>
  );
};

const Navigation: React.FC = () => {
  const navigation: NavSection[] = [
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
          label: "Ring Resizing",
          href: "/ring-resizing",
          ariaLabel: "Ring resizing",
        },
        {
          label: "Maintenance/Repairs",
          href: "/maintenance-repairs",
          ariaLabel: "Maintenance and repairs",
        },
      ],
    },
    {
      title: "Policies",
      id: "policies-heading",
      navItems: [
        {
          label: "Shipping & Return Policy",
          href: "/shipping-and-return-policy",
          ariaLabel: "Shipping and return policy",
        },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
          ariaLabel: "Privacy policy",
        },
        {
          label: "Terms and Conditions",
          href: "/terms-and-conditions",
          ariaLabel: "Terms and Conditions",
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
              <li
                key={`${section.id}-${item.href}`}
                className="footer__navigation-link-item"
              >
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
};

const Newsletter: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

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
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="footer__newsletter-form-group">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="footer__newsletter-form-button"
            aria-label="Subscribe"
            disabled={isSubmitting || !email}
          >
            <ArrowRightIcon />
          </button>
        </div>
        {isSuccess && (
          <p className="footer__newsletter-success" role="alert">
            Thank you for subscribing!
          </p>
        )}
      </form>
    </section>
  );
};

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

const Socials: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: <FacebookIcon />,
      href: "https://www.facebook.com/eno.basse",
      ariaLabel: "Link to Enobasse Facebook account",
    },
    {
      icon: <InstagramIcon />,
      href: "https://www.instagram.com/eno.basse",
      ariaLabel: "Link to Enobasse Instagram account",
    },
    {
      icon: <XIcon />,
      href: "https://x.com/EnoBasseDiamond",
      ariaLabel: "Link to Enobasse X account",
    },
    {
      icon: <LinkedInIcon />,
      href: "https://www.linkedin.com/in/eno-bass%C3%A9-diamonds-650b60299/",
      ariaLabel: "Link to Enobasse LinkedIn account",
    },
    {
      icon: <TiktokIcon />,
      href: "https://www.tiktok.com/@eno.basse.diamonds",
      ariaLabel: "Link to Enobasse TikTok account",
    },
  ];

  return (
    <nav aria-label="Social media links">
      <div className="footer__socials">
        {socialLinks.map((link, index) => (
          <a
            key={`social-${index}`}
            href={link.href}
            aria-label={link.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

interface CopyrightProps {
  companyName: string;
  year: number;
}

const Copyright: React.FC<CopyrightProps> = ({ companyName, year }) => {
  return (
    <div>
      <span className="footer__copyright-text--desktop">
        © {year} {companyName}. All rights reserved.
      </span>
      <span className="footer__copyright-text--mobile">
        © {year} {companyName}.
      </span>
    </div>
  );
};
