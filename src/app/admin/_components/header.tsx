import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components";

interface HeaderProps {
  title: string;
  admin: {
    name: string;
    avatar: { src: string; alt: string };
  };
}

export const Header: React.FC<HeaderProps> = ({ title, admin }) => {
  return (
    <header className="admin-header">
      <div className="admin-header__container">
        <h2 className="admin-header__title">{title}</h2>
        <div className="admin-header__actions">
          <Button
            variant="outline"
            leadingIcon={<ExternalLink />}
            href="/"
            target="_blank"
          >
            View Website
          </Button>
          <Link href="/admin/account" className="admin-header__account-link">
            <Image
              src={admin.avatar.src}
              alt={admin.avatar.alt}
              height={50}
              width={50}
              className="admin-header__avatar"
            />
            <span className="admin-header__account-link-name">
              {admin.name}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
