import React from "react";
import { CalendarIcon, XIcon, FilterIcon, SearchIcon } from "~/components/icons/icons";

export interface ReportsFilterBarProps {
  dateRange?: string;
  policies?: string[];
  onDateRangeChange?: () => void;
  onPolicyRemove?: (policy: string) => void;
  onMoreFiltersClick?: () => void;
  onSearchChange?: (value: string) => void;
  className?: string;
}

export function ReportsFilterBar({
  dateRange = "Jan 6, 2022 – Jan 13, 2022",
  policies = [],
  onDateRangeChange,
  onPolicyRemove,
  onMoreFiltersClick,
  onSearchChange,
  className = "",
}: ReportsFilterBarProps) {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value);
  };

  return (
    <div className={`flex gap-4 items-start ${className}`}>
      {/* Filters */}
      <div className="flex flex-1 gap-4 items-center">
        {/* Date Picker */}
        <button
          onClick={onDateRangeChange}
          className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-lg flex gap-2 items-center justify-center px-4 py-2.5 h-10 hover:bg-[var(--color-bg-hover)] transition-colors"
        >
          <CalendarIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />
          <p className="font-medium text-[14px] leading-[20px] text-[var(--color-badge-default-text)]">{dateRange}</p>
        </button>

        {/* Policy Tags */}
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-lg flex gap-2 items-center justify-center px-4 py-2.5 h-10"
          >
            <p className="font-medium text-[14px] leading-[20px] text-[var(--color-badge-default-text)]">{policy}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPolicyRemove?.(policy);
              }}
              className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
            >
              <XIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />
            </button>
          </div>
        ))}

        {/* More Filters */}
        <button
          onClick={onMoreFiltersClick}
          className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-lg flex gap-2 items-center justify-center px-4 py-2.5 h-10 hover:bg-[var(--color-bg-hover)] transition-colors"
        >
          <FilterIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />
          <p className="font-medium text-[14px] leading-[20px] text-[var(--color-badge-default-text)]">More filters</p>
        </button>
      </div>

      {/* Search */}
      <div className="h-11 w-80">
        <div className="bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] rounded-lg flex gap-2 items-center px-3.5 py-2.5 h-full">
          <SearchIcon className="w-5 h-5" stroke="var(--color-text-tertiary)" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            className="flex-1 border-0 outline-0 font-normal text-[16px] leading-[24px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

