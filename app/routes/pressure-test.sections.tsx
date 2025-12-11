/**
 * Section components for the Pressure Test page.
 * Each section is a self-contained component that renders a portion of the page.
 */

import React from "react";
import {
  SlackIcon,
  JiraIcon,
  DownloadIcon,
  ClipboardIcon,
  ChevronLeftIcon,
  CropIcon,
  FeatherIcon,
} from "~/components/icons/icons";
import { HeaderSection } from "~/components/header-section/header-section";
import { Section } from "~/components/section/section";
import { CasesCard } from "~/components/cards/cases-card/cases-card";
import { RatingCard } from "~/components/cards/rating-card/rating-card";
import { PillarScoreCard } from "~/components/cards/pillar-score-card/pillar-score-card";
import { FoundVulnerabilitiesCard } from "~/components/cards/found-vulnerabilities-card/found-vulnerabilities-card";
import { ConversationalStatisticsCard } from "~/components/cards/conversational-statistics-card/conversational-statistics-card";
import { FilterBar } from "~/components/filters/filter-bar/filter-bar";
import { TestCasesTable } from "~/components/tables/test-cases-table/test-cases-table";
import { Pagination } from "~/components/pagination/pagination";
import { TopRiskAreaCard } from "~/components/cards/top-risk-area-card/top-risk-area-card";
import { Modal } from "~/components/modal/modal";

import {
  HEADER_CONFIG,
  TOP_INSIGHTS,
  OVERALL_READINESS,
  TOTAL_CASES,
  PILLAR_SCORES,
  FOUND_VULNERABILITIES,
  CONVERSATIONAL_STATISTICS,
  FILTER_OPTIONS,
  TEST_CASES,
  TOP_RISK_AREA,
  MODAL_CONFIG,
  type ModalType,
} from "./pressure-test.data";

// ============================================================================
// Section Title Component
// ============================================================================

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-medium text-[24px] leading-[32px] text-theme-primary mb-6">
      {children}
    </h2>
  );
}

// ============================================================================
// Header Section
// ============================================================================

interface PageHeaderProps {
  onSendToSlack: () => void;
  onLinkToJira: () => void;
  onDownloadReport: () => void;
  onCopyPermalink: () => void;
  onViewAllReports: () => void;
}

export function PageHeader({
  onSendToSlack,
  onLinkToJira,
  onDownloadReport,
  onCopyPermalink,
  onViewAllReports,
}: PageHeaderProps) {
  return (
    <HeaderSection
      pageName={HEADER_CONFIG.pageName}
      title={HEADER_CONFIG.title}
      infoText={[...HEADER_CONFIG.infoText]}
      buttons={[
        {
          icon: <SlackIcon className="w-5 h-5" />,
          text: "Send to Slack",
          onClick: onSendToSlack,
        },
        {
          icon: <JiraIcon className="w-5 h-5" />,
          text: "Link to Jira",
          onClick: onLinkToJira,
        },
        {
          icon: <DownloadIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />,
          text: "Download Report",
          onClick: onDownloadReport,
        },
        {
          icon: <ClipboardIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />,
          text: "Copy Permalink",
          onClick: onCopyPermalink,
        },
      ]}
      viewAllReportsButton={{
        text: "View All Reports",
        icon: <ChevronLeftIcon className="w-5 h-5" stroke="#535862" />,
        onClick: onViewAllReports,
      }}
    />
  );
}

// ============================================================================
// Top Insights Section
// ============================================================================

interface TopInsightsSectionProps {
  onThumbsUp: (id: string) => void;
  onThumbsDown: (id: string) => void;
}

const INSIGHT_ICONS: Record<string, React.ReactNode> = {
  "model-alignment": <CropIcon className="w-6 h-6" stroke="var(--color-text-primary)" />,
  "prompt-design": <FeatherIcon className="w-6 h-6" stroke="var(--color-text-primary)" />,
};

export function TopInsightsSection({ onThumbsUp, onThumbsDown }: TopInsightsSectionProps) {
  const cards = TOP_INSIGHTS.map((insight) => ({
    icon: INSIGHT_ICONS[insight.id],
    title: insight.title,
    focusText: insight.focusText,
    listTitle: insight.listTitle,
    listItems: [...insight.listItems],
    thumbsUpActive: insight.thumbsUpActive,
    thumbsDownActive: insight.thumbsDownActive,
    onThumbsUpClick: () => onThumbsUp(insight.id),
    onThumbsDownClick: () => onThumbsDown(insight.id),
    gradientVariant: insight.gradientVariant,
  }));

  return <Section title="Top Insights" cards={cards} />;
}

// ============================================================================
// Overall Readiness Section
// ============================================================================

interface OverallReadinessSectionProps {
  onMaximizeCases: () => void;
}

export function OverallReadinessSection({ onMaximizeCases }: OverallReadinessSectionProps) {
  return (
    <div className="px-8 mt-8">
      <div className="flex gap-[18px] items-stretch">
        <div className="flex-[0.7] min-w-0 h-full">
          <RatingCard
            title={OVERALL_READINESS.title}
            subtitle={OVERALL_READINESS.subtitle}
            rating={OVERALL_READINESS.rating}
            description={OVERALL_READINESS.description}
            showMenu={false}
          />
        </div>
        <div className="flex-[0.3] h-full">
          <CasesCard
            title={TOTAL_CASES.title}
            subtitle={TOTAL_CASES.subtitle}
            totalCases={TOTAL_CASES.totalCases}
            scenarios={[...TOTAL_CASES.scenarios]}
            onMaximizeClick={onMaximizeCases}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Pillar Scores Section
// ============================================================================

export function PillarScoresSection() {
  return (
    <div className="px-8 mt-8">
      <SectionTitle>Pillar Scores</SectionTitle>
      <div className="grid grid-cols-3 gap-6 items-stretch">
        {PILLAR_SCORES.map((pillar) => (
          <PillarScoreCard
            key={pillar.id}
            title={pillar.title}
            subtitle={pillar.subtitle}
            score={pillar.score}
            status={pillar.status}
            isLocked={pillar.isLocked}
            lockedMessage={"lockedMessage" in pillar ? pillar.lockedMessage : undefined}
            barData={[...pillar.barData]}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Vulnerability Analysis Section
// ============================================================================

interface VulnerabilityAnalysisSectionProps {
  onMaximizeVulnerabilities: () => void;
  onMaximizeStatistics: () => void;
}

export function VulnerabilityAnalysisSection({
  onMaximizeVulnerabilities,
  onMaximizeStatistics,
}: VulnerabilityAnalysisSectionProps) {
  return (
    <div className="px-8 mt-8">
      <SectionTitle>Vulnerability Analysis</SectionTitle>
      <div className="grid grid-cols-2 gap-6 items-stretch">
        <FoundVulnerabilitiesCard
          title={FOUND_VULNERABILITIES.title}
          subtitle={FOUND_VULNERABILITIES.subtitle}
          identifiedCount={FOUND_VULNERABILITIES.identifiedCount}
          unweightedASR={FOUND_VULNERABILITIES.unweightedASR}
          weightedASR={FOUND_VULNERABILITIES.weightedASR}
          status={FOUND_VULNERABILITIES.status}
          radarData={FOUND_VULNERABILITIES.radarData}
          onMaximizeClick={onMaximizeVulnerabilities}
        />
        <ConversationalStatisticsCard
          title={CONVERSATIONAL_STATISTICS.title}
          subtitle={CONVERSATIONAL_STATISTICS.subtitle}
          avgChatLength={CONVERSATIONAL_STATISTICS.avgChatLength}
          avgMessageLength={CONVERSATIONAL_STATISTICS.avgMessageLength}
          chatLengthStatus={CONVERSATIONAL_STATISTICS.chatLengthStatus}
          messageLengthStatus={CONVERSATIONAL_STATISTICS.messageLengthStatus}
          chatLengthChartData={[...CONVERSATIONAL_STATISTICS.chatLengthChartData]}
          messageLengthChartData={[...CONVERSATIONAL_STATISTICS.messageLengthChartData]}
          onMaximizeClick={onMaximizeStatistics}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Test Cases Section
// ============================================================================

interface TestCasesSectionProps {
  onTurnLengthChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onMoreFiltersClick: () => void;
  onRowClick: (testCase: unknown) => void;
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function TestCasesSection({
  onTurnLengthChange,
  onCategoryChange,
  onSearchChange,
  onMoreFiltersClick,
  onRowClick,
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: TestCasesSectionProps) {
  return (
    <div className="px-8 mt-8">
      <SectionTitle>All Test Cases</SectionTitle>

      <FilterBar
        turnLengthOptions={[...FILTER_OPTIONS.turnLength]}
        categoryOptions={[...FILTER_OPTIONS.category]}
        onTurnLengthChange={onTurnLengthChange}
        onCategoryChange={onCategoryChange}
        onSearchChange={onSearchChange}
        onMoreFiltersClick={onMoreFiltersClick}
        className="mb-6"
      />

      <TestCasesTable testCases={TEST_CASES} onRowClick={onRowClick} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
}

// ============================================================================
// Top Risk Areas Section
// ============================================================================

interface TopRiskAreasSectionProps {
  onRowClick: (caseItem: unknown) => void;
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function TopRiskAreasSection({
  onRowClick,
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: TopRiskAreasSectionProps) {
  return (
    <div className="px-8 mt-8">
      <SectionTitle>Top Risk Areas</SectionTitle>
      <TopRiskAreaCard
        number={TOP_RISK_AREA.number}
        title={TOP_RISK_AREA.title}
        threatLevel={TOP_RISK_AREA.threatLevel}
        asrPercentage={TOP_RISK_AREA.asrPercentage}
        highRiskCases={TOP_RISK_AREA.highRiskCases}
        priority={TOP_RISK_AREA.priority}
        avgTurns={TOP_RISK_AREA.avgTurns}
        avgTurnLength={TOP_RISK_AREA.avgTurnLength}
        keyInsights={[...TOP_RISK_AREA.keyInsights]}
        cases={[...TOP_RISK_AREA.cases]}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPrevious}
        onNext={onNext}
        onRowClick={onRowClick}
      />
    </div>
  );
}

// ============================================================================
// Modals Section
// ============================================================================

interface ModalsSectionProps {
  openModal: ModalType;
  onClose: () => void;
}

export function ModalsSection({ openModal, onClose }: ModalsSectionProps) {
  return (
    <>
      {/* Total Cases Modal */}
      <Modal
        isOpen={openModal === "totalCases"}
        onClose={onClose}
        title={MODAL_CONFIG.totalCases.title}
        description={MODAL_CONFIG.totalCases.description}
      >
        <CasesCard
          title={TOTAL_CASES.title}
          subtitle={TOTAL_CASES.subtitle}
          totalCases={TOTAL_CASES.totalCases}
          scenarios={[...TOTAL_CASES.scenarios]}
        />
      </Modal>

      {/* Pillar I Modal */}
      <Modal
        isOpen={openModal === "pillarI"}
        onClose={onClose}
        title={MODAL_CONFIG.pillarI.title}
        description={MODAL_CONFIG.pillarI.description}
      >
        <PillarScoreCard
          title={PILLAR_SCORES[0].title}
          subtitle={PILLAR_SCORES[0].subtitle}
          score={PILLAR_SCORES[0].score}
          status={PILLAR_SCORES[0].status}
          barData={[...PILLAR_SCORES[0].barData]}
        />
      </Modal>

      {/* Pillar II Modal */}
      <Modal
        isOpen={openModal === "pillarII"}
        onClose={onClose}
        title={MODAL_CONFIG.pillarII.title}
        description={MODAL_CONFIG.pillarII.description}
      >
        <PillarScoreCard
          title={PILLAR_SCORES[1].title}
          subtitle={PILLAR_SCORES[1].subtitle}
          score={PILLAR_SCORES[1].score}
          status={PILLAR_SCORES[1].status}
          barData={[...PILLAR_SCORES[1].barData]}
        />
      </Modal>

      {/* Pillar III Modal */}
      <Modal
        isOpen={openModal === "pillarIII"}
        onClose={onClose}
        title={MODAL_CONFIG.pillarIII.title}
        description={MODAL_CONFIG.pillarIII.description}
      >
        <PillarScoreCard
          title={PILLAR_SCORES[2].title}
          subtitle={PILLAR_SCORES[2].subtitle}
          score={PILLAR_SCORES[2].score}
          status={PILLAR_SCORES[2].status}
          isLocked={PILLAR_SCORES[2].isLocked}
          lockedMessage={"lockedMessage" in PILLAR_SCORES[2] ? PILLAR_SCORES[2].lockedMessage : undefined}
        />
      </Modal>

      {/* Found Vulnerabilities Modal */}
      <Modal
        isOpen={openModal === "foundVulnerabilities"}
        onClose={onClose}
        title={MODAL_CONFIG.foundVulnerabilities.title}
        description={MODAL_CONFIG.foundVulnerabilities.description}
      >
        <FoundVulnerabilitiesCard
          title={FOUND_VULNERABILITIES.title}
          subtitle={FOUND_VULNERABILITIES.subtitle}
          identifiedCount={FOUND_VULNERABILITIES.identifiedCount}
          unweightedASR={FOUND_VULNERABILITIES.unweightedASR}
          weightedASR={FOUND_VULNERABILITIES.weightedASR}
          status={FOUND_VULNERABILITIES.status}
          radarData={FOUND_VULNERABILITIES.radarData}
        />
      </Modal>

      {/* Conversational Statistics Modal */}
      <Modal
        isOpen={openModal === "conversationalStatistics"}
        onClose={onClose}
        title={MODAL_CONFIG.conversationalStatistics.title}
        description={MODAL_CONFIG.conversationalStatistics.description}
      >
        <ConversationalStatisticsCard
          title={CONVERSATIONAL_STATISTICS.title}
          subtitle={CONVERSATIONAL_STATISTICS.subtitle}
          avgChatLength={CONVERSATIONAL_STATISTICS.avgChatLength}
          avgMessageLength={CONVERSATIONAL_STATISTICS.avgMessageLength}
          chatLengthStatus={CONVERSATIONAL_STATISTICS.chatLengthStatus}
          messageLengthStatus={CONVERSATIONAL_STATISTICS.messageLengthStatus}
          chatLengthChartData={[...CONVERSATIONAL_STATISTICS.chatLengthChartData]}
          messageLengthChartData={[...CONVERSATIONAL_STATISTICS.messageLengthChartData]}
        />
      </Modal>
    </>
  );
}

