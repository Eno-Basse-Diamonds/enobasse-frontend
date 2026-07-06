"use client";

import Link from "next/link";
import { Logo } from "../logo";

interface LogoLinkProps {
  href: string;
}

export const LogoLink: React.FC<LogoLinkProps> = ({ href }) => (
  <h1 className="header__logo">
    <Link href={href} aria-label="Home">
      <Logo />
    </Link>
  </h1>
);
