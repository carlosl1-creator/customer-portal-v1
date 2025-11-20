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
          className="bg-white border border-[#d5d7da] rounded-[8px] px-4 py-2.5 flex items-center gap-2 hover:bg-neutral-50 transition-colors"
        >
          <span className="font-semibold text-[14px] leading-[20px] text-[#414651]">
            {selectedTurnLength || "Turn Length"}
          </span>
          <ChevronDownIcon className="w-5 h-5" stroke="#414651" />
        </button>

        {/* Category Dropdown */}
        <button
          onClick={() => onCategoryChange?.("")}
          className="bg-white border border-[#d5d7da] rounded-[8px] px-4 py-2.5 flex items-center gap-2 hover:bg-neutral-50 transition-colors"
        >
          <span className="font-semibold text-[14px] leading-[20px] text-[#414651]">
            {selectedCategory || "Category"}
          </span>
          <ChevronDownIcon className="w-5 h-5" stroke="#414651" />
        </button>

        {/* More Filters Button */}
        <button
          onClick={onMoreFiltersClick}
          className="bg-white border border-[#d5d7da] rounded-[8px] px-4 py-2.5 flex items-center gap-2 hover:bg-neutral-50 transition-colors"
        >
          <span className="font-semibold text-[14px] leading-[20px] text-[#414651]">
            More Filters
          </span>
          <ChevronDownIcon className="w-5 h-5" stroke="#414651" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-[320px]">
        <div className="bg-white border border-[#d5d7da] rounded-[8px] flex items-center gap-2 px-3.5 py-2.5">
          <SearchIcon className="w-5 h-5" stroke="#717680" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-1 font-normal text-[16px] leading-[24px] text-[#717680] placeholder:text-[#717680] outline-none border-0 bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

