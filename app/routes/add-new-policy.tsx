import type { Route } from "./+types/add-new-policy";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { InputField } from "~/components/input-field/input-field";
import { ButtonGroup, type ButtonGroupOption } from "~/components/button-group/button-group";
import { TestPrioritizationTable, type TestCategory, type Priority } from "~/components/test-prioritization-table/test-prioritization-table";
import { ArrowUpRightIcon } from "~/components/icons/icons";

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
    { title: "Add New Policy - Reinforce Labs" },
    { name: "description", content: "Create a new policy to test your chatbots against" },
  ];
}

export default function AddNewPolicy() {
  const navigate = useNavigate();
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
    </div>
  );
}

