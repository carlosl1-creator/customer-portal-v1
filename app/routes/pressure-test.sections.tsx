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
import { CategoryDistributionContent } from "~/components/cards/category-distribution-content/category-distribution-content";

import {
  TOP_INSIGHTS,
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
  headerConfig: {
    pageName: string;
    title: string;
    infoText: string[];
  };
  onSendToSlack: () => void;
  onLinkToJira: () => void;
  onDownloadReport: () => void;
  onCopyPermalink: () => void;
  onViewAllReports: () => void;
}

export function PageHeader({
  headerConfig,
  onSendToSlack,
  onLinkToJira,
  onDownloadReport,
  onCopyPermalink,
  onViewAllReports,
}: PageHeaderProps) {
  return (
    <HeaderSection
      pageName={headerConfig.pageName}
      title={headerConfig.title}
      infoText={[...headerConfig.infoText]}
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
  overallReadiness: {
    title: string;
    subtitle: string;
    rating: number;
    description: string;
  };
  totalCases: {
    title: string;
    subtitle: string;
    totalCases: number;
    scenarios: Array<{ label: string; percentage: number; color: string }>;
  };
  onMaximizeCases: () => void;
}

export function OverallReadinessSection({
  overallReadiness,
  totalCases,
  onMaximizeCases
}: OverallReadinessSectionProps) {
  return (
    <div className="px-8 mt-8">
      <div className="flex gap-[18px] items-stretch">
        <div className="flex-[0.7] min-w-0 flex">
          <RatingCard
            title={overallReadiness.title}
            subtitle={overallReadiness.subtitle}
            rating={overallReadiness.rating}
            description={overallReadiness.description}
            showMenu={false}
            className="flex-1"
          />
        </div>
        <div className="flex-[0.3] flex">
          <CasesCard
            title={totalCases.title}
            subtitle={totalCases.subtitle}
            totalCases={totalCases.totalCases}
            scenarios={[...totalCases.scenarios]}
            onMaximizeClick={onMaximizeCases}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Pillar Scores Section
// ============================================================================

interface PillarScoresSectionProps {
  pillarScores: Array<{
    id: string;
    title: string;
    subtitle: string;
    score: number;
    status: "success" | "warning" | "locked";
    isLocked: boolean;
    lockedMessage?: string;
    barData: Array<{ label: string; value: number; color: string; borderColor: string }>;
  }>;
}

export function PillarScoresSection({ pillarScores }: PillarScoresSectionProps) {
  return (
    <div className="px-8 mt-8">
      <SectionTitle>Pillar Scores</SectionTitle>
      <div className="grid grid-cols-3 gap-6 items-stretch">
        {pillarScores.map((pillar) => (
          <PillarScoreCard
            key={pillar.id}
            title={pillar.title}
            subtitle={pillar.subtitle}
            score={pillar.score}
            status={pillar.status}
            isLocked={pillar.isLocked}
            lockedMessage={pillar.lockedMessage}
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
  foundVulnerabilities: {
    title: string;
    subtitle: string;
    identifiedCount: number;
    unweightedASR: number;
    weightedASR: number;
    status: "success" | "warning";
    radarData: Array<{ label: string; color: string; data: Array<{ label: string; value: number }> }>;
  };
  conversationalStatistics: {
    title: string;
    subtitle: string;
    avgChatLength: number;
    avgMessageLength: number;
    chatLengthStatus: "success" | "warning";
    messageLengthStatus: "success" | "warning";
    chatLengthChartData: Array<{ x: number; y: number }>;
    messageLengthChartData: Array<{ x: number; y: number }>;
  };
  onMaximizeVulnerabilities: () => void;
  onMaximizeStatistics: () => void;
}

export function VulnerabilityAnalysisSection({
  foundVulnerabilities,
  conversationalStatistics,
  onMaximizeVulnerabilities,
  onMaximizeStatistics,
}: VulnerabilityAnalysisSectionProps) {
  return (
    <div className="px-8 mt-8">
      <SectionTitle>Vulnerability Analysis</SectionTitle>
      <div className="grid grid-cols-2 gap-6 items-stretch">
        <FoundVulnerabilitiesCard
          title={foundVulnerabilities.title}
          subtitle={foundVulnerabilities.subtitle}
          identifiedCount={foundVulnerabilities.identifiedCount}
          unweightedASR={foundVulnerabilities.unweightedASR}
          weightedASR={foundVulnerabilities.weightedASR}
          status={foundVulnerabilities.status}
          radarData={foundVulnerabilities.radarData}
          onMaximizeClick={onMaximizeVulnerabilities}
        />
        <ConversationalStatisticsCard
          title={conversationalStatistics.title}
          subtitle={conversationalStatistics.subtitle}
          avgChatLength={conversationalStatistics.avgChatLength}
          avgMessageLength={conversationalStatistics.avgMessageLength}
          chatLengthStatus={conversationalStatistics.chatLengthStatus}
          messageLengthStatus={conversationalStatistics.messageLengthStatus}
          chatLengthChartData={[...conversationalStatistics.chatLengthChartData]}
          messageLengthChartData={[...conversationalStatistics.messageLengthChartData]}
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
  filterOptions: {
    turnLength: Array<{ label: string; value: string }>;
    category: Array<{ label: string; value: string }>;
  };
  testCases: Array<{
    caseId: string;
    category: string;
    likelihood: number;
    modelReasoning: string;
    content: string;
    chatAndTurnLength: string;
  }>;
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
  filterOptions,
  testCases,
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
        turnLengthOptions={[...filterOptions.turnLength]}
        categoryOptions={[...filterOptions.category]}
        onTurnLengthChange={onTurnLengthChange}
        onCategoryChange={onCategoryChange}
        onSearchChange={onSearchChange}
        onMoreFiltersClick={onMoreFiltersClick}
        className="mb-6"
      />

      <TestCasesTable testCases={testCases} onRowClick={onRowClick} />

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
  topRiskArea: {
    number: number;
    title: string;
    threatLevel: "High" | "Medium" | "Low";
    asrPercentage: number;
    highRiskCases: number;
    priority: "High" | "Medium" | "Low";
    avgTurns: number;
    avgTurnLength: number;
    keyInsights: string[];
    cases: Array<{
      likelihood: number;
      expected: string;
      riskDescription: string;
      content: string;
      chatAndTurnLength: string;
    }>;
  };
  onRowClick: (caseItem: unknown) => void;
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function TopRiskAreasSection({
  topRiskArea,
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
        number={topRiskArea.number}
        title={topRiskArea.title}
        threatLevel={topRiskArea.threatLevel}
        asrPercentage={topRiskArea.asrPercentage}
        highRiskCases={topRiskArea.highRiskCases}
        priority={topRiskArea.priority}
        avgTurns={topRiskArea.avgTurns}
        avgTurnLength={topRiskArea.avgTurnLength}
        keyInsights={[...topRiskArea.keyInsights]}
        cases={[...topRiskArea.cases]}
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
  pillarScores: Array<{
    id: string;
    title: string;
    subtitle: string;
    score: number;
    status: "success" | "warning" | "locked";
    isLocked: boolean;
    lockedMessage?: string;
    barData: Array<{ label: string; value: number; color: string; borderColor: string }>;
  }>;
  foundVulnerabilities: {
    title: string;
    subtitle: string;
    identifiedCount: number;
    unweightedASR: number;
    weightedASR: number;
    status: "success" | "warning";
    radarData: Array<{ label: string; color: string; data: Array<{ label: string; value: number }> }>;
  };
  conversationalStatistics: {
    title: string;
    subtitle: string;
    avgChatLength: number;
    avgMessageLength: number;
    chatLengthStatus: "success" | "warning";
    messageLengthStatus: "success" | "warning";
    chatLengthChartData: Array<{ x: number; y: number }>;
    messageLengthChartData: Array<{ x: number; y: number }>;
  };
  categoryDistribution: {
    radarData: Array<{ label: string; value: number }>;
    categories: Array<{
      id: string;
      name: string;
      priority: "high" | "medium" | "low";
      asrPercentage: number;
      asrCount: string;
      avgTurns: number;
      avgTurnLength: number;
    }>;
  };
}

export function ModalsSection({
  openModal,
  onClose,
  pillarScores,
  foundVulnerabilities,
  conversationalStatistics,
  categoryDistribution,
}: ModalsSectionProps) {
  return (
    <>
      {/* Found Vulnerabilities Modal */}
      <Modal
        isOpen={openModal === "foundVulnerabilities"}
        onClose={onClose}
        hideHeader
      >
        <CategoryDistributionContent
          title={MODAL_CONFIG.totalCases.title}
          subtitle={MODAL_CONFIG.totalCases.description}
          chartTitle="Vulnerabilities Found"
          chartSubtitle="Across top categories"
          radarData={[...categoryDistribution.radarData]}
          categories={[...categoryDistribution.categories]}
          onRowClick={(category) => console.log("Category clicked:", category)}
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
          title={conversationalStatistics.title}
          subtitle={conversationalStatistics.subtitle}
          avgChatLength={conversationalStatistics.avgChatLength}
          avgMessageLength={conversationalStatistics.avgMessageLength}
          chatLengthStatus={conversationalStatistics.chatLengthStatus}
          messageLengthStatus={conversationalStatistics.messageLengthStatus}
          chatLengthChartData={[...conversationalStatistics.chatLengthChartData]}
          messageLengthChartData={[...conversationalStatistics.messageLengthChartData]}
        />
      </Modal>
    </>
  );
}

