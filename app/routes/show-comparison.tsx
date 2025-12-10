import type { Route } from "./+types/show-comparison";
import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import { HeaderSection } from "~/components/header-section/header-section";
import type { SelectableReport } from "~/components/tables/selectable-reports-table/selectable-reports-table";
import type { Benchmark } from "~/components/tables/benchmarks-table/benchmarks-table";
import {
  SlackIcon,
  JiraIcon,
  DownloadIcon,
  ClipboardIcon,
  ChevronLeftIcon,
} from "~/components/icons/icons";
import { RadialChart } from "~/components/charts/radial-chart/radial-chart";
import { PillarScoreCard } from "~/components/cards/pillar-score-card/pillar-score-card";
import { FoundVulnerabilitiesCard } from "~/components/cards/found-vulnerabilities-card/found-vulnerabilities-card";
import { ConversationalStatisticsCard } from "~/components/cards/conversational-statistics-card/conversational-statistics-card";
import { ComparisonTable } from "~/components/tables/comparison-table/comparison-table";
import { FilterBar } from "~/components/filters/filter-bar/filter-bar";
import { MaximizeIcon } from "~/components/icons/icons";
import { BubbleChart } from "~/components/charts/bubble-chart/bubble-chart";
import { Modal } from "~/components/modal/modal";
import { CasesCard } from "~/components/cards/cases-card/cases-card";
import {
  useAppSelector,
  selectAllReports,
  selectAllSimulations,
  type Report as ReduxReport,
} from "~/store";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Report Comparison - Reinforce Labs" },
    { name: "description", content: "Compare the performance of two models" },
  ];
}

interface ComparisonState {
  selectedReports: SelectableReport[];
  selectedBenchmarks: Benchmark[];
}

export default function ShowComparison() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Modal state management
  const [openModal, setOpenModal] = useState<string | null>(null);

  // Get data from Redux store
  const allReports = useAppSelector(selectAllReports);
  const simulations = useAppSelector(selectAllSimulations);

  // Get selected items from location state
  const state = location.state as ComparisonState | null;
  const selectedReports = state?.selectedReports || [];
  const selectedBenchmarks = state?.selectedBenchmarks || [];

  // Find full Redux report data based on selected report IDs
  const findReduxReport = (shortId: string): ReduxReport | undefined => {
    return allReports.find(r => r.id.startsWith(shortId) || r.id.split("-")[0] === shortId);
  };

  // Get full report data from Redux
  const report1 = selectedReports[0] ? findReduxReport(selectedReports[0].id) : undefined;
  const report2 = selectedReports[1] ? findReduxReport(selectedReports[1].id) : undefined;

  // Determine model names based on selected items
  let model1Name = "";
  let model2Name = "";

  if (selectedReports.length === 2 && selectedBenchmarks.length === 0) {
    // Two reports selected
    model1Name = selectedReports[0]?.botVersion || "";
    model2Name = selectedReports[1]?.botVersion || "";
  } else if (selectedReports.length === 1 && selectedBenchmarks.length === 1) {
    // One report and one benchmark selected
    model1Name = selectedReports[0]?.botVersion || "";
    model2Name = selectedBenchmarks[0]?.bot || "";
  } else {
    // Fallback to default values if state is missing
    model1Name = "Acme Inc. Content Model 2.1";
    model2Name = "SomeAI Model-5";
  }

  const comparisonTitle = `${model1Name} vs. ${model2Name}`;
  
  // Format dates from Redux data
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const generatedDate = formatDate(new Date().toISOString());
  const originalDates = report1 && report2
    ? `${formatDate(report1.created_at)} and ${formatDate(report2.created_at)}`
    : "N/A";

  // Convert 0-100 score to 0-5 scale
  const convertToFiveScale = (score: number): number => {
    return Number(((score / 100) * 5).toFixed(1));
  };

  // Determine status based on score (0-100)
  const getStatus = (score: number): "success" | "warning" => {
    return score >= 80 ? "success" : "warning";
  };

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

  // Derive category distribution from simulations
  const categoryColors: Record<string, string> = {
    "Harmful Content": "#B2DDFF",
    "Data Extraction": "#A6F4C5",
    "Jailbreaking": "#FECDD6",
    "Misinformation": "#FEDF89",
    "PII Disclosure": "#D9D6FE",
    "Prompt Injection": "#FED7AA",
    "Bias Exploitation": "#A5F3FC",
    "Social Engineering": "#FCA5A5",
  };

  // Calculate total cases from simulations
  const totalCasesData = useMemo(() => {
    const totalCases = report1?.total_simulations.total_simulation_count || simulations.length * 100;
    
    // Group simulations by category
    const categoryCount = simulations.reduce((acc, sim) => {
      acc[sim.category] = (acc[sim.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(categoryCount).reduce((a, b) => a + b, 0);
    const scenarios = Object.entries(categoryCount)
      .slice(0, 3)
      .map(([label, count]) => ({
        label,
        percentage: Math.round((count / total) * 100),
        color: categoryColors[label] || "#B2DDFF",
      }));

    return { totalCases, scenarios };
  }, [report1, simulations]);

  // Derive Pillar I data from Redux reports
  const pillarIData = useMemo(() => {
    const model1Score = report1 ? convertToFiveScale(report1.p1.p1_score) : 4.1;
    const model2Score = report2 ? convertToFiveScale(report2.p1.p1_score) : 3.8;
    
    return {
      model1Score,
      model1Status: report1 ? getStatus(report1.p1.p1_score) : "success" as "success" | "warning",
      model2Score,
      model2Status: report2 ? getStatus(report2.p1.p1_score) : "warning" as "success" | "warning",
      barData: [
        { label: model1Name.split(" ")[0] || "Model 1", value: report1 ? Math.round(report1.p1.p1_score * 1.2) : 96, color: "#B2DDFF", borderColor: "#1570EF" },
        { label: model2Name.split(" ")[0] || "Model 2", value: report2 ? Math.round(report2.p1.p1_score * 1.2) : 120, color: "#A6F4C5", borderColor: "#039855" },
        { label: "Industry Avg", value: 85, color: "#FEDF89", borderColor: "#DC6803" },
      ],
    };
  }, [report1, report2, model1Name, model2Name]);

  // Derive Pillar II data from Redux reports
  const pillarIIData = useMemo(() => {
    const model1Score = report1 ? convertToFiveScale(report1.p2.p2_score) : 3.2;
    const model2Score = report2 ? convertToFiveScale(report2.p2.p2_score) : 4.2;
    
    return {
      model1Score,
      model1Status: report1 ? getStatus(report1.p2.p2_score) : "warning" as "success" | "warning",
      model2Score,
      model2Status: report2 ? getStatus(report2.p2.p2_score) : "success" as "success" | "warning",
      barData: [
        { label: model1Name.split(" ")[0] || "Model 1", value: report1 ? Math.round(report1.p2.p2_score * 1.2) : 72, color: report1 && report1.p2.p2_score >= 80 ? "#B2DDFF" : "#FEDF89", borderColor: report1 && report1.p2.p2_score >= 80 ? "#1570EF" : "#DC6803" },
        { label: model2Name.split(" ")[0] || "Model 2", value: report2 ? Math.round(report2.p2.p2_score * 1.2) : 96, color: "#B2DDFF", borderColor: "#1570EF" },
        { label: "Industry Avg", value: 78, color: "#A6F4C5", borderColor: "#039855" },
      ],
    };
  }, [report1, report2, model1Name, model2Name]);

  // Derive vulnerabilities data from Redux reports
  const vulnerabilitiesData = useMemo(() => {
    const asr = report1?.attack_success_rate;
    
    // Get unique categories from simulations for radar data
    const categories = [...new Set(simulations.map(s => s.category))].slice(0, 5);
    
    // Generate radar data for both models based on their ASR categories
    const generateRadarData = (report: ReduxReport | undefined, defaultValues: number[]) => {
      if (!report) return categories.map((label, i) => ({ label, value: defaultValues[i] || 70 }));
      
      return categories.map((label, index) => {
        const categoryData = report.attack_success_rate.categories[label];
        // Higher score means better defense (inverse of ASR)
        const value = categoryData ? Math.round(100 - categoryData.asr) : defaultValues[index] || 70;
        return { label, value };
      });
    };

    return {
      identifiedCount: asr?.identified || 91,
      unweightedASR: asr?.unweighted_asr || 8.2,
      weightedASR: asr?.weighted_asr || 9.1,
      status: (asr?.weighted_asr || 10) < 15 ? "success" as const : "warning" as const,
      radarData: [
        {
          label: model1Name,
          color: "#B2DDFF",
          data: generateRadarData(report1, [75, 60, 85, 70, 65]),
        },
        {
          label: model2Name,
          color: "#A6F4C5",
          data: generateRadarData(report2, [90, 85, 95, 88, 80]),
        },
      ],
    };
  }, [report1, report2, model1Name, model2Name, simulations]);

  // Derive conversational stats from Redux reports
  const conversationalStatsData = useMemo(() => {
    const stats = report1?.conversation_statistics;
    
    // Generate chart data from distribution or use defaults
    const generateChartData = (distribution: Record<string, number> | undefined, defaultData: Array<{x: number, y: number}>) => {
      if (!distribution || Object.keys(distribution).length === 0) return defaultData;
      
      const entries = Object.entries(distribution);
      const total = entries.reduce((sum, [, v]) => sum + v, 0);
      return entries.map(([key, value], index) => ({
        x: index * (300 / entries.length),
        y: total > 0 ? value / total : 0,
      }));
    };

    return {
      avgChatLength: stats?.avg_no_of_turns || 4.73,
      avgMessageLength: stats?.avg_len_of_each_turn || 203.1,
      chatLengthStatus: (stats?.avg_no_of_turns || 5) < 6 ? "success" as const : "warning" as const,
      messageLengthStatus: (stats?.avg_len_of_each_turn || 200) < 250 ? "success" as const : "warning" as const,
      chatLengthChartData: generateChartData(stats?.chat_len_distribution, [
        { x: 0, y: 0.2 },
        { x: 1, y: 0.4 },
        { x: 2, y: 0.6 },
        { x: 3, y: 0.5 },
        { x: 4, y: 0.3 },
        { x: 5, y: 0.1 },
      ]),
      messageLengthChartData: generateChartData(stats?.message_len_distribution, [
        { x: 0, y: 0.1 },
        { x: 60, y: 0.3 },
        { x: 120, y: 0.5 },
        { x: 180, y: 0.4 },
        { x: 240, y: 0.2 },
        { x: 300, y: 0.1 },
      ]),
    };
  }, [report1]);

  // Derive comparison cases from simulations
  const model1Cases = useMemo(() => {
    return simulations.slice(0, 5).map((sim, index) => ({
      caseId: `#${index + 37}`,
      category: sim.category,
      riskFactor: sim.likelihood === "high" ? 24 : sim.likelihood === "medium" ? 16 : 12,
      turnLength: { turns: sim.chat_length, chars: sim.avg_turn_length },
    }));
  }, [simulations]);

  const model2Cases = useMemo(() => {
    return simulations.slice(5, 10).map((sim, index) => ({
      caseId: `#${index + 42}`,
      category: sim.category,
      riskFactor: sim.likelihood === "high" ? 27 : sim.likelihood === "medium" ? 17 : 12,
      turnLength: { turns: sim.chat_length, chars: sim.avg_turn_length },
    }));
  }, [simulations]);

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
            icon: <DownloadIcon className="w-5 h-5 text-theme-secondary" />,
            text: "Download Report",
            onClick: handleDownloadReport,
          },
          {
            icon: <ClipboardIcon className="w-5 h-5 text-theme-secondary" />,
            text: "Copy Permalink",
            onClick: handleCopyPermalink,
          },
        ]}
        viewAllReportsButton={{
          text: "View All Reports",
          icon: <ChevronLeftIcon className="w-5 h-5 text-theme-secondary" />,
          onClick: handleViewAllReports,
        }}
      />

      {/* Main Content */}
      <div className="px-8 mt-8 pb-8">
        {/* Overall Readiness and Total Cases Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Overall Readiness - 2 columns */}
          <div className="col-span-2">
            <div className="bg-theme-card border border-theme-primary rounded-[8px] flex flex-col gap-6 p-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex gap-2.5 items-center">
                    <HashIcon className="w-5 h-5 text-theme-primary" />
                    <p className="font-medium text-[16px] leading-[24px] text-theme-primary">
                      Overall Readiness
                    </p>
                  </div>
                  <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                    Overall rating based on model safety, security, and fraud and bias mitigation.
                  </p>
                </div>
              </div>
              <div className="flex gap-12 items-center justify-center">
                <div className="flex flex-col gap-2.5 items-center">
                  <RadialChart rating={report1 ? convertToFiveScale(report1.readiness_score) : 4.1} size={90} />
                  <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                    {model1Name.split(" ")[0] || "Model 1"}
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 items-center">
                  <RadialChart rating={report2 ? convertToFiveScale(report2.readiness_score) : 3.2} size={90} />
                  <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                    {model2Name.split(" ")[0] || "Model 2"}
                  </p>
                </div>
                <p className="flex-1 font-normal text-[14px] leading-[20px] text-theme-secondary whitespace-pre-wrap">
                  {report1 && report2 
                    ? `${model1Name.split(" ")[0]}'s model demonstrates ${report1.readiness_score > report2.readiness_score ? "higher" : "lower"} overall readiness. ${report1.readiness_text} ${report2.readiness_text}`
                    : "Compare the overall readiness of both models to understand their relative performance across safety, security, and fraud mitigation metrics."}
                </p>
              </div>
            </div>
          </div>

          {/* Total Cases - 1 column */}
          <div className="col-span-1">
            <div className="bg-theme-card border border-theme-primary rounded-[8px] flex flex-col gap-6 p-6 relative">
              <button
                onClick={() => setOpenModal("totalCases")}
                className="absolute right-4 top-4 p-2 rounded-lg hover:opacity-80 transition-opacity text-theme-secondary"
              >
                <MaximizeIcon className="w-5 h-5" />
              </button>
              <div className="flex flex-col gap-1">
                <p className="font-medium text-[16px] leading-[24px] text-theme-primary">
                  Total Cases
                </p>
                <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                  Number of total generated cases
                </p>
              </div>
              <div className="flex gap-4 items-center justify-center">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-[36px] leading-[44px] text-theme-primary tracking-[-0.72px]">
                    {totalCasesData.totalCases.toLocaleString()}
                  </p>
                  <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">
                    Generated
                  </p>
                </div>
                <div className="flex-1 flex flex-col gap-4 items-end justify-center">
                  <BubbleChart
                    bubbles={totalCasesData.scenarios.map(s => ({ percentage: s.percentage, color: s.color }))}
                  />
                  <div className="flex flex-col gap-0.5 items-end">
                    {totalCasesData.scenarios.map((scenario) => (
                      <div key={scenario.label} className="flex gap-1 items-center">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: scenario.color }} />
                        <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">{scenario.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar Scores Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Pillar I Score with Comparison */}
          <div className="bg-theme-card border border-theme-primary rounded-[8px] flex flex-col gap-6 p-6 relative">
            <button
              onClick={() => setOpenModal("pillarI")}
              className="absolute right-4 top-4 p-2 rounded-lg hover:opacity-80 transition-opacity text-theme-secondary"
            >
              <MaximizeIcon className="w-5 h-5" />
            </button>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-[16px] leading-[24px] text-theme-primary">
                Pillar I Score
              </p>
              <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                Aggregated score across safety, security, and fraud.
              </p>
            </div>
            <div className="flex gap-9 items-end w-full">
              {/* Model 1 Score */}
              <div className="flex flex-col gap-2.5 items-start">
                <div className="flex gap-4 items-end">
                  <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-theme-primary">
                    {pillarIData.model1Score}
                  </p>
                  <div className={`rounded-[12px] w-6 h-6 flex items-center justify-center mb-2`}
                    style={{ backgroundColor: pillarIData.model1Status === "success" ? "var(--color-success-bg)" : "var(--color-warning-bg)" }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} 
                      stroke={pillarIData.model1Status === "success" ? "var(--color-success-text)" : "var(--color-warning-text)"}>
                      {pillarIData.model1Status === "success" ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      )}
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                  {model1Name}
                </p>
              </div>
              {/* Model 2 Score */}
              <div className="flex flex-col gap-2.5 items-start">
                <div className="flex gap-4 items-end">
                  <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-theme-primary">
                    {pillarIData.model2Score}
                  </p>
                  <div className={`rounded-[12px] w-6 h-6 flex items-center justify-center mb-2`}
                    style={{ backgroundColor: pillarIData.model2Status === "success" ? "var(--color-success-bg)" : "var(--color-warning-bg)" }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                      stroke={pillarIData.model2Status === "success" ? "var(--color-success-text)" : "var(--color-warning-text)"}>
                      {pillarIData.model2Status === "success" ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      )}
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                  {model2Name}
                </p>
              </div>
              {/* Bar Chart */}
              <div className="flex flex-1 gap-4 items-end relative">
                <div className="flex flex-col gap-2.5 justify-center">
                  {pillarIData.barData.map((bar) => (
                    <p key={bar.label} className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                      {bar.label}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-2.5 items-start relative">
                  {pillarIData.barData.map((bar, index) => (
                    <div
                      key={bar.label}
                      className="opacity-80"
                      style={{
                        height: index === 1 ? "13px" : "12px",
                        width: `${bar.value}px`,
                        backgroundColor: bar.color,
                        border: `1px solid ${bar.borderColor}`,
                      }}
                    />
                  ))}
                  {/* X-axis line */}
                  <div className="absolute -bottom-5 left-0 right-0 h-px" style={{ backgroundColor: 'var(--color-border-primary)' }} />
                  {/* X-axis labels */}
                  <div className="absolute -bottom-[18px] left-0 right-0 flex items-center justify-between text-[4px] leading-[4px] text-theme-secondary font-normal text-center">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar II Score with Comparison */}
          <div className="bg-theme-card border border-theme-primary rounded-[8px] flex flex-col gap-6 p-6 relative">
            <button
              onClick={() => setOpenModal("pillarII")}
              className="absolute right-4 top-4 p-2 rounded-lg hover:opacity-80 transition-opacity text-theme-secondary"
            >
              <MaximizeIcon className="w-5 h-5" />
            </button>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-[16px] leading-[24px] text-theme-primary">
                Pillar II Score
              </p>
              <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                Focused score on brand value and correctness
              </p>
            </div>
            <div className="flex gap-9 items-end w-full">
              {/* Model 1 Score */}
              <div className="flex flex-col gap-2.5 items-start">
                <div className="flex gap-4 items-end">
                  <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-theme-primary">
                    {pillarIIData.model1Score}
                  </p>
                  <div className={`rounded-[12px] w-6 h-6 flex items-center justify-center mb-2`}
                    style={{ backgroundColor: pillarIIData.model1Status === "success" ? "var(--color-success-bg)" : "var(--color-warning-bg)" }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                      stroke={pillarIIData.model1Status === "success" ? "var(--color-success-text)" : "var(--color-warning-text)"}>
                      {pillarIIData.model1Status === "success" ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      )}
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                  {model1Name}
                </p>
              </div>
              {/* Model 2 Score */}
              <div className="flex flex-col gap-2.5 items-start">
                <div className="flex gap-4 items-end">
                  <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-theme-primary">
                    {pillarIIData.model2Score}
                  </p>
                  <div className={`rounded-[12px] w-6 h-6 flex items-center justify-center mb-2`}
                    style={{ backgroundColor: pillarIIData.model2Status === "success" ? "var(--color-success-bg)" : "var(--color-warning-bg)" }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                      stroke={pillarIIData.model2Status === "success" ? "var(--color-success-text)" : "var(--color-warning-text)"}>
                      {pillarIIData.model2Status === "success" ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      )}
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                  {model2Name}
                </p>
              </div>
              {/* Bar Chart */}
              <div className="flex flex-1 gap-4 items-end relative">
                <div className="flex flex-col gap-2.5 justify-center">
                  {pillarIIData.barData.map((bar) => (
                    <p key={bar.label} className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                      {bar.label}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-2.5 items-start relative">
                  {pillarIIData.barData.map((bar, index) => (
                    <div
                      key={bar.label}
                      className="opacity-80"
                      style={{
                        height: index === 1 ? "13px" : "12px",
                        width: `${bar.value}px`,
                        backgroundColor: bar.color,
                        border: `1px solid ${bar.borderColor}`,
                      }}
                    />
                  ))}
                  {/* X-axis line */}
                  <div className="absolute -bottom-5 left-0 right-0 h-px" style={{ backgroundColor: 'var(--color-border-primary)' }} />
                  {/* X-axis labels */}
                  <div className="absolute -bottom-[18px] left-0 right-0 flex items-center justify-between text-[4px] leading-[4px] text-theme-secondary font-normal text-center">
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
            identifiedCount={vulnerabilitiesData.identifiedCount}
            unweightedASR={vulnerabilitiesData.unweightedASR}
            weightedASR={vulnerabilitiesData.weightedASR}
            status={vulnerabilitiesData.status}
            radarData={vulnerabilitiesData.radarData}
            onMaximizeClick={() => setOpenModal("foundVulnerabilities")}
          />
          <ConversationalStatisticsCard
            title="Conversation Statistics"
            subtitle="Average number of turns and length of each turn."
            avgChatLength={conversationalStatsData.avgChatLength}
            avgMessageLength={conversationalStatsData.avgMessageLength}
            chatLengthStatus={conversationalStatsData.chatLengthStatus}
            messageLengthStatus={conversationalStatsData.messageLengthStatus}
            chatLengthChartData={conversationalStatsData.chatLengthChartData}
            messageLengthChartData={conversationalStatsData.messageLengthChartData}
            onMaximizeClick={() => setOpenModal("conversationalStatistics")}
          />
        </div>
      </div>

      {/* Modals */}
      {/* Total Cases Modal */}
      <Modal
        isOpen={openModal === "totalCases"}
        onClose={() => setOpenModal(null)}
        title="Total Cases"
        description="Number of total generated cases"
      >
        <CasesCard
          title="Total Cases"
          subtitle="Number of total generated cases"
          totalCases={totalCasesData.totalCases}
          scenarios={totalCasesData.scenarios}
        />
      </Modal>

      {/* Pillar I Score Modal */}
      <Modal
        isOpen={openModal === "pillarI"}
        onClose={() => setOpenModal(null)}
        title="Pillar I Score"
        description="Aggregated score across safety, security, and fraud."
      >
        <div className="flex flex-col gap-6">
          <div className="flex gap-9 items-end">
            {/* Model 1 Score */}
            <div className="flex flex-col gap-2.5 items-start">
              <div className="flex gap-4 items-end">
                <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-theme-primary">
                  {pillarIData.model1Score}
                </p>
                <div className={`rounded-[12px] w-6 h-6 flex items-center justify-center mb-2`}
                  style={{ backgroundColor: pillarIData.model1Status === "success" ? "var(--color-success-bg)" : "var(--color-warning-bg)" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                    stroke={pillarIData.model1Status === "success" ? "var(--color-success-text)" : "var(--color-warning-text)"}>
                    {pillarIData.model1Status === "success" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    )}
                  </svg>
                </div>
              </div>
              <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                {model1Name}
              </p>
            </div>
            {/* Model 2 Score */}
            <div className="flex flex-col gap-2.5 items-start">
              <div className="flex gap-4 items-end">
                <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-theme-primary">
                  {pillarIData.model2Score}
                </p>
                <div className={`rounded-[12px] w-6 h-6 flex items-center justify-center mb-2`}
                  style={{ backgroundColor: pillarIData.model2Status === "success" ? "var(--color-success-bg)" : "var(--color-warning-bg)" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                    stroke={pillarIData.model2Status === "success" ? "var(--color-success-text)" : "var(--color-warning-text)"}>
                    {pillarIData.model2Status === "success" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    )}
                  </svg>
                </div>
              </div>
              <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                {model2Name}
              </p>
            </div>
          </div>
          <PillarScoreCard
            title="Pillar I Score"
            subtitle="Aggregated score across safety, security, and fraud."
            score={pillarIData.model1Score}
            status={pillarIData.model1Status}
            barData={pillarIData.barData}
          />
        </div>
      </Modal>

      {/* Pillar II Score Modal */}
      <Modal
        isOpen={openModal === "pillarII"}
        onClose={() => setOpenModal(null)}
        title="Pillar II Score"
        description="Focused score on brand value and correctness"
      >
        <div className="flex flex-col gap-6">
          <div className="flex gap-9 items-end">
            {/* Model 1 Score */}
            <div className="flex flex-col gap-2.5 items-start">
              <div className="flex gap-4 items-end">
                <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-theme-primary">
                  {pillarIIData.model1Score}
                </p>
                <div className={`rounded-[12px] w-6 h-6 flex items-center justify-center mb-2`}
                  style={{ backgroundColor: pillarIIData.model1Status === "success" ? "var(--color-success-bg)" : "var(--color-warning-bg)" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                    stroke={pillarIIData.model1Status === "success" ? "var(--color-success-text)" : "var(--color-warning-text)"}>
                    {pillarIIData.model1Status === "success" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    )}
                  </svg>
                </div>
              </div>
              <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                {model1Name}
              </p>
            </div>
            {/* Model 2 Score */}
            <div className="flex flex-col gap-2.5 items-start">
              <div className="flex gap-4 items-end">
                <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-theme-primary">
                  {pillarIIData.model2Score}
                </p>
                <div className={`rounded-[12px] w-6 h-6 flex items-center justify-center mb-2`}
                  style={{ backgroundColor: pillarIIData.model2Status === "success" ? "var(--color-success-bg)" : "var(--color-warning-bg)" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                    stroke={pillarIIData.model2Status === "success" ? "var(--color-success-text)" : "var(--color-warning-text)"}>
                    {pillarIIData.model2Status === "success" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    )}
                  </svg>
                </div>
              </div>
              <p className="font-normal text-[12px] leading-[18px] text-theme-secondary">
                {model2Name}
              </p>
            </div>
          </div>
          <PillarScoreCard
            title="Pillar II Score"
            subtitle="Focused score on brand value and correctness"
            score={pillarIIData.model1Score}
            status={pillarIIData.model1Status}
            barData={pillarIIData.barData}
          />
        </div>
      </Modal>

      {/* Found Vulnerabilities Modal */}
      <Modal
        isOpen={openModal === "foundVulnerabilities"}
        onClose={() => setOpenModal(null)}
        title="Vulnerabilities Found"
        description="Overall rate of successful attacks across all test cases."
      >
        <FoundVulnerabilitiesCard
          title="Vulnerabilities Found"
          subtitle="Overall rate of successful attacks across all test cases."
          identifiedCount={vulnerabilitiesData.identifiedCount}
          unweightedASR={vulnerabilitiesData.unweightedASR}
          weightedASR={vulnerabilitiesData.weightedASR}
          status={vulnerabilitiesData.status}
          radarData={vulnerabilitiesData.radarData}
        />
      </Modal>

      {/* Conversational Statistics Modal */}
      <Modal
        isOpen={openModal === "conversationalStatistics"}
        onClose={() => setOpenModal(null)}
        title="Conversation Statistics"
        description="Average number of turns and length of each turn."
      >
        <ConversationalStatisticsCard
          title="Conversation Statistics"
          subtitle="Average number of turns and length of each turn."
          avgChatLength={conversationalStatsData.avgChatLength}
          avgMessageLength={conversationalStatsData.avgMessageLength}
          chatLengthStatus={conversationalStatsData.chatLengthStatus}
          messageLengthStatus={conversationalStatsData.messageLengthStatus}
          chatLengthChartData={conversationalStatsData.chatLengthChartData}
          messageLengthChartData={conversationalStatsData.messageLengthChartData}
        />
      </Modal>
    </div>
  );
}

// Hash icon component
function HashIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 8.25h15m-15 0a3 3 0 1 1 0-6h15a3 3 0 1 1 0 6m0 0v6a3 3 0 0 1-3 3H8.25a3 3 0 0 1-3-3v-6m15 0V9.75"
      />
    </svg>
  );
}
