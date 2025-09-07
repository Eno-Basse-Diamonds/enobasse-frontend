import Link from "next/link";
import { HomeIcon } from "../icons/home";
import { ChevronRightIcon } from "../icons/chevron-right";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex justify-center" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 text-[#502B3A] text-base sm:text-lg">
        <li className="flex items-center truncate overflow-hidden">
          <Link
            href="/"
            className="inline-flex items-center font-normal text-[#502B3A] hover:text-[#D1A559] transition-colors ml-1 md:ml-2 truncate"
          >
            <HomeIcon />
          </Link>
        </li>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center truncate overflow-hidden"
          >
            <ChevronRightIcon className="h-4 w-4" />
            {index === items.length - 1 ? (
              <span className="ml-1 font-normal text-[#502B3A] md:ml-2">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="font-normal text-[#502B3A] hover:text-[#D1A559] transition-colors ml-1 md:ml-2 truncate"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
