import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  className = "",
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div
      className={`flex items-center justify-between border-t border-theme-primary pt-3 pb-4 px-6 ${className}`}
    >
      <div className="flex gap-3 items-start">
        <button
          onClick={onPrevious}
          disabled={isFirstPage}
          className={`bg-theme-card border border-theme-secondary rounded-[8px] px-3.5 py-2 flex items-center justify-center ${
            isFirstPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-theme-hover transition-colors cursor-pointer"
          }`}
        >
          <p className="font-semibold text-[14px] leading-[20px] text-theme-secondary">
            Previous
          </p>
        </button>
        <button
          onClick={onNext}
          disabled={isLastPage}
          className={`bg-theme-card border border-theme-secondary rounded-[8px] px-3.5 py-2 flex items-center justify-center ${
            isLastPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-theme-hover transition-colors cursor-pointer"
          }`}
        >
          <p className="font-semibold text-[14px] leading-[20px] text-theme-secondary">
            Next
          </p>
        </button>
      </div>
      <p className="font-medium text-[14px] leading-[20px] text-theme-secondary">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}
