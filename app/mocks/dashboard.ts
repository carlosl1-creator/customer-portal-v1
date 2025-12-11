/**
 * Mock dashboard data
 * In production, this data would come from API calls
 */

export interface DashboardUserData {
  userName: string;
  lastReportDate: string;
  lastReportBot: string;
  lastReportPolicy: string;
}

export const MOCK_DASHBOARD_USER: DashboardUserData = {
  userName: "John Doe",
  lastReportDate: "8/3/2025",
  lastReportBot: "Chatbot Model 2.1",
  lastReportPolicy: "Acme Inc. Content Policy 4.2",
};

/**
 * Mock pillar bar chart data
 */
export interface PillarBarData {
  label: string;
  value: number;
  color: string;
  borderColor: string;
}

export const MOCK_PILLAR_I_BAR_DATA: PillarBarData[] = [
  { label: "Your Model", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
  { label: "SomeAI Model-5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
  { label: "Other Model 4.5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
];

export const MOCK_PILLAR_II_BAR_DATA: PillarBarData[] = [
  { label: "Your Model", value: 72, color: "#FEDF89", borderColor: "#DC6803" },
  { label: "SomeAI Model-5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
  { label: "Other Model 4.5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
];

/**
 * Mock rating card data for dashboard
 */
export const MOCK_OVERALL_READINESS = {
  title: "Overall Readiness",
  subtitle: "",
  rating: 4.1,
  description: "Effectively enforces policies against direct violations but consistently struggles with nuanced evasion and obfuscation tactics.",
};

export const MOCK_PILLAR_I_CARD = {
  title: "Pillar I Score",
  subtitle: "Aggregated score across safety, security, and fraud.",
  score: 4.3,
  status: "success" as const,
};

export const MOCK_PILLAR_II_CARD = {
  title: "Pillar II Score",
  subtitle: "Focused score on brand value and correctness",
  score: 3.5,
  status: "warning" as const,
};

