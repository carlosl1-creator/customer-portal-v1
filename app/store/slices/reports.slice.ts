import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Priority level type
 */
export type Priority = "low" | "medium" | "high";

/**
 * Report status type
 */
export type ReportStatus = "completed" | "pending" | "running" | "failed";

/**
 * Pillar 1 score interface
 */
export interface P1Score {
  p1_score: number;
  p1_text: string;
}

/**
 * Pillar 2 score interface
 */
export interface P2Score {
  p2_score: number;
  p2_text: string;
}

/**
 * Category data for attack success rate
 */
export interface CategoryData {
  priority: Priority;
  asr: number;
  avg_turns: number;
  avg_turns_length: number;
}

/**
 * Attack success rate interface
 */
export interface AttackSuccessRate {
  identified: number;
  weighted_asr: number;
  unweighted_asr: number;
  categories: Record<string, CategoryData>;
}

/**
 * Total simulations interface
 */
export interface TotalSimulations {
  total_simulation_count: number;
  risk_categories: Record<string, number>[];
}

/**
 * Conversation statistics interface
 */
export interface ConversationStatistics {
  avg_no_of_turns: number;
  avg_len_of_each_turn: number;
  chat_len_distribution: Record<string, number>;
  message_len_distribution: Record<string, number>;
}

/**
 * Report entity interface
 */
export interface Report {
  id: string;
  policy_version: string;
  policy_name: string;
  chatbot_version: string;
  chatbot_name: string;
  created_at: string;
  status: ReportStatus;
  readiness_score: number;
  readiness_text: string;
  p1: P1Score;
  p2: P2Score;
  likelihood: Priority;
  attack_success_rate: AttackSuccessRate;
  total_simulations: TotalSimulations;
  conversation_statistics: ConversationStatistics;
}

/**
 * Reports state interface
 */
interface ReportsState {
  reports: Report[];
  selectedReportId: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial mock reports for development/demo purposes
 * References existing policies and chatbots
 */
const mockReports: Report[] = [
  {
    id: "r1a1b1c1-1111-1111-1111-111111111111",
    policy_version: "1.2.0",
    policy_name: "Content Moderation Policy",
    chatbot_version: "4.0.2",
    chatbot_name: "GPT-4 Turbo",
    created_at: "2025-12-01T09:00:00.000Z",
    status: "completed",
    readiness_score: 87,
    readiness_text: "High readiness with minor improvements needed",
    p1: { p1_score: 92, p1_text: "Excellent policy adherence" },
    p2: { p2_score: 82, p2_text: "Good resilience against attacks" },
    likelihood: "low",
    attack_success_rate: {
      identified: 156,
      weighted_asr: 12.5,
      unweighted_asr: 15.2,
      categories: {
        "Harmful Content": { priority: "high", asr: 8.2, avg_turns: 4.5, avg_turns_length: 120 },
        "Misinformation": { priority: "medium", asr: 14.1, avg_turns: 3.2, avg_turns_length: 95 },
        "Privacy Violation": { priority: "high", asr: 11.8, avg_turns: 5.1, avg_turns_length: 145 },
      },
    },
    total_simulations: {
      total_simulation_count: 1250,
      risk_categories: [{ "Harmful Content": 450, "Misinformation": 400, "Privacy Violation": 400 }],
    },
    conversation_statistics: {
      avg_no_of_turns: 4.2,
      avg_len_of_each_turn: 115,
      chat_len_distribution: { "1-3": 320, "4-6": 580, "7-10": 350 },
      message_len_distribution: { "short": 400, "medium": 600, "long": 250 },
    },
  },
  {
    id: "r2b2c2d2-2222-2222-2222-222222222222",
    policy_version: "2.0.1",
    policy_name: "Data Privacy Policy",
    chatbot_version: "3.1.0",
    chatbot_name: "Claude 3 Opus",
    created_at: "2025-12-02T14:30:00.000Z",
    status: "completed",
    readiness_score: 94,
    readiness_text: "Excellent privacy compliance",
    p1: { p1_score: 96, p1_text: "Outstanding policy alignment" },
    p2: { p2_score: 91, p2_text: "Strong defense mechanisms" },
    likelihood: "low",
    attack_success_rate: {
      identified: 89,
      weighted_asr: 6.8,
      unweighted_asr: 8.4,
      categories: {
        "Data Extraction": { priority: "high", asr: 4.2, avg_turns: 6.1, avg_turns_length: 180 },
        "PII Disclosure": { priority: "high", asr: 5.8, avg_turns: 5.5, avg_turns_length: 155 },
        "Consent Bypass": { priority: "medium", asr: 9.1, avg_turns: 4.0, avg_turns_length: 110 },
      },
    },
    total_simulations: {
      total_simulation_count: 980,
      risk_categories: [{ "Data Extraction": 350, "PII Disclosure": 330, "Consent Bypass": 300 }],
    },
    conversation_statistics: {
      avg_no_of_turns: 5.5,
      avg_len_of_each_turn: 148,
      chat_len_distribution: { "1-3": 180, "4-6": 450, "7-10": 350 },
      message_len_distribution: { "short": 280, "medium": 480, "long": 220 },
    },
  },
  {
    id: "r3c3d3e3-3333-3333-3333-333333333333",
    policy_version: "0.9.5",
    policy_name: "AI Safety Guidelines",
    chatbot_version: "1.5.3",
    chatbot_name: "Gemini Pro",
    created_at: "2025-12-03T11:15:00.000Z",
    status: "completed",
    readiness_score: 78,
    readiness_text: "Moderate readiness, improvements recommended",
    p1: { p1_score: 81, p1_text: "Good safety alignment" },
    p2: { p2_score: 74, p2_text: "Some vulnerabilities detected" },
    likelihood: "medium",
    attack_success_rate: {
      identified: 234,
      weighted_asr: 22.1,
      unweighted_asr: 26.8,
      categories: {
        "Jailbreaking": { priority: "high", asr: 18.5, avg_turns: 7.2, avg_turns_length: 210 },
        "Prompt Injection": { priority: "high", asr: 24.2, avg_turns: 3.8, avg_turns_length: 88 },
        "Bias Exploitation": { priority: "medium", asr: 19.8, avg_turns: 4.5, avg_turns_length: 130 },
      },
    },
    total_simulations: {
      total_simulation_count: 1500,
      risk_categories: [{ "Jailbreaking": 550, "Prompt Injection": 500, "Bias Exploitation": 450 }],
    },
    conversation_statistics: {
      avg_no_of_turns: 5.1,
      avg_len_of_each_turn: 142,
      chat_len_distribution: { "1-3": 280, "4-6": 620, "7-10": 600 },
      message_len_distribution: { "short": 350, "medium": 750, "long": 400 },
    },
  },
  {
    id: "r4d4e4f4-4444-4444-4444-444444444444",
    policy_version: "1.2.0",
    policy_name: "Content Moderation Policy",
    chatbot_version: "3.0.1",
    chatbot_name: "Llama 3 70B",
    created_at: "2025-12-04T16:45:00.000Z",
    status: "completed",
    readiness_score: 71,
    readiness_text: "Needs attention on content filtering",
    p1: { p1_score: 75, p1_text: "Acceptable policy adherence" },
    p2: { p2_score: 68, p2_text: "Vulnerabilities need addressing" },
    likelihood: "medium",
    attack_success_rate: {
      identified: 312,
      weighted_asr: 28.4,
      unweighted_asr: 32.1,
      categories: {
        "Harmful Content": { priority: "high", asr: 25.6, avg_turns: 3.9, avg_turns_length: 105 },
        "Misinformation": { priority: "medium", asr: 31.2, avg_turns: 2.8, avg_turns_length: 78 },
        "Hate Speech": { priority: "high", asr: 22.8, avg_turns: 4.2, avg_turns_length: 115 },
      },
    },
    total_simulations: {
      total_simulation_count: 1100,
      risk_categories: [{ "Harmful Content": 400, "Misinformation": 380, "Hate Speech": 320 }],
    },
    conversation_statistics: {
      avg_no_of_turns: 3.6,
      avg_len_of_each_turn: 99,
      chat_len_distribution: { "1-3": 450, "4-6": 420, "7-10": 230 },
      message_len_distribution: { "short": 520, "medium": 400, "long": 180 },
    },
  },
  {
    id: "r5e5f5a5-5555-5555-5555-555555555555",
    policy_version: "2.0.1",
    policy_name: "Data Privacy Policy",
    chatbot_version: "4.0.2",
    chatbot_name: "GPT-4 Turbo",
    created_at: "2025-12-05T10:00:00.000Z",
    status: "completed",
    readiness_score: 91,
    readiness_text: "Strong privacy protection",
    p1: { p1_score: 93, p1_text: "Excellent data handling" },
    p2: { p2_score: 88, p2_text: "Robust against extraction attacks" },
    likelihood: "low",
    attack_success_rate: {
      identified: 102,
      weighted_asr: 9.2,
      unweighted_asr: 11.5,
      categories: {
        "Data Extraction": { priority: "high", asr: 7.1, avg_turns: 5.8, avg_turns_length: 165 },
        "PII Disclosure": { priority: "high", asr: 8.9, avg_turns: 4.9, avg_turns_length: 140 },
        "Social Engineering": { priority: "medium", asr: 12.4, avg_turns: 6.2, avg_turns_length: 195 },
      },
    },
    total_simulations: {
      total_simulation_count: 1050,
      risk_categories: [{ "Data Extraction": 380, "PII Disclosure": 350, "Social Engineering": 320 }],
    },
    conversation_statistics: {
      avg_no_of_turns: 5.6,
      avg_len_of_each_turn: 166,
      chat_len_distribution: { "1-3": 200, "4-6": 480, "7-10": 370 },
      message_len_distribution: { "short": 250, "medium": 520, "long": 280 },
    },
  },
  {
    id: "r6f6a6b6-6666-6666-6666-666666666666",
    policy_version: "0.9.5",
    policy_name: "AI Safety Guidelines",
    chatbot_version: "3.1.0",
    chatbot_name: "Claude 3 Opus",
    created_at: "2025-12-06T13:20:00.000Z",
    status: "completed",
    readiness_score: 96,
    readiness_text: "Exceptional safety compliance",
    p1: { p1_score: 98, p1_text: "Industry-leading safety alignment" },
    p2: { p2_score: 94, p2_text: "Highly resilient to adversarial inputs" },
    likelihood: "low",
    attack_success_rate: {
      identified: 45,
      weighted_asr: 4.2,
      unweighted_asr: 5.8,
      categories: {
        "Jailbreaking": { priority: "high", asr: 3.1, avg_turns: 8.5, avg_turns_length: 245 },
        "Prompt Injection": { priority: "high", asr: 4.8, avg_turns: 5.2, avg_turns_length: 125 },
        "Harmful Instructions": { priority: "high", asr: 2.9, avg_turns: 6.8, avg_turns_length: 188 },
      },
    },
    total_simulations: {
      total_simulation_count: 1400,
      risk_categories: [{ "Jailbreaking": 500, "Prompt Injection": 480, "Harmful Instructions": 420 }],
    },
    conversation_statistics: {
      avg_no_of_turns: 6.8,
      avg_len_of_each_turn: 186,
      chat_len_distribution: { "1-3": 150, "4-6": 520, "7-10": 730 },
      message_len_distribution: { "short": 220, "medium": 680, "long": 500 },
    },
  },
  {
    id: "r7a7b7c7-7777-7777-7777-777777777777",
    policy_version: "1.2.0",
    policy_name: "Content Moderation Policy",
    chatbot_version: "1.5.3",
    chatbot_name: "Gemini Pro",
    created_at: "2025-12-07T08:45:00.000Z",
    status: "running",
    readiness_score: 0,
    readiness_text: "Assessment in progress",
    p1: { p1_score: 0, p1_text: "Calculating..." },
    p2: { p2_score: 0, p2_text: "Calculating..." },
    likelihood: "medium",
    attack_success_rate: {
      identified: 0,
      weighted_asr: 0,
      unweighted_asr: 0,
      categories: {},
    },
    total_simulations: {
      total_simulation_count: 650,
      risk_categories: [{ "In Progress": 650 }],
    },
    conversation_statistics: {
      avg_no_of_turns: 0,
      avg_len_of_each_turn: 0,
      chat_len_distribution: {},
      message_len_distribution: {},
    },
  },
  {
    id: "r8b8c8d8-8888-8888-8888-888888888888",
    policy_version: "2.0.1",
    policy_name: "Data Privacy Policy",
    chatbot_version: "3.0.1",
    chatbot_name: "Llama 3 70B",
    created_at: "2025-12-08T15:30:00.000Z",
    status: "pending",
    readiness_score: 0,
    readiness_text: "Awaiting execution",
    p1: { p1_score: 0, p1_text: "Not started" },
    p2: { p2_score: 0, p2_text: "Not started" },
    likelihood: "medium",
    attack_success_rate: {
      identified: 0,
      weighted_asr: 0,
      unweighted_asr: 0,
      categories: {},
    },
    total_simulations: {
      total_simulation_count: 0,
      risk_categories: [],
    },
    conversation_statistics: {
      avg_no_of_turns: 0,
      avg_len_of_each_turn: 0,
      chat_len_distribution: {},
      message_len_distribution: {},
    },
  },
];

const initialState: ReportsState = {
  reports: mockReports,
  selectedReportId: null,
  isLoading: false,
  error: null,
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    // Set all reports (replace)
    setReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = action.payload;
      state.error = null;
    },

    // Add a single report
    addReport: (state, action: PayloadAction<Report>) => {
      state.reports.push(action.payload);
    },

    // Update an existing report
    updateReport: (state, action: PayloadAction<Report>) => {
      const index = state.reports.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.reports[index] = action.payload;
      }
    },

    // Remove a report by ID
    removeReport: (state, action: PayloadAction<string>) => {
      state.reports = state.reports.filter((r) => r.id !== action.payload);
      // Clear selection if removed report was selected
      if (state.selectedReportId === action.payload) {
        state.selectedReportId = null;
      }
    },

    // Select a report
    selectReport: (state, action: PayloadAction<string | null>) => {
      state.selectedReportId = action.payload;
    },

    // Loading state management
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Error state management
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear all reports
    clearReports: (state) => {
      state.reports = [];
      state.selectedReportId = null;
      state.error = null;
    },
  },
  selectors: {
    selectAllReports: (state) => state.reports,
    selectReportsCount: (state) => state.reports.length,
    selectSelectedReportId: (state) => state.selectedReportId,
    selectSelectedReport: (state) =>
      state.reports.find((r) => r.id === state.selectedReportId) ?? null,
    selectReportById: (state, id: string) =>
      state.reports.find((r) => r.id === id) ?? null,
    selectReportsLoading: (state) => state.isLoading,
    selectReportsError: (state) => state.error,
    selectReportsByPolicy: (state, policyName: string) =>
      state.reports.filter((r) => r.policy_name === policyName),
    selectReportsByChatbot: (state, chatbotName: string) =>
      state.reports.filter((r) => r.chatbot_name === chatbotName),
    selectReportsByStatus: (state, status: ReportStatus) =>
      state.reports.filter((r) => r.status === status),
    selectCompletedReports: (state) =>
      state.reports.filter((r) => r.status === "completed"),
  },
});

// Export actions
export const {
  setReports,
  addReport,
  updateReport,
  removeReport,
  selectReport,
  setLoading: setReportsLoading,
  setError: setReportsError,
  clearReports,
} = reportsSlice.actions;

// Export selectors
export const {
  selectAllReports,
  selectReportsCount,
  selectSelectedReportId,
  selectSelectedReport,
  selectReportById,
  selectReportsLoading,
  selectReportsError,
  selectReportsByPolicy,
  selectReportsByChatbot,
  selectReportsByStatus,
  selectCompletedReports,
} = reportsSlice.selectors;

export default reportsSlice.reducer;

