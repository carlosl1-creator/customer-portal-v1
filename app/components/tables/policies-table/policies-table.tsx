import React from "react";
import { EditIcon, TrashIcon } from "~/components/icons/icons";

export type PolicyStatus = "active" | "draft" | "archive";

export interface Policy {
  id: string;
  name: string;
  version: string;
  created: string;
  status: PolicyStatus;
  reports: number;
  content: string;
}

export interface PoliciesTableProps {
  policies: Policy[];
  onEdit?: (policy: Policy) => void;
  onDelete?: (policy: Policy) => void;
  className?: string;
  itemsPerPage?: number;
}

export function PoliciesTable({ policies, onEdit, onDelete, className = "", itemsPerPage = 5 }: PoliciesTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(policies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPolicies = policies.slice(startIndex, endIndex);

  // Reset to page 1 when policies change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [policies.length]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className={`bg-theme-card border border-theme-primary rounded-[12px] overflow-hidden w-full ${className}`}>
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="bg-theme-card flex items-start w-full">
          {/* Name */}
          <div className="flex flex-col shrink-0">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex h-[44px] items-center px-6 py-3 w-[240px]">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Name</p>
            </div>
          </div>

          {/* Created */}
          <div className="flex flex-col shrink-0">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex h-[44px] items-center px-6 py-3 w-[120px]">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Created</p>
            </div>
          </div>

          {/* Reports */}
          <div className="flex flex-col shrink-0">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex h-[44px] items-center px-6 py-3 w-[100px]">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Reports</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex h-[44px] items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Content</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col shrink-0">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary h-[44px] w-[180px]" />
          </div>
        </div>

        {/* Rows */}
        {paginatedPolicies.map((policy, index) => {
          const isEven = index % 2 === 0;
          const bgClass = isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card";

          return (
            <div
              key={policy.id}
              className={`${bgClass} flex items-center border-b border-theme-primary w-full`}
            >
              {/* Name */}
              <div className="shrink-0 w-[240px] flex h-[92px] items-center px-6 py-4 overflow-hidden">
                <p 
                  className="font-normal text-[14px] leading-[20px] text-theme-primary truncate"
                  title={policy.name}
                >
                  {policy.name}
                </p>
              </div>

              {/* Created */}
              <div className="shrink-0 w-[120px] flex h-[92px] items-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">{policy.created}</p>
              </div>

              {/* Reports */}
              <div className="shrink-0 w-[100px] flex h-[92px] items-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">{policy.reports}</p>
              </div>

              {/* Content */}
              <div className="flex-1 flex h-[92px] items-center px-6 py-4 overflow-hidden">
                <p 
                  className="font-normal text-[14px] leading-[20px] text-theme-secondary line-clamp-4 whitespace-pre-wrap"
                  title={policy.content}
                >
                  {policy.content}
                </p>
              </div>

              {/* Actions */}
              <div className="shrink-0 w-[180px] flex gap-6 h-[92px] items-center justify-end px-6 py-4">
                <button
                  className="flex gap-2 items-center justify-center p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity text-theme-secondary"
                  onClick={() => onDelete?.(policy)}
                >
                  <TrashIcon className="w-5 h-5" />
                  <p className="font-semibold text-[14px] leading-[20px]">Delete</p>
                </button>
                <button
                  className="flex gap-2 items-center justify-center p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity text-theme-secondary"
                  onClick={() => onEdit?.(policy)}
                >
                  <EditIcon className="w-5 h-5" />
                  <p className="font-semibold text-[14px] leading-[20px]">Edit</p>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="border-t border-theme-primary flex items-center justify-between px-6 pb-4 pt-3 w-full">
        <div className="flex gap-3 items-start">
          <button 
            className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed"
            onClick={handlePreviousPage}
            disabled={!canGoPrevious}
          >
            <p className={`font-medium text-[12px] leading-[18px] ${canGoPrevious ? "text-theme-secondary" : "text-theme-muted"}`}>
              Previous
            </p>
          </button>
          <button 
            className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={!canGoNext}
          >
            <p className={`font-medium text-[12px] leading-[18px] ${canGoNext ? "text-theme-secondary" : "text-theme-muted"}`}>
              Next
            </p>
          </button>
        </div>
        <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
          Page {currentPage} of {totalPages || 1}
        </p>
      </div>
    </div>
  );
}
