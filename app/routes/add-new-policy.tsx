import type { Route } from "./+types/add-new-policy";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { ButtonGroup, type ButtonGroupOption } from "~/components/button-group/button-group";
import { TestPrioritizationTable, type TestCategory, type Priority } from "~/components/tables/test-prioritization-table/test-prioritization-table";
import { ArrowUpRightIcon, UploadIcon, GoogleDriveIcon, ConfluenceIcon, NotionIcon } from "~/components/icons/icons";
import { UploadLocalFileModal } from "~/components/upload-local-file-modal/upload-local-file-modal";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Add New Policy - Reinforce Labs" },
    { name: "description", content: "Create a new policy to test your chatbots against" },
  ];
}

export default function AddNewPolicy() {
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [name, setName] = useState("Content Policy 2.1");
  const [status, setStatus] = useState<"active" | "draft" | "archive">("active");
  const [content, setContent] = useState(
    "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:\n1. The model must never encourage violent or aggressive behavior..."
  );

  // Mock test categories data
  const [categories, setCategories] = useState<TestCategory[]>([
    {
      id: "1",
      name: "Violence",
      priority: "high",
      description: "Blocks threats, depictions, or instructions for physical harm or weapon use. Enables safety compliance and protects brand integrity.",
    },
    {
      id: "2",
      name: "Self-Harm",
      priority: "high",
      description: "Prevents encouragement or normalization of suicide and self-injury. Reduces user risk and regulatory exposure.",
    },
    {
      id: "3",
      name: "Illegal Activities",
      priority: "critical",
      description: "Restricts promotion or facilitation of crimes like hacking or drug trade. Safeguards legal standing and partner trust.",
    },
    {
      id: "4",
      name: "Hate & Harassment",
      priority: "medium",
      description: "Stops attacks or slurs targeting identity or group membership. Maintains inclusive environments and advertiser confidence.",
    },
  ]);

  const handleUploadLocalFile = () => {
    setIsUploadModalOpen(true);
  };

  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file.name);
    // Read file content and set it to the content field
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        setContent(text);
      }
    };
    reader.readAsText(file);
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

  const handlePriorityChange = (id: string, priority: Priority) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, priority } : cat))
    );
  };

  const handleViewDetails = (category: TestCategory) => {
    console.log("View details for category:", category);
    // TODO: Implement view details functionality
  };

  const handleCreatePolicy = () => {
    console.log("Creating policy:", {
      name,
      status,
      content,
      categories,
    });
    // TODO: Implement create policy functionality
    // After creation, navigate back to policy manager
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

  const canCreatePolicy = name.trim() !== "" && content.trim() !== "";

  return (
    <div className="w-full px-10 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-gradient-to-b blur-[100px] filter from-[rgba(24,75,255,0)] opacity-10 to-[#174aff] h-[559px] left-[227px] top-[-76px] w-[394px]" />
      </div>

      <HeaderSection
        pageName="ADD NEW POLICY"
        title="Add New Policy"
        infoText={["Create a new policy to test your chatbots against"]}
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

          {/* Content Field */}
          <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
            <p className="font-medium leading-6 text-[#535862] text-base">
              Content <span className="font-bold text-[#d92d20]">*</span>
            </p>
            <div className="flex flex-col gap-1.5 items-start relative w-full">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-white border border-[#d5d7da] rounded-[8px] w-full px-[14px] py-[10px] font-normal leading-6 text-base tracking-[-0.32px] text-[#181d27] outline-none hover:border-[#1570ef] focus:border-[#1570ef] transition-colors resize-none"
                rows={8}
                placeholder="Enter policy content..."
              />
            </div>
          </div>

          {/* Test Prioritization Section */}
          <div className="flex flex-col gap-3 items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-1 items-start relative shrink-0">
              <p className="font-medium leading-6 text-[#535862] text-base">
                Test Prioritization
              </p>
              <p className="font-normal leading-5 text-[#535862] text-sm">
                Category priorities have been preset for you. Customize to your top areas of concern.
              </p>
            </div>
            <TestPrioritizationTable
              categories={categories}
              onPriorityChange={handlePriorityChange}
              onViewDetails={handleViewDetails}
            />
          </div>

          {/* Mandatory Fields Note */}
          <p className="font-normal leading-5 text-[#535862] text-sm">
            Fields marked with <span className="text-[#d92d20]">*</span> are mandatory.
          </p>

          {/* Create Policy Button */}
          <div className="flex gap-6 items-start">
            <button
              onClick={canCreatePolicy ? handleCreatePolicy : undefined}
              disabled={!canCreatePolicy}
              className={`box-border flex gap-2 items-center justify-center px-5 py-3 rounded-lg transition-colors ${
                canCreatePolicy
                  ? "bg-[#181d27] border border-[#181d27] text-white hover:opacity-90 cursor-pointer"
                  : "bg-gray-300 border border-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ArrowUpRightIcon className="w-5 h-5" stroke={canCreatePolicy ? "white" : "currentColor"} />
              <span className="font-semibold text-base leading-6">Create Policy</span>
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

