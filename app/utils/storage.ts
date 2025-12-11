import { STORAGE_KEYS } from "~/constants/storage-keys";

/**
 * Safe localStorage utilities with error handling
 */
class Storage {
  /**
   * Get item from localStorage with type safety
   */
  get<T>(key: string, defaultValue: T | null = null): T | null {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * Get string item from localStorage (no JSON parsing)
   */
  getString(key: string, defaultValue: string | null = null): string | null {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    try {
      return localStorage.getItem(key) ?? defaultValue;
    } catch (error) {
      console.error(`Error reading string from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * Set item in localStorage with error handling
   */
  set<T>(key: string, value: T): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Set string item in localStorage (no JSON stringification)
   */
  setString(key: string, value: string): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing string to localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   */
  remove(key: string): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all localStorage
   */
  clear(): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  }
}

export const storage = new Storage();

/**
 * Convenience functions for common storage operations
 */
export const getTheme = (): string | null => {
  return storage.getString(STORAGE_KEYS.THEME);
};

export const setTheme = (theme: string): boolean => {
  return storage.setString(STORAGE_KEYS.THEME, theme);
};

export const hasVisited = (): boolean => {
  return storage.getString(STORAGE_KEYS.HAS_VISITED) !== null;
};

export const markAsVisited = (): boolean => {
  return storage.setString(STORAGE_KEYS.HAS_VISITED, "true");
};

