import { useState, useCallback } from "react";
import type { TestCategory, Priority } from "~/components/tables/test-prioritization-table/test-prioritization-table";
import type { PolicyStatus } from "~/types/common";

export interface PolicyFormData {
  name: string;
  status: PolicyStatus;
  content: string;
  categories: TestCategory[];
}

interface UsePolicyFormOptions {
  initialData?: Partial<PolicyFormData>;
  originalCategories?: TestCategory[];
}

/**
 * Custom hook for managing policy form state
 */
export function usePolicyForm({ initialData, originalCategories = [] }: UsePolicyFormOptions = {}) {
  const [name, setName] = useState(initialData?.name || "");
  const [status, setStatus] = useState<PolicyStatus>(initialData?.status || "active");
  const [content, setContent] = useState(initialData?.content || "");
  const [categories, setCategories] = useState<TestCategory[]>(
    initialData?.categories || originalCategories.map((cat) => ({ ...cat }))
  );

  const handlePriorityChange = useCallback((id: string, priority: Priority) => {
    setCategories((prev) => prev.map((cat) => (cat.id === id ? { ...cat, priority } : cat)));
  }, []);

  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const reset = useCallback(() => {
    setName(initialData?.name || "");
    setStatus(initialData?.status || "active");
    setContent(initialData?.content || "");
    setCategories(originalCategories.map((cat) => ({ ...cat })));
  }, [initialData, originalCategories]);

  const isValid = name.trim() !== "" && content.trim() !== "";

  return {
    name,
    setName,
    status,
    setStatus,
    content,
    setContent: updateContent,
    categories,
    setCategories,
    handlePriorityChange,
    isValid,
    reset,
    formData: {
      name,
      status,
      content,
      categories,
    },
  };
}

