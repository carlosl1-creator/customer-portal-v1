import React from "react";
import { Badge } from "~/components/badge/badge";
import { HelpIcon, MoreVerticalIcon, ChevronUpIcon, ChevronDownIcon } from "~/components/icons/icons";

export interface Report {
  id: string;
  botVersion: string;
  policyVersion: string;
  created: string;
  status: "completed" | "processing" | "churned";
  overallReadiness?: number;
  pillarI?: number;
  pillarII?: number;
  asr?: number;
  asrTrend?: "up" | "down" | "neutral";
}

export interface ReportsTableProps {
  reports: Report[];
  onRowClick?: (report: Report) => void;
  selectedIds?: Set<string>;
  onSelectionChange?: (id: string, selected: boolean) => void;
  className?: string;
  itemsPerPage?: number;
}

const Checkbox = ({ 
  checked, 
  onChange 
}: { 
  checked: boolean; 
  onChange: () => void;
}) => {
  if (checked) {
    return (
      <div 
        className="bg-[var(--color-primary-light)] border border-[var(--color-primary)] rounded-[6px] shrink-0 size-5 cursor-pointer flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onChange();
        }}
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
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
    />
  );
};

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

const getPillarVariant = (score?: number): "success" | "warning" | "neutral" => {
  if (!score) return "neutral";
  if (score >= 4.0) return "success";
  if (score >= 3.0) return "warning";
  return "neutral";
};

export function ReportsTable({ reports, onRowClick, selectedIds, onSelectionChange, className = "", itemsPerPage = 5 }: ReportsTableProps) {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"up" | "down">("up");
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReports = reports.slice(startIndex, endIndex);

  // Reset to page 1 when reports change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [reports.length]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "up" ? "down" : "up");
    } else {
      setSortColumn(column);
      setSortDirection("up");
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (!onSelectionChange) return;
    const isSelected = selectedIds?.has(id) ?? false;
    onSelectionChange(id, !isSelected);
  };

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
        <div className="bg-theme-card flex items-start border-b border-theme-primary w-full">
          {/* Checkbox column */}
          <div className="flex flex-col w-[52px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              {/* Empty header for checkbox column */}
            </div>
          </div>

          {/* Report ID */}
          <div className="flex flex-col w-[196px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              <div className="flex gap-1 items-center">
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
            </div>
          </div>

          {/* Bot and Policy Version */}
          <div className="flex flex-col w-[196px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Bot and Policy Version</p>
            </div>
          </div>

          {/* Created */}
          <div className="flex flex-col w-[116px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Created</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Status</p>
            </div>
          </div>

          {/* Overall Readiness */}
          <div className="flex flex-col flex-1">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-1 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Overall Readiness</p>
              <HelpIcon className="w-4 h-4 text-theme-muted" />
            </div>
          </div>

          {/* Pillar I */}
          <div className="flex flex-col">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-1 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Pillar I</p>
              <HelpIcon className="w-4 h-4 text-theme-muted" />
            </div>
          </div>

          {/* Pillar II */}
          <div className="flex flex-col">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-1 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Pillar II</p>
              <HelpIcon className="w-4 h-4 text-theme-muted" />
            </div>
          </div>

          {/* ASR */}
          <div className="flex flex-col">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-1 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">ASR</p>
              <HelpIcon className="w-4 h-4 text-theme-muted" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col flex-1">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary h-11 px-6 py-3" />
          </div>
        </div>

        {/* Rows */}
        {paginatedReports.map((report, index) => {
          const isEven = index % 2 === 0;
          const bgClass = isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card";
          const isSelected = selectedIds?.has(report.id) ?? false;

          return (
            <div
              key={report.id}
              className={`${bgClass} flex items-start border-b border-theme-primary cursor-pointer hover:bg-theme-hover transition-colors w-full`}
              onClick={() => onRowClick?.(report)}
            >
              {/* Checkbox */}
              <div className="w-[52px] flex gap-3 h-18 items-center justify-center px-6 py-4">
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(report.id)}
                />
              </div>

              {/* Report ID */}
              <div className="w-[196px] flex gap-3 h-18 items-center px-6 py-4">
                <p className="font-medium text-[14px] leading-[20px] text-theme-primary">{report.id}</p>
              </div>

              {/* Bot and Policy Version */}
              <div className="w-[196px] flex flex-col h-18 justify-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-theme-primary">{report.botVersion}</p>
                <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">{report.policyVersion}</p>
              </div>

              {/* Created */}
              <div className="w-[116px] flex h-18 items-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">{report.created}</p>
              </div>

              {/* Status */}
              <div className="flex h-18 items-center px-6 py-4">
                <Badge variant={getStatusVariant(report.status)}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </Badge>
              </div>

              {/* Overall Readiness */}
              <div className="flex-1 flex gap-3 h-18 items-center px-6 py-4">
                {report.overallReadiness !== undefined ? (
                  <>
                    <div className="flex-1 h-2 relative rounded-lg bg-theme-muted border border-[var(--color-success)]">
                      <div
                        className="absolute h-2 bg-[var(--color-success)] opacity-40 border border-[var(--color-success)] rounded-lg"
                        style={{ width: `${(report.overallReadiness / 5) * 100}%` }}
                      />
                    </div>
                    <p className="font-normal text-[14px] leading-[20px] text-theme-secondary whitespace-nowrap">
                      {report.overallReadiness.toFixed(1)}
                    </p>
                  </>
                ) : (
                  <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">-</p>
                )}
              </div>

              {/* Pillar I */}
              <div className="flex h-18 items-center justify-center px-6 py-4">
                {report.pillarI !== undefined ? (
                  <Badge variant={getPillarVariant(report.pillarI)}>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {report.pillarI.toFixed(1)}
                      <span className="font-normal">/ 5</span>
                    </span>
                  </Badge>
                ) : (
                  <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">-</p>
                )}
              </div>

              {/* Pillar II */}
              <div className="flex h-18 items-center justify-center px-6 py-4">
                {report.pillarII !== undefined ? (
                  <Badge variant={getPillarVariant(report.pillarII)}>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {report.pillarII.toFixed(1)}
                      <span className="font-normal">/ 5</span>
                    </span>
                  </Badge>
                ) : (
                  <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">-</p>
                )}
              </div>

              {/* ASR */}
              <div className="flex h-18 items-center justify-center px-6 py-4">
                {report.asr !== undefined ? (
                  <Badge variant={report.asrTrend === "up" ? "success" : report.asrTrend === "down" ? "warning" : "neutral"}>
                    <span className="flex items-center gap-1">
                      {report.asrTrend === "up" && <ChevronDownIcon className="w-3 h-3 rotate-180" stroke="currentColor" />}
                      {report.asrTrend === "down" && <ChevronDownIcon className="w-3 h-3" stroke="currentColor" />}
                      {report.asr.toFixed(1)}%
                    </span>
                  </Badge>
                ) : (
                  <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">-</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex-1 flex gap-1 h-18 items-center justify-end px-4 py-4">
                <button
                  className="p-2.5 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity text-theme-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle action
                  }}
                >
                  <MoreVerticalIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="border-t border-theme-primary flex items-center justify-between px-6 py-3 w-full">
        <div className="flex gap-3 items-start">
          <button 
            className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed"
            onClick={handlePreviousPage}
            disabled={!canGoPrevious}
          >
            <p className={`font-semibold text-[14px] leading-[20px] ${canGoPrevious ? "text-theme-secondary" : "text-theme-muted"}`}>
              Previous
            </p>
          </button>
          <button 
            className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={!canGoNext}
          >
            <p className={`font-semibold text-[14px] leading-[20px] ${canGoNext ? "text-theme-secondary" : "text-theme-muted"}`}>
              Next
            </p>
          </button>
        </div>
        <p className="font-medium text-[14px] leading-[20px] text-theme-secondary">
          Page {currentPage} of {totalPages || 1}
        </p>
      </div>
    </div>
  );
}
