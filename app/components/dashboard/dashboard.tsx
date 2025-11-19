import React from "react";
import { Button } from "~/components/button/button";
import { PlusIcon, CompareIcon } from "~/components/icons/icons";
import { RatingCard } from "~/components/cards/rating-card/rating-card";
import { PillarScoreCard } from "~/components/cards/pillar-score-card/pillar-score-card";
import { ReportsFilterBar } from "~/components/filters/reports-filter-bar/reports-filter-bar";
import { ReportsTable } from "~/components/tables/reports-table/reports-table";
import type { Report } from "~/components/tables/reports-table/reports-table";

export interface DashboardProps {
  userName?: string;
  lastReportDate?: string;
  lastReportBot?: string;
  lastReportPolicy?: string;
  onCreateReport?: () => void;
  onCompareReports?: () => void;
  onReportClick?: (report: Report) => void;
}

export function Dashboard({
  userName = "John Doe",
  lastReportDate = "8/3/2025",
  lastReportBot = "Chatbot Model 2.1",
  lastReportPolicy = "Acme Inc. Content Policy 4.2",
  onCreateReport,
  onCompareReports,
  onReportClick,
}: DashboardProps) {
  const mockReports: Report[] = [
    {
      id: "5321",
      botVersion: "Content Model 2.1",
      policyVersion: "Policy 4.2",
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
      botVersion: "Content Model 2.0",
      policyVersion: "Policy 3.1",
      created: "7/16/2025",
      status: "processing",
      overallReadiness: undefined,
      pillarI: undefined,
      pillarII: undefined,
      asr: undefined,
    },
    {
      id: "1427",
      botVersion: "Content Model 1.0",
      policyVersion: "Policy 3.0",
      created: "7/1/2025",
      status: "churned",
      overallReadiness: 3.4,
      pillarI: 3.7,
      pillarII: 4.0,
      asr: 16.3,
      asrTrend: "down",
    },
  ];

  return (
    <div className="flex flex-col gap-8 items-start w-full pb-12 pt-8 px-0">
      {/* Header Section */}
      <div className="flex flex-col gap-6 items-start w-full px-8">
        <div className="flex flex-col gap-5 items-start w-full">
          <div className="flex gap-4 items-start w-full">
            {/* Text Content */}
            <div className="flex flex-1 flex-col gap-1 items-start">
              <h1 className="font-semibold text-[30px] leading-[38px] text-[#181d27]">
                Welcome back, {userName}
              </h1>
              <p className="font-normal text-[16px] leading-[24px] text-[#535862]">
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
                icon={<CompareIcon stroke="#181d27" />}
                text="Compare Reports"
                variant="secondary"
                onClick={onCompareReports}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#e9eaeb]" />

      {/* Your Last Report Section */}
      <div className="flex flex-col gap-6 items-start w-full px-8">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-medium text-[20px] leading-[30px] text-[#181d27]">Your Last Report</h2>
          <div className="flex flex-col font-normal items-start leading-[24px] text-[#535862] text-[16px]">
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
              rating={4.1}
              description="Effectively enforces policies against direct violations but consistently struggles with nuanced evasion and obfuscation tactics."
              className="flex-1 w-full h-full"
            />
          </div>

          {/* Pillar I Score */}
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <PillarScoreCard
              title="Pillar I Score"
              subtitle="Aggregated score across safety, security, and fraud."
              score={4.3}
              status="success"
              barData={[
                { label: "Your Model", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
                { label: "SomeAI Model-5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
                { label: "Other Model 4.5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
              ]}
              className="flex-1 w-full h-full"
            />
          </div>

          {/* Pillar II Score */}
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <PillarScoreCard
              title="Pillar II Score"
              subtitle="Focused score on brand value and correctness"
              score={3.5}
              status="warning"
              barData={[
                { label: "Your Model", value: 72, color: "#FEDF89", borderColor: "#DC6803" },
                { label: "SomeAI Model-5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
                { label: "Other Model 4.5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
              ]}
              className="flex-1 w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#e9eaeb]" />

      {/* All Past Reports Section */}
      <div className="flex flex-col gap-6 items-start w-full px-8">
        <div className="flex flex-col gap-1 items-start">
          <h2 className="font-medium text-[20px] leading-[30px] text-[#181d27]">All Past Reports</h2>
        </div>

        {/* Filter Bar */}
        <ReportsFilterBar
          dateRange="Jan 6, 2022 – Jan 13, 2022"
          policies={["Policy 3.0", "Policy 3.1"]}
          onDateRangeChange={() => console.log("Date range changed")}
          onPolicyRemove={(policy) => console.log("Policy removed:", policy)}
          onMoreFiltersClick={() => console.log("More filters clicked")}
          onSearchChange={(value) => console.log("Search changed:", value)}
        />

        {/* Reports Table */}
        <ReportsTable reports={mockReports} onRowClick={onReportClick} />
      </div>
    </div>
  );
}

