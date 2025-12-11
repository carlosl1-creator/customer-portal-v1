import type { Category, Priority } from "~/components/tables/categories-table/categories-table";

/**
 * Mock categories data for test creation
 * In production, this data would come from API calls
 */
export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Violence", priority: "high" as Priority },
  { id: "2", name: "Self-Harm", priority: "medium" as Priority },
  { id: "3", name: "Illegal Activities", priority: "low" as Priority },
  { id: "4", name: "Self-Harm", priority: "medium" as Priority },
  { id: "5", name: "Hate Speech", priority: "high" as Priority },
  { id: "6", name: "Violence", priority: "medium" as Priority },
  { id: "7", name: "Illegal Activities", priority: "high" as Priority },
  { id: "8", name: "Others", priority: "low" as Priority },
  { id: "9", name: "Violence", priority: "low" as Priority },
  { id: "10", name: "Self-Harm", priority: "high" as Priority },
  { id: "11", name: "Hate Speech", priority: "medium" as Priority },
  { id: "12", name: "Illegal Activities", priority: "low" as Priority },
  { id: "13", name: "Others", priority: "medium" as Priority },
  { id: "14", name: "Violence", priority: "high" as Priority },
  { id: "15", name: "Self-Harm", priority: "low" as Priority },
  { id: "16", name: "Hate Speech", priority: "high" as Priority },
  { id: "17", name: "Illegal Activities", priority: "medium" as Priority },
  { id: "18", name: "Others", priority: "low" as Priority },
  { id: "19", name: "Violence", priority: "medium" as Priority },
  { id: "20", name: "Self-Harm", priority: "high" as Priority },
];

/**
 * Get high priority category IDs
 */
export function getHighPriorityCategoryIds(): string[] {
  return MOCK_CATEGORIES
    .filter((cat) => cat.priority === "high")
    .map((cat) => cat.id);
}

