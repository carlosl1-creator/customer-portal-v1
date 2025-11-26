import React from "react";
import { ChevronDownIcon, SearchIcon } from "~/components/icons/icons";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterBarProps {
  turnLengthOptions?: FilterOption[];
  categoryOptions?: FilterOption[];
  selectedTurnLength?: string;
  selectedCategory?: string;
  searchValue?: string;
  onTurnLengthChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  onMoreFiltersClick?: () => void;
  className?: string;
}

export function FilterBar({
  turnLengthOptions = [],
  categoryOptions = [],
  selectedTurnLength,
  selectedCategory,
  searchValue = "",
  onTurnLengthChange,
  onCategoryChange,
  onSearchChange,
  onMoreFiltersClick,
  className = "",
}: FilterBarProps) {
  return (
    <div className={`flex gap-4 items-start rounded-[8px] ${className}`}>
      <div className="flex flex-1 gap-3 items-center">
        {/* Turn Length Dropdown */}
        <button
          onClick={() => onTurnLengthChange?.("")}
          className="bg-[var(--color-bg-card)] border border-[var(--color-border-secondary)] rounded-[8px] px-4 py-2.5 flex items-center gap-2 hover:bg-[var(--color-bg-hover)] transition-colors"
        >
          <span className="font-semibold text-[14px] leading-[20px] text-[var(--color-badge-default-text)]">
            {selectedTurnLength || "Turn Length"}
          </span>
          <ChevronDownIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />
        </button>

        {/* Category Dropdown */}
        <button
          onClick={() => onCategoryChange?.("")}
          className="bg-[var(--color-bg-card)] border border-[var(--color-border-secondary)] rounded-[8px] px-4 py-2.5 flex items-center gap-2 hover:bg-[var(--color-bg-hover)] transition-colors"
        >
          <span className="font-semibold text-[14px] leading-[20px] text-[var(--color-badge-default-text)]">
            {selectedCategory || "Category"}
          </span>
          <ChevronDownIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />
        </button>

        {/* More Filters Button */}
        <button
          onClick={onMoreFiltersClick}
          className="bg-[var(--color-bg-card)] border border-[var(--color-border-secondary)] rounded-[8px] px-4 py-2.5 flex items-center gap-2 hover:bg-[var(--color-bg-hover)] transition-colors"
        >
          <span className="font-semibold text-[14px] leading-[20px] text-[var(--color-badge-default-text)]">
            More Filters
          </span>
          <ChevronDownIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-[320px]">
        <div className="bg-[var(--color-bg-input)] border border-[var(--color-border-secondary)] rounded-[8px] flex items-center gap-2 px-3.5 py-2.5">
          <SearchIcon className="w-5 h-5" stroke="var(--color-text-tertiary)" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-1 font-normal text-[16px] leading-[24px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none border-0 bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

