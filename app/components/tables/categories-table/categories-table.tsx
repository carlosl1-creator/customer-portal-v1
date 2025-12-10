import React, { useState } from "react";
import { Badge } from "~/components/badge/badge";

export type Priority = "high" | "medium" | "low";

export interface Category {
  id: string;
  name: string;
  priority: Priority;
}

export interface CategoriesTableProps {
  categories: Category[];
  selectedIds: Set<string>;
  onSelectionChange: (id: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  className?: string;
}

const priorityVariants: Record<Priority, "danger" | "warning" | "success"> = {
  high: "danger",
  medium: "warning", 
  low: "success",
};

export function CategoriesTable({
  categories,
  selectedIds,
  onSelectionChange,
  onSelectAll,
  className = "",
}: CategoriesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);
  const allSelected = categories.length > 0 && categories.every((cat) => selectedIds.has(cat.id));
  const someSelected = categories.some((cat) => selectedIds.has(cat.id));

  const handleSelectAll = () => {
    const newSelected = !allSelected;
    onSelectAll?.(newSelected);
  };

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
    <div className={`bg-theme-card border border-theme-primary rounded-[12px] ${className}`}>
      <div className="flex flex-col items-start overflow-hidden rounded-[inherit]">
        <div className="bg-theme-card flex items-start relative w-full">
          {/* Category Column */}
          <div className="flex flex-col items-start relative shrink-0">
            {/* Header */}
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary box-border flex gap-3 h-[44px] items-center px-6 py-3 relative shrink-0 w-[240px]">
              <button
                onClick={handleSelectAll}
                className="flex items-center justify-center relative shrink-0 bg-transparent border-0 cursor-pointer p-0"
              >
                <div
                  className={`border rounded-[6px] shrink-0 size-5 ${
                    allSelected
                      ? "bg-[var(--color-primary-light)] border-[var(--color-primary)]"
                      : "bg-theme-card border-theme-secondary"
                  }`}
                >
                  {allSelected && (
                    <div className="overflow-hidden relative rounded-[inherit] size-5">
                      <div className="absolute inset-[1%] overflow-hidden">
                        <svg
                          className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4 w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="var(--color-primary)"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </button>
              <div className="flex gap-1 items-center relative shrink-0">
                <p className="font-medium leading-[18px] text-theme-secondary text-[12px]">Category</p>
                <svg className="w-[10.667px] h-[10.667px]" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    className="text-theme-secondary"
                  />
                </svg>
              </div>
            </div>
            {/* Rows */}
            {currentCategories.map((category, index) => {
              const isSelected = selectedIds.has(category.id);
              const isEvenRow = (startIndex + index) % 2 === 0;
              return (
                <div
                  key={category.id}
                  className={`border-b border-theme-primary box-border flex gap-3 h-16 items-center px-6 py-4 relative shrink-0 w-[240px] ${
                    isEvenRow ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
                  }`}
                >
                  <button
                    onClick={() => onSelectionChange(category.id, !isSelected)}
                    className="flex items-center justify-center relative shrink-0 bg-transparent border-0 cursor-pointer p-0"
                  >
                    <div
                      className={`border rounded-[6px] shrink-0 size-5 ${
                        isSelected
                          ? "bg-[var(--color-primary-light)] border-[var(--color-primary)]"
                          : "bg-theme-card border-theme-secondary"
                      }`}
                    >
                      {isSelected && (
                        <div className="overflow-hidden relative rounded-[inherit] size-5">
                          <div className="absolute inset-[1%] overflow-hidden">
                            <svg
                              className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4 w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                              stroke="var(--color-primary)"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                  <p className="font-normal leading-5 text-theme-primary text-sm">{category.name}</p>
                </div>
              );
            })}
          </div>

          {/* Priority Column */}
          <div className="flex flex-col items-start relative shrink-0">
            {/* Header */}
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary box-border flex gap-1 h-[44px] items-center px-6 py-3 relative shrink-0 w-[120px]">
              <p className="font-medium leading-[18px] text-theme-secondary text-[12px]">Priority</p>
              <svg
                className="w-4 h-4 text-theme-muted"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            {/* Rows */}
            {currentCategories.map((category, index) => {
              const isEvenRow = (startIndex + index) % 2 === 0;
              return (
                <div
                  key={category.id}
                  className={`border-b border-theme-primary box-border flex h-16 items-center px-6 py-4 relative shrink-0 w-[120px] ${
                    isEvenRow ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
                  }`}
                >
                  <Badge variant={priorityVariants[category.priority]}>
                    {category.priority.charAt(0).toUpperCase() + category.priority.slice(1)}
                  </Badge>
                </div>
              );
            })}
          </div>

          {/* Actions Column */}
          <div className="flex flex-col items-start relative shrink-0">
            {/* Header */}
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary h-[44px] shrink-0 w-[80px]" />
            {/* Rows */}
            {currentCategories.map((category, index) => {
              const isEvenRow = (startIndex + index) % 2 === 0;
              return (
                <div
                  key={category.id}
                  className={`border-b border-theme-primary box-border flex gap-1 h-16 items-center p-4 relative shrink-0 w-[80px] ${
                    isEvenRow ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
                  }`}
                >
                  <button className="box-border cursor-pointer flex items-start p-0 relative rounded-[8px] shrink-0 hover:opacity-80 transition-opacity bg-transparent border-0">
                    <div className="box-border flex gap-2 items-center justify-center overflow-hidden p-2.5 relative rounded-[8px] shrink-0">
                      <svg
                        className="w-5 h-5 text-theme-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="border-t border-theme-primary box-border flex items-center justify-between pb-4 pt-3 px-6 relative shrink-0 w-full">
          <div className="flex gap-3 items-start relative shrink-0">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`flex items-start relative shrink-0 bg-transparent border-0 p-0 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <p
                className={`font-medium leading-[18px] text-[12px] ${
                  currentPage === 1 ? "text-theme-muted" : "text-theme-secondary"
                }`}
              >
                Previous
              </p>
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-start relative shrink-0 bg-transparent border-0 p-0 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <p
                className={`font-medium leading-[18px] text-[12px] ${
                  currentPage === totalPages ? "text-theme-muted" : "text-theme-secondary"
                }`}
              >
                Next
              </p>
            </button>
          </div>
          <p className="font-normal leading-[18px] text-theme-secondary text-[12px]">
            All {selectedIds.size} Selected Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}
