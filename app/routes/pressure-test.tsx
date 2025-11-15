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
import { CasesCard } from "~/components/cases-card/cases-card";
import { RatingCard } from "~/components/rating-card/rating-card";
import { PillarScoreCard } from "~/components/pillar-score-card/pillar-score-card";
import { FoundVulnerabilitiesCard } from "~/components/found-vulnerabilities-card/found-vulnerabilities-card";
import { ConversationalStatisticsCard } from "~/components/conversational-statistics-card/conversational-statistics-card";
import { FilterBar } from "~/components/filter-bar/filter-bar";
import { TestCasesTable } from "~/components/test-cases-table/test-cases-table";
import { Pagination } from "~/components/pagination/pagination";
import { TopRiskAreaCard } from "~/components/top-risk-area-card/top-risk-area-card";
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
                "Add turn-level re-grounding every 3-4 exchanges in long chats.",
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

        {/* Overall Readiness and Total Cases Section */}
        <div className="px-8 mt-8">
          <div className="flex gap-[18px] items-stretch">
            {/* Overall Readiness - 70% */}
            <div className="flex-[0.7] min-w-0 h-full">
              <RatingCard
                title="Overall Readiness"
                subtitle="Overall rating based on model safety, security, and fraud and bias mitigation."
                rating={4.1}
                description="The system showcases a strong ability to enforce policies against direct violations, particularly in the categories of illegal activities and self-harm. However, it consistently struggles with nuanced evasion tactics, particularly those employing obfuscation and contextual deception, leading to significant gaps in enforcement."
                onHelpClick={() => console.log("Help clicked")}
              />
            </div>
            
            {/* Total Cases - 30% */}
            <div className="flex-[0.3] h-full">
              <CasesCard
                title="Total Cases"
                subtitle="Number of total simulation cases and risk distribution"
                totalCases={1576}
                scenarios={[
                  { label: "Violence", percentage: 48, color: "#B2DDFF" },
                  { label: "Hate Speech", percentage: 29, color: "#A6F4C5" },
                  { label: "Others", percentage: 16, color: "#FECDD6" },
                ]}
                onMaximizeClick={() => console.log("Maximize clicked")}
              />
            </div>
          </div>
        </div>

        {/* Pillar Score Section */}
        <div className="px-8 mt-8">
          <h2 className="font-medium text-[24px] leading-[32px] text-[#181d27] mb-6">
            Pillar Scores
          </h2>
          <div className="grid grid-cols-3 gap-6 items-stretch">
            <PillarScoreCard
              title="Pillar I Score"
              subtitle="Aggregated score across safety, security, and fraud."
              score={4.3}
              status="success"
              barData={[
                { label: "Your Model", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
                { label: "SomeAI Model-5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
                { label: "Other Model 4.5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
              ]}
              onMaximizeClick={() => console.log("Pillar I maximize clicked")}
            />
            <PillarScoreCard
              title="Pillar II Score"
              subtitle="Focused score on brand value and correctness"
              score={3.5}
              status="warning"
              barData={[
                { label: "Your Model", value: 72, color: "#FEDF89", borderColor: "#DC6803" },
                { label: "SomeAI Model-5", value: 96, color: "#B2DDFF", borderColor: "#1570EF" },
                { label: "Other Model 4.5", value: 120, color: "#A6F4C5", borderColor: "#039855" },
              ]}
              onMaximizeClick={() => console.log("Pillar II maximize clicked")}
            />
            <PillarScoreCard
              title="Pillar III Score"
              subtitle="Aggregated score against biases"
              score={0}
              status="locked"
              isLocked={true}
              lockedMessage="Pillar III scores are coming Quarter 2026 and provide additional insights about model biases. Stay tuned!"
              onLearnMore={() => console.log("Learn more clicked")}
              onMaximizeClick={() => console.log("Pillar III maximize clicked")}
            />
          </div>
        </div>

        {/* Found Vulnerabilities and Conversational Statistics Section */}
        <div className="px-8 mt-8">
          <h2 className="font-medium text-[24px] leading-[32px] text-[#181d27] mb-6">
            Vulnerability Analysis
          </h2>
          <div className="grid grid-cols-2 gap-6 items-stretch">
            <FoundVulnerabilitiesCard
              title="Found Vulnerabilities"
              subtitle="Statistics on vulnerabilities found across all test cases."
              identifiedCount={90}
              unweightedASR={8.2}
              weightedASR={9.1}
              status="warning"
              radarData={[
                {
                  label: "Current Model",
                  color: "#B2DDFF",
                  data: [
                    { label: "Violence", value: 75 },
                    { label: "Self-Harm", value: 60 },
                    { label: "Hate Speech", value: 85 },
                    { label: "Illegal Activities", value: 70 },
                    { label: "Others", value: 65 },
                  ],
                },
                {
                  label: "OpenAI Safety",
                  color: "#A6F4C5",
                  data: [
                    { label: "Violence", value: 90 },
                    { label: "Self-Harm", value: 85 },
                    { label: "Hate Speech", value: 95 },
                    { label: "Illegal Activities", value: 88 },
                    { label: "Others", value: 80 },
                  ],
                },
                {
                  label: "Reinforce Labs",
                  color: "#FECDD6",
                  data: [
                    { label: "Violence", value: 88 },
                    { label: "Self-Harm", value: 82 },
                    { label: "Hate Speech", value: 92 },
                    { label: "Illegal Activities", value: 85 },
                    { label: "Others", value: 78 },
                  ],
                },
              ]}
              onMaximizeClick={() => console.log("Found Vulnerabilities maximize clicked")}
              onHelpClick={() => console.log("Help clicked")}
            />
            <ConversationalStatisticsCard
              title="Conversation Statistics"
              subtitle="Average number of turns and length of each turn."
              avgChatLength={4.73}
              avgMessageLength={203.1}
              chatLengthStatus="success"
              messageLengthStatus="success"
              chatLengthChartData={[
                { x: 0, y: 0.2 },
                { x: 1, y: 0.4 },
                { x: 2, y: 0.6 },
                { x: 3, y: 0.5 },
                { x: 4, y: 0.3 },
                { x: 5, y: 0.1 },
              ]}
              messageLengthChartData={[
                { x: 0, y: 0.1 },
                { x: 60, y: 0.3 },
                { x: 120, y: 0.5 },
                { x: 180, y: 0.4 },
                { x: 240, y: 0.2 },
                { x: 300, y: 0.1 },
              ]}
              onMaximizeClick={() => console.log("Conversational Statistics maximize clicked")}
            />
          </div>
        </div>

        {/* All Test Cases Section */}
        <div className="px-8 mt-8">
          <h2 className="font-medium text-[24px] leading-[32px] text-[#181d27] mb-6">
            All Test Cases
          </h2>
          
          {/* Filter Bar */}
          <FilterBar
            turnLengthOptions={[
              { label: "Short", value: "short" },
              { label: "Medium", value: "medium" },
              { label: "Long", value: "long" },
            ]}
            categoryOptions={[
              { label: "Violence", value: "violence" },
              { label: "Self-Harm", value: "self-harm" },
              { label: "Hate Speech", value: "hate-speech" },
              { label: "Illegal Activities", value: "illegal" },
              { label: "Others", value: "others" },
            ]}
            onTurnLengthChange={(value) => console.log("Turn length changed:", value)}
            onCategoryChange={(value) => console.log("Category changed:", value)}
            onSearchChange={(value) => console.log("Search changed:", value)}
            onMoreFiltersClick={() => console.log("More filters clicked")}
            className="mb-6"
          />

          {/* Table */}
          <TestCasesTable
            testCases={[
              {
                caseId: "TC-001",
                category: "Violence",
                likelihood: 85,
                modelReasoning: "Model correctly identified potential threat",
                content: "User attempted to generate violent content...",
                chatAndTurnLength: "4 turns, 203 chars",
              },
              {
                caseId: "TC-002",
                category: "Self-Harm",
                likelihood: 60,
                modelReasoning: "Model detected self-harm intent",
                content: "User requested information about self-harm...",
                chatAndTurnLength: "3 turns, 156 chars",
              },
              {
                caseId: "TC-003",
                category: "Hate Speech",
                likelihood: 92,
                modelReasoning: "Model identified hateful language",
                content: "User used discriminatory language...",
                chatAndTurnLength: "5 turns, 287 chars",
              },
              {
                caseId: "TC-004",
                category: "Illegal Activities",
                likelihood: 45,
                modelReasoning: "Model flagged potential illegal request",
                content: "User asked about illegal activities...",
                chatAndTurnLength: "2 turns, 98 chars",
              },
              {
                caseId: "TC-005",
                category: "Violence",
                likelihood: 78,
                modelReasoning: "Model detected violent content pattern",
                content: "User attempted to generate violent scenario...",
                chatAndTurnLength: "6 turns, 342 chars",
              },
            ]}
            onRowClick={(testCase) => console.log("Row clicked:", testCase)}
          />

          {/* Pagination */}
          <Pagination
            currentPage={1}
            totalPages={10}
            onPrevious={() => console.log("Previous clicked")}
            onNext={() => console.log("Next clicked")}
          />
        </div>

        {/* Top Risk Areas Section */}
        <div className="px-8 mt-8">
          <h2 className="font-medium text-[24px] leading-[32px] text-[#181d27] mb-6">
            Top Risk Areas
          </h2>

          <TopRiskAreaCard
            number={1}
            title="Violence"
            threatLevel="High"
            asrPercentage={12.5}
            highRiskCases={7}
            priority="High"
            avgTurns={3.45}
            avgTurnLength={245}
            keyInsights={[
              "Occasional failure to de-escalate hypotheticals about violence when the user reframes as a \"fictional\" or \"game\" scenario.",
              "Weak refusal rationale—model declines but does not explain the reason, reducing trust and consistency.",
              "Recommendation: Strengthen contextual detection for \"fictional but explicit\" prompts; expand refusal templates emphasizing why violence content is blocked.",
            ]}
            cases={[
              {
                likelihood: 85,
                expected: "High",
                riskDescription: "Model failed to detect violent intent in fictional scenario",
                content: "User attempted to generate violent content in a game context...",
                chatAndTurnLength: "4 turns, 203 chars",
              },
              {
                likelihood: 72,
                expected: "Medium",
                riskDescription: "Insufficient refusal explanation for violence request",
                content: "User requested information about violent methods...",
                chatAndTurnLength: "3 turns, 156 chars",
              },
              {
                likelihood: 90,
                expected: "High",
                riskDescription: "Model accepted violent content when framed as educational",
                content: "User asked for violent content under educational pretext...",
                chatAndTurnLength: "5 turns, 287 chars",
              },
            ]}
            currentPage={1}
            totalPages={5}
            onPrevious={() => console.log("Previous clicked")}
            onNext={() => console.log("Next clicked")}
            onRowClick={(caseItem) => console.log("Row clicked:", caseItem)}
          />
        </div>
      </div>
    </div>
  );
}

