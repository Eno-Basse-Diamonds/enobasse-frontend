"use client";

import Link from "next/link";
import React from "react";

import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

import { Logo } from "@/shared/components/Logo";
import { ArrowRightIcon } from "@/shared/components/icons/ArrowRight";
import { FacebookIcon } from "@/shared/components/icons/Facebook";
import { InstagramIcon } from "@/shared/components/icons/Instagram";
import { LinkedInIcon } from "@/shared/components/icons/Linkedin";
import { TiktokIcon } from "@/shared/components/icons/Tiktok";
import { XIcon } from "@/shared/components/icons/X";

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

/**
 * Site footer.
 *
 * @description Renders the full site footer including navigation link sections
 * (Company, Shop, Services, Policies), social media icons, a newsletter
 * subscription form, the logo, and copyright information.
 *
 * @param companyName - Business name for copyright (default "Eno Bassé Diamonds, LLC").
 * @param copyrightYear - Copyright year (defaults to current year).
 * @param className - Additional CSS classes.
 * @returns The site footer.
 */
export const Footer: React.FC<FooterProps> = ({
  companyName = "Eno Bassé Diamonds, LLC",
  copyrightYear = new Date().getFullYear(),
  className = "",
}) => {
  return (
    <footer className={`bg-[#D1A55933]/20 px-4 md:px-8 ${className}`} aria-label="Site footer">
      <div>
        <nav aria-label="Footer navigation">
          <div className="flex flex-row flex-wrap gap-8 justify-between py-12">
            <Navigation />
            <div className="flex flex-col flex-1 gap-y-8 items-center mb-4 lg:mb-0 lg:flex-none lg:items-start">
              <Socials />
              <Newsletter />
            </div>
          </div>
        </nav>
        <div
          className="py-8 flex items-center justify-between border-t border-secondary-200"
          role="contentinfo"
        >
          <div>
            <Logo className="-mx-9 h-6 lg:h-7" aria-hidden="true" />
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
        { label: "Sitemap", href: "/sitemap", ariaLabel: "Sitemap" },
      ],
    },
    {
      title: "Shop",
      id: "shop-heading",
      navItems: [
        {
          label: "All Products",
          href: "/products",
          ariaLabel: "All products",
        },
        {
          label: "Collections",
          href: "/collections",
          ariaLabel: "Collections",
        },
        {
          label: "Rings",
          href: "/collections/rings",
          ariaLabel: "Rings",
        },
        {
          label: "Earrings",
          href: "/collections/earrings",
          ariaLabel: "Earrings",
        },
        {
          label: "Bracelets",
          href: "/collections/bracelets",
          ariaLabel: "Bracelets",
        },
        {
          label: "Necklaces",
          href: "/collections/necklaces",
          ariaLabel: "Necklaces",
        },
      ],
    },
    {
      title: "Services",
      id: "services-heading",
      navItems: [
        {
          label: "Design Your Ring",
          href: "/creative-studio",
          ariaLabel: "Design Your Ring",
        },
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
    <div className="w-full flex flex-row lg:w-auto flex-wrap gap-y-10 gap-x-20 justify-between order-2 lg:order-1">
      {navigation.map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id} className="mb-4 text-base font-medium text-[#1B1B1D] uppercase">
            {section.title}
          </h2>
          <ul className="text-[#1B1B1D] font-light text-sm">
            {section.navItems.map((item) => (
              <li key={`${section.id}-${item.href}`} className="mb-2">
                <Link
                  href={item.href}
                  className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-px after:h-px after:w-full after:bg-[#1B1B1D] after:transition-transform after:duration-100 after:transform after:scale-x-0 after:origin-left hover:after:scale-x-100"
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
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await axios.post("/api/subscribe", { email });
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setError("You are already subscribed to our newsletter!");
      } else {
        setError("Failed to subscribe. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="newsletter-heading" className="order-2 lg:order-1">
      <h2
        id="newsletter-heading"
        className="font-medium text-center lg:text-left text-base text-[#1B1B1D] uppercase mb-1"
      >
        Subscribe to Our Newsletter
      </h2>
      <p className="font-light text-center lg:text-left text-sm text-[#1B1B1D]">
        Signup for our newsletter to stay up to date on news and events.
      </p>
      <form
        className="relative w-full mt-5 z-10"
        aria-label="Newsletter subscription"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="relative">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            className="block p-2.5 w-full text-sm text-gray-900 bg-white border border-white focus:ring-[#D1A559] focus:border-[#D1A559] focus:outline-none pr-12 rounded-l-sm"
            placeholder="Enter email address"
            required
            aria-required="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="absolute top-0 inset-e-0 p-2.5 flex items-center justify-center h-full text-sm font-medium text-white bg-[#D1A559] border border-[#D1A559] hover:bg-[#D1A559]/80 focus:ring-1 focus:outline-none focus:ring-[#D1A559]/80 rounded-r-sm"
            aria-label="Subscribe"
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <ArrowRightIcon />}
          </button>
        </div>
      </form>
      {isSuccess && <p className="mt-2 text-sm text-green-600">Thank you for subscribing!</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
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
    <nav aria-label="Social media links" className="order-2 lg:order-1">
      <div className="flex flex-row items-center justify-center gap-x-5">
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
      <span className="hidden md:block text-sm font-light text-[#1B1B1D]">
        © {year} {companyName}. All rights reserved.
      </span>
      <span className="block md:hidden text-sm font-light text-[#1B1B1D]">
        © {year} {companyName}.
      </span>
    </div>
  );
};
