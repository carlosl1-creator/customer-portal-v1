/**
 * Central export point for all mock data
 * 
 * In production, these would be replaced with actual API calls.
 * The mock data structure mirrors what the API responses would look like.
 */

// Reports
export {
  MOCK_REPORTS,
  MOCK_SELECTABLE_REPORTS,
  MOCK_LAST_REPORT,
} from "./reports";

// Policies
export { MOCK_POLICIES } from "./policies";

// Benchmarks
export { MOCK_BENCHMARKS } from "./benchmarks";

// Categories
export {
  MOCK_CATEGORIES,
  getHighPriorityCategoryIds,
} from "./categories";

// Select options
export {
  MOCK_CHATBOT_OPTIONS,
  MOCK_POLICY_OPTIONS,
} from "./select-options";

// Dashboard
export {
  MOCK_DASHBOARD_USER,
  MOCK_PILLAR_I_BAR_DATA,
  MOCK_PILLAR_II_BAR_DATA,
  MOCK_OVERALL_READINESS,
  MOCK_PILLAR_I_CARD,
  MOCK_PILLAR_II_CARD,
  type DashboardUserData,
  type PillarBarData,
} from "./dashboard";

// Comparison
export {
  MOCK_TOTAL_CASES_DATA,
  MOCK_COMPARISON_PILLAR_I,
  MOCK_COMPARISON_PILLAR_II,
  MOCK_COMPARISON_DATES,
  createVulnerabilitiesData,
  createConversationalStatsData,
  type ScenarioData,
  type RadarDataPoint,
  type RadarSeries,
} from "./comparison";

// Suggestions
export {
  MOCK_SUGGESTION_CONFIGS,
  type SuggestionConfig,
} from "./suggestions";

