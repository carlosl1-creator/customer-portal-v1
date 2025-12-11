/**
 * Pressure Test Report Page
 *
 * Displays comprehensive test results including:
 * - Overall readiness scores
 * - Pillar-based scoring
 * - Vulnerability analysis
 * - Test cases with filtering
 * - Top risk areas
 *
 * Uses Redux data from the latest completed report
 */

import type { Route } from "./+types/pressure-test";
import {
  useModal,
  useHeaderActions,
  useFilterActions,
  usePagination,
  useInteractionHandlers,
  usePressureTestData,
} from "./pressure-test.hooks";
import {
  PageHeader,
  TopInsightsSection,
  OverallReadinessSection,
  PillarScoresSection,
  VulnerabilityAnalysisSection,
  TestCasesSection,
  TopRiskAreasSection,
  ModalsSection,
} from "./pressure-test.sections";

// ============================================================================
// Meta
// ============================================================================

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pressure Test Report - Reinforce Labs" },
    { name: "description", content: "View and manage your pressure test report" },
  ];
}

// ============================================================================
// Main Component
// ============================================================================

export default function PressureTest() {
  // Redux data hook - transforms latest report into page data
  const pressureTestData = usePressureTestData();

  // UI Hooks
  const { openModal, openModalById, closeModal } = useModal();
  const headerActions = useHeaderActions();
  const filterActions = useFilterActions();
  const testCasesPagination = usePagination(1, Math.ceil(pressureTestData.testCases.length / 10) || 1);
  const riskAreaPagination = usePagination(1, 5);
  const { handleThumbsUp, handleThumbsDown, handleRowClick } = useInteractionHandlers();

  return (
    <div className="w-full">
      {/* Header */}
      <PageHeader
        headerConfig={pressureTestData.headerConfig}
        onSendToSlack={headerActions.handleSendToSlack}
        onLinkToJira={headerActions.handleLinkToJira}
        onDownloadReport={headerActions.handleDownloadReport}
        onCopyPermalink={headerActions.handleCopyPermalink}
        onViewAllReports={headerActions.handleViewAllReports}
      />

      {/* Main Content */}
      <div className="px-0 mt-8 pb-8">
        <TopInsightsSection
          onThumbsUp={handleThumbsUp}
          onThumbsDown={handleThumbsDown}
        />

        <OverallReadinessSection
          overallReadiness={pressureTestData.overallReadiness}
          totalCases={pressureTestData.totalCases}
          onMaximizeCases={() => openModalById("totalCases")}
        />

        <PillarScoresSection pillarScores={pressureTestData.pillarScores} />

        <VulnerabilityAnalysisSection
          foundVulnerabilities={pressureTestData.foundVulnerabilities}
          conversationalStatistics={pressureTestData.conversationalStatistics}
          onMaximizeVulnerabilities={() => openModalById("foundVulnerabilities")}
          onMaximizeStatistics={() => openModalById("conversationalStatistics")}
        />

        <TestCasesSection
          filterOptions={pressureTestData.filterOptions}
          testCases={pressureTestData.testCases}
          onTurnLengthChange={filterActions.handleTurnLengthChange}
          onCategoryChange={filterActions.handleCategoryChange}
          onSearchChange={filterActions.handleSearchChange}
          onMoreFiltersClick={filterActions.handleMoreFiltersClick}
          onRowClick={handleRowClick}
          currentPage={testCasesPagination.currentPage}
          totalPages={testCasesPagination.totalPages}
          onPrevious={testCasesPagination.handlePrevious}
          onNext={testCasesPagination.handleNext}
        />

        <TopRiskAreasSection
          topRiskArea={pressureTestData.topRiskArea}
          onRowClick={handleRowClick}
          currentPage={riskAreaPagination.currentPage}
          totalPages={riskAreaPagination.totalPages}
          onPrevious={riskAreaPagination.handlePrevious}
          onNext={riskAreaPagination.handleNext}
        />
      </div>

      {/* Modals */}
      <ModalsSection 
        openModal={openModal} 
        onClose={closeModal}
        pillarScores={pressureTestData.pillarScores}
        foundVulnerabilities={pressureTestData.foundVulnerabilities}
        conversationalStatistics={pressureTestData.conversationalStatistics}
        categoryDistribution={pressureTestData.categoryDistribution}
      />
    </div>
  );
}
