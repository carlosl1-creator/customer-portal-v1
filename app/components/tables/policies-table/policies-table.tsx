import React from "react";
import { Badge } from "~/components/badge/badge";
import { ChevronUpIcon, ChevronDownIcon, EditIcon, TrashIcon } from "~/components/icons/icons";

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
}

const getStatusVariant = (status: PolicyStatus): "active" | "draft" | "archive" => {
  return status;
};

export function PoliciesTable({ policies, onEdit, onDelete, className = "" }: PoliciesTableProps) {
  const [sortColumn, setSortColumn] = React.useState<string | null>("version");
  const [sortDirection, setSortDirection] = React.useState<"up" | "down">("down");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "up" ? "down" : "up");
    } else {
      setSortColumn(column);
      setSortDirection("down");
    }
  };

  return (
    <div className={`bg-theme-card border border-theme-primary rounded-[12px] overflow-hidden w-full ${className}`}>
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="bg-theme-card flex items-start border-b border-theme-primary w-full">
          {/* Name */}
          <div className="flex flex-col flex-1 min-w-[200px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Name</p>
            </div>
          </div>

          {/* Version */}
          <div className="flex flex-col min-w-[120px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-1 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Version</p>
              <button
                onClick={() => handleSort("version")}
                className="p-0 border-0 bg-transparent cursor-pointer text-theme-secondary"
              >
                {sortColumn === "version" && sortDirection === "up" ? (
                  <ChevronUpIcon className="w-2.5 h-2.5" />
                ) : (
                  <ChevronDownIcon className="w-2.5 h-2.5" />
                )}
              </button>
            </div>
          </div>

          {/* Created */}
          <div className="flex flex-col min-w-[140px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Created</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col min-w-[120px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Status</p>
            </div>
          </div>

          {/* Reports */}
          <div className="flex flex-col min-w-[100px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Reports</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 min-w-[200px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Content</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col min-w-[160px]">
            <div className="bg-[var(--color-table-header-bg)] border-b border-theme-primary h-11 px-6 py-3" />
          </div>
        </div>

        {/* Rows */}
        {policies.map((policy, index) => {
          const isEven = index % 2 === 0;
          const bgClass = isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card";

          return (
            <div
              key={policy.id}
              className={`${bgClass} flex items-start border-b border-theme-primary w-full`}
            >
              {/* Name */}
              <div className="flex-1 min-w-[200px] flex h-18 items-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-theme-primary">{policy.name}</p>
              </div>

              {/* Version */}
              <div className="min-w-[120px] flex h-18 items-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-theme-primary">{policy.version}</p>
              </div>

              {/* Created */}
              <div className="min-w-[140px] flex h-18 items-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">{policy.created}</p>
              </div>

              {/* Status */}
              <div className="min-w-[120px] flex h-18 items-center px-6 py-4">
                <Badge variant={getStatusVariant(policy.status)}>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "currentColor" }} />
                    {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                  </span>
                </Badge>
              </div>

              {/* Reports */}
              <div className="min-w-[100px] flex h-18 items-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">{policy.reports}</p>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-[200px] flex h-18 items-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-theme-secondary whitespace-pre-wrap">
                  {policy.content}
                </p>
              </div>

              {/* Actions */}
              <div className="min-w-[160px] flex gap-3 h-18 items-center justify-end px-6 py-4">
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
      <div className="border-t border-theme-primary flex items-center justify-between px-6 py-4 w-full">
        <div className="flex gap-3 items-start">
          <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
            <p className="font-medium text-[12px] leading-[18px] text-theme-muted">Previous</p>
          </button>
          <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
            <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">Next</p>
          </button>
        </div>
        <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">All 34 Selected Page 1 of 5</p>
      </div>
    </div>
  );
}
