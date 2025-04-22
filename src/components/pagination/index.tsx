import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import "./styles.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hrefBuilder?: (page: number) => string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hrefBuilder,
}) => {
  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav className="pagination" aria-label="Pagination">
      {/* Previous Button */}
      <PaginationButton
        href={hrefBuilder?.(currentPage - 1) ?? "#"}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        direction="prev"
      />

      {/* First Page + Ellipsis */}
      {startPage > 1 && (
        <>
          <PaginationButton
            href={hrefBuilder?.(1) ?? "#"}
            active={1 === currentPage}
          >
            1
          </PaginationButton>
          {startPage > 2 && <span className="pagination__ellipsis">...</span>}
        </>
      )}

      {/* Visible Page Numbers */}
      {pages.map((page) => (
        <PaginationButton
          key={page}
          href={hrefBuilder?.(page) ?? "#"}
          active={page === currentPage}
        >
          {page}
        </PaginationButton>
      ))}

      {/* Last Page + Ellipsis */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="pagination__ellipsis">...</span>
          )}
          <PaginationButton
            href={hrefBuilder?.(totalPages) ?? "#"}
            active={totalPages === currentPage}
          >
            {totalPages}
          </PaginationButton>
        </>
      )}

      {/* Next Button */}
      <PaginationButton
        href={hrefBuilder?.(currentPage + 1) ?? "#"}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        direction="next"
      />
    </nav>
  );
};

interface PaginationButtonProps {
  href: string;
  children?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  direction?: "prev" | "next";
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  href,
  children,
  active = false,
  disabled = false,
  "aria-label": ariaLabel,
  direction,
}) => {
  const baseClass = "pagination__button";
  const modifierClasses = {
    "--active": active,
    "--disabled": disabled,
    "--prev": direction === "prev",
    "--next": direction === "next",
  };

  const className = Object.entries(modifierClasses)
    .filter(([_, condition]) => condition)
    .map(([modifier]) => `${baseClass}${modifier}`)
    .join(" ");

  return (
    <Link
      href={disabled ? "#" : href}
      passHref
      className={`${baseClass} ${className}`}
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
    >
      {direction === "prev" && <ChevronLeftIcon className="pagination__icon" />}
      {direction === "next" && (
        <ChevronRightIcon className="pagination__icon" />
      )}
      {!direction && children}
    </Link>
  );
};
