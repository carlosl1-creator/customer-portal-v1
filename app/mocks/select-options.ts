import type { SelectOption } from "~/components/select/select";

/**
 * Mock chatbot version options for dropdowns
 * In production, this data would come from API calls
 */
export const MOCK_CHATBOT_OPTIONS: SelectOption[] = [
  { label: "Retail Chatbot 1.5", value: "retail-1.5" },
  { label: "Content Model 2.1", value: "content-2.1" },
  { label: "Account Model 1.0", value: "account-1.0" },
  { label: "Audio Model 1.0", value: "audio-1.0" },
];

/**
 * Mock policy version options for dropdowns
 * In production, this data would come from API calls
 */
export const MOCK_POLICY_OPTIONS: SelectOption[] = [
  { label: "Gap Analysis", value: "gap-analysis" },
  { label: "Content Safety", value: "content-safety" },
  { label: "Policy 3.1", value: "policy-3.1" },
  { label: "Policy 2.0", value: "policy-2.0" },
];

