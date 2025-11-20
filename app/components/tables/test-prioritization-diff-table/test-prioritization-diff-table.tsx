import React, { useState } from "react";
import { SearchIcon, ArrowUpRightIcon, HelpIcon } from "~/components/icons/icons";
import { Badge } from "~/components/badge/badge";

export type Priority = "high" | "medium" | "low" | "critical";

export interface TestCategoryDiff {
  id: string;
  name: string;
  oldPriority: Priority;
  newPriority: Priority;
  description: string;
}

export interface TestPrioritizationDiffTableProps {
  categories: TestCategoryDiff[];
  onViewDetails?: (category: TestCategoryDiff) => void;
  className?: string;
}

const priorityStyles: Record<Priority, { bg: string; text: string; dot: string }> = {
  high: { bg: "#FFF1F3", text: "#C01048", dot: "#FD6F8E" },
  medium: { bg: "#FFFAEB", text: "#B54708", dot: "#FDB022" },
  low: { bg: "#ECFDF3", text: "#027A48", dot: "#027A48" },
  critical: { bg: "#FEF3F2", text: "#B42318", dot: "#D92D20" },
};

const priorityLabels: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
  critical: "Critical",
};

function ArrowRightIcon({ className = "w-[18px] h-[18px]", stroke = "#717680" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

function PriorityDiffCell({
  category,
  isEven,
}: {
  category: TestCategoryDiff;
  isEven: boolean;
}) {
  const oldStyle = priorityStyles[category.oldPriority];
  const newStyle = priorityStyles[category.newPriority];
  const hasChange = category.oldPriority !== category.newPriority;

  return (
    <div
      className={`border-[#e9eaeb] border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex h-[72px] items-center px-6 py-4 relative shrink-0 w-[180px] ${
        isEven ? "bg-neutral-50" : "bg-white"
      }`}
    >
      <div className="content-stretch flex gap-2 items-start overflow-clip relative shrink-0">
        {/* Old Priority Badge */}
        <div className="content-stretch flex items-start relative shrink-0">
          <div
            className="box-border content-stretch flex gap-1.5 items-center justify-center pl-1.5 pr-2 py-0.5 relative rounded-2xl shrink-0"
            style={{ backgroundColor: oldStyle.bg }}
          >
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: oldStyle.dot }}
            />
            <p
              className="font-medium leading-[18px] not-italic relative shrink-0 text-xs text-center"
              style={{ color: oldStyle.text }}
            >
              {priorityLabels[category.oldPriority]}
            </p>
          </div>
        </div>

        {/* Arrow */}
        {hasChange && (
          <div className="overflow-clip relative shrink-0 size-[18px] flex items-center justify-center">
            <ArrowRightIcon className="size-[18px]" stroke="#717680" />
          </div>
        )}

        {/* New Priority Badge */}
        {hasChange && (
          <div className="content-stretch flex items-start relative shrink-0">
            <div
              className="box-border content-stretch flex gap-1.5 items-center justify-center pl-1.5 pr-2 py-0.5 relative rounded-2xl shrink-0"
              style={{ backgroundColor: newStyle.bg }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: newStyle.dot }}
              />
              <p
                className="font-medium leading-[18px] not-italic relative shrink-0 text-xs text-center"
                style={{ color: newStyle.text }}
              >
                {priorityLabels[category.newPriority]}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function TestPrioritizationDiffTable({
  categories,
  onViewDetails,
  className = "",
}: TestPrioritizationDiffTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter categories based on search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={`flex flex-col gap-[18px] items-start relative shrink-0 w-full ${className}`}>
      {/* Search Bar */}
      <div className="h-[44px] relative shrink-0 w-[320px]">
        <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-0 right-0 top-0">
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
            <div className="bg-white border border-[#e9eaeb] border-solid box-border content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative rounded-[8px] shrink-0 w-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative shrink-0">
                <SearchIcon className="overflow-clip relative shrink-0 size-5" stroke="#717680" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  placeholder="Search"
                  className="flex-1 font-normal leading-6 text-base text-[#717680] outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e9eaeb] border-solid relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start overflow-visible relative rounded-[inherit] w-full">
          <div className="bg-white content-stretch flex items-start relative shrink-0 w-full">
            {/* Category Column */}
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="bg-white border-[#e9eaeb] border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex gap-3 h-[44px] items-center px-6 py-3 relative shrink-0 w-[240px]">
                <div className="content-stretch flex gap-1 items-center relative shrink-0">
                  <p className="font-medium leading-[18px] not-italic relative shrink-0 text-[#535862] text-[12px]">
                    Category
                  </p>
                </div>
              </div>
              {currentCategories.map((category, index) => {
                const isEven = (startIndex + index) % 2 === 0;
                return (
                  <div
                    key={category.id}
                    className={`border-[#e9eaeb] border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex h-[72px] items-center px-6 py-4 relative shrink-0 w-[240px] ${
                      isEven ? "bg-neutral-50" : "bg-white"
                    }`}
                  >
                    <p className="font-normal leading-[20px] not-italic relative shrink-0 text-[#181d27] text-[14px]">
                      {category.name}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Priority Column */}
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="bg-white border-[#e9eaeb] border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex gap-3 h-[44px] items-center px-6 py-3 relative shrink-0 w-[180px]">
                <div className="content-stretch flex gap-1 items-center relative shrink-0">
                  <p className="font-medium leading-[18px] not-italic relative shrink-0 text-[#535862] text-[12px]">
                    Priority
                  </p>
                  <HelpIcon className="relative shrink-0 size-4" stroke="#A4A7AE" />
                </div>
              </div>
              {currentCategories.map((category, index) => {
                const isEven = (startIndex + index) % 2 === 0;
                return (
                  <PriorityDiffCell
                    key={category.id}
                    category={category}
                    isEven={isEven}
                  />
                );
              })}
            </div>

            {/* Description Column */}
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative shrink-0">
              <div className="bg-white border-[#e9eaeb] border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex gap-3 h-[44px] items-center px-6 py-3 relative shrink-0 w-full">
                <div className="content-stretch flex gap-1 items-center relative shrink-0">
                  <p className="font-medium leading-[18px] not-italic relative shrink-0 text-[#535862] text-[12px]">
                    Description
                  </p>
                </div>
              </div>
              {currentCategories.map((category, index) => {
                const isEven = (startIndex + index) % 2 === 0;
                return (
                  <div
                    key={category.id}
                    className={`border-[#e9eaeb] border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex h-[72px] items-center px-6 py-4 relative shrink-0 w-full ${
                      isEven ? "bg-neutral-50" : "bg-white"
                    }`}
                  >
                    <p className="flex-[1_0_0] font-normal h-full leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px] whitespace-pre-wrap">
                      {category.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Actions Column */}
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="bg-white border-[#e9eaeb] border-b border-l-0 border-r-0 border-solid border-t-0 h-[44px] shrink-0 w-[80px]" />
              {currentCategories.map((category, index) => {
                const isEven = (startIndex + index) % 2 === 0;
                return (
                  <div
                    key={category.id}
                    className={`border-[#e9eaeb] border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex gap-1 h-[72px] items-center p-4 relative shrink-0 w-[80px] ${
                      isEven ? "bg-neutral-50" : "bg-white"
                    }`}
                  >
                    <button
                      onClick={() => onViewDetails?.(category)}
                      className="content-stretch flex items-start relative rounded-[8px] shrink-0 hover:opacity-80 transition-opacity"
                    >
                      <div className="box-border content-stretch flex gap-2 items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0">
                        <ArrowUpRightIcon className="overflow-clip relative shrink-0 size-5" stroke="#535862" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination */}
          <div className="border-[#e9eaeb] border-b-0 border-l-0 border-r-0 border-solid border-t box-border content-stretch flex items-center justify-between pb-4 pt-3 px-6 relative shrink-0 w-full">
            <div className="content-stretch flex gap-3 items-start relative shrink-0">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`content-stretch flex items-start relative shrink-0 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80 transition-opacity"
                }`}
              >
                <p
                  className={`font-medium leading-[18px] text-[12px] ${
                    currentPage === 1 ? "text-[#d5d7da]" : "text-[#535862]"
                  }`}
                >
                  Previous
                </p>
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`content-stretch flex items-start relative shrink-0 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:opacity-80 transition-opacity"
                }`}
              >
                <p
                  className={`font-medium leading-[18px] text-[12px] ${
                    currentPage === totalPages ? "text-[#d5d7da]" : "text-[#535862]"
                  }`}
                >
                  Next
                </p>
              </button>
            </div>
            <p className="font-normal leading-[18px] not-italic relative shrink-0 text-[#535862] text-[12px]">
              Page {currentPage} of {totalPages || 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

