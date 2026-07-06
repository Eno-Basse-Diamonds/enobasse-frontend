"use client";

import { FacebookIcon } from "../icons/facebook";
import { InstagramIcon } from "../icons/instagram";
import { XIcon } from "../icons/x";
import { LinkedInIcon } from "../icons/linkedin";
import { TiktokIcon } from "../icons/tiktok";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

export const Socials: React.FC = () => {
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
      <div className="flex flex-row items-center justify-center gap-x-8">
        {socialLinks.map((link, index) => (
          <a
            key={`social-${index}`}
            href={link.href}
            aria-label={link.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};
