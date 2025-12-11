/**
 * Mock comparison data for show-comparison page
 * In production, this data would come from API calls
 */

export interface ScenarioData {
  label: string;
  percentage: number;
  color: string;
}

export interface RadarDataPoint {
  label: string;
  value: number;
}

export interface RadarSeries {
  label: string;
  color: string;
  data: RadarDataPoint[];
}

/**
 * Mock total cases data
 */
export const MOCK_TOTAL_CASES_DATA = {
  totalCases: 1576,
  scenarios: [
    { label: "Violence", percentage: 48, color: "#B2DDFF" },
    { label: "Hate Speech", percentage: 29, color: "#A6F4C5" },
    { label: "Others", percentage: 16, color: "#FECDD6" },
  ] as ScenarioData[],
};

/**
 * Mock pillar comparison data
 */
export const MOCK_COMPARISON_PILLAR_I = {
  model1Score: 4.1,
  model1Status: "success" as const,
  model2Score: 3.8,
  model2Status: "warning" as const,
  barData: [
    { label: "Your Model", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
    { label: "SomeAI Model-5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
    { label: "Other Model 4.5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
  ],
};

export const MOCK_COMPARISON_PILLAR_II = {
  model1Score: 3.2,
  model1Status: "warning" as const,
  model2Score: 4.2,
  model2Status: "success" as const,
  barData: [
    { label: "Your Model", value: 72, color: "#FEDF89", borderColor: "#DC6803" },
    { label: "SomeAI Model-5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
    { label: "Other Model 4.5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
  ],
};

/**
 * Create vulnerabilities data with dynamic model names
 */
export function createVulnerabilitiesData(model1Name: string, model2Name: string) {
  return {
    identifiedCount: 91,
    unweightedASR: 8.2,
    weightedASR: 9.1,
    status: "warning" as const,
    radarData: [
      {
        label: model1Name,
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
        label: model2Name,
        color: "#A6F4C5",
        data: [
          { label: "Violence", value: 90 },
          { label: "Self-Harm", value: 85 },
          { label: "Hate Speech", value: 70 },
          { label: "Illegal Activities", value: 80 },
          { label: "Others", value: 75 },
        ],
      },
    ] as RadarSeries[],
  };
}

/**
 * Create conversational statistics data with dynamic model names
 */
export function createConversationalStatsData(model1Name: string, model2Name: string) {
  return {
    model1Name,
    model2Name,
    series: [
      {
        label: model1Name,
        color: "#B2DDFF",
        data: [
          { label: "Short", value: 75 },
          { label: "Med", value: 50 },
          { label: "Long", value: 30 },
        ],
      },
      {
        label: model2Name,
        color: "#A6F4C5",
        data: [
          { label: "Short", value: 60 },
          { label: "Med", value: 70 },
          { label: "Long", value: 45 },
        ],
      },
    ],
  };
}

/**
 * Mock comparison dates
 */
export const MOCK_COMPARISON_DATES = {
  generatedDate: "8/24/2025",
  originalDates: "8/3/2025 and 7/14/2025",
};

