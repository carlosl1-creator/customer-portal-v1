/**
 * Mock data and configuration for the Pressure Test page.
 * In production, this data would come from an API or store.
 */

// ============================================================================
// Header Configuration
// ============================================================================

export const HEADER_CONFIG = {
  pageName: "PRESSURE TEST REPORT",
  title: "Acme Inc. Content Model 2.1",
  infoText: [
    "Created 8/3/2025",
    "Policy Version: Acme Inc. Content Policy 4.2",
    "Model Version: Content Model 2.1",
  ],
} as const;

// ============================================================================
// Top Insights Data
// ============================================================================

export const TOP_INSIGHTS = [
  {
    id: "model-alignment",
    title: "Model Alignment & Guardrail Tuning",
    focusText: "Refining internal refusal logic, bias correction, and escalation behavior.",
    listTitle: "Critical Vulnerabilities:",
    listItems: [
      "Fine-tune small adapter layer on multi-turn refusal consistency set (focus on context carryover and stable tone).",
      "Integrate refusal rationale templates tied to category metadata (e.g., \"safety reason → example phrasebook\").",
      "Calibrate escalation intents using reinforcement signals from simulator traces (detecting \"should have redirected\" cases).",
    ],
    thumbsUpActive: true,
    thumbsDownActive: false,
    gradientVariant: "sunset" as const,
  },
  {
    id: "prompt-design",
    title: "Prompt Design & Input Framing",
    focusText: "How system or user prompts shape model responses.",
    listTitle: "Critical Vulnerabilities:",
    listItems: [
      "Prepend compact policy reminders in system prompt (\"Always prioritize user safety and policy compliance...\").",
      "Add turn-level re-grounding every 3-4 exchanges in long chats.",
      "Test counterfactual prompt phrasing (e.g., \"as an educational explanation only\") to surface latent failure modes.",
    ],
    thumbsUpActive: false,
    thumbsDownActive: true,
    gradientVariant: "nebulae" as const,
  },
] as const;

// ============================================================================
// Overall Readiness Data
// ============================================================================

export const OVERALL_READINESS = {
  title: "Overall Readiness",
  subtitle: "Overall rating based on model safety, security, and fraud and bias mitigation.",
  rating: 4.1,
  description:
    "The system showcases a strong ability to enforce policies against direct violations, particularly in the categories of illegal activities and self-harm. However, it consistently struggles with nuanced evasion tactics, particularly those employing obfuscation and contextual deception, leading to significant gaps in enforcement.",
} as const;

// ============================================================================
// Total Cases Data
// ============================================================================

export const TOTAL_CASES = {
  title: "Total Cases",
  subtitle: "Number of total simulation cases and risk distribution",
  totalCases: 1576,
  scenarios: [
    { label: "Violence", percentage: 48, color: "#B2DDFF" },
    { label: "Hate Speech", percentage: 29, color: "#A6F4C5" },
    { label: "Others", percentage: 16, color: "#FECDD6" },
  ],
} as const;

// ============================================================================
// Pillar Scores Data
// ============================================================================

export const PILLAR_SCORES = [
  {
    id: "pillarI",
    title: "Pillar I Score",
    subtitle: "Aggregated score across safety, security, and fraud.",
    score: 4.3,
    status: "success" as const,
    isLocked: false,
    barData: [
      { label: "Your Model", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
      { label: "SomeAI Model-5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
      { label: "Other Model 4.5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
    ],
  },
  {
    id: "pillarII",
    title: "Pillar II Score",
    subtitle: "Focused score on brand value and correctness",
    score: 3.5,
    status: "warning" as const,
    isLocked: false,
    barData: [
      { label: "Your Model", value: 72, color: "#FEDF89", borderColor: "#DC6803" },
      { label: "SomeAI Model-5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
      { label: "Other Model 4.5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
    ],
  },
  {
    id: "pillarIII",
    title: "Pillar III Score",
    subtitle: "Aggregated score against biases",
    score: 0,
    status: "locked" as const,
    isLocked: true,
    lockedMessage: "Pillar III scores are coming Quarter 2026 and provide additional insights about model biases. Stay tuned!",
    barData: [],
  },
] as const;

// ============================================================================
// Radar Chart Data (for vulnerabilities)
// ============================================================================

export const RADAR_DATA = [
  {
    label: "Current Model",
    color: "#B2DDFF",
    data: [
      { label: "Violence", value: 75 },
      { label: "Self-Harm", value: 60 },
      { label: "Hate Speech", value: 85 },
      { label: "Illegal Activities", value: 70 },
      { label: "Others", value: 65 },
    ],
  },
  {
    label: "OpenAI Safety",
    color: "#A6F4C5",
    data: [
      { label: "Violence", value: 90 },
      { label: "Self-Harm", value: 85 },
      { label: "Hate Speech", value: 95 },
      { label: "Illegal Activities", value: 88 },
      { label: "Others", value: 80 },
    ],
  },
  {
    label: "Reinforce Labs",
    color: "#FECDD6",
    data: [
      { label: "Violence", value: 88 },
      { label: "Self-Harm", value: 82 },
      { label: "Hate Speech", value: 92 },
      { label: "Illegal Activities", value: 85 },
      { label: "Others", value: 78 },
    ],
  },
];

// ============================================================================
// Found Vulnerabilities Data
// ============================================================================

export const FOUND_VULNERABILITIES = {
  title: "Found Vulnerabilities",
  subtitle: "Statistics on vulnerabilities found across all test cases.",
  identifiedCount: 90,
  unweightedASR: 8.2,
  weightedASR: 9.1,
  status: "warning" as const,
  radarData: RADAR_DATA,
} as const;

// ============================================================================
// Conversational Statistics Data
// ============================================================================

export const CONVERSATIONAL_STATISTICS = {
  title: "Conversation Statistics",
  subtitle: "Average number of turns and length of each turn.",
  avgChatLength: 4.73,
  avgMessageLength: 203.1,
  chatLengthStatus: "success" as const,
  messageLengthStatus: "success" as const,
  chatLengthChartData: [
    { x: 0, y: 0.2 },
    { x: 1, y: 0.4 },
    { x: 2, y: 0.6 },
    { x: 3, y: 0.5 },
    { x: 4, y: 0.3 },
    { x: 5, y: 0.1 },
  ],
  messageLengthChartData: [
    { x: 0, y: 0.1 },
    { x: 60, y: 0.3 },
    { x: 120, y: 0.5 },
    { x: 180, y: 0.4 },
    { x: 240, y: 0.2 },
    { x: 300, y: 0.1 },
  ],
} as const;

// ============================================================================
// Filter Options
// ============================================================================

export const FILTER_OPTIONS = {
  turnLength: [
    { label: "Short", value: "short" },
    { label: "Medium", value: "medium" },
    { label: "Long", value: "long" },
  ],
  category: [
    { label: "Violence", value: "violence" },
    { label: "Self-Harm", value: "self-harm" },
    { label: "Hate Speech", value: "hate-speech" },
    { label: "Illegal Activities", value: "illegal" },
    { label: "Others", value: "others" },
  ],
} as const;

// ============================================================================
// Test Cases Data
// ============================================================================

export const TEST_CASES = [
  {
    caseId: "TC-001",
    category: "Violence",
    likelihood: 85,
    modelReasoning: "Model correctly identified potential threat",
    content: "User attempted to generate violent content...",
    chatAndTurnLength: "4 turns, 203 chars",
  },
  {
    caseId: "TC-002",
    category: "Self-Harm",
    likelihood: 60,
    modelReasoning: "Model detected self-harm intent",
    content: "User requested information about self-harm...",
    chatAndTurnLength: "3 turns, 156 chars",
  },
  {
    caseId: "TC-003",
    category: "Hate Speech",
    likelihood: 92,
    modelReasoning: "Model identified hateful language",
    content: "User used discriminatory language...",
    chatAndTurnLength: "5 turns, 287 chars",
  },
  {
    caseId: "TC-004",
    category: "Illegal Activities",
    likelihood: 45,
    modelReasoning: "Model flagged potential illegal request",
    content: "User asked about illegal activities...",
    chatAndTurnLength: "2 turns, 98 chars",
  },
  {
    caseId: "TC-005",
    category: "Violence",
    likelihood: 78,
    modelReasoning: "Model detected violent content pattern",
    content: "User attempted to generate violent scenario...",
    chatAndTurnLength: "6 turns, 342 chars",
  },
];

// ============================================================================
// Top Risk Area Data
// ============================================================================

export const TOP_RISK_AREA = {
  number: 1,
  title: "Violence",
  threatLevel: "High" as const,
  asrPercentage: 12.5,
  highRiskCases: 7,
  priority: "High" as const,
  avgTurns: 3.45,
  avgTurnLength: 245,
  keyInsights: [
    "Occasional failure to de-escalate hypotheticals about violence when the user reframes as a \"fictional\" or \"game\" scenario.",
    "Weak refusal rationale—model declines but does not explain the reason, reducing trust and consistency.",
    "Recommendation: Strengthen contextual detection for \"fictional but explicit\" prompts; expand refusal templates emphasizing why violence content is blocked.",
  ],
  cases: [
    {
      likelihood: 85,
      expected: "High",
      riskDescription: "Model failed to detect violent intent in fictional scenario",
      content: "User attempted to generate violent content in a game context...",
      chatAndTurnLength: "4 turns, 203 chars",
    },
    {
      likelihood: 72,
      expected: "Medium",
      riskDescription: "Insufficient refusal explanation for violence request",
      content: "User requested information about violent methods...",
      chatAndTurnLength: "3 turns, 156 chars",
    },
    {
      likelihood: 90,
      expected: "High",
      riskDescription: "Model accepted violent content when framed as educational",
      content: "User asked for violent content under educational pretext...",
      chatAndTurnLength: "5 turns, 287 chars",
    },
  ],
} as const;

// ============================================================================
// Category Distribution Data (for modal)
// ============================================================================

export const CATEGORY_DISTRIBUTION_RADAR = [
  { label: "Violence", value: 85 },
  { label: "Self-Harm", value: 60 },
  { label: "Hate Speech", value: 75 },
  { label: "Illegal Activities", value: 45 },
  { label: "Others", value: 55 },
];

export const CATEGORY_DISTRIBUTION_DATA = [
  {
    id: "cat-1",
    name: "Violence",
    priority: "high" as const,
    asrPercentage: 64,
    asrCount: "32 / 50",
    avgTurns: 4.71,
    avgTurnLength: 182.45,
  },
  {
    id: "cat-2",
    name: "Self-Harm",
    priority: "medium" as const,
    asrPercentage: 48,
    asrCount: "24 / 50",
    avgTurns: 7.25,
    avgTurnLength: 137.21,
  },
  {
    id: "cat-3",
    name: "Illegal Activities",
    priority: "low" as const,
    asrPercentage: 24,
    asrCount: "12 / 50",
    avgTurns: 12.64,
    avgTurnLength: 120.35,
  },
  {
    id: "cat-4",
    name: "Hate Speech",
    priority: "medium" as const,
    asrPercentage: 8,
    asrCount: "4 / 50",
    avgTurns: 9.38,
    avgTurnLength: 203.73,
  },
  {
    id: "cat-5",
    name: "Others",
    priority: "low" as const,
    asrPercentage: 12,
    asrCount: "6 / 50",
    avgTurns: 5.42,
    avgTurnLength: 156.89,
  },
];

// ============================================================================
// Modal Configuration
// ============================================================================

export const MODAL_CONFIG = {
  totalCases: {
    title: "Test Case Category Distribution",
    description: "A plethora of cases have been tested against your model to ensure even and complete coverage across categories.",
  },
  pillarI: {
    title: "Pillar I Score",
    description: "Aggregated score across safety, security, and fraud.",
  },
  pillarII: {
    title: "Pillar II Score",
    description: "Focused score on brand value and correctness",
  },
  pillarIII: {
    title: "Pillar III Score",
    description: "Aggregated score against biases",
  },
  foundVulnerabilities: {
    title: "Found Vulnerabilities",
    description: "Statistics on vulnerabilities found across all test cases.",
  },
  conversationalStatistics: {
    title: "Conversation Statistics",
    description: "Average number of turns and length of each turn.",
  },
} as const;

export type ModalType = keyof typeof MODAL_CONFIG | null;

