import Link from "next/link";
import { HomeIcon, ChevronRightIcon } from "../icons";
import "./styles.scss";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link href="/" className="breadcrumb__link breadcrumb__link--home">
            <HomeIcon />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="breadcrumb__item">
            <ChevronRightIcon className="breadcrumb__separator" />
            {index === items.length - 1 ? (
              <span className="breadcrumb__current">{item.label}</span>
            ) : (
              <Link href={item.href} className="breadcrumb__link">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
