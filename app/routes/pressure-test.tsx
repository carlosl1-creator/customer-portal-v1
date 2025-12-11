/**
 * Pressure Test Report Page
 *
 * Displays comprehensive test results including:
 * - Overall readiness scores
 * - Pillar-based scoring
 * - Vulnerability analysis
 * - Test cases with filtering
 * - Top risk areas
 */

import type { Route } from "./+types/pressure-test";
import {
  useModal,
  useHeaderActions,
  useFilterActions,
  usePagination,
  useInteractionHandlers,
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
  // Hooks
  const { openModal, openModalById, closeModal } = useModal();
  const headerActions = useHeaderActions();
  const filterActions = useFilterActions();
  const testCasesPagination = usePagination(1, 10);
  const riskAreaPagination = usePagination(1, 5);
  const { handleThumbsUp, handleThumbsDown, handleRowClick } = useInteractionHandlers();

  return (
    <div className="w-full">
      {/* Header */}
      <PageHeader
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
          onMaximizeCases={() => openModalById("totalCases")}
        />

        <PillarScoresSection />

        <VulnerabilityAnalysisSection
          onMaximizeVulnerabilities={() => openModalById("foundVulnerabilities")}
          onMaximizeStatistics={() => openModalById("conversationalStatistics")}
        />

        <TestCasesSection
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
          onRowClick={handleRowClick}
          currentPage={riskAreaPagination.currentPage}
          totalPages={riskAreaPagination.totalPages}
          onPrevious={riskAreaPagination.handlePrevious}
          onNext={riskAreaPagination.handleNext}
        />
      </div>

      {/* Modals */}
      <ModalsSection openModal={openModal} onClose={closeModal} />
    </div>
  );
}
