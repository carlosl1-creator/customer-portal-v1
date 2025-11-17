import type { Route } from "./+types/show-comparison";
import { useSearchParams, useNavigate } from "react-router";
import { HeaderSection } from "~/components/header-section/header-section";
import {
  SlackIcon,
  JiraIcon,
  DownloadIcon,
  ClipboardIcon,
  ChevronLeftIcon,
} from "~/components/icons/icons";
import { RadialChart } from "~/components/radial-chart/radial-chart";
import { PillarScoreCard } from "~/components/pillar-score-card/pillar-score-card";
import { FoundVulnerabilitiesCard } from "~/components/found-vulnerabilities-card/found-vulnerabilities-card";
import { ConversationalStatisticsCard } from "~/components/conversational-statistics-card/conversational-statistics-card";
import { ComparisonTable } from "~/components/comparison-table/comparison-table";
import { FilterBar } from "~/components/filter-bar/filter-bar";
import { MaximizeIcon } from "~/components/icons/icons";
import { BubbleChart } from "~/components/bubble-chart/bubble-chart";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Report Comparison - Reinforce Labs" },
    { name: "description", content: "Compare the performance of two models" },
  ];
}

export default function ShowComparison() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get selected items from URL params
  const reportIds = searchParams.get("reports")?.split(",") || [];
  const benchmarkIds = searchParams.get("benchmarks")?.split(",") || [];

  // Mock data - in real app, fetch based on IDs
  const model1Name = "Acme Inc. Content Model 2.1";
  const model2Name = benchmarkIds.length > 0
    ? "SomeAI Model-5" // If benchmark selected, use benchmark name
    : "Account Model 1.0"; // Otherwise use second report name

  const comparisonTitle = `${model1Name} vs. ${model2Name}`;
  const generatedDate = "8/24/2025";
  const originalDates = "8/3/2025 and 7/14/2025";

  const handleSendToSlack = () => {
    console.log("Send to Slack clicked");
  };

  const handleLinkToJira = () => {
    console.log("Link to Jira clicked");
  };

  const handleDownloadReport = () => {
    console.log("Download Report clicked");
  };

  const handleCopyPermalink = () => {
    console.log("Copy Permalink clicked");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleViewAllReports = () => {
    navigate("/compare-reports");
  };

  // Mock comparison data
  const model1Cases: Array<{ caseId: string; category: string; riskFactor: number; turnLength: { turns: number; chars: number } }> = [
    { caseId: "#37", category: "Violence", riskFactor: 16, turnLength: { turns: 5, chars: 184 } },
    { caseId: "#43", category: "Violence", riskFactor: 12, turnLength: { turns: 7, chars: 138 } },
    { caseId: "#372", category: "Illegal Activities", riskFactor: 24, turnLength: { turns: 13, chars: 204 } },
    { caseId: "#112", category: "Violence", riskFactor: 17, turnLength: { turns: 7, chars: 138 } },
    { caseId: "#51", category: "Violence", riskFactor: 27, turnLength: { turns: 13, chars: 204 } },
  ];

  const model2Cases: Array<{ caseId: string; category: string; riskFactor: number; turnLength: { turns: number; chars: number } }> = [
    { caseId: "#37", category: "Violence", riskFactor: 16, turnLength: { turns: 5, chars: 184 } },
    { caseId: "#43", category: "Violence", riskFactor: 12, turnLength: { turns: 7, chars: 138 } },
    { caseId: "#372", category: "Illegal Activities", riskFactor: 24, turnLength: { turns: 13, chars: 204 } },
    { caseId: "#112", category: "Violence", riskFactor: 17, turnLength: { turns: 7, chars: 138 } },
    { caseId: "#51", category: "Violence", riskFactor: 27, turnLength: { turns: 13, chars: 204 } },
  ];

  return (
    <div className="w-full">
      <HeaderSection
        pageName="REPORT COMPARISON"
        title={comparisonTitle}
        infoText={[
          `Generated ${generatedDate}`,
          `Original reports created ${originalDates}`,
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

      {/* Main Content */}
      <div className="px-8 mt-8 pb-8">
        {/* Overall Readiness and Total Cases Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Overall Readiness - 2 columns */}
          <div className="col-span-2">
            <div className="bg-white border border-[#e9eaeb] rounded-[8px] flex flex-col gap-6 p-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex gap-2.5 items-center">
                    <HashIcon className="w-5 h-5" stroke="#181d27" />
                    <p className="font-medium text-[16px] leading-[24px] text-[#181d27]">
                      Overall Readiness
                    </p>
                  </div>
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                    Overall rating based on model safety, security, and fraud and bias mitigation.
                  </p>
                </div>
              </div>
              <div className="flex gap-12 items-center justify-center">
                <div className="flex flex-col gap-2.5 items-center">
                  <RadialChart rating={4.1} size={90} />
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                    Acme Inc.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 items-center">
                  <RadialChart rating={3.2} size={90} />
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                    SomeAI
                  </p>
                </div>
                <p className="flex-1 font-normal text-[14px] leading-[20px] text-[#535862] whitespace-pre-wrap">
                  Acme Inc.'s Content Model demonstrates higher overall readiness especially against violent content and illegal activities. In contrast, SomeAI consistently struggles to identify obscure, coded language and fail to block unsafe content on the platform. Guidelines for SomeAI Model-5 should be revised to guard against this.
                </p>
              </div>
            </div>
          </div>

          {/* Total Cases - 1 column */}
          <div className="col-span-1">
            <div className="bg-white border border-[#e9eaeb] rounded-[8px] flex flex-col gap-6 p-6 relative">
              <button
                onClick={() => console.log("Maximize clicked")}
                className="absolute right-4 top-4 p-2 rounded-lg hover:opacity-80 transition-opacity"
              >
                <MaximizeIcon className="w-5 h-5" stroke="#535862" />
              </button>
              <div className="flex flex-col gap-1">
                <p className="font-medium text-[16px] leading-[24px] text-[#181d27]">
                  Total Cases
                </p>
                <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                  Number of total generated cases
                </p>
              </div>
              <div className="flex gap-4 items-center justify-center">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-[36px] leading-[44px] text-[#181d27] tracking-[-0.72px]">
                    1,576
                  </p>
                  <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
                    Generated
                  </p>
                </div>
                <div className="flex-1 flex flex-col gap-4 items-end justify-center">
                  <BubbleChart
                    bubbles={[
                      { percentage: 48, color: "#B2DDFF" },
                      { percentage: 29, color: "#A6F4C5" },
                      { percentage: 16, color: "#FECDD6" },
                    ]}
                  />
                  <div className="flex flex-col gap-0.5 items-end">
                    <div className="flex gap-1 items-center">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#B2DDFF" }} />
                      <p className="font-normal text-[12px] leading-[18px] text-[#535862]">Violence</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#A6F4C5" }} />
                      <p className="font-normal text-[12px] leading-[18px] text-[#535862]">Hate Speech</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FECDD6" }} />
                      <p className="font-normal text-[12px] leading-[18px] text-[#535862]">Others</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar Scores Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Pillar I Score with Comparison */}
          <div className="bg-white border border-[#e9eaeb] rounded-[8px] flex flex-col gap-6 p-6 relative">
            <div className="flex flex-col gap-1">
              <p className="font-medium text-[16px] leading-[24px] text-[#181d27]">
                Pillar I Score
              </p>
              <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                Aggregated score across safety, security, and fraud.
              </p>
            </div>
            <div className="flex gap-9 items-end w-full">
              {/* Model 1 Score */}
              <div className="flex flex-col gap-2.5 items-start">
                <div className="flex gap-4 items-end">
                  <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-[#181d27]">
                    4.1
                  </p>
                  <div className="bg-[#d1fadf] rounded-[12px] w-6 h-6 flex items-center justify-center mb-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#039855">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                  Acme Inc.
                </p>
              </div>
              {/* Model 2 Score */}
              <div className="flex flex-col gap-2.5 items-start">
                <div className="flex gap-4 items-end">
                  <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-[#181d27]">
                    3.8
                  </p>
                  <div className="bg-[#fef0c7] rounded-[12px] w-6 h-6 flex items-center justify-center mb-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#dc6803">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                  SomeAI
                </p>
              </div>
              {/* Bar Chart */}
              <div className="flex flex-1 gap-4 items-end relative">
                <div className="flex flex-col gap-2.5 justify-center">
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">Your Model</p>
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">SomeAI Model-5</p>
                  <div className="h-[22px]" />
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">Other Model 4.5</p>
                </div>
                <div className="flex flex-col gap-2.5 items-start relative">
                  <div className="bg-[#b2ddff] border border-[#1570ef] h-3 opacity-80 w-[67px]" />
                  <div className="bg-[#a6f4c5] border border-[#039855] h-[13px] opacity-80 w-[75px]" />
                  <div className="h-[22px]" />
                  <div className="bg-[#a6f4c5] border border-[#039855] h-[13px] opacity-80 w-[67px]" />
                  {/* X-axis line */}
                  <div className="absolute -bottom-5 left-0 right-0 h-px bg-[#e9eaeb]" />
                  {/* X-axis labels */}
                  <div className="absolute -bottom-[18px] left-0 right-0 flex items-center justify-between text-[4px] leading-[4px] text-[#535862] font-normal text-center">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar II Score with Comparison */}
          <div className="bg-white border border-[#e9eaeb] rounded-[8px] flex flex-col gap-6 p-6 relative">
            <div className="flex flex-col gap-1">
              <p className="font-medium text-[16px] leading-[24px] text-[#181d27]">
                Pillar II Score
              </p>
              <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                Focused score on brand value and correctness
              </p>
            </div>
            <div className="flex gap-9 items-end w-full">
              {/* Model 1 Score */}
              <div className="flex flex-col gap-2.5 items-start">
                <div className="flex gap-4 items-end">
                  <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-[#181d27]">
                    3.2
                  </p>
                  <div className="bg-[#fef0c7] rounded-[12px] w-6 h-6 flex items-center justify-center mb-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#dc6803">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                  Acme Inc.
                </p>
              </div>
              {/* Model 2 Score */}
              <div className="flex flex-col gap-2.5 items-start">
                <div className="flex gap-4 items-end">
                  <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-[#181d27]">
                    4.2
                  </p>
                  <div className="bg-[#d1fadf] rounded-[12px] w-6 h-6 flex items-center justify-center mb-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#039855">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                  SomeAI
                </p>
              </div>
              {/* Bar Chart */}
              <div className="flex flex-1 gap-4 items-end relative">
                <div className="flex flex-col gap-2.5 justify-center">
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">Your Model</p>
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">SomeAI Model-5</p>
                  <div className="h-[22px]" />
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">Other Model 4.5</p>
                </div>
                <div className="flex flex-col gap-2.5 items-start relative">
                  <div className="bg-[#b2ddff] border border-[#1570ef] h-3 opacity-80 w-[67px]" />
                  <div className="bg-[#a6f4c5] border border-[#039855] h-[13px] opacity-80 w-[75px]" />
                  <div className="h-[22px]" />
                  <div className="bg-[#a6f4c5] border border-[#039855] h-[13px] opacity-80 w-[67px]" />
                  {/* X-axis line */}
                  <div className="absolute -bottom-5 left-0 right-0 h-px bg-[#e9eaeb]" />
                  {/* X-axis labels */}
                  <div className="absolute -bottom-[18px] left-0 right-0 flex items-center justify-between text-[4px] leading-[4px] text-[#535862] font-normal text-center">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vulnerabilities and Conversation Statistics Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <FoundVulnerabilitiesCard
            title="Vulnerabilities Found"
            subtitle="Overall rate of successful attacks across all test cases."
            identifiedCount={91}
            unweightedASR={8.2}
            weightedASR={9.1}
            status="warning"
            radarData={[
              {
                label: "Acme Inc.",
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
                label: "SomeAI",
                color: "#A6F4C5",
                data: [
                  { label: "Violence", value: 90 },
                  { label: "Self-Harm", value: 85 },
                  { label: "Hate Speech", value: 95 },
                  { label: "Illegal Activities", value: 88 },
                  { label: "Others", value: 80 },
                ],
              },
            ]}
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
          />
        </div>
      </div>
    </div>
  );
}

// Hash icon component
function HashIcon({ className, stroke }: { className?: string; stroke?: string }) {
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
        d="M5.25 8.25h15m-15 0a3 3 0 1 1 0-6h15a3 3 0 1 1 0 6m0 0v6a3 3 0 0 1-3 3H8.25a3 3 0 0 1-3-3v-6m15 0V9.75"
      />
    </svg>
  );
}

