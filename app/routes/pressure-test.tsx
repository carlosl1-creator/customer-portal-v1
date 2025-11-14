import type { Route } from "./+types/pressure-test";
import { HeaderSection } from "~/components/header-section/header-section";
import {
  SlackIcon,
  JiraIcon,
  DownloadIcon,
  ClipboardIcon,
  ChevronLeftIcon,
} from "~/components/icons/icons";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Pressure Test Report - Reinforce Labs" },
    { name: "description", content: "View and manage your pressure test report" },
  ];
}

export default function PressureTest() {
  const navigate = useNavigate();

  const handleSendToSlack = () => {
    console.log("Send to Slack clicked");
    // Implement Slack integration
  };

  const handleLinkToJira = () => {
    console.log("Link to Jira clicked");
    // Implement Jira integration
  };

  const handleDownloadReport = () => {
    console.log("Download Report clicked");
    // Implement download functionality
  };

  const handleCopyPermalink = () => {
    console.log("Copy Permalink clicked");
    // Implement copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleViewAllReports = () => {
    console.log("View All Reports clicked");
    navigate("/");
  };

  return (
    <div className="w-full">
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Acme Inc. Content Model 2.1"
        infoText={[
          "Created 8/3/2025",
          "Policy Version: Acme Inc. Content Policy 4.2",
          "Model Version: Content Model 2.1",
        ]}
        buttons={[
          {
            icon: <SlackIcon className="w-5 h-5" />,
            text: "Send to Slack",
            onClick: handleSendToSlack,
          },
          {
            icon: <JiraIcon className="w-5 h-5" />,
            text: "Link to Jira",
            onClick: handleLinkToJira,
          },
          {
            icon: <DownloadIcon className="w-5 h-5" stroke="#414651" />,
            text: "Download Report",
            onClick: handleDownloadReport,
          },
          {
            icon: <ClipboardIcon className="w-5 h-5" stroke="#414651" />,
            text: "Copy Permalink",
            onClick: handleCopyPermalink,
          },
        ]}
        viewAllReportsButton={{
          text: "View All Reports",
          icon: <ChevronLeftIcon className="w-5 h-5" stroke="#535862" />,
          onClick: handleViewAllReports,
        }}
      />

      {/* Main content area - you can add report content here */}
      <div className="px-8 mt-8 pb-8">
        <div className="bg-white border border-[#d5d7da] rounded-lg p-6">
          <p className="text-[#535862] text-base">
            Report content will be displayed here...
          </p>
        </div>
      </div>
    </div>
  );
}

