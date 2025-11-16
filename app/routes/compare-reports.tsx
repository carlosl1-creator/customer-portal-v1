import type { Route } from "./+types/compare-reports";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ReportsFilterBar } from "~/components/reports-filter-bar/reports-filter-bar";
import { SelectableReportsTable, type SelectableReport } from "~/components/selectable-reports-table/selectable-reports-table";
import { BenchmarksTable, type Benchmark } from "~/components/benchmarks-table/benchmarks-table";
import { ArrowUpRightIcon } from "~/components/icons/icons";

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

  const mockReports: SelectableReport[] = [
    {
      id: "5321",
      botVersion: "Content Model 2.1",
      policyVersion: "Gap Analysis",
      created: "8/18/2025",
      status: "completed",
      overallReadiness: 4.1,
      pillarI: 4.3,
      pillarII: 3.5,
      asr: 9.1,
      asrTrend: "up",
    },
    {
      id: "5243",
      botVersion: "Account Model 1.0",
      policyVersion: "Gap Analysis",
      created: "7/16/2025",
      status: "completed",
      overallReadiness: 3.8,
      pillarI: 4.0,
      pillarII: 3.2,
      asr: 8.5,
      asrTrend: "down",
    },
    {
      id: "1427",
      botVersion: "Audio Model 1.0",
      policyVersion: "Content Safety",
      created: "7/1/2025",
      status: "churned",
      overallReadiness: 3.4,
      pillarI: 3.7,
      pillarII: 4.0,
      asr: 16.3,
      asrTrend: "down",
    },
    {
      id: "5243",
      botVersion: "Account Model 1.0",
      policyVersion: "Gap Analysis",
      created: "7/16/2025",
      status: "processing",
      overallReadiness: undefined,
      pillarI: undefined,
      pillarII: undefined,
      asr: undefined,
    },
  ];

  const mockBenchmarks: Benchmark[] = [
    {
      id: "B104",
      bot: "Reinforce Labs Model 2.1",
      description: "Excels at identifying fraud, deception, and abuse",
    },
    {
      id: "B128",
      bot: "SomeAI Model 1.2",
      description: "Focuses on identifying hate speech, violence, and CSAM-related material",
    },
    {
      id: "B140",
      bot: "Another Model 2.0",
      description: "Adheres strictly to given content and branding guidelines",
    },
  ];

  const handleReportSelection = (id: string, selected: boolean) => {
    const newSet = new Set(selectedReports);
    if (selected) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setSelectedReports(newSet);
  };

  const handleBenchmarkSelection = (id: string, selected: boolean) => {
    const newSet = new Set(selectedBenchmarks);
    if (selected) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setSelectedBenchmarks(newSet);
  };

  const handleShowComparison = () => {
    const totalSelected = selectedReports.size + selectedBenchmarks.size;
    if (totalSelected === 2) {
      // Navigate to comparison view (to be implemented)
      console.log("Show comparison:", {
        reports: Array.from(selectedReports),
        benchmarks: Array.from(selectedBenchmarks),
      });
    }
  };

  const canShowComparison = selectedReports.size + selectedBenchmarks.size === 2;

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-8 items-start w-full px-16 pt-18 pb-12">
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-normal leading-6 text-[#1570ef] text-base uppercase">
            COMPARE REPORTS
          </p>
          <div className="flex flex-col gap-3 items-start w-full">
            <p className="font-semibold leading-[38px] text-[#181d27] text-[30px] w-full">
              Compare Reports
            </p>
            <p className="font-normal leading-6 text-[#535862] text-base w-full">
              Compare the performance of two models across test cases, content categories, and business impact.
              <br />
              Select two to get started.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-16 pb-12">
        {/* Filter Bar */}
        <div className="mb-6">
          <ReportsFilterBar
            dateRange="Jan 6, 2022 – Jan 13, 2022"
            policies={["Completed", "Processing"]}
            onDateRangeChange={() => console.log("Date range changed")}
            onPolicyRemove={(policy) => console.log("Policy removed:", policy)}
            onMoreFiltersClick={() => console.log("More filters clicked")}
            onSearchChange={(value) => console.log("Search changed:", value)}
          />
        </div>

        {/* Tables Section */}
        <div className="flex gap-12 items-start w-full mb-6">
          {/* Your Reports Table */}
          <div className="flex-1 min-w-0">
            <SelectableReportsTable
              reports={mockReports}
              selectedIds={selectedReports}
              onSelectionChange={handleReportSelection}
              maxSelections={2}
              title="Your Reports"
            />
          </div>

          {/* Benchmarks Table */}
          <div className="flex-1 min-w-0">
            <BenchmarksTable
              benchmarks={mockBenchmarks}
              selectedIds={selectedBenchmarks}
              onSelectionChange={handleBenchmarkSelection}
              maxSelections={2}
              title="Benchmarks"
            />
          </div>
        </div>

        {/* Show Comparison Button */}
        <div className="flex gap-6 items-start">
          <button
            onClick={canShowComparison ? handleShowComparison : undefined}
            disabled={!canShowComparison}
            className={`box-border flex gap-2 items-center justify-center px-5 py-3 rounded-lg transition-colors ${
              canShowComparison
                ? "bg-[#181d27] border border-[#181d27] text-white hover:opacity-90 cursor-pointer"
                : "bg-gray-300 border border-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ArrowUpRightIcon className="w-5 h-5" stroke={canShowComparison ? "white" : "currentColor"} />
            <span className="font-semibold text-base leading-6">Show Comparison</span>
          </button>
        </div>
      </div>
    </div>
  );
}

