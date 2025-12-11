import type { Policy } from "~/components/tables/policies-table/policies-table";

/**
 * Mock policies data for policy manager
 * In production, this data would come from API calls
 */
export const MOCK_POLICIES: Policy[] = [
  {
    id: "1",
    name: "Content Policy",
    version: "2.1",
    created: "8/14/2025",
    status: "active",
    reports: 2,
    content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
  },
  {
    id: "2",
    name: "Content Policy",
    version: "2.0",
    created: "7/10/2025",
    status: "draft",
    reports: 0,
    content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
  },
  {
    id: "3",
    name: "Content Policy",
    version: "1.2",
    created: "6/30/2025",
    status: "archive",
    reports: 1,
    content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
  },
  {
    id: "4",
    name: "Content Policy",
    version: "1.1",
    created: "6/28/2025",
    status: "archive",
    reports: 1,
    content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
  },
  {
    id: "5",
    name: "Content Policy",
    version: "1.0",
    created: "6/5/2025",
    status: "archive",
    reports: 1,
    content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
  },
];

