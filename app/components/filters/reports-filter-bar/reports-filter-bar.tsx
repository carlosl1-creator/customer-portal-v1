import React, { useState, useRef, useEffect } from "react";
import { CalendarIcon, XIcon, FilterIcon, SearchIcon } from "~/components/icons/icons";

export interface ReportsFilterBarProps {
  dateRange?: string;
  policies?: string[];
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  onPolicyRemove?: (policy: string) => void;
  onMoreFiltersClick?: () => void;
  onSearchChange?: (value: string) => void;
  className?: string;
}

const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatDateForInput = (dateStr: string): string => {
  if (!dateStr) return "";
  // If it's already in YYYY-MM-DD format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0];
};

const presetRanges = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "Last year", days: 365 },
];

export function ReportsFilterBar({
  dateRange = "Jan 6, 2022 – Jan 13, 2022",
  policies = [],
  onDateRangeChange,
  onPolicyRemove,
  onMoreFiltersClick,
  onSearchChange,
  className = "",
}: ReportsFilterBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [displayRange, setDisplayRange] = useState(dateRange);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close date picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }

    if (isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value);
  };

  const handlePresetClick = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];
    
    setStartDate(startStr);
    setEndDate(endStr);
  };

  const handleApply = () => {
    if (startDate && endDate) {
      const formattedRange = `${formatDateForDisplay(startDate)} – ${formatDateForDisplay(endDate)}`;
      setDisplayRange(formattedRange);
      onDateRangeChange?.(startDate, endDate);
      setIsDatePickerOpen(false);
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className={`flex gap-4 items-start ${className}`}>
      {/* Filters */}
      <div className="flex flex-1 gap-4 items-center">
        {/* Date Picker */}
        <div className="relative" ref={datePickerRef}>
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-lg flex gap-2 items-center justify-center px-4 py-2.5 h-10 hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            <CalendarIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />
            <p className="font-medium text-[14px] leading-[20px] text-[var(--color-badge-default-text)]">{displayRange}</p>
          </button>

          {/* Date Range Picker Dropdown */}
          {isDatePickerOpen && (
            <div className="absolute top-full left-0 mt-2 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-lg shadow-lg z-20 p-4 min-w-[320px]">
              {/* Preset Ranges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {presetRanges.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePresetClick(preset.days)}
                    className="bg-[var(--color-bg-muted)] border border-[var(--color-border-primary)] rounded-md px-3 py-1.5 text-[12px] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Date Inputs */}
              <div className="flex gap-3 items-center mb-4">
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[var(--color-text-secondary)] mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] rounded-md px-3 py-2 text-[14px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <span className="text-[var(--color-text-muted)] mt-5">–</span>
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[var(--color-text-secondary)] mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] rounded-md px-3 py-2 text-[14px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleClear}
                  className="px-4 py-2 text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleApply}
                  disabled={!startDate || !endDate}
                  className="px-4 py-2 bg-[var(--color-text-primary)] text-[var(--color-text-inverted)] rounded-md text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

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

