import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "~/components/icons/icons";

export interface Benchmark {
  id: string;
  bot: string;
  description: string;
  disabled?: boolean;
}

export interface BenchmarksTableProps {
  benchmarks: Benchmark[];
  selectedIds: Set<string>;
  onSelectionChange: (id: string, selected: boolean) => void;
  maxSelections?: number;
  title?: string;
  className?: string;
  externalDisabled?: boolean; // When true, all checkboxes are disabled
  allowSelection?: boolean; // When false, no new selections allowed (but can deselect)
}

const Checkbox = ({ 
  checked, 
  disabled, 
  onChange 
}: { 
  checked: boolean; 
  disabled?: boolean;
  onChange: () => void;
}) => {
  if (disabled) {
    return (
      <div className="bg-neutral-100 border border-[#e9eaeb] rounded-[6px] shrink-0 size-5" />
    );
  }

  if (checked) {
    return (
      <div 
        className="bg-[#eff8ff] border border-[#1570ef] rounded-[6px] shrink-0 size-5 cursor-pointer flex items-center justify-center"
        onClick={onChange}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="#1570EF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className="bg-white border border-[#d5d7da] rounded-[6px] shrink-0 size-5 cursor-pointer"
      onClick={onChange}
    />
  );
};

export function BenchmarksTable({ 
  benchmarks, 
  selectedIds, 
  onSelectionChange,
  maxSelections = 1,
  title = "Benchmarks",
  className = "",
  externalDisabled = false,
  allowSelection = true
}: BenchmarksTableProps) {
  const [sortColumn, setSortColumn] = React.useState<string | null>("id");
  const [sortDirection, setSortDirection] = React.useState<"up" | "down">("up");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "up" ? "down" : "up");
    } else {
      setSortColumn(column);
      setSortDirection("up");
    }
  };

  const handleCheckboxChange = (id: string) => {
    const isSelected = selectedIds.has(id);
    // Allow deselection, but prevent new selection if not allowed or max reached
    if (!isSelected && (!allowSelection || selectedIds.size >= maxSelections)) {
      return;
    }
    onSelectionChange(id, !isSelected);
  };

  return (
    <div className={`flex flex-1 flex-col gap-4 items-start min-h-0 min-w-0 ${className}`}>
      <div className="px-1">
        <p className="font-normal text-[16px] leading-[24px] text-[#535862]">{title}</p>
      </div>
      <div className={`bg-white border border-[#e9eaeb] rounded-[12px] overflow-hidden w-full flex-1`}>
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="bg-white flex items-start border-b border-[#e9eaeb] w-full">
            {/* Checkbox column */}
            <div className="flex flex-col w-[52px]">
              <div className="bg-white border-b border-[#e9eaeb] flex gap-3 h-11 items-center px-6 py-3">
                {/* Empty header for checkbox column */}
              </div>
            </div>

            {/* Report ID */}
            <div className="flex flex-col">
              <div className="bg-white border-b border-[#e9eaeb] flex gap-1 h-11 items-center px-6 py-3">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Report ID</p>
                <button
                  onClick={() => handleSort("id")}
                  className="p-0 border-0 bg-transparent cursor-pointer"
                >
                  {sortColumn === "id" && sortDirection === "up" ? (
                    <ChevronUpIcon className="w-2.5 h-2.5" stroke="#535862" />
                  ) : (
                    <ChevronDownIcon className="w-2.5 h-2.5" stroke="#535862" />
                  )}
                </button>
              </div>
            </div>

            {/* Bot */}
            <div className="flex flex-col">
              <div className="bg-white border-b border-[#e9eaeb] flex gap-3 h-11 items-center px-6 py-3">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Bot</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-1 flex-col">
              <div className="bg-white border-b border-[#e9eaeb] flex gap-3 h-11 items-center px-6 py-3">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Description</p>
              </div>
            </div>
          </div>

          {/* Rows */}
          {benchmarks.map((benchmark, index) => {
            const isEven = index % 2 === 0;
            const bgColor = isEven ? "bg-neutral-50" : "bg-white";
            const isSelected = selectedIds.has(benchmark.id);
            const isDisabled = externalDisabled || benchmark.disabled || (!isSelected && (!allowSelection || selectedIds.size >= maxSelections));

            return (
              <div
                key={`${benchmark.id}-${index}`}
                className={`${bgColor} flex items-start border-b border-[#e9eaeb] w-full`}
              >
                {/* Checkbox */}
                <div className="w-[52px] flex gap-3 h-16 items-center justify-center px-6 py-4">
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => handleCheckboxChange(benchmark.id)}
                  />
                </div>

                {/* Report ID */}
                <div className="flex gap-3 h-16 items-center px-6 py-4">
                  <p className="font-medium text-[14px] leading-[20px] text-[#181d27]">{benchmark.id}</p>
                </div>

                {/* Bot */}
                <div className="flex h-16 items-center px-6 py-4">
                  <p className="font-normal text-[14px] leading-[20px] text-[#535862]">{benchmark.bot}</p>
                </div>

                {/* Description */}
                <div className="flex-1 flex h-16 items-center px-6 py-4">
                  <p className="flex-1 font-normal text-[14px] leading-[20px] text-[#535862] whitespace-pre-wrap min-h-0 min-w-0">
                    {benchmark.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="border-t border-[#e9eaeb] flex items-center justify-between px-6 py-3 w-full">
          <div className="flex gap-3 items-start">
            <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-semibold text-[14px] leading-[20px] text-[#d5d7da]">Previous</p>
            </button>
            <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-semibold text-[14px] leading-[20px] text-[#535862]">Next</p>
            </button>
          </div>
          <p className="font-medium text-[14px] leading-[20px] text-[#414651]">Page 1 of 10</p>
        </div>
      </div>
    </div>
  );
}

