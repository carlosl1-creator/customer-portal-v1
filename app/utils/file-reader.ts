/**
 * File reading utilities
 */

export interface FileReadResult {
  success: boolean;
  content?: string;
  error?: Error;
}

/**
 * Read a text file asynchronously
 */
export async function readTextFile(file: File): Promise<FileReadResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        resolve({ success: true, content });
      } catch (error) {
        resolve({
          success: false,
          error: error instanceof Error ? error : new Error("Unknown error"),
        });
      }
    };

    reader.onerror = () => {
      resolve({
        success: false,
        error: new Error("Failed to read file"),
      });
    };

    reader.readAsText(file);
  });
}

/**
 * Validate file type
 */
export function isValidTextFile(file: File, allowedTypes: string[] = ["text/plain", "text/markdown"]): boolean {
  return allowedTypes.includes(file.type) || file.name.endsWith(".txt") || file.name.endsWith(".md");
}

/**
 * Validate file size (in bytes)
 */
export function isValidFileSize(file: File, maxSizeBytes: number = 5 * 1024 * 1024): boolean {
  return file.size <= maxSizeBytes;
}

