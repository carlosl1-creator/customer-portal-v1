import type { Route } from "./+types/compare-reports";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { ReportsFilterBar } from "~/components/filters/reports-filter-bar/reports-filter-bar";
import { SelectableReportsTable, type SelectableReport } from "~/components/tables/selectable-reports-table/selectable-reports-table";
import { BenchmarksTable, type Benchmark } from "~/components/tables/benchmarks-table/benchmarks-table";
import { ArrowUpRightIcon } from "~/components/icons/icons";
import { Pill } from "~/components/pill/pill";
import {
  useAppSelector,
  selectAllReports,
  selectAllChatbots,
  type Report as ReduxReport,
} from "~/store";
import { ROUTES } from "~/constants/routes";
import { logger } from "~/utils/logger";

/**
 * Transform Redux Report to SelectableReport format
 */
function transformReportForTable(report: ReduxReport): SelectableReport {
  // Format date from ISO to readable format
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Map Redux status to table status
  const mapStatus = (status: string): "completed" | "processing" | "churned" => {
    switch (status) {
      case "completed":
        return "completed";
      case "running":
      case "pending":
        return "processing";
      case "failed":
        return "churned";
      default:
        return "churned";
    }
  };

  // Convert 0-100 score to 0-5 scale
  const convertScore = (score: number): number => {
    return Number(((score / 100) * 5).toFixed(1));
  };

  const isCompleted = report.status === "completed";

  return {
    id: report.id.split("-")[0], // Shorter ID for display
    botVersion: `${report.chatbot_name} ${report.chatbot_version}`,
    policyVersion: `${report.policy_name} ${report.policy_version}`,
    created: formatDate(report.created_at),
    status: mapStatus(report.status),
    overallReadiness: isCompleted ? convertScore(report.readiness_score) : undefined,
    pillarI: isCompleted ? convertScore(report.p1.p1_score) : undefined,
    pillarII: isCompleted ? convertScore(report.p2.p2_score) : undefined,
    asr: isCompleted ? report.attack_success_rate.weighted_asr : undefined,
    asrTrend: isCompleted ? "neutral" : undefined,
    disabled: report.status !== "completed", // Disable non-completed reports
  };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Compare Reports - Reinforce Labs" },
    { name: "description", content: "Compare the performance of two models across test cases" },
  ];
}

export default function CompareReports() {
  const navigate = useNavigate();
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());
  const [selectedBenchmarks, setSelectedBenchmarks] = useState<Set<string>>(new Set());

  // Get data from Redux store
  const reduxReports = useAppSelector(selectAllReports);
  const chatbots = useAppSelector(selectAllChatbots);

  // Transform Redux reports to SelectableReport format
  const reports: SelectableReport[] = useMemo(() => 
    reduxReports.map(transformReportForTable),
    [reduxReports]
  );

  // Transform chatbots to Benchmark format
  const benchmarks: Benchmark[] = useMemo(() => 
    chatbots.map((chatbot) => ({
      id: chatbot.id.split("-")[0], // Shorter ID for display
      bot: `${chatbot.model_name} ${chatbot.model_version}`,
      description: chatbot.description,
    })),
    [chatbots]
  );

  const handleReportSelection = (id: string, selected: boolean) => {
    const newSet = new Set(selectedReports);
    if (selected) {
      newSet.add(id);
      // If we now have 2 reports, clear benchmarks
      if (newSet.size === 2) {
        setSelectedBenchmarks(new Set());
      }
    } else {
      newSet.delete(id);
    }
    setSelectedReports(newSet);
  };

  const handleBenchmarkSelection = (id: string, selected: boolean) => {
    const newSet = new Set(selectedBenchmarks);
    if (selected) {
      newSet.add(id);
      // If we select a benchmark, we can only have 1 report selected
      // Clear any extra reports if we have more than 1
      if (selectedReports.size > 1) {
        const firstReportId = Array.from(selectedReports)[0];
        setSelectedReports(new Set([firstReportId]));
      }
    } else {
      newSet.delete(id);
    }
    setSelectedBenchmarks(newSet);
  };

  const handleShowComparison = () => {
    // Valid combinations:
    // - 2 reports, 0 benchmarks
    // - 1 report, 1 benchmark
    const isValid = 
      (selectedReports.size === 2 && selectedBenchmarks.size === 0) ||
      (selectedReports.size === 1 && selectedBenchmarks.size === 1);
    
    if (isValid) {
      // Find the selected reports and benchmarks from the data
      const selectedReportObjects = Array.from(selectedReports)
        .map(id => reports.find(report => report.id === id))
        .filter((report): report is SelectableReport => report !== undefined);
      
      const selectedBenchmarkObjects = Array.from(selectedBenchmarks)
        .map(id => benchmarks.find(benchmark => benchmark.id === id))
        .filter((benchmark): benchmark is Benchmark => benchmark !== undefined);
      
      // Navigate to comparison view with selected items as state
      navigate(ROUTES.SHOW_COMPARISON, {
        state: {
          selectedReports: selectedReportObjects,
          selectedBenchmarks: selectedBenchmarkObjects,
        },
      });
    }
  };

  // Valid combinations:
  // - 2 reports, 0 benchmarks
  // - 1 report, 1 benchmark
  const canShowComparison = 
    (selectedReports.size === 2 && selectedBenchmarks.size === 0) ||
    (selectedReports.size === 1 && selectedBenchmarks.size === 1);

  // Benchmarks are disabled when:
  // - 0 reports selected (can't compare without at least 1 report)
  // - 2 reports selected (must use 2 reports, not 1 report + 1 benchmark)
  const benchmarksDisabled = selectedReports.size === 0 || selectedReports.size === 2;
  
  // Benchmarks can only have 1 selection, and only when exactly 1 report is selected
  const benchmarksAllowSelection = selectedReports.size === 1;

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-8 items-start w-full px-16 pt-18 pb-12">
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-normal leading-6 text-[var(--color-primary)] text-base uppercase">
            COMPARE REPORTS
          </p>
          <div className="flex flex-col gap-3 items-start w-full">
            <p className="font-semibold leading-[38px] text-theme-primary text-[30px] w-full">
              Compare Reports
            </p>
            <p className="font-normal leading-6 text-theme-secondary text-base w-full">
              Compare the performance of two models across test cases, content categories, and business impact.
              <br />
              Select two to get started.
            </p>
          </div>
        </div>

        {/* Demo Feature Pill */}
        <Pill
          label="Demo Feature"
          message="Coming Q3 2026."
          linkText="Read our roadmap"
          linkHref="#"
        />
      </div>

      {/* Main Content */}
      <div className="px-16 pb-12">
        {/* Filter Bar */}
        <div className="mb-6">
          <ReportsFilterBar
            dateRange="Jan 6, 2022 – Jan 13, 2022"
            policies={["Completed", "Processing"]}
            onDateRangeChange={(startDate, endDate) => logger.debug("Date range changed:", startDate, endDate)}
            onPoliciesClear={() => logger.debug("Policies cleared")}
            onMoreFiltersClick={() => logger.debug("More filters clicked")}
            onSearchChange={(value) => logger.debug("Search changed:", value)}
          />
        </div>

        {/* Tables Section */}
        <div className="flex gap-8 items-start w-full mb-6">
          {/* Your Reports Table - shrinks to content */}
          <SelectableReportsTable
            reports={reports}
            selectedIds={selectedReports}
            onSelectionChange={handleReportSelection}
            maxSelections={2}
            title="Your Reports"
          />

          {/* Benchmarks Table - takes remaining space */}
          <BenchmarksTable
            benchmarks={benchmarks}
            selectedIds={selectedBenchmarks}
            onSelectionChange={handleBenchmarkSelection}
            maxSelections={1}
            title="Benchmarks"
            externalDisabled={benchmarksDisabled}
            allowSelection={benchmarksAllowSelection}
          />
        </div>

        {/* Show Comparison Button */}
        <div className="flex gap-6 items-start">
          <button
            onClick={canShowComparison ? handleShowComparison : undefined}
            disabled={!canShowComparison}
            className={`box-border flex gap-2 items-center justify-center px-5 py-3 rounded-lg transition-colors ${
              canShowComparison
                ? "bg-theme-primary border border-theme-primary text-theme-inverted hover:opacity-90 cursor-pointer"
                : "bg-theme-muted border border-theme-muted text-theme-tertiary cursor-not-allowed"
            }`}
            style={{
              backgroundColor: canShowComparison ? 'var(--color-text-primary)' : 'var(--color-bg-muted)',
              borderColor: canShowComparison ? 'var(--color-text-primary)' : 'var(--color-bg-muted)',
              color: canShowComparison ? 'var(--color-text-inverted)' : 'var(--color-text-tertiary)',
            }}
          >
            <ArrowUpRightIcon className="w-5 h-5" stroke={canShowComparison ? "var(--color-text-inverted)" : "currentColor"} />
            <span className="font-semibold text-base leading-6">Show Comparison</span>
          </button>
        </div>
      </div>
    </div>
  );
}
