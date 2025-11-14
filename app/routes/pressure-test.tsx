import type { Route } from "./+types/pressure-test";
import { HeaderSection } from "~/components/header-section/header-section";
import {
  SlackIcon,
  JiraIcon,
  DownloadIcon,
  ClipboardIcon,
  ChevronLeftIcon,
  CropIcon,
  FeatherIcon,
} from "~/components/icons/icons";
import { Section } from "~/components/section/section";
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

      {/* Main content area */}
      <div className="px-0 mt-8 pb-8">
        <Section
          title="Top Insights"
          cards={[
            {
              icon: <CropIcon className="w-6 h-6" stroke="#181d27" />,
              title: "Model Alignment & Guardrail Tuning",
              focusText: "Refining internal refusal logic, bias correction, and escalation behavior.",
              listTitle: "Critical Vulnerabilities:",
              listItems: [
                "Fine-tune small adapter layer on multi-turn refusal consistency set (focus on context carryover and stable tone).",
                "Integrate refusal rationale templates tied to category metadata (e.g., \"safety reason → example phrasebook\").",
                "Calibrate escalation intents using reinforcement signals from simulator traces (detecting \"should have redirected\" cases).",
              ],
              thumbsUpActive: true,
              thumbsDownActive: false,
              onThumbsUpClick: () => console.log("Thumbs up clicked"),
              onThumbsDownClick: () => console.log("Thumbs down clicked"),
              gradientVariant: "sunset",
            },
            {
              icon: <FeatherIcon className="w-6 h-6" stroke="#181d27" />,
              title: "Prompt Design & Input Framing",
              focusText: "How system or user prompts shape model responses.",
              listTitle: "Critical Vulnerabilities:",
              listItems: [
                "Prepend compact policy reminders in system prompt (\"Always prioritize user safety and policy compliance...\").",
                "Add turn-level re-grounding every 3–4 exchanges in long chats.",
                "Test counterfactual prompt phrasing (e.g., \"as an educational explanation only\") to surface latent failure modes.",
              ],
              thumbsUpActive: false,
              thumbsDownActive: true,
              onThumbsUpClick: () => console.log("Thumbs up clicked"),
              onThumbsDownClick: () => console.log("Thumbs down clicked"),
              gradientVariant: "nebulae",
            },
          ]}
        />
      </div>
    </div>
  );
}

