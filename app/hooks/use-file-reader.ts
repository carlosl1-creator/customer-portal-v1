import { useState, useCallback } from "react";
import { readTextFile, type FileReadResult } from "~/utils/file-reader";

interface UseFileReaderReturn {
  content: string | null;
  error: Error | null;
  isLoading: boolean;
  readFile: (file: File) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for reading file contents
 */
export function useFileReader(): UseFileReaderReturn {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const readFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setContent(null);

    try {
      const result: FileReadResult = await readTextFile(file);
      if (result.success && result.content) {
        setContent(result.content);
      } else if (result.error) {
        setError(result.error);
      } else {
        setError(new Error("Failed to read file"));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setContent(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { content, error, isLoading, readFile, reset };
}

