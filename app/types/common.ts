/**
 * Common type definitions shared across the application
 */

export type PolicyStatus = "active" | "draft" | "archive";

export type Priority = "critical" | "high" | "medium" | "low";

export interface BaseEntity {
  id: string;
  name: string;
}

