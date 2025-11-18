import type { Route } from "./+types/policy-manager";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { PoliciesTable, type Policy } from "~/components/policies-table/policies-table";
import { PlusIcon } from "~/components/icons/icons";

// Icon components for import buttons
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
    { title: "Policy Manager - Reinforce Labs" },
    { name: "description", content: "Manage all chatbot policies and versions" },
  ];
}

export default function PolicyManager() {
  const navigate = useNavigate();
  
  // Mock data for policies
  const [policies] = useState<Policy[]>([
    {
      id: "1",
      name: "Content Policy",
      version: "2.1",
      created: "8/14/2025",
      status: "active",
      reports: 2,
      content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
    },
    {
      id: "2",
      name: "Content Policy",
      version: "2.0",
      created: "7/10/2025",
      status: "draft",
      reports: 0,
      content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
    },
    {
      id: "3",
      name: "Content Policy",
      version: "1.2",
      created: "6/30/2025",
      status: "archive",
      reports: 1,
      content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
    },
    {
      id: "4",
      name: "Content Policy",
      version: "1.1",
      created: "6/28/2025",
      status: "archive",
      reports: 1,
      content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
    },
    {
      id: "5",
      name: "Content Policy",
      version: "1.0",
      created: "6/5/2025",
      status: "archive",
      reports: 1,
      content: "The following outlines the content policy pertaining to Acme Inc.'s customer-facing chatbot:....",
    },
  ]);

  const handleAddNewPolicy = () => {
    navigate("/add-new-policy");
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

  const handleEdit = (policy: Policy) => {
    console.log("Edit policy:", policy);
    // TODO: Implement edit policy functionality
  };

  const handleDelete = (policy: Policy) => {
    console.log("Delete policy:", policy);
    // TODO: Implement delete policy functionality
  };

  const headerButtons: HeaderButton[] = [
    {
      icon: <PlusIcon className="w-5 h-5" stroke="#414651" />,
      text: "Add New Policy",
      onClick: handleAddNewPolicy,
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

  return (
    <div className="w-full px-10 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-gradient-to-b blur-[100px] filter from-[rgba(24,75,255,0)] opacity-10 to-[#174aff] h-[559px] left-[227px] top-[-76px] w-[394px]" />
      </div>

      <HeaderSection
        pageName="POLICY MANAGER"
        title="Policy Manager"
        infoText={["Manage all chatbot policies and versions"]}
        buttons={headerButtons}
      />

      {/* Main Content */}
      <div className="px-10 pb-12 pt-10 relative z-10">
        <PoliciesTable
          policies={policies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

