import type { Route } from "./+types/edit-policy";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { ButtonGroup, type ButtonGroupOption } from "~/components/button-group/button-group";
import { TestPrioritizationTable } from "~/components/tables/test-prioritization-table/test-prioritization-table";
import { ArrowUpRightIcon, UploadIcon, GoogleDriveIcon, ConfluenceIcon, NotionIcon } from "~/components/icons/icons";
import { UploadLocalFileModal } from "~/components/upload-local-file-modal/upload-local-file-modal";
import { usePolicyForm } from "~/hooks/use-policy-form";
import { useFileReader } from "~/hooks/use-file-reader";
import { ROUTES } from "~/constants/routes";
import { logger } from "~/utils/logger";
import {
  useAppSelector,
  selectAllPolicies,
  selectAllReports,
  type Policy as ReduxPolicy,
  type Report,
  type CategoryData,
} from "~/store";
import type { TestCategory, Priority } from "~/components/tables/test-prioritization-table/test-prioritization-table";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Edit Policy - Reinforce Labs" },
    { name: "description", content: "Edit an existing policy" },
  ];
}

import { DEFAULT_POLICY_CONTENT, POLICY_STATUS_OPTIONS } from "~/constants/policy";

/**
 * Aggregated category data for deriving test categories
 */
interface AggregatedCategory {
  priority: Priority;
  totalAsr: number;
  count: number;
  avgTurns: number;
  avgTurnsLength: number;
}

/**
 * Derive test categories from reports
 * Aggregates categories from all completed reports' attack_success_rate.categories
 */
function deriveTestCategoriesFromReports(reports: Report[]): TestCategory[] {
  // Only use completed reports with categories
  const completedReports = reports.filter(
    (r) => r.status === "completed" && Object.keys(r.attack_success_rate.categories).length > 0
  );
  
  // Aggregate categories across all reports
  const categoryMap = new Map<string, AggregatedCategory>();
  
  completedReports.forEach((report) => {
    Object.entries(report.attack_success_rate.categories).forEach(([categoryName, data]) => {
      const existing = categoryMap.get(categoryName);
      
      if (existing) {
        // Aggregate: keep highest priority, average the metrics
        const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
        const newPriority = priorityOrder[data.priority] > priorityOrder[existing.priority] 
          ? data.priority 
          : existing.priority;
        
        categoryMap.set(categoryName, {
          priority: newPriority as Priority,
          totalAsr: existing.totalAsr + data.asr,
          count: existing.count + 1,
          avgTurns: (existing.avgTurns * existing.count + data.avg_turns) / (existing.count + 1),
          avgTurnsLength: (existing.avgTurnsLength * existing.count + data.avg_turns_length) / (existing.count + 1),
        });
      } else {
        categoryMap.set(categoryName, {
          priority: data.priority as Priority,
          totalAsr: data.asr,
          count: 1,
          avgTurns: data.avg_turns,
          avgTurnsLength: data.avg_turns_length,
        });
      }
    });
  });
  
  // Convert to TestCategory format
  const categories: TestCategory[] = [];
  let index = 0;
  
  categoryMap.forEach((data, categoryName) => {
    const avgAsr = data.totalAsr / data.count;
    
    // Create description based on aggregated metrics
    const description = `${categoryName} testing category with ${data.priority} priority. Average ASR: ${avgAsr.toFixed(1)}%, Avg turns: ${data.avgTurns.toFixed(1)}, tested across ${data.count} report(s).`;
    
    categories.push({
      id: `cat-${index + 1}`,
      name: categoryName,
      priority: data.priority,
      description,
    });
    
    index++;
  });
  
  // Sort by priority (high first)
  const priorityOrder: Record<Priority, number> = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
  };
  
  return categories.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
}

export default function EditPolicy() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { readFile, content: fileContent, reset: resetFileReader } = useFileReader();
  
  // Get policy ID from navigation state
  const policyId = (location.state as { policy?: { id: string } })?.policy?.id;
  
  // Get the full Redux policy using the ID
  const reduxPolicies = useAppSelector(selectAllPolicies);
  const reduxPolicy = useMemo(() => 
    reduxPolicies.find(p => p.id === policyId) || null,
    [reduxPolicies, policyId]
  );
  
  // Get reports and derive test categories from only this policy's reports
  const allReports = useAppSelector(selectAllReports);
  const derivedCategories = useMemo(() => {
    // Filter reports to only those belonging to this policy
    const policyReports = reduxPolicy 
      ? allReports.filter(r => r.policy_name === reduxPolicy.name)
      : [];
    return deriveTestCategoriesFromReports(policyReports);
  }, [allReports, reduxPolicy]);
  
  // Derive status from Redux policy data
  const deriveStatus = (policy: ReduxPolicy | null, allPolicies: ReduxPolicy[]): "active" | "draft" | "archive" => {
    if (!policy) return "draft";
    
    // Sort by updated_at to find the most recent
    const sortedByDate = [...allPolicies].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    
    // Most recently updated policy is "active"
    if (sortedByDate[0]?.id === policy.id) return "active";
    
    // Policies with 0 reports are "draft"
    if (policy.reports === 0) return "draft";
    
    // All others are "archive"
    return "archive";
  };
  
  // Store original values for comparison - these should never change after initial load
  const [originalName] = useState(() => reduxPolicy?.name || "Content Policy 2.1");
  const [originalStatus] = useState<"active" | "draft" | "archive">(() =>
    deriveStatus(reduxPolicy, reduxPolicies)
  );
  const [originalContent] = useState(() => reduxPolicy?.policy_text_md || DEFAULT_POLICY_CONTENT);
  const [originalCategories, setOriginalCategories] = useState<TestCategory[]>(derivedCategories);
  
  // Update original categories when derived categories change (e.g., simulations loaded)
  useEffect(() => {
    if (derivedCategories.length > 0 && originalCategories.length === 0) {
      setOriginalCategories(derivedCategories);
    }
  }, [derivedCategories, originalCategories.length]);
  
  const initialStatus = deriveStatus(reduxPolicy, reduxPolicies);
  
  const {
    name,
    setName,
    status,
    setStatus,
    content,
    setContent,
    categories,
    handlePriorityChange,
    isValid,
    formData,
  } = usePolicyForm({
    initialData: {
      name: reduxPolicy?.name || "Content Policy 2.1",
      status: initialStatus,
      content: reduxPolicy?.policy_text_md || DEFAULT_POLICY_CONTENT,
    },
    originalCategories: derivedCategories,
  });

  // Update content when file is read
  useEffect(() => {
    if (fileContent) {
      setContent(fileContent);
      resetFileReader();
    }
  }, [fileContent, setContent, resetFileReader]);

  // Update form when Redux policy data is available
  useEffect(() => {
    if (reduxPolicy) {
      setName(reduxPolicy.name);
      setStatus(deriveStatus(reduxPolicy, reduxPolicies));
      setContent(reduxPolicy.policy_text_md);
    }
  }, [reduxPolicy, reduxPolicies, setName, setStatus, setContent]);

  const handleUploadLocalFile = () => {
    setIsUploadModalOpen(true);
  };

  const handleFileUpload = async (file: File) => {
    logger.debug("File uploaded:", file.name);
    await readFile(file);
  };

  const handleImportFromGoogleDrive = () => {
    logger.info("Import from Google Drive clicked");
    // TODO: Implement import from Google Drive functionality
  };

  const handleImportFromConfluence = () => {
    logger.info("Import from Confluence clicked");
    // TODO: Implement import from Confluence functionality
  };

  const handleImportFromNotion = () => {
    logger.info("Import from Notion clicked");
    // TODO: Implement import from Notion functionality
  };

  const handleViewDetails = (category: TestCategory) => {
    logger.debug("View details for category:", category);
    // TODO: Implement view details functionality
  };

  const handleUpdatePolicy = () => {
    logger.debug("Updating policy:", {
      id: policyId,
      ...formData,
    });
    // Navigate to preview policy changes screen with both original and edited data
    // Also pass the full Redux policy for updating
    navigate(ROUTES.PREVIEW_POLICY_CHANGES, {
      state: {
        originalPolicy: {
          name: originalName,
          status: originalStatus,
          content: originalContent,
        },
        editedPolicy: {
          name: formData.name,
          status: formData.status,
          content: formData.content,
        },
        originalCategories,
        editedCategories: formData.categories,
        policyId,
        // Pass the full Redux policy for reference when updating
        reduxPolicy,
      },
    });
  };


  const headerButtons: HeaderButton[] = [
    {
      icon: <UploadIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />,
      text: "Upload Local File",
      onClick: handleUploadLocalFile,
    },
    {
      icon: <GoogleDriveIcon className="w-5 h-5" />,
      text: "Import from Google Drive",
      onClick: handleImportFromGoogleDrive,
    },
    {
      icon: <ConfluenceIcon className="w-5 h-5" />,
      text: "Import from Confluence",
      onClick: handleImportFromConfluence,
    },
    {
      icon: <NotionIcon className="w-5 h-5" />,
      text: "Import from Notion",
      onClick: handleImportFromNotion,
    },
  ];

  const canUpdatePolicy = name.trim() !== "" && content.trim() !== "";

  return (
    <div className="w-full px-10 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-gradient-to-b blur-[100px] filter from-[rgba(24,75,255,0)] opacity-10 to-[#174aff] h-[559px] left-[227px] top-[-76px] w-[394px]" />
      </div>

      <HeaderSection
        pageName="EDIT POLICY"
        title="Edit Policy"
        infoText={["Edit an existing policy to test your chatbots against"]}
        buttons={headerButtons}
      />

      {/* Main Content */}
      <div className="px-10 pb-12 pt-10 relative z-10">
        <div className="flex flex-col gap-8 items-start relative shrink-0 w-full max-w-[1080px]">
          {/* Name and Status Fields */}
          <div className="flex gap-8 items-start relative shrink-0 w-full">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
                <p className="font-medium leading-6 text-[var(--color-text-secondary)] text-base">
                  Name <span className="font-bold text-[var(--color-error)]">*</span>
                </p>
                <div className="flex flex-col gap-1.5 items-start relative w-full max-w-[320px]">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[var(--color-bg-input)] border border-[var(--color-border-secondary)] rounded-[8px] w-full px-[14px] py-[10px] font-normal leading-6 text-base tracking-[-0.32px] text-[var(--color-text-primary)] outline-none hover:border-[var(--color-border-focus)] focus:border-[var(--color-border-focus)] transition-colors"
                    placeholder="Content Policy 2.1"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
                <p className="font-medium leading-6 text-[var(--color-text-secondary)] text-base">
                  Status <span className="font-bold text-[var(--color-error)]">*</span>
                </p>
                <ButtonGroup
                  options={POLICY_STATUS_OPTIONS}
                  value={status}
                  onChange={(value) => setStatus(value as "active" | "draft" | "archive")}
                />
              </div>
            </div>
          </div>

          {/* Content Field */}
          <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
            <p className="font-medium leading-6 text-[var(--color-text-secondary)] text-base">
              Content <span className="font-bold text-[var(--color-error)]">*</span>
            </p>
            <div className="flex flex-col gap-1.5 items-start relative w-full">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-[var(--color-bg-input)] border border-[var(--color-border-secondary)] rounded-[8px] w-full px-[14px] py-[10px] font-normal leading-6 text-base tracking-[-0.32px] text-[var(--color-text-primary)] outline-none hover:border-[var(--color-border-focus)] focus:border-[var(--color-border-focus)] transition-colors resize-none"
                rows={8}
                placeholder="Enter policy content..."
              />
            </div>
          </div>

          {/* Test Prioritization Section */}
          <div className="flex flex-col gap-3 items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-1 items-start relative shrink-0">
              <p className="font-medium leading-6 text-[var(--color-text-secondary)] text-base">
                Test Prioritization
              </p>
              <p className="font-normal leading-5 text-[var(--color-text-secondary)] text-sm">
                Category priorities have been preset for you. Customize to your top areas of concern.
              </p>
            </div>
            <TestPrioritizationTable
              categories={formData.categories}
              onPriorityChange={handlePriorityChange}
              onViewDetails={handleViewDetails}
            />
          </div>

          {/* Mandatory Fields Note */}
          <p className="font-normal leading-5 text-[var(--color-text-secondary)] text-sm">
            Fields marked with <span className="text-[var(--color-error)]">*</span> are mandatory.
          </p>

          {/* Update Policy Button */}
          <div className="flex gap-6 items-start">
            <button
              onClick={isValid ? handleUpdatePolicy : undefined}
              disabled={!isValid}
              className={`box-border flex gap-2 items-center justify-center px-5 py-3 rounded-lg transition-colors ${
                isValid
                  ? "bg-[var(--color-text-primary)] border border-[var(--color-text-primary)] text-[var(--color-text-inverted)] hover:opacity-90 cursor-pointer"
                  : "bg-[var(--color-bg-muted)] border border-[var(--color-border-secondary)] text-[var(--color-text-muted)] cursor-not-allowed"
              }`}
            >
              <ArrowUpRightIcon className="w-5 h-5" stroke={isValid ? "var(--color-text-inverted)" : "currentColor"} />
              <span className="font-semibold text-base leading-6">Update Policy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upload Local File Modal */}
      <UploadLocalFileModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onConfirm={handleFileUpload}
      />
    </div>
  );
}

