import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { getUserInitials } from "@/lib/utils/string";
import { Button } from "@/components/button";

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
    <header className="bg-white shadow-sm border-b border-primary-500/10 px-4 sm:px-8 py-4 sm:py-5 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <h2 className="font-primary text-lg sm:text-2xl font-semibold text-primary-500 truncate">
          {title}
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
          <Button
            variant="outline"
            leadingIcon={<ExternalLink className="w-4 h-4" />}
            href="/"
            target="_blank"
            className="text-xs sm:text-sm px-2 sm:px-4"
          >
            <span className="hidden sm:inline">View Website</span>
            <span className="sm:hidden">Site</span>
          </Button>
          <Link href="/admin/settings" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium shrink-0">
              {initials}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-primary-500 font-medium text-sm truncate max-w-[120px]">{admin.name}</span>
              <span className="text-primary-300 text-xs truncate max-w-[120px]">{admin.email}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
