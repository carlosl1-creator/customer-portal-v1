/**
 * Application route paths
 * Centralized route definitions for maintainability
 */
export const ROUTES = {
  HOME: "/",
  PRESSURE_TEST: "/pressure-test",
  COMPARE_REPORTS: "/compare-reports",
  SHOW_COMPARISON: "/show-comparison",
  CREATE_NEW_TEST: "/create-new-test",
  SETTINGS: "/settings",
  POLICY_MANAGER: "/policy-manager",
  ADD_NEW_POLICY: "/add-new-policy",
  EDIT_POLICY: "/edit-policy",
  PREVIEW_POLICY_CHANGES: "/preview-policy-changes",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

