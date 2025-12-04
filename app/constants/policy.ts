import type { ButtonGroupOption } from "~/components/button-group/button-group";
import type { PolicyStatus } from "~/types/common";

/**
 * Policy status options for button groups
 */
export const POLICY_STATUS_OPTIONS: ButtonGroupOption[] = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Draft",
    value: "draft",
  },
  {
    label: "Archive",
    value: "archive",
  },
];

/**
 * Default test categories for policies
 */
export const DEFAULT_TEST_CATEGORIES = [
  {
    id: "1",
    name: "Violence",
    priority: "high" as const,
    description: "Blocks threats, depictions, or instructions for physical harm or weapon use. Enables safety compliance and protects brand integrity.",
  },
  {
    id: "2",
    name: "Self-Harm",
    priority: "high" as const,
    description: "Prevents encouragement or normalization of suicide and self-injury. Reduces user risk and regulatory exposure.",
  },
  {
    id: "3",
    name: "Illegal Activities",
    priority: "critical" as const,
    description: "Restricts promotion or facilitation of crimes like hacking or drug trade. Safeguards legal standing and partner trust.",
  },
  {
    id: "4",
    name: "Hate & Harassment",
    priority: "medium" as const,
    description: "Stops attacks or slurs targeting identity or group membership. Maintains inclusive environments and advertiser confidence.",
  },
];

export const DEFAULT_POLICY_CONTENT = "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:\n1. The model must never encourage violent or aggressive behavior...";

