import React, { useState, useMemo } from "react";
import { Button } from "~/components/button/button";
import { PlusIcon, CompareIcon } from "~/components/icons/icons";
import { RatingCard } from "~/components/cards/rating-card/rating-card";
import { PillarScoreCard } from "~/components/cards/pillar-score-card/pillar-score-card";
import { ReportsFilterBar } from "~/components/filters/reports-filter-bar/reports-filter-bar";
import { ReportsTable } from "~/components/tables/reports-table/reports-table";
import type { Report as TableReport } from "~/components/tables/reports-table/reports-table";
import {
  useAppSelector,
  selectAllReports,
  selectCompletedReports,
  type Report as ReduxReport,
} from "~/store";
import { logger } from "~/utils/logger";

/**
 * Transform Redux Report to ReportsTable Report format
 */
function transformReportForTable(report: ReduxReport, index: number, allReports: ReduxReport[]): TableReport {
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

  // Calculate ASR trend by comparing with previous report (if exists)
  const calculateAsrTrend = (): "up" | "down" | "neutral" | undefined => {
    if (report.status !== "completed") return undefined;
    
    // Find previous completed report for same chatbot/policy combo
    const previousReport = allReports
      .filter(r => 
        r.id !== report.id && 
        r.status === "completed" &&
        r.chatbot_name === report.chatbot_name &&
        new Date(r.created_at) < new Date(report.created_at)
      )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

    if (!previousReport) return "neutral";
    
    const currentAsr = report.attack_success_rate.weighted_asr;
    const previousAsr = previousReport.attack_success_rate.weighted_asr;
    
    if (currentAsr < previousAsr) return "up"; // Lower ASR is better
    if (currentAsr > previousAsr) return "down";
    return "neutral";
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
    asrTrend: calculateAsrTrend(),
  };
}

export interface DashboardProps {
  userName?: string;
  onCreateReport?: () => void;
  onCompareReports?: () => void;
  onReportClick?: (report: TableReport) => void;
}

export function Dashboard({
  userName = "User",
  onCreateReport,
  onCompareReports,
  onReportClick,
}: DashboardProps) {
  // Get reports from Redux store
  const reduxReports = useAppSelector(selectAllReports);
  const completedReports = useAppSelector(selectCompletedReports);
  
  const [selectedReportIds, setSelectedReportIds] = useState<Set<string>>(new Set());

  // Transform Redux reports to table format
  const tableReports = useMemo(() => 
    reduxReports.map((report, index) => transformReportForTable(report, index, reduxReports)),
    [reduxReports]
  );

  // Get the most recent completed report for the "Last Report" section
  const lastReport = useMemo(() => {
    if (completedReports.length === 0) return null;
    return [...completedReports].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
  }, [completedReports]);

  // Format last report date
  const lastReportDate = lastReport 
    ? new Date(lastReport.created_at).toLocaleDateString("en-US", { 
        month: "numeric", 
        day: "numeric", 
        year: "numeric" 
      })
    : "-";

  // Last report details
  const lastReportBot = lastReport 
    ? `${lastReport.chatbot_name} ${lastReport.chatbot_version}` 
    : "-";
  const lastReportPolicy = lastReport 
    ? `${lastReport.policy_name} ${lastReport.policy_version}` 
    : "-";

  // Pillar bar data derived from last report
  const pillarIBarData = useMemo(() => [
    { 
      label: "Your Model", 
      value: lastReport ? Math.round(lastReport.p1.p1_score * 1.2) : 0, 
      color: "#B2DDFF", 
      borderColor: "#1570EF" 
    },
    { label: "Industry Avg", value: 85, color: "#A6F4C5", borderColor: "#039855" },
    { label: "Top Performer", value: 98, color: "#FEDF89", borderColor: "#DC6803" },
  ], [lastReport]);

  const pillarIIBarData = useMemo(() => [
    { 
      label: "Your Model", 
      value: lastReport ? Math.round(lastReport.p2.p2_score * 1.2) : 0, 
      color: lastReport && lastReport.p2.p2_score < 80 ? "#FEDF89" : "#B2DDFF", 
      borderColor: lastReport && lastReport.p2.p2_score < 80 ? "#DC6803" : "#1570EF" 
    },
    { label: "Industry Avg", value: 78, color: "#B2DDFF", borderColor: "#1570EF" },
    { label: "Top Performer", value: 95, color: "#A6F4C5", borderColor: "#039855" },
  ], [lastReport]);

  // Convert 0-100 to 0-5 scale for display
  const convertToFiveScale = (score: number) => Number(((score / 100) * 5).toFixed(1));

  // Determine pillar status
  const getPillarStatus = (score: number): "success" | "warning" | "locked" => {
    if (score >= 85) return "success";
    if (score >= 70) return "warning";
    return "warning"; // Use warning for low scores as "locked" has different meaning
  };

  const handleReportSelection = (id: string, selected: boolean) => {
    const newSet = new Set(selectedReportIds);
    if (selected) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setSelectedReportIds(newSet);
  };

  return (
    <div className="flex flex-col gap-8 items-start w-full pb-12 pt-8 px-0">
      {/* Header Section */}
      <div className="flex flex-col gap-6 items-start w-full px-8">
        <div className="flex flex-col gap-5 items-start w-full">
          <div className="flex gap-4 items-start w-full">
            {/* Text Content */}
            <div className="flex flex-1 flex-col gap-1 items-start">
              <h1 className="font-semibold text-[30px] leading-[38px] text-theme-primary">
                Welcome back, {userName}
              </h1>
              <p className="font-normal text-[16px] leading-[24px] text-theme-secondary">
                Track, manage and create new tests and reports for your models.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 items-center">
              <Button
                icon={<PlusIcon stroke="white" />}
                text="Create Report"
                variant="primary"
                onClick={onCreateReport}
              />
              <Button
                icon={<CompareIcon className="text-theme-primary" />}
                text="Compare Reports"
                variant="secondary"
                onClick={onCompareReports}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-theme-primary border-theme-primary" style={{ backgroundColor: 'var(--color-border-primary)' }} />

      {/* Your Last Report Section */}
      <div className="flex flex-col gap-6 items-start w-full px-8">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-medium text-[20px] leading-[30px] text-theme-primary">Your Last Report</h2>
          <div className="flex flex-col font-normal items-start leading-[24px] text-theme-secondary text-[16px]">
            <p>Created {lastReportDate}</p>
            <p>
              {lastReportBot} — {lastReportPolicy}
            </p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="flex gap-6 items-center w-full">
          {/* Overall Readiness */}
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <RatingCard
              title="Overall Readiness"
              subtitle=""
              rating={lastReport ? convertToFiveScale(lastReport.readiness_score) : 0}
              description={lastReport?.readiness_text || "No completed reports yet."}
              className="flex-1 w-full h-full"
            />
          </div>

          {/* Pillar I Score */}
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <PillarScoreCard
              title="Pillar I Score"
              subtitle={lastReport?.p1.p1_text || "Aggregated score across safety, security, and fraud."}
              score={lastReport ? convertToFiveScale(lastReport.p1.p1_score) : 0}
              status={lastReport ? getPillarStatus(lastReport.p1.p1_score) : "warning"}
              barData={pillarIBarData}
              className="flex-1 w-full h-full"
            />
          </div>

          {/* Pillar II Score */}
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <PillarScoreCard
              title="Pillar II Score"
              subtitle={lastReport?.p2.p2_text || "Focused score on brand value and correctness."}
              score={lastReport ? convertToFiveScale(lastReport.p2.p2_score) : 0}
              status={lastReport ? getPillarStatus(lastReport.p2.p2_score) : "warning"}
              barData={pillarIIBarData}
              className="flex-1 w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ backgroundColor: 'var(--color-border-primary)' }} />

      {/* All Past Reports Section */}
      <div className="flex flex-col gap-6 items-start w-full px-8">
        <div className="flex flex-col gap-1 items-start">
          <h2 className="font-medium text-[20px] leading-[30px] text-theme-primary">All Past Reports</h2>
        </div>

        {/* Filter Bar */}
        <ReportsFilterBar
          dateRange="Jan 6, 2022 – Jan 13, 2022"
          policies={["Policy 3.0", "Policy 3.1"]}
          onDateRangeChange={(startDate, endDate) => logger.debug("Date range changed:", startDate, endDate)}
          onPoliciesClear={() => logger.debug("Policies cleared")}
          onMoreFiltersClick={() => logger.debug("More filters clicked")}
          onSearchChange={(value) => logger.debug("Search changed:", value)}
        />

        {/* Reports Table */}
        <ReportsTable 
          reports={tableReports} 
          onRowClick={onReportClick}
          selectedIds={selectedReportIds}
          onSelectionChange={handleReportSelection}
        />
      </div>
    </div>
  );
}
