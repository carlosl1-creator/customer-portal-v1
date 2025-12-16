import React from "react";
import { Badge } from "~/components/badge/badge";
import { ChevronUpIcon, ChevronDownIcon } from "~/components/icons/icons";
import type { Report } from "~/components/tables/reports-table/reports-table";

export interface SelectableReport extends Report {
  disabled?: boolean;
}

export interface SelectableReportsTableProps {
  reports: SelectableReport[];
  selectedIds: Set<string>;
  onSelectionChange: (id: string, selected: boolean) => void;
  maxSelections?: number;
  title?: string;
  className?: string;
  externalDisabled?: boolean; // When true, all checkboxes are disabled
}

const getStatusVariant = (status: string): "success" | "warning" | "neutral" => {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
      return "warning";
    default:
      return "neutral";
  }
};

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
      <div className="bg-theme-muted border border-theme-primary rounded-[6px] shrink-0 size-5" />
    );
  }

  if (checked) {
    return (
      <div 
        className="bg-[var(--color-primary-light)] border border-[var(--color-primary)] rounded-[6px] shrink-0 size-5 cursor-pointer flex items-center justify-center"
        onClick={onChange}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="var(--color-primary)"
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
      className="bg-theme-card border border-theme-secondary rounded-[6px] shrink-0 size-5 cursor-pointer"
      onClick={onChange}
    />
  );
};

export function SelectableReportsTable({ 
  reports, 
  selectedIds, 
  onSelectionChange,
  maxSelections = 2,
  title = "Your Reports",
  className = "",
  externalDisabled = false
}: SelectableReportsTableProps) {
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
    if (!isSelected && selectedIds.size >= maxSelections) {
      return; // Don't allow more than maxSelections
    }
    onSelectionChange(id, !isSelected);
  };

  return (
    <div className={`flex flex-col gap-4 items-start shrink-0 ${className}`}>
      <div className="px-1">
        <p className="font-normal text-[16px] leading-[24px] text-theme-secondary">{title}</p>
      </div>
      <div className="bg-theme-card border border-theme-primary rounded-[12px] overflow-hidden">
        <div className="flex w-full">
          {/* Report ID Column */}
          <div className="flex flex-col shrink-0">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary h-[44px] flex items-center gap-1 px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Report ID</p>
              <button
                onClick={() => handleSort("id")}
                className="p-0 border-0 bg-transparent cursor-pointer text-theme-secondary"
              >
                {sortColumn === "id" && sortDirection === "up" ? (
                  <ChevronUpIcon className="w-2.5 h-2.5" />
                ) : (
                  <ChevronDownIcon className="w-2.5 h-2.5" />
                )}
              </button>
            </div>
            {reports.map((report, index) => {
              const isEven = index % 2 === 0;
              const bgClass = isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card";
              const isSelected = selectedIds.has(report.id);
              const isDisabled = externalDisabled || report.disabled || (!isSelected && selectedIds.size >= maxSelections);
              return (
                <div key={`id-${report.id}-${index}`} className={`${bgClass} border-b border-theme-primary h-[72px] flex items-center gap-3 px-6 py-4`}>
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => handleCheckboxChange(report.id)}
                  />
                  <p className="font-medium text-[14px] leading-[20px] text-theme-primary">{report.id}</p>
                </div>
              );
            })}
          </div>

          {/* Created Column */}
          <div className="flex flex-col shrink-0 w-[116px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary h-[44px] flex items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Created</p>
            </div>
            {reports.map((report, index) => {
              const isEven = index % 2 === 0;
              const bgClass = isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card";
              return (
                <div key={`created-${report.id}-${index}`} className={`${bgClass} border-b border-theme-primary h-[72px] flex items-center px-6 py-4`}>
                  <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">{report.created}</p>
                </div>
              );
            })}
          </div>

          {/* Bot and Policy Version Column */}
          <div className="flex flex-col shrink-0 w-[196px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary h-[44px] flex items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Bot and Policy Version</p>
            </div>
            {reports.map((report, index) => {
              const isEven = index % 2 === 0;
              const bgClass = isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card";
              return (
                <div key={`version-${report.id}-${index}`} className={`${bgClass} border-b border-theme-primary h-[72px] flex flex-col justify-center px-6 py-4`}>
                  <p className="font-normal text-[14px] leading-[20px] text-theme-primary">{report.botVersion}</p>
                  <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">{report.policyVersion}</p>
                </div>
              );
            })}
          </div>

          {/* Status Column */}
          <div className="flex flex-col shrink-0">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary h-[44px] flex items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Status</p>
            </div>
            {reports.map((report, index) => {
              const isEven = index % 2 === 0;
              const bgClass = isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card";
              return (
                <div key={`status-${report.id}-${index}`} className={`${bgClass} border-b border-theme-primary h-[72px] flex items-center px-6 py-4`}>
                  <Badge variant={getStatusVariant(report.status)}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="border-t border-theme-primary flex items-center justify-between px-6 py-3 w-full">
          <div className="flex gap-3 items-start">
            <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-semibold text-[14px] leading-[20px] text-theme-muted">Previous</p>
            </button>
            <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-semibold text-[14px] leading-[20px] text-theme-secondary">Next</p>
            </button>
          </div>
          <p className="font-medium text-[14px] leading-[20px] text-theme-secondary">Page 1 of 10</p>
        </div>
      </div>
    </div>
  );
}
