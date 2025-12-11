import type { Report } from "~/components/tables/reports-table/reports-table";
import type { SelectableReport } from "~/components/tables/selectable-reports-table/selectable-reports-table";

/**
 * Mock reports data for dashboard and reports tables
 * In production, this data would come from API calls
 */
export const MOCK_REPORTS: Report[] = [
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

/**
 * Mock selectable reports for comparison page
 */
export const MOCK_SELECTABLE_REPORTS: SelectableReport[] = [
  {
    id: "5321",
    botVersion: "Content Model 2.1",
    policyVersion: "Gap Analysis",
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
    botVersion: "Account Model 1.0",
    policyVersion: "Gap Analysis",
    created: "7/16/2025",
    status: "completed",
    overallReadiness: 3.8,
    pillarI: 4.0,
    pillarII: 3.2,
    asr: 8.5,
    asrTrend: "down",
  },
  {
    id: "1427",
    botVersion: "Audio Model 1.0",
    policyVersion: "Content Safety",
    created: "7/1/2025",
    status: "churned",
    overallReadiness: 3.4,
    pillarI: 3.7,
    pillarII: 4.0,
    asr: 16.3,
    asrTrend: "down",
  },
  {
    id: "5244",
    botVersion: "Account Model 1.0",
    policyVersion: "Gap Analysis",
    created: "7/16/2025",
    status: "processing",
    overallReadiness: undefined,
    pillarI: undefined,
    pillarII: undefined,
    asr: undefined,
  },
];

/**
 * Mock data for last report section in dashboard
 */
export const MOCK_LAST_REPORT = {
  date: "8/3/2025",
  botVersion: "Chatbot Model 2.1",
  policyVersion: "Acme Inc. Content Policy 4.2",
  overallReadiness: 4.1,
  pillarIScore: 4.3,
  pillarIIScore: 3.5,
  description: "Effectively enforces policies against direct violations but consistently struggles with nuanced evasion and obfuscation tactics.",
};

