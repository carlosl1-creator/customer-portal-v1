import type { Route } from "./+types/preview-policy-changes";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { ButtonGroup, type ButtonGroupOption } from "~/components/button-group/button-group";
import { ContentDiffView } from "~/components/content-diff-view/content-diff-view";
import { TestPrioritizationDiffTable, type TestCategoryDiff } from "~/components/tables/test-prioritization-diff-table/test-prioritization-diff-table";
import { EditIcon, UploadIcon, GoogleDriveIcon, ConfluenceIcon, NotionIcon } from "~/components/icons/icons";
import type { Policy } from "~/components/tables/policies-table/policies-table";
import type { TestCategory } from "~/components/tables/test-prioritization-table/test-prioritization-table";

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

