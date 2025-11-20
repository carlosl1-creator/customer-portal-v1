import type { Route } from "./+types/preview-policy-changes";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { ButtonGroup, type ButtonGroupOption } from "~/components/button-group/button-group";
import { ContentDiffView } from "~/components/content-diff-view/content-diff-view";
import { TestPrioritizationDiffTable, type TestCategoryDiff } from "~/components/tables/test-prioritization-diff-table/test-prioritization-diff-table";
import { EditIcon } from "~/components/icons/icons";
import type { Policy } from "~/components/tables/policies-table/policies-table";
import type { TestCategory } from "~/components/tables/test-prioritization-table/test-prioritization-table";

// Icon components for import buttons
function UploadIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function GoogleDriveIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M7.71 2.5 1.15 15l3.43 6 6.55-12.5zM12.85 2.5 6.3 15l3.43 6 6.56-12.5zM22.29 8.5 15.73 21l-3.43-6 6.56-12.5z"/>
    </svg>
  );
}

function ConfluenceIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M0 12.75V24h11.25v-2.625H2.625V12.75H0zm21.375 0V24H24V12.75h-2.625zm-11.25-12V12H24V9.375H12.75V.75H10.125zm-10.5 0v8.625H2.625V2.625h8.625V0H0z"/>
    </svg>
  );
}

function NotionIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.748.327-.748.933zm14.337.606c.093.42 0 .841-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .841-1.168.841l-3.222.186c-.093-.186 0-.653.327-.746l.841-.233V9.3L7.822 9.07c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933l3.178-.186z"/>
    </svg>
  );
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Preview Policy Changes - Reinforce Labs" },
    { name: "description", content: "Preview changes before committing policy updates" },
  ];
}

export default function PreviewPolicyChanges() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get original and edited data from navigation state
  const state = location.state as {
    originalPolicy?: { name: string; status: "active" | "draft" | "archive"; content: string };
    editedPolicy?: { name: string; status: "active" | "draft" | "archive"; content: string };
    originalCategories?: TestCategory[];
    editedCategories?: TestCategory[];
    policyId?: string;
  } | null;

  const originalPolicy = state?.originalPolicy;
  const editedPolicy = state?.editedPolicy;
  const originalCategories = state?.originalCategories || [];
  const editedCategories = state?.editedCategories || [];
  
  // Use edited values for display (these are the new values)
  const [name, setName] = useState(editedPolicy?.name || originalPolicy?.name || "Content Policy 2.1");
  const [status, setStatus] = useState<"active" | "draft" | "archive">(
    editedPolicy?.status || originalPolicy?.status || "active"
  );

  // Content before (original) and after (edited)
  const contentBefore = originalPolicy?.content || "";
  const contentAfter = editedPolicy?.content || "";

  // Compute category diffs by comparing original and edited categories
  const categoryDiffs: TestCategoryDiff[] = React.useMemo(() => {
    // Create a map of edited categories by id
    const editedMap = new Map(editedCategories.map(cat => [cat.id, cat]));
    
    // For each original category, find its edited version and create a diff
    return originalCategories.map(originalCat => {
      const editedCat = editedMap.get(originalCat.id);
      return {
        id: originalCat.id,
        name: originalCat.name,
        oldPriority: originalCat.priority,
        newPriority: editedCat?.priority || originalCat.priority,
        description: originalCat.description,
      };
    });
  }, [originalCategories, editedCategories]);

  // Update form when data is available
  useEffect(() => {
    if (editedPolicy) {
      setName(editedPolicy.name);
      setStatus(editedPolicy.status);
    }
  }, [editedPolicy]);

  const handleUploadLocalFile = () => {
    console.log("Upload Local File clicked");
    // TODO: Implement upload local file functionality
  };

  const handleImportFromGoogleDrive = () => {
    console.log("Import from Google Drive clicked");
    // TODO: Implement import from Google Drive functionality
  };

  const handleImportFromConfluence = () => {
    console.log("Import from Confluence clicked");
    // TODO: Implement import from Confluence functionality
  };

  const handleImportFromNotion = () => {
    console.log("Import from Notion clicked");
    // TODO: Implement import from Notion functionality
  };

  const handleViewDetails = (category: TestCategoryDiff) => {
    console.log("View details for category:", category);
    // TODO: Implement view details functionality
  };

  const handleCommitChanges = () => {
    console.log("Committing policy changes:", {
      id: state?.policyId,
      name,
      status,
      contentAfter,
      categoryDiffs,
    });
    // TODO: Implement commit changes functionality
    // After commit, navigate back to policy manager
    navigate("/policy-manager");
  };

  const statusOptions: ButtonGroupOption[] = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Draft",
      value: "draft",
    },
    {
      label: "Archive",
      value: "archive",
    },
  ];

  const headerButtons: HeaderButton[] = [
    {
      icon: <UploadIcon className="w-5 h-5" stroke="#414651" />,
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

  const canCommitChanges = name.trim() !== "" && contentAfter.trim() !== "";

  return (
    <div className="w-full px-10 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-gradient-to-b blur-[100px] filter from-[rgba(24,75,255,0)] opacity-10 to-[#174aff] h-[559px] left-[227px] top-[-76px] w-[394px]" />
      </div>

      <HeaderSection
        pageName="PREVIEW POLICY CHANGES"
        title="Preview Policy Changes"
        infoText={["Edit your policy in detail for any updates, changes, or typos"]}
        buttons={headerButtons}
      />

      {/* Main Content */}
      <div className="px-10 pb-12 pt-10 relative z-10">
        <div className="flex flex-col gap-8 items-start relative shrink-0 w-full max-w-[1080px]">
          {/* Name and Status Fields */}
          <div className="flex gap-8 items-start relative shrink-0 w-full">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
                <p className="font-medium leading-6 text-[#535862] text-base">
                  Name <span className="font-bold text-[#d92d20]">*</span>
                </p>
                <div className="flex flex-col gap-1.5 items-start relative w-full max-w-[320px]">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-neutral-50 border border-[#d5d7da] rounded-[8px] w-full px-[14px] py-[10px] font-normal leading-6 text-base tracking-[-0.32px] text-[#181d27] outline-none hover:border-[#1570ef] focus:border-[#1570ef] transition-colors"
                    placeholder="Content Policy 2.1"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
                <p className="font-medium leading-6 text-[#535862] text-base">
                  Status <span className="font-bold text-[#d92d20]">*</span>
                </p>
                <ButtonGroup
                  options={statusOptions}
                  value={status}
                  onChange={(value) => setStatus(value as "active" | "draft" | "archive")}
                />
              </div>
            </div>
          </div>

          {/* Content Diff Field */}
          <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
            <p className="font-medium leading-6 text-[#535862] text-base">
              Content <span className="font-bold text-[#d92d20]">*</span>
            </p>
            <ContentDiffView before={contentBefore} after={contentAfter} />
          </div>

          {/* Test Prioritization Section */}
          <div className="flex flex-col gap-3 items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-1 items-start relative shrink-0">
              <p className="font-medium leading-6 text-[#535862] text-base">
                Test Prioritization
              </p>
            </div>
            <TestPrioritizationDiffTable
              categories={categoryDiffs}
              onViewDetails={handleViewDetails}
            />
          </div>

          {/* Commit Changes Button */}
          <div className="flex gap-6 items-start">
            <button
              onClick={canCommitChanges ? handleCommitChanges : undefined}
              disabled={!canCommitChanges}
              className={`box-border flex gap-2 items-center justify-center px-5 py-3 rounded-lg transition-colors ${
                canCommitChanges
                  ? "bg-[#181d27] border border-[#181d27] text-white hover:opacity-90 cursor-pointer"
                  : "bg-gray-300 border border-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <EditIcon className="w-5 h-5" stroke={canCommitChanges ? "white" : "currentColor"} />
              <span className="font-semibold text-base leading-6">Commit Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

