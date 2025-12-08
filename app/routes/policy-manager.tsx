import type { Route } from "./+types/policy-manager";
import { useNavigate } from "react-router";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { PoliciesTable, type Policy } from "~/components/tables/policies-table/policies-table";
import { PlusIcon, GoogleDriveIcon, ConfluenceIcon, NotionIcon } from "~/components/icons/icons";
import { MOCK_POLICIES } from "~/mocks";
import { ROUTES } from "~/constants/routes";
import { logger } from "~/utils/logger";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Policy Manager - Reinforce Labs" },
    { name: "description", content: "Manage all chatbot policies and versions" },
  ];
}

export default function PolicyManager() {
  const navigate = useNavigate();

  // In production, this would come from API calls or state management
  const policies = MOCK_POLICIES;

  const handleAddNewPolicy = () => {
    navigate(ROUTES.ADD_NEW_POLICY);
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

  const handleEdit = (policy: Policy) => {
    navigate(ROUTES.EDIT_POLICY, {
      state: { policy },
    });
  };

  const handleDelete = (policy: Policy) => {
    logger.debug("Delete policy:", policy);
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

