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
    <header className="bg-white shadow-sm border-b border-primary-500/10 px-8 py-5 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <h2 className="font-primary text-2xl font-semibold text-primary-500">
          {title}
        </h2>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            leadingIcon={<ExternalLink />}
            href="/"
            target="_blank"
          >
            View Website
          </Button>
          <Link href="/admin/account" className="flex items-center space-x-3">
            <Image
              src={admin.avatar.src}
              alt={admin.avatar.alt}
              height={50}
              width={50}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-primary-500 font-medium">{admin.name}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
