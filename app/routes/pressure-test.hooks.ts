/**
 * Custom hooks and handlers for the Pressure Test page.
 */

import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import type { ModalType } from "./pressure-test.data";
import {
  useAppSelector,
  selectCompletedReports,
  selectAllSimulations,
  type Report,
  type Simulation,
} from "~/store";

// ============================================================================
// Pressure Test Data Hook - Transforms Redux data for the page
// ============================================================================

export function usePressureTestData() {
  const completedReports = useAppSelector(selectCompletedReports);
  const simulations = useAppSelector(selectAllSimulations);

  // Get the latest completed report (most recent by created_at)
  const latestReport = useMemo(() => {
    if (completedReports.length === 0) return null;
    return [...completedReports].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
  }, [completedReports]);

  // Transform report data into header config
  const headerConfig = useMemo(() => {
    if (!latestReport) {
      return {
        pageName: "PRESSURE TEST REPORT",
        title: "No Report Available",
        infoText: ["No completed reports found"],
      };
    }
    const createdDate = new Date(latestReport.created_at);
    const formattedDate = `${createdDate.getMonth() + 1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;
    return {
      pageName: "PRESSURE TEST REPORT",
      title: `${latestReport.chatbot_name} - ${latestReport.policy_name}`,
      infoText: [
        `Created ${formattedDate}`,
        `Policy Version: ${latestReport.policy_name} ${latestReport.policy_version}`,
        `Model Version: ${latestReport.chatbot_name} ${latestReport.chatbot_version}`,
      ],
    };
  }, [latestReport]);

  // Transform report data into overall readiness
  const overallReadiness = useMemo(() => {
    if (!latestReport) {
      return {
        title: "Overall Readiness",
        subtitle: "Overall rating based on model safety, security, and fraud and bias mitigation.",
        rating: 0,
        description: "No report data available.",
      };
    }
    // Convert score (0-100) to rating (0-5)
    const rating = (latestReport.readiness_score / 100) * 5;
    return {
      title: "Overall Readiness",
      subtitle: "Overall rating based on model safety, security, and fraud and bias mitigation.",
      rating: Math.round(rating * 10) / 10,
      description: latestReport.readiness_text,
    };
  }, [latestReport]);

  // Transform report data into total cases
  const totalCases = useMemo(() => {
    if (!latestReport) {
      return {
        title: "Total Cases",
        subtitle: "Number of total simulation cases and risk distribution",
        totalCases: 0,
        scenarios: [],
      };
    }

    const categories = latestReport.attack_success_rate.categories;
    const categoryNames = Object.keys(categories);
    const colors = ["#B2DDFF", "#A6F4C5", "#FECDD6", "#FEDF89", "#D9D6FE"];
    
    // Calculate total and percentages
    const total = latestReport.total_simulations.total_simulation_count;
    const scenarios = categoryNames.slice(0, 3).map((name, index) => {
      const data = categories[name];
      return {
        label: name,
        percentage: Math.round(data.asr),
        color: colors[index % colors.length],
      };
    });

    return {
      title: "Total Cases",
      subtitle: "Number of total simulation cases and risk distribution",
      totalCases: total,
      scenarios,
    };
  }, [latestReport]);

  // Transform report data into pillar scores
  const pillarScores = useMemo(() => {
    if (!latestReport) {
      return [
        { id: "pillarI", title: "Pillar I Score", subtitle: "Aggregated score across safety, security, and fraud.", score: 0, status: "warning" as const, isLocked: false, barData: [] },
        { id: "pillarII", title: "Pillar II Score", subtitle: "Focused score on brand value and correctness", score: 0, status: "warning" as const, isLocked: false, barData: [] },
        { id: "pillarIII", title: "Pillar III Score", subtitle: "Aggregated score against biases", score: 0, status: "locked" as const, isLocked: true, lockedMessage: "Pillar III scores are coming Quarter 2026 and provide additional insights about model biases. Stay tuned!", barData: [] },
      ];
    }

    const p1Score = (latestReport.p1.p1_score / 100) * 5;
    const p2Score = (latestReport.p2.p2_score / 100) * 5;

    const getStatus = (score: number): "success" | "warning" | "locked" => {
      if (score >= 4) return "success";
      if (score >= 3) return "warning";
      return "warning";
    };

    return [
      {
        id: "pillarI",
        title: "Pillar I Score",
        subtitle: latestReport.p1.p1_text || "Aggregated score across safety, security, and fraud.",
        score: Math.round(p1Score * 10) / 10,
        status: getStatus(p1Score),
        isLocked: false,
        barData: [
          { label: "Your Model", value: latestReport.p1.p1_score, color: "#B2DDFF", borderColor: "#1570EF" },
          { label: "Industry Avg", value: 75, color: "#A6F4C5", borderColor: "#039855" },
        ],
      },
      {
        id: "pillarII",
        title: "Pillar II Score",
        subtitle: latestReport.p2.p2_text || "Focused score on brand value and correctness",
        score: Math.round(p2Score * 10) / 10,
        status: getStatus(p2Score),
        isLocked: false,
        barData: [
          { label: "Your Model", value: latestReport.p2.p2_score, color: "#FEDF89", borderColor: "#DC6803" },
          { label: "Industry Avg", value: 70, color: "#B2DDFF", borderColor: "#1570EF" },
        ],
      },
      {
        id: "pillarIII",
        title: "Pillar III Score",
        subtitle: "Aggregated score against biases",
        score: 0,
        status: "locked" as const,
        isLocked: true,
        lockedMessage: "Pillar III scores are coming Quarter 2026 and provide additional insights about model biases. Stay tuned!",
        barData: [],
      },
    ];
  }, [latestReport]);

  // Transform report data into found vulnerabilities
  const foundVulnerabilities = useMemo(() => {
    if (!latestReport) {
      return {
        title: "Found Vulnerabilities",
        subtitle: "Statistics on vulnerabilities found across all test cases.",
        identifiedCount: 0,
        unweightedASR: 0,
        weightedASR: 0,
        status: "warning" as const,
        radarData: [],
      };
    }

    const categories = latestReport.attack_success_rate.categories;
    const categoryNames = Object.keys(categories);

    // Create radar data from categories
    const radarData = [
      {
        label: "Current Model",
        color: "#B2DDFF",
        data: categoryNames.map((name) => ({
          label: name,
          value: 100 - categories[name].asr, // Invert ASR to show "safety" score
        })),
      },
    ];

    return {
      title: "Found Vulnerabilities",
      subtitle: "Statistics on vulnerabilities found across all test cases.",
      identifiedCount: latestReport.attack_success_rate.identified,
      unweightedASR: latestReport.attack_success_rate.unweighted_asr,
      weightedASR: latestReport.attack_success_rate.weighted_asr,
      status: latestReport.attack_success_rate.weighted_asr > 15 ? "warning" as const : "success" as const,
      radarData,
    };
  }, [latestReport]);

  // Transform report data into conversational statistics
  const conversationalStatistics = useMemo(() => {
    if (!latestReport) {
      return {
        title: "Conversation Statistics",
        subtitle: "Average number of turns and length of each turn.",
        avgChatLength: 0,
        avgMessageLength: 0,
        chatLengthStatus: "warning" as const,
        messageLengthStatus: "warning" as const,
        chatLengthChartData: [],
        messageLengthChartData: [],
      };
    }

    const stats = latestReport.conversation_statistics;
    
    // Convert distribution objects to chart data
    const chatLengthChartData = Object.entries(stats.chat_len_distribution).map(([key, value], index) => ({
      x: index * 2,
      y: value / 100,
    }));

    const messageLengthChartData = Object.entries(stats.message_len_distribution).map(([key, value], index) => ({
      x: index * 60,
      y: value / 100,
    }));

    return {
      title: "Conversation Statistics",
      subtitle: "Average number of turns and length of each turn.",
      avgChatLength: stats.avg_no_of_turns,
      avgMessageLength: stats.avg_len_of_each_turn,
      chatLengthStatus: stats.avg_no_of_turns > 3 ? "success" as const : "warning" as const,
      messageLengthStatus: stats.avg_len_of_each_turn > 100 ? "success" as const : "warning" as const,
      chatLengthChartData,
      messageLengthChartData,
    };
  }, [latestReport]);

  // Transform simulations into test cases
  const testCases = useMemo(() => {
    return simulations.slice(0, 10).map((sim, index) => ({
      caseId: `TC-${String(index + 1).padStart(3, "0")}`,
      category: sim.category,
      likelihood: sim.likelihood === "high" ? 85 : sim.likelihood === "medium" ? 60 : 30,
      modelReasoning: sim.goal,
      content: sim.content,
      chatAndTurnLength: `${sim.chat_length} turns, ${sim.avg_turn_length} chars`,
    }));
  }, [simulations]);

  // Transform data into top risk area
  const topRiskArea = useMemo(() => {
    if (!latestReport) {
      return {
        number: 1,
        title: "No Data",
        threatLevel: "Low" as const,
        asrPercentage: 0,
        highRiskCases: 0,
        priority: "Low" as const,
        avgTurns: 0,
        avgTurnLength: 0,
        keyInsights: ["No report data available."],
        cases: [],
      };
    }

    const categories = latestReport.attack_success_rate.categories;
    const categoryEntries = Object.entries(categories);
    
    // Find the category with highest ASR
    const topCategory = categoryEntries.sort((a, b) => b[1].asr - a[1].asr)[0];
    
    if (!topCategory) {
      return {
        number: 1,
        title: "No Categories",
        threatLevel: "Low" as const,
        asrPercentage: 0,
        highRiskCases: 0,
        priority: "Low" as const,
        avgTurns: 0,
        avgTurnLength: 0,
        keyInsights: ["No category data available."],
        cases: [],
      };
    }

    const [categoryName, categoryData] = topCategory;
    const threatLevel = categoryData.priority === "high" ? "High" : categoryData.priority === "medium" ? "Medium" : "Low";

    // Get simulations for this category
    const categorySims = simulations.filter(s => s.category === categoryName).slice(0, 3);
    const cases = categorySims.map((sim) => ({
      likelihood: sim.likelihood === "high" ? 85 : sim.likelihood === "medium" ? 60 : 30,
      expected: sim.likelihood === "high" ? "High" : sim.likelihood === "medium" ? "Medium" : "Low",
      riskDescription: sim.goal,
      content: sim.content,
      chatAndTurnLength: `${sim.chat_length} turns, ${sim.avg_turn_length} chars`,
    }));

    return {
      number: 1,
      title: categoryName,
      threatLevel: threatLevel as "High" | "Medium" | "Low",
      asrPercentage: categoryData.asr,
      highRiskCases: categorySims.filter(s => s.likelihood === "high").length,
      priority: threatLevel as "High" | "Medium" | "Low",
      avgTurns: categoryData.avg_turns,
      avgTurnLength: categoryData.avg_turns_length,
      keyInsights: [
        `${categoryName} category shows ${categoryData.asr.toFixed(1)}% attack success rate.`,
        `Average conversation length: ${categoryData.avg_turns.toFixed(1)} turns.`,
        `Recommendation: Review and strengthen defenses against ${categoryName.toLowerCase()} attacks.`,
      ],
      cases,
    };
  }, [latestReport, simulations]);

  // Category distribution for modal
  const categoryDistribution = useMemo(() => {
    if (!latestReport) {
      return {
        radarData: [],
        categories: [],
      };
    }

    const categories = latestReport.attack_success_rate.categories;
    const categoryEntries = Object.entries(categories);

    const radarData = categoryEntries.map(([name, data]) => ({
      label: name,
      value: 100 - data.asr,
    }));

    const categoryData = categoryEntries.map(([name, data], index) => ({
      id: `cat-${index + 1}`,
      name,
      priority: data.priority as "high" | "medium" | "low",
      asrPercentage: Math.round(data.asr),
      asrCount: `${Math.round(data.asr)} / 100`,
      avgTurns: data.avg_turns,
      avgTurnLength: data.avg_turns_length,
    }));

    return {
      radarData,
      categories: categoryData,
    };
  }, [latestReport]);

  // Filter options derived from categories
  const filterOptions = useMemo(() => {
    if (!latestReport) {
      return {
        turnLength: [
          { label: "Short", value: "short" },
          { label: "Medium", value: "medium" },
          { label: "Long", value: "long" },
        ],
        category: [],
      };
    }

    const categoryNames = Object.keys(latestReport.attack_success_rate.categories);
    
    return {
      turnLength: [
        { label: "Short", value: "short" },
        { label: "Medium", value: "medium" },
        { label: "Long", value: "long" },
      ],
      category: categoryNames.map((name) => ({
        label: name,
        value: name.toLowerCase().replace(/\s+/g, "-"),
      })),
    };
  }, [latestReport]);

  return {
    latestReport,
    headerConfig,
    overallReadiness,
    totalCases,
    pillarScores,
    foundVulnerabilities,
    conversationalStatistics,
    testCases,
    topRiskArea,
    categoryDistribution,
    filterOptions,
    hasData: !!latestReport,
  };
}

// ============================================================================
// Modal Hook
// ============================================================================

export function useModal() {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const openModalById = useCallback((modalId: ModalType) => {
    setOpenModal(modalId);
  }, []);

  const closeModal = useCallback(() => {
    setOpenModal(null);
  }, []);

  return {
    openModal,
    openModalById,
    closeModal,
  };
}

// ============================================================================
// Header Actions Hook
// ============================================================================

export function useHeaderActions() {
  const navigate = useNavigate();

  const handleSendToSlack = useCallback(() => {
    console.log("Send to Slack clicked");
    // TODO: Implement Slack integration
  }, []);

  const handleLinkToJira = useCallback(() => {
    console.log("Link to Jira clicked");
    // TODO: Implement Jira integration
  }, []);

  const handleDownloadReport = useCallback(() => {
    console.log("Download Report clicked");
    // TODO: Implement download functionality
  }, []);

  const handleCopyPermalink = useCallback(() => {
    console.log("Copy Permalink clicked");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  const handleViewAllReports = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return {
    handleSendToSlack,
    handleLinkToJira,
    handleDownloadReport,
    handleCopyPermalink,
    handleViewAllReports,
  };
}

// ============================================================================
// Filter Actions Hook
// ============================================================================

export function useFilterActions() {
  const handleTurnLengthChange = useCallback((value: string) => {
    console.log("Turn length changed:", value);
    // TODO: Implement filter logic
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    console.log("Category changed:", value);
    // TODO: Implement filter logic
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    console.log("Search changed:", value);
    // TODO: Implement search logic
  }, []);

  const handleMoreFiltersClick = useCallback(() => {
    console.log("More filters clicked");
    // TODO: Implement more filters modal
  }, []);

  return {
    handleTurnLengthChange,
    handleCategoryChange,
    handleSearchChange,
    handleMoreFiltersClick,
  };
}

// ============================================================================
// Pagination Hook
// ============================================================================

export function usePagination(initialPage = 1, totalPages = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    handlePrevious,
    handleNext,
  };
}

// ============================================================================
// Interaction Handlers Hook
// ============================================================================

export function useInteractionHandlers() {
  const handleThumbsUp = useCallback((insightId: string) => {
    console.log("Thumbs up clicked for:", insightId);
    // TODO: Implement feedback logic
  }, []);

  const handleThumbsDown = useCallback((insightId: string) => {
    console.log("Thumbs down clicked for:", insightId);
    // TODO: Implement feedback logic
  }, []);

  const handleRowClick = useCallback((item: unknown) => {
    console.log("Row clicked:", item);
    // TODO: Implement row click navigation
  }, []);

  return {
    handleThumbsUp,
    handleThumbsDown,
    handleRowClick,
  };
}

