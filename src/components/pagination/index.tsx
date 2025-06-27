import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import "./styles.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hrefBuilder?: (page: number) => string;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hrefBuilder,
  onPageChange,
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
        page={currentPage - 1}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        direction="prev"
        href={hrefBuilder?.(currentPage - 1) ?? "#"}
        onPageChange={onPageChange}
      />

      {/* First Page + Ellipsis */}
      {startPage > 1 && (
        <>
          <PaginationButton
            page={1}
            active={1 === currentPage}
            href={hrefBuilder?.(1) ?? "#"}
            onPageChange={onPageChange}
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
          page={page}
          active={page === currentPage}
          href={hrefBuilder?.(page) ?? "#"}
          onPageChange={onPageChange}
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
            page={totalPages}
            active={totalPages === currentPage}
            href={hrefBuilder?.(totalPages) ?? "#"}
            onPageChange={onPageChange}
          >
            {totalPages}
          </PaginationButton>
        </>
      )}

      {/* Next Button */}
      <PaginationButton
        page={currentPage + 1}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        direction="next"
        href={hrefBuilder?.(currentPage + 1) ?? "#"}
        onPageChange={onPageChange}
      />
    </nav>
  );
};

interface PaginationButtonProps {
  page: number;
  href: string;
  children?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  direction?: "prev" | "next";
  onPageChange?: (page: number) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  page,
  href,
  children,
  active = false,
  disabled = false,
  "aria-label": ariaLabel,
  direction,
  onPageChange,
}) => {
  const baseClass = "pagination__button";
  const modifierClasses = [
    active && `${baseClass}--active`,
    disabled && `${baseClass}--disabled`,
    direction && `${baseClass}--${direction}`,
  ].filter(Boolean);

  const className = [baseClass, ...modifierClasses].join(" ");

  if (disabled) {
    return (
      <span className={className} aria-label={ariaLabel} aria-disabled="true">
        {direction === "prev" && (
          <ChevronLeftIcon className="pagination__icon" />
        )}
        {direction === "next" && (
          <ChevronRightIcon className="pagination__icon" />
        )}
        {!direction && children}
      </span>
    );
  }

  if (onPageChange) {
    return (
      <button
        type="button"
        className={className}
        aria-current={active ? "page" : undefined}
        aria-label={ariaLabel}
        onClick={() => onPageChange(page)}
        disabled={disabled}
      >
        {direction === "prev" && <ChevronLeftIcon className="pagination__icon" />}
        {direction === "next" && <ChevronRightIcon className="pagination__icon" />}
        {!direction && children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      passHref
      className={className}
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel}
    >
      {direction === "prev" && <ChevronLeftIcon className="pagination__icon" />}
      {direction === "next" && <ChevronRightIcon className="pagination__icon" />}
      {!direction && children}
    </Link>
  );
};
