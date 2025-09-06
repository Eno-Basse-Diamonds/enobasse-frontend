import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components";
import { getUserInitials } from "@/lib/utils/string";

interface HeaderProps {
  title: string;
  admin: {
    name: string;
    email: string;
  };
}

export const AdminHeader: React.FC<HeaderProps> = ({ title, admin }) => {
  const initials = getUserInitials(admin.name);

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
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="text-primary-500 font-medium text-sm">{admin.name}</span>
              <span className="text-primary-300 text-xs">{admin.email}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
