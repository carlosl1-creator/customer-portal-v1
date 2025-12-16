import type { Route } from "./+types/policy-manager";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { PoliciesTable, type Policy, type PolicyStatus } from "~/components/tables/policies-table/policies-table";
import { PlusIcon, GoogleDriveIcon, ConfluenceIcon, NotionIcon } from "~/components/icons/icons";
import { Pill } from "~/components/pill/pill";
import {
  useAppSelector,
  useAppDispatch,
  selectAllPolicies,
  removePolicy,
  type Policy as ReduxPolicy,
} from "~/store";
import { ROUTES } from "~/constants/routes";
import { logger } from "~/utils/logger";

/**
 * Transform Redux Policy to PoliciesTable Policy format
 */
function transformPolicyForTable(
  policy: ReduxPolicy,
  index: number,
  allPolicies: ReduxPolicy[]
): Policy {
  // Format date from ISO to readable format
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Determine status based on policy position and reports
  const determineStatus = (): PolicyStatus => {
    // Sort by updated_at to find the most recent
    const sortedByDate = [...allPolicies].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    
    // Most recently updated policy is "active"
    if (sortedByDate[0]?.id === policy.id) {
      return "active";
    }
    
    // Policies with 0 reports are "draft"
    if (policy.reports === 0) {
      return "draft";
    }
    
    // All others are "archive"
    return "archive";
  };

  return {
    id: policy.id,
    name: policy.name,
    version: policy.version,
    created: formatDate(policy.created_at),
    status: determineStatus(),
    reports: policy.reports,
    content: policy.policy_text_md,
  };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Policy Manager - Reinforce Labs" },
    { name: "description", content: "Manage all chatbot policies and versions" },
  ];
}

export default function PolicyManager() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get policies from Redux store
  const reduxPolicies = useAppSelector(selectAllPolicies);

  // Transform Redux policies to table format
  const policies: Policy[] = useMemo(() => 
    reduxPolicies.map((policy, index) => transformPolicyForTable(policy, index, reduxPolicies)),
    [reduxPolicies]
  );

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
    // Dispatch removePolicy action to Redux store
    dispatch(removePolicy(policy.id));
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
      >
        <Pill
          label="Demo Feature"
          message="Coming Q3 2026."
          linkText="Read our roadmap"
          linkHref="/roadmap"
        />
      </HeaderSection>

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

