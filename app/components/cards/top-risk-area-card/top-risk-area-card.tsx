import React from "react";
import { RiskAreasTable } from "~/components/tables/risk-areas-table/risk-areas-table";
import type { RiskAreaCase } from "~/components/tables/risk-areas-table/risk-areas-table";
import { Pagination } from "~/components/pagination/pagination";
import { HelpIcon } from "~/components/icons/icons";

export interface TopRiskAreaCardProps {
  number: number;
  title: string;
  threatLevel: string; // e.g., "High", "Medium", "Low"
  asrPercentage: number;
  highRiskCases: number;
  priority: string; // e.g., "High", "Medium", "Low"
  avgTurns: number; // Float from 1 to 5
  avgTurnLength: number;
  keyInsights: string[];
  cases: RiskAreaCase[];
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onRowClick?: (caseItem: RiskAreaCase) => void;
  className?: string;
}

export function TopRiskAreaCard({
  number,
  title,
  threatLevel,
  asrPercentage,
  highRiskCases,
  priority,
  avgTurns,
  avgTurnLength,
  keyInsights,
  cases,
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onRowClick,
  className = "",
}: TopRiskAreaCardProps) {
  const getThreatLevelBadgeColor = (level: string) => {
    const lower = level.toLowerCase();
    if (lower === "high") return { bg: "var(--color-error-bg)", text: "var(--color-error-text)", dot: "var(--color-error)" };
    if (lower === "medium") return { bg: "var(--color-warning-bg)", text: "var(--color-warning-text)", dot: "var(--color-warning)" };
    return { bg: "var(--color-success-bg)", text: "var(--color-success-text)", dot: "var(--color-success)" };
  };

  const getPriorityBadgeColor = (priority: string) => {
    const lower = priority.toLowerCase();
    if (lower === "high") return { bg: "var(--color-error-bg)", text: "var(--color-error-text)", dot: "var(--color-error)" };
    if (lower === "medium") return { bg: "var(--color-warning-bg)", text: "var(--color-warning-text)", dot: "var(--color-warning)" };
    return { bg: "var(--color-success-bg)", text: "var(--color-success-text)", dot: "var(--color-success)" };
  };

  const threatBadge = getThreatLevelBadgeColor(threatLevel);
  const priorityBadge = getPriorityBadgeColor(priority);

  return (
    <div
      className={`border border-theme-primary rounded-[12px] flex flex-col gap-6 p-8 bg-theme-card ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2.5 items-center">
          <p className="font-normal text-[20px] leading-[30px] text-theme-primary">
            {number}. {title}
          </p>
          {/* Threat Level Badge */}
          <div
            className="inline-flex gap-1.5 items-center justify-center pl-2.5 pr-3 py-1 rounded-[16px]"
            style={{ backgroundColor: threatBadge.bg }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: threatBadge.dot }}
            />
            <p
              className="font-medium text-[14px] leading-[20px] text-center tracking-[-0.28px]"
              style={{ color: threatBadge.text }}
            >
              {threatLevel}
            </p>
          </div>
          {/* ASR Percentage Badge */}
          <div className="bg-[var(--color-info-bg)] inline-flex gap-1.5 items-center justify-center pl-2.5 pr-3 py-1 rounded-[16px]">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <p className="font-medium text-[14px] leading-[20px] text-center tracking-[-0.28px] text-[var(--color-primary)]">
              {asrPercentage}% ASR
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          {/* Disabled button placeholder */}
          <button
            disabled
            className="bg-theme-card border border-theme-primary rounded-[8px] px-3.5 py-2 opacity-50 cursor-not-allowed"
          >
            <p className="font-semibold text-[14px] leading-[20px] text-theme-muted">
              Previous
            </p>
          </button>
          {/* Active button placeholder */}
          <button className="bg-theme-card border border-theme-secondary rounded-[8px] px-3.5 py-2 hover:bg-theme-hover transition-colors cursor-pointer">
            <p className="font-semibold text-[14px] leading-[20px] text-theme-secondary">
              Next
            </p>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex gap-124 items-start">
        {/* Group 1: High Risk Cases and Avg. Turns */}
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex gap-2.5 h-8 items-center">
            <p className="font-medium text-[16px] leading-[24px] text-theme-secondary">
              High Risk Cases:
            </p>
            <p className="font-normal text-[16px] leading-[24px] text-theme-primary">
              {highRiskCases}
            </p>
          </div>
          <div className="flex gap-2.5 h-8 items-center">
            <p className="font-medium text-[16px] leading-[24px] text-theme-secondary">
              Avg. Turns:
            </p>
            <div className="bg-[var(--color-info-bg)] inline-flex gap-1.5 items-center justify-center pl-2.5 pr-3 py-1 rounded-[16px]">
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
              <p className="font-medium text-[14px] leading-[20px] text-center tracking-[-0.28px] text-[var(--color-primary)]">
                {avgTurns.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Group 2: Priority and Avg. Turn Length */}
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex gap-2.5 h-8 items-center">
            <p className="font-medium text-[16px] leading-[24px] text-theme-secondary">
              Priority:
            </p>
            <div
              className="inline-flex gap-1 items-center justify-center pl-3 pr-2.5 py-1 rounded-[16px]"
              style={{ backgroundColor: priorityBadge.bg }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                style={{ stroke: priorityBadge.text }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
              <p
                className="font-medium text-[14px] leading-[20px] text-center"
                style={{ color: priorityBadge.text }}
              >
                {priority}
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 h-8 items-center">
            <p className="font-medium text-[16px] leading-[24px] text-theme-secondary">
              Avg. Turn Length:
            </p>
            <div className="bg-[var(--color-info-bg)] inline-flex gap-1.5 items-center justify-center pl-2.5 pr-3 py-1 rounded-[16px]">
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
              <p className="font-medium text-[14px] leading-[20px] text-center tracking-[-0.28px] text-[var(--color-primary)]">
                {avgTurnLength}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="flex flex-col gap-1.5 items-start text-theme-secondary text-[16px]">
        <p className="font-medium leading-[24px]">Key Insights</p>
        <ul className="block font-normal leading-[0] whitespace-pre-wrap list-disc pl-6">
          {keyInsights.map((insight, index) => (
            <li key={index} className={index < keyInsights.length - 1 ? "mb-0" : ""}>
              <span className="leading-[24px]">{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Table */}
      <RiskAreasTable
        cases={cases}
        onRowClick={onRowClick}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
}
