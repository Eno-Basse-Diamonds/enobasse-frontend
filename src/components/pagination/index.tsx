import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

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
    <nav
      className="flex items-center justify-center gap-1 sm:gap-2"
      aria-label="Pagination"
    >
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
          {startPage > 2 && (
            <span className="px-1 sm:px-2 text-[#502B3A]">...</span>
          )}
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
            <span className="px-1 sm:px-2 text-[#502B3A]">...</span>
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
  const baseClasses =
    "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-200 border text-[#502B3A] border-[#502B3A]/20 hover:bg-[#D1A559]/10 hover:border-[#D1A559]/40";
  const activeClasses = active
    ? "bg-[#502B3A] text-white hover:bg-[#502B3A] border-[#502B3A]"
    : "";
  const disabledClasses = disabled
    ? "opacity-40 cursor-not-allowed border border-gray-400 text-gray-500"
    : "";

  const className = `${baseClasses} ${activeClasses} ${disabledClasses}`;

  if (disabled) {
    return (
      <span className={className} aria-label={ariaLabel} aria-disabled="true">
        {direction === "prev" && (
          <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
        {direction === "next" && (
          <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
        {direction === "prev" && (
          <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
        {direction === "next" && (
          <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
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
      {direction === "prev" && (
        <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
      {direction === "next" && (
        <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
      {!direction && children}
    </Link>
  );
};
