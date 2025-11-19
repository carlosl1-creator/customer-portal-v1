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
          className="bg-white border border-[#e9eaeb] rounded-lg flex gap-2 items-center justify-center px-4 py-2.5 h-10 hover:opacity-80 transition-opacity"
        >
          <CalendarIcon className="w-5 h-5" stroke="#414651" />
          <p className="font-medium text-[14px] leading-[20px] text-[#414651]">{dateRange}</p>
        </button>

        {/* Policy Tags */}
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white border border-[#e9eaeb] rounded-lg flex gap-2 items-center justify-center px-4 py-2.5 h-10"
          >
            <p className="font-medium text-[14px] leading-[20px] text-[#414651]">{policy}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPolicyRemove?.(policy);
              }}
              className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
            >
              <XIcon className="w-5 h-5" stroke="#414651" />
            </button>
          </div>
        ))}

        {/* More Filters */}
        <button
          onClick={onMoreFiltersClick}
          className="bg-white border border-[#e9eaeb] rounded-lg flex gap-2 items-center justify-center px-4 py-2.5 h-10 hover:opacity-80 transition-opacity"
        >
          <FilterIcon className="w-5 h-5" stroke="#414651" />
          <p className="font-medium text-[14px] leading-[20px] text-[#414651]">More filters</p>
        </button>
      </div>

      {/* Search */}
      <div className="h-11 w-80">
        <div className="bg-white border border-[#e9eaeb] rounded-lg flex gap-2 items-center px-3.5 py-2.5 h-full">
          <SearchIcon className="w-5 h-5" stroke="#717680" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            className="flex-1 border-0 outline-0 font-normal text-[16px] leading-[24px] text-[#717680] placeholder:text-[#717680] bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

