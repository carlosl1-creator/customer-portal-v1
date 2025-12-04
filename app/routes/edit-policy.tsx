import type { Route } from "./+types/edit-policy";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { ButtonGroup, type ButtonGroupOption } from "~/components/button-group/button-group";
import { TestPrioritizationTable, type TestCategory } from "~/components/tables/test-prioritization-table/test-prioritization-table";
import { ArrowUpRightIcon, UploadIcon, GoogleDriveIcon, ConfluenceIcon, NotionIcon } from "~/components/icons/icons";
import type { Policy } from "~/components/tables/policies-table/policies-table";
import { UploadLocalFileModal } from "~/components/upload-local-file-modal/upload-local-file-modal";
import { usePolicyForm } from "~/hooks/use-policy-form";
import { useFileReader } from "~/hooks/use-file-reader";
import { ROUTES } from "~/constants/routes";
import { logger } from "~/utils/logger";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Edit Policy - Reinforce Labs" },
    { name: "description", content: "Edit an existing policy" },
  ];
}

import { DEFAULT_TEST_CATEGORIES, DEFAULT_POLICY_CONTENT, POLICY_STATUS_OPTIONS } from "~/constants/policy";

export default function EditPolicy() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { readFile, content: fileContent, reset: resetFileReader } = useFileReader();
  
  // Get policy data from navigation state or use defaults
  const policy = (location.state as { policy?: Policy })?.policy;
  
  // Store original values for comparison - these should never change after initial load
  const [originalName] = useState(() => policy?.name || "Content Policy 2.1");
  const [originalStatus] = useState<"active" | "draft" | "archive">(() =>
    policy?.status || "active"
  );
  const [originalContent] = useState(() => policy?.content || DEFAULT_POLICY_CONTENT);
  const [originalCategories] = useState<TestCategory[]>(() => DEFAULT_TEST_CATEGORIES);
  
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
      name: policy?.name || "Content Policy 2.1",
      status: policy?.status || "active",
      content: policy?.content || DEFAULT_POLICY_CONTENT,
    },
    originalCategories,
  });

  // Update content when file is read
  useEffect(() => {
    if (fileContent) {
      setContent(fileContent);
      resetFileReader();
    }
  }, [fileContent, setContent, resetFileReader]);

  // Update form when policy data is available (only if policy comes in after mount)
  useEffect(() => {
    if (policy) {
      setName(policy.name);
      setStatus(policy.status);
      setContent(policy.content);
    }
  }, [policy, setName, setStatus, setContent]);

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
      id: policy?.id,
      ...formData,
    });
    // Navigate to preview policy changes screen with both original and edited data
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
        policyId: policy?.id,
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

