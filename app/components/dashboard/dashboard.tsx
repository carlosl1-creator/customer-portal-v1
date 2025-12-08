import React from "react";
import { Button } from "~/components/button/button";
import { PlusIcon, CompareIcon } from "~/components/icons/icons";
import { RatingCard } from "~/components/cards/rating-card/rating-card";
import { PillarScoreCard } from "~/components/cards/pillar-score-card/pillar-score-card";
import { ReportsFilterBar } from "~/components/filters/reports-filter-bar/reports-filter-bar";
import { ReportsTable } from "~/components/tables/reports-table/reports-table";
import type { Report } from "~/components/tables/reports-table/reports-table";
import {
  MOCK_REPORTS,
  MOCK_OVERALL_READINESS,
  MOCK_PILLAR_I_CARD,
  MOCK_PILLAR_II_CARD,
  MOCK_PILLAR_I_BAR_DATA,
  MOCK_PILLAR_II_BAR_DATA,
} from "~/mocks";
import { logger } from "~/utils/logger";

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
  // In production, this would come from props or a data fetching hook
  const reports = MOCK_REPORTS;

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
              title={MOCK_OVERALL_READINESS.title}
              subtitle={MOCK_OVERALL_READINESS.subtitle}
              rating={MOCK_OVERALL_READINESS.rating}
              description={MOCK_OVERALL_READINESS.description}
              className="flex-1 w-full h-full"
            />
          </div>

          {/* Pillar I Score */}
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <PillarScoreCard
              title={MOCK_PILLAR_I_CARD.title}
              subtitle={MOCK_PILLAR_I_CARD.subtitle}
              score={MOCK_PILLAR_I_CARD.score}
              status={MOCK_PILLAR_I_CARD.status}
              barData={MOCK_PILLAR_I_BAR_DATA}
              className="flex-1 w-full h-full"
            />
          </div>

          {/* Pillar II Score */}
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <PillarScoreCard
              title={MOCK_PILLAR_II_CARD.title}
              subtitle={MOCK_PILLAR_II_CARD.subtitle}
              score={MOCK_PILLAR_II_CARD.score}
              status={MOCK_PILLAR_II_CARD.status}
              barData={MOCK_PILLAR_II_BAR_DATA}
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
          onDateRangeChange={() => logger.debug("Date range changed")}
          onPolicyRemove={(policy) => logger.debug("Policy removed:", policy)}
          onMoreFiltersClick={() => logger.debug("More filters clicked")}
          onSearchChange={(value) => logger.debug("Search changed:", value)}
        />

        {/* Reports Table */}
        <ReportsTable reports={reports} onRowClick={onReportClick} />
      </div>
    </div>
  );
}
