/**
 * Mock suggestions data for create-new-test page
 * In production, these could be dynamically generated based on user history
 */

export interface SuggestionConfig {
  title: string;
  description: string;
  chatbotVersion: string;
  policyVersion: string;
  selectHighPriority?: boolean;
}

export const MOCK_SUGGESTION_CONFIGS: SuggestionConfig[] = [
  {
    title: "Latest Model and Policy",
    description: "Content Model 1.5 — Policy 3.1",
    chatbotVersion: "content-1.5",
    policyVersion: "policy-3.1",
  },
  {
    title: "Latest Model and Past Policy Version",
    description: "Content Model 1.5 — Policy 2.0",
    chatbotVersion: "content-1.5",
    policyVersion: "policy-2.0",
  },
  {
    title: "Last Used Model and Latest Policy",
    description: "Content Model 1.0 — Policy 3.1",
    chatbotVersion: "content-1.0",
    policyVersion: "policy-3.1",
  },
  {
    title: "High Priority Categories Only",
    description: "Violence, Self-Harm, 7+",
    chatbotVersion: "",
    policyVersion: "",
    selectHighPriority: true,
  },
];

