/**
 * CategoryDistributionContent - Modal content showing category distribution
 * with a radar chart and detailed statistics table.
 */

import React, { useState } from "react";
import { HelpIcon, ChevronLeftIcon, ChevronRightIcon, ArrowUpRightIcon } from "~/components/icons/icons";
import { DotBadge, type DotBadgeVariant } from "~/components/badge/dot-badge";

// ============================================================================
// Types
// ============================================================================

export type Priority = "high" | "medium" | "low";

export interface CategoryData {
  id: string;
  name: string;
  priority: Priority;
  asrPercentage: number;
  asrCount: string; // e.g., "32 / 50"
  avgTurns: number;
  avgTurnLength: number;
}

export interface RadarDataPoint {
  label: string;
  value: number; // 0-100
}

export interface CategoryDistributionContentProps {
  title: string;
  subtitle: string;
  chartTitle?: string;
  chartSubtitle?: string;
  radarData?: RadarDataPoint[];
  categories: CategoryData[];
  onRowClick?: (category: CategoryData) => void;
  className?: string;
}

// ============================================================================
// Constants
// ============================================================================

const PRIORITY_VARIANTS: Record<Priority, DotBadgeVariant> = {
  high: "danger",
  medium: "warning",
  low: "success",
};

const ASR_VARIANT_THRESHOLDS = {
  danger: 50,
  warning: 25,
  info: 10,
};

const ITEMS_PER_PAGE = 4;

// ============================================================================
// Utility Functions
// ============================================================================

function getAsrVariant(percentage: number): DotBadgeVariant {
  if (percentage >= ASR_VARIANT_THRESHOLDS.danger) return "danger";
  if (percentage >= ASR_VARIANT_THRESHOLDS.warning) return "warning";
  if (percentage >= ASR_VARIANT_THRESHOLDS.info) return "info";
  return "success";
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================================
// Sub-Components
// ============================================================================

function ChartNavigationButtons({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}) {
  return (
    <div className="flex border border-theme-primary rounded-lg overflow-hidden">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`px-3 py-2.5 bg-theme-card border-r border-theme-primary transition-opacity ${
          hasPrevious ? "cursor-pointer hover:opacity-80" : "opacity-50 cursor-not-allowed"
        }`}
      >
        <ChevronLeftIcon className="w-5 h-5 text-theme-muted" />
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`px-3 py-2.5 bg-theme-card transition-opacity ${
          hasNext ? "cursor-pointer hover:opacity-80" : "opacity-50 cursor-not-allowed"
        }`}
      >
        <ChevronRightIcon className="w-5 h-5 text-theme-secondary" />
      </button>
    </div>
  );
}

function RadarChartPanel({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: RadarDataPoint[];
}) {
  const [chartIndex, setChartIndex] = useState(0);

  // Calculate radar points for SVG - larger chart
  const centerX = 163;
  const centerY = 128;
  const maxRadius = 110;
  const levels = 4;

  const angleStep = (2 * Math.PI) / data.length;
  const startAngle = -Math.PI / 2; // Start from top

  // Generate grid circles
  const gridCircles = Array.from({ length: levels }, (_, i) => {
    const radius = ((i + 1) / levels) * maxRadius;
    return (
      <circle
        key={i}
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="var(--color-border-primary)"
        strokeWidth="1"
        opacity="0.5"
      />
    );
  });

  // Generate radar lines from center to each point
  const radarLines = data.map((_, index) => {
    const angle = startAngle + index * angleStep;
    const x = centerX + maxRadius * Math.cos(angle);
    const y = centerY + maxRadius * Math.sin(angle);
    return (
      <line
        key={index}
        x1={centerX}
        y1={centerY}
        x2={x}
        y2={y}
        stroke="var(--color-border-primary)"
        strokeWidth="1"
        opacity="0.5"
      />
    );
  });

  // Generate data polygon
  const polygonPoints = data
    .map((point, index) => {
      const angle = startAngle + index * angleStep;
      const radius = (point.value / 100) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  // Generate labels
  const labels = data.map((point, index) => {
    const angle = startAngle + index * angleStep;
    const labelRadius = maxRadius + 20;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    
    // Adjust text anchor based on position
    let textAnchor: "start" | "middle" | "end" = "middle";
    if (Math.abs(Math.cos(angle)) > 0.3) {
      textAnchor = Math.cos(angle) > 0 ? "start" : "end";
    }

    return (
      <text
        key={index}
        x={x}
        y={y}
        textAnchor={textAnchor}
        dominantBaseline="middle"
        className="fill-theme-secondary text-[11px]"
      >
        {point.label}
      </text>
    );
  });

  return (
    <div className="border border-theme-primary rounded-xl p-6 flex flex-col justify-between h-[378px] min-w-[375px]">
      {/* Header */}
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[16px] leading-[24px] text-theme-primary">
              {title}
            </span>
            <HelpIcon className="w-4 h-4 text-theme-muted" />
          </div>
          <span className="text-[12px] leading-[18px] text-theme-secondary">
            {subtitle}
          </span>
        </div>
        <ChartNavigationButtons
          onPrevious={() => setChartIndex((prev) => Math.max(0, prev - 1))}
          onNext={() => setChartIndex((prev) => prev + 1)}
          hasPrevious={chartIndex > 0}
          hasNext={true}
        />
      </div>

      {/* Radar Chart */}
      <div className="flex items-end justify-end flex-1 w-full">
        <svg width="327" height="256" viewBox="0 0 327 256">
          {gridCircles}
          {radarLines}
          <polygon
            points={polygonPoints}
            fill="rgba(178, 221, 255, 0.5)"
            stroke="#1570EF"
            strokeWidth="2"
          />
          {labels}
        </svg>
      </div>
    </div>
  );
}

function TableHeader({ children, showHelp = false, showSort = false }: { 
  children: React.ReactNode; 
  showHelp?: boolean;
  showSort?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-medium text-[12px] leading-[18px] text-theme-secondary">
        {children}
      </span>
      {showHelp && <HelpIcon className="w-4 h-4 text-theme-muted" />}
      {showSort && (
        <svg className="w-2.5 h-2.5 text-theme-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      )}
    </div>
  );
}

function CategoriesTablePanel({
  categories,
  onRowClick,
}: {
  categories: CategoryData[];
  onRowClick?: (category: CategoryData) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCategories = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-theme-card border border-theme-primary rounded-xl overflow-hidden flex flex-col flex-1">
      {/* Table */}
      <div className="flex">
        {/* Category Column */}
        <div className="flex flex-col min-w-[140px]">
          <div className="bg-theme-card border-b border-theme-primary h-[44px] px-6 py-3 flex items-center">
            <TableHeader>Category</TableHeader>
          </div>
          {currentCategories.map((cat, index) => (
            <div
              key={cat.id}
              className={`h-[72px] px-6 py-4 flex items-center border-b border-theme-primary ${
                index % 2 === 0 ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
              }`}
            >
              <span className="text-[14px] leading-[20px] text-theme-primary whitespace-nowrap">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Priority Column */}
        <div className="flex flex-col min-w-[110px]">
          <div className="bg-theme-card border-b border-theme-primary h-[44px] px-6 py-3 flex items-center">
            <TableHeader showHelp>Priority</TableHeader>
          </div>
          {currentCategories.map((cat, index) => (
            <div
              key={cat.id}
              className={`h-[72px] px-6 py-4 flex items-center border-b border-theme-primary ${
                index % 2 === 0 ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
              }`}
            >
              <DotBadge variant={PRIORITY_VARIANTS[cat.priority]}>
                {capitalizeFirst(cat.priority)}
              </DotBadge>
            </div>
          ))}
        </div>

        {/* ASR Column */}
        <div className="flex flex-col min-w-[100px]">
          <div className="bg-theme-card border-b border-theme-primary h-[44px] px-6 py-3 flex items-center">
            <TableHeader showHelp showSort>ASR</TableHeader>
          </div>
          {currentCategories.map((cat, index) => (
            <div
              key={cat.id}
              className={`h-[72px] px-6 py-4 flex flex-col gap-1 justify-center border-b border-theme-primary ${
                index % 2 === 0 ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
              }`}
            >
              <DotBadge variant={getAsrVariant(cat.asrPercentage)}>
                {cat.asrPercentage}%
              </DotBadge>
              <span className="text-[12px] leading-[18px] text-theme-muted whitespace-nowrap">
                {cat.asrCount}
              </span>
            </div>
          ))}
        </div>

        {/* Chat and Turn Length Column */}
        <div className="flex flex-col min-w-[160px]">
          <div className="bg-theme-card border-b border-theme-primary h-[44px] px-6 py-3 flex items-center">
            <TableHeader showHelp>Chat and Turn Length</TableHeader>
          </div>
          {currentCategories.map((cat, index) => (
            <div
              key={cat.id}
              className={`h-[72px] px-6 py-4 flex flex-col justify-center border-b border-theme-primary ${
                index % 2 === 0 ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
              }`}
            >
              <span className="font-medium text-[14px] leading-[20px] text-theme-primary">
                {cat.avgTurns.toFixed(2)}
              </span>
              <span className="text-[14px] leading-[20px] text-theme-secondary">
                {cat.avgTurnLength.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Action Column */}
        <div className="flex flex-col min-w-[56px]">
          <div className="bg-theme-card border-b border-theme-primary h-[44px] w-[56px]" />
          {currentCategories.map((cat, index) => (
            <div
              key={cat.id}
              className={`h-[72px] p-4 flex items-center justify-center border-b border-theme-primary ${
                index % 2 === 0 ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
              }`}
            >
              <button
                onClick={() => onRowClick?.(cat)}
                className="p-2.5 rounded-lg hover:bg-theme-tertiary transition-colors cursor-pointer bg-transparent border-0"
              >
                <ArrowUpRightIcon className="w-5 h-5 text-theme-secondary" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t border-theme-primary px-6 py-3 flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`text-[12px] leading-[18px] font-medium bg-transparent border-0 ${
              currentPage === 1 ? "text-theme-muted cursor-not-allowed" : "text-theme-secondary cursor-pointer"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`text-[12px] leading-[18px] font-medium bg-transparent border-0 ${
              currentPage === totalPages ? "text-theme-muted cursor-not-allowed" : "text-theme-secondary cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
        <span className="text-[12px] leading-[18px] text-theme-secondary">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function CategoryDistributionContent({
  title,
  subtitle,
  chartTitle = "Vulnerabilities Found",
  chartSubtitle = "Across top categories",
  radarData = [],
  categories,
  onRowClick,
  className = "",
}: CategoryDistributionContentProps) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col gap-[18px]">
        <h2 className="font-semibold text-[30px] leading-[38px] text-theme-primary">
          {title}
        </h2>
        <p className="text-[18px] leading-[28px] tracking-[-0.36px] text-theme-secondary max-w-[597px]">
          {subtitle}
        </p>
      </div>

      {/* Content - Larger chart and table with proper gap */}
      <div className="flex gap-4 items-stretch">
        <RadarChartPanel
          title={chartTitle}
          subtitle={chartSubtitle}
          data={radarData}
        />
        <CategoriesTablePanel
          categories={categories}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  );
}

