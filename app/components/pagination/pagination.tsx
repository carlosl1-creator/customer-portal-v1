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
      className={`flex items-center justify-between border-t border-[#e9eaeb] pt-3 pb-4 px-6 ${className}`}
    >
      <div className="flex gap-3 items-start">
        <button
          onClick={onPrevious}
          disabled={isFirstPage}
          className={`bg-white border border-[#d5d7da] rounded-[8px] px-3.5 py-2 flex items-center justify-center ${
            isFirstPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-neutral-50 transition-colors cursor-pointer"
          }`}
        >
          <p className="font-semibold text-[14px] leading-[20px] text-[#414651]">
            Previous
          </p>
        </button>
        <button
          onClick={onNext}
          disabled={isLastPage}
          className={`bg-white border border-[#d5d7da] rounded-[8px] px-3.5 py-2 flex items-center justify-center ${
            isLastPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-neutral-50 transition-colors cursor-pointer"
          }`}
        >
          <p className="font-semibold text-[14px] leading-[20px] text-[#414651]">
            Next
          </p>
        </button>
      </div>
      <p className="font-medium text-[14px] leading-[20px] text-[#414651]">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

