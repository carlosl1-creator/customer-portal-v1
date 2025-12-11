/**
 * LocalStorage key constants
 * Centralized storage keys to prevent typos and ensure consistency
 */
export const STORAGE_KEYS = {
  THEME: "theme",
  HAS_VISITED: "hasVisited",
  USER_NAME: "userName",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

