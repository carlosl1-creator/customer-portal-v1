import React, { useState, useRef, useEffect } from "react";
import { SearchIcon, ArrowUpRightIcon, HelpIcon, ChevronDownIcon } from "~/components/icons/icons";

export type Priority = "high" | "medium" | "low" | "critical";

export interface TestCategory {
  id: string;
  name: string;
  priority: Priority;
  description: string;
}

export interface TestPrioritizationTableProps {
  categories: TestCategory[];
  onPriorityChange?: (id: string, priority: Priority) => void;
  onViewDetails?: (category: TestCategory) => void;
  className?: string;
}

interface PriorityOption {
  label: string;
  value: Priority;
}

const priorityOptions: PriorityOption[] = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
  { label: "Critical", value: "critical" },
];

const priorityStyles: Record<Priority, { bg: string; text: string; dot: string }> = {
  high: { bg: "var(--color-error-bg)", text: "var(--color-error-text)", dot: "var(--color-error)" },
  medium: { bg: "var(--color-warning-bg)", text: "var(--color-warning-text)", dot: "var(--color-warning)" },
  low: { bg: "var(--color-success-bg)", text: "var(--color-success-text)", dot: "var(--color-success)" },
  critical: { bg: "var(--color-error-bg)", text: "var(--color-error-text)", dot: "var(--color-error)" },
};

function PrioritySelectCell({
  category,
  isEven,
  onPriorityChange,
  isLastRow = false,
}: {
  category: TestCategory;
  isEven: boolean;
  onPriorityChange?: (id: string, priority: Priority) => void;
  isLastRow?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const priorityStyle = priorityStyles[category.priority];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`border-theme-primary border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex h-[72px] items-center px-6 py-4 relative shrink-0 w-[180px] ${isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
        }`}
    >
      <div className="h-[44px] relative shrink-0 w-[144px]" ref={selectRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-theme-card border border-theme-primary border-solid box-border content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative rounded-[8px] shrink-0 w-full"
        >
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative shrink-0">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: priorityStyle.dot }}
            />
            <p className="font-medium leading-6 not-italic relative shrink-0 text-theme-primary text-base">
              {priorityOptions.find((opt) => opt.value === category.priority)?.label || category.priority}
            </p>
          </div>
          <ChevronDownIcon
            className={`overflow-clip relative shrink-0 size-5 transition-transform text-theme-secondary ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {isOpen && (
          <div
            className={`absolute left-0 right-0 bg-theme-card border border-theme-primary rounded-[8px] shadow-lg top-full mt-1`}
            style={{ zIndex: 9999 }}
          >
            {priorityOptions.map((option) => {
              const optionStyle = priorityStyles[option.value];
              const isSelected = category.priority === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onPriorityChange?.(category.id, option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-[14px] py-[10px] text-left hover:bg-theme-hover transition-colors flex items-center gap-2 border-0 ${isSelected ? "bg-[var(--color-primary-light)]" : "bg-transparent"
                    }`}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: optionStyle.dot }}
                  />
                  <p
                    className={`font-medium leading-6 text-base flex-1 ${isSelected ? "text-[var(--color-primary)]" : "text-theme-primary"
                      }`}
                  >
                    {option.label}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function TestPrioritizationTable({
  categories,
  onPriorityChange,
  onViewDetails,
  className = "",
}: TestPrioritizationTableProps) {
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

  const handlePrioritySelect = (categoryId: string, priority: string) => {
    onPriorityChange?.(categoryId, priority as Priority);
  };

  return (
    <div className={`flex flex-col gap-[18px] items-start relative shrink-0 w-full ${className}`}>
      {/* Search Bar */}
      <div className="h-[44px] relative shrink-0 w-[320px]">
        <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-0 right-0 top-0">
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
            <div className="bg-theme-card border border-theme-primary border-solid box-border content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative rounded-[8px] shrink-0 w-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative shrink-0">
                <SearchIcon className="overflow-clip relative shrink-0 size-5 text-theme-tertiary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  placeholder="Search"
                  className="flex-1 font-normal leading-6 text-base text-theme-tertiary placeholder:text-theme-tertiary outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-theme-card border border-theme-primary border-solid relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start overflow-visible relative rounded-[inherit] w-full">
          <div className="bg-theme-card content-stretch flex items-start relative shrink-0 w-full">
            {/* Category Column */}
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="bg-[var(--color-table-header-bg)] border-theme-primary border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex gap-[12px] h-[44px] items-center px-6 py-3 relative shrink-0 w-[240px]">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <p className="font-medium leading-[18px] not-italic relative shrink-0 text-theme-secondary text-[12px]">
                    Category
                  </p>
                </div>
              </div>
              {currentCategories.map((category, index) => {
                const isEven = (startIndex + index) % 2 === 0;
                return (
                  <div
                    key={category.id}
                    className={`border-theme-primary border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex h-[72px] items-center px-6 py-4 relative shrink-0 w-[240px] ${isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
                      }`}
                  >
                    <p className="font-normal leading-[20px] not-italic relative shrink-0 text-theme-primary text-[14px]">
                      {category.name}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Priority Column */}
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="bg-[var(--color-table-header-bg)] border-theme-primary border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex gap-[12px] h-[44px] items-center px-6 py-3 relative shrink-0 w-[180px]">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <p className="font-medium leading-[18px] not-italic relative shrink-0 text-theme-secondary text-[12px]">
                    Priority
                  </p>
                  <HelpIcon className="relative shrink-0 size-4 text-theme-muted" />
                </div>
              </div>
              {currentCategories.map((category, index) => {
                const isEven = (startIndex + index) % 2 === 0;
                const isLastRow = index === currentCategories.length - 1;
                return (
                  <PrioritySelectCell
                    key={category.id}
                    category={category}
                    isEven={isEven}
                    onPriorityChange={onPriorityChange}
                    isLastRow={isLastRow}
                  />
                );
              })}
            </div>

            {/* Description Column */}
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative shrink-0">
              <div className="bg-[var(--color-table-header-bg)] border-theme-primary border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex gap-[12px] h-[44px] items-center px-6 py-3 relative shrink-0 w-full">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <p className="font-medium leading-[18px] not-italic relative shrink-0 text-theme-secondary text-[12px]">
                    Description
                  </p>
                </div>
              </div>
              {currentCategories.map((category, index) => {
                const isEven = (startIndex + index) % 2 === 0;
                return (
                  <div
                    key={category.id}
                    className={`border-theme-primary border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex h-[72px] items-center px-6 py-4 relative shrink-0 w-full ${isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
                      }`}
                  >
                    <p className="flex-[1_0_0] font-normal h-full leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-theme-secondary text-[14px] whitespace-pre-wrap">
                      {category.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Actions Column */}
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="bg-[var(--color-table-header-bg)] border-theme-primary border-b border-l-0 border-r-0 border-solid border-t-0 h-[44px] shrink-0 w-[80px]" />
              {currentCategories.map((category, index) => {
                const isEven = (startIndex + index) % 2 === 0;
                return (
                  <div
                    key={category.id}
                    className={`border-theme-primary border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex gap-[4px] h-[72px] items-center p-4 relative shrink-0 w-[80px] ${isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
                      }`}
                  >
                    <button
                      onClick={() => onViewDetails?.(category)}
                      className="content-stretch flex items-start relative rounded-[8px] shrink-0 hover:opacity-80 transition-opacity bg-transparent border-0 p-0 cursor-pointer"
                    >
                      <div className="box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0">
                        <ArrowUpRightIcon className="overflow-clip relative shrink-0 size-5 text-theme-secondary" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination */}
          <div className="border-theme-primary border-b-0 border-l-0 border-r-0 border-solid border-t box-border content-stretch flex items-center justify-between pb-4 pt-3 px-6 relative shrink-0 w-full">
            <div className="content-stretch flex gap-3 items-start relative shrink-0">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`content-stretch flex items-start relative shrink-0 bg-transparent border-0 p-0 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80 transition-opacity"
                  }`}
              >
                <p
                  className={`font-medium leading-[18px] text-[12px] ${currentPage === 1 ? "text-theme-muted" : "text-theme-secondary"
                    }`}
                >
                  Previous
                </p>
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`content-stretch flex items-start relative shrink-0 bg-transparent border-0 p-0 ${currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:opacity-80 transition-opacity"
                  }`}
              >
                <p
                  className={`font-medium leading-[18px] text-[12px] ${currentPage === totalPages ? "text-theme-muted" : "text-theme-secondary"
                    }`}
                >
                  Next
                </p>
              </button>
            </div>
            <p className="font-normal leading-[18px] not-italic relative shrink-0 text-theme-secondary text-[12px]">
              Page {currentPage} of {totalPages || 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
