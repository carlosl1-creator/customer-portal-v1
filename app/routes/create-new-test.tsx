import type { Route } from "./+types/create-new-test";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { HeaderSection } from "~/components/header-section/header-section";
import { Select } from "~/components/select/select";
import { CategoriesTable } from "~/components/tables/categories-table/categories-table";
import { SuggestionsCard, type Suggestion } from "~/components/cards/suggestions-card/suggestions-card";
import { LoadingHeader } from "~/components/loading/loading-header/loading-header";
import { LoadingStepCard, type LoadingStep, type StepStatus } from "~/components/cards/loading-step-card/loading-step-card";
import { ArrowUpRightIcon, ChevronLeftIcon } from "~/components/icons/icons";
import {
  MOCK_CHATBOT_OPTIONS,
  MOCK_POLICY_OPTIONS,
  MOCK_CATEGORIES,
  MOCK_SUGGESTION_CONFIGS,
  getHighPriorityCategoryIds,
} from "~/mocks";
import { ROUTES } from "~/constants/routes";
import { logger } from "~/utils/logger";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Create New Test - Reinforce Labs" },
    { name: "description", content: "Create a new test to compare model performance" },
  ];
}

type LoadingState = "idle" | "curating" | "executing" | "collecting" | "completed";

export default function CreateNewTest() {
  const navigate = useNavigate();
  const [chatbotVersion, setChatbotVersion] = useState<string>("retail-1.5");
  const [policyVersion, setPolicyVersion] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");

  // In production, these would come from API calls or state management
  const chatbotOptions = MOCK_CHATBOT_OPTIONS;
  const policyOptions = MOCK_POLICY_OPTIONS;
  const categories = MOCK_CATEGORIES;

  // Build suggestions with click handlers
  const suggestions: Suggestion[] = useMemo(() => {
    return MOCK_SUGGESTION_CONFIGS.map((config) => ({
      title: config.title,
      description: config.description,
      onClick: () => {
        if (config.selectHighPriority) {
          setSelectedCategories(new Set(getHighPriorityCategoryIds()));
        } else {
          if (config.chatbotVersion) setChatbotVersion(config.chatbotVersion);
          if (config.policyVersion) setPolicyVersion(config.policyVersion);
        }
      },
    }));
  }, []);

  const handleCategorySelection = (id: string, selected: boolean) => {
    const newSet = new Set(selectedCategories);
    if (selected) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setSelectedCategories(newSet);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedCategories(new Set(categories.map((cat) => cat.id)));
    } else {
      setSelectedCategories(new Set());
    }
  };

  const handleCreateTest = () => {
    logger.debug("Creating test with:", {
      chatbotVersion,
      policyVersion,
      selectedCategories: Array.from(selectedCategories),
    });
    setLoadingState("curating");
  };

  const handleBackToHome = () => {
    navigate(ROUTES.HOME);
  };

  // Handle loading state transitions
  useEffect(() => {
    if (loadingState === "curating") {
      const timer = setTimeout(() => {
        setLoadingState("executing");
      }, 5000);
      return () => clearTimeout(timer);
    } else if (loadingState === "executing") {
      const timer = setTimeout(() => {
        setLoadingState("collecting");
      }, 5000);
      return () => clearTimeout(timer);
    } else if (loadingState === "collecting") {
      const timer = setTimeout(() => {
        setLoadingState("completed");
      }, 5000);
      return () => clearTimeout(timer);
    } else if (loadingState === "completed") {
      const timer = setTimeout(() => {
        setLoadingState("idle");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loadingState]);

  const getStepStatus = (stepName: string): StepStatus => {
    if (loadingState === "idle" || loadingState === "completed") {
      return "pending";
    }
    if (stepName === "curating") {
      return loadingState === "curating" ? "in-progress" : "completed";
    }
    if (stepName === "executing") {
      if (loadingState === "curating") return "pending";
      return loadingState === "executing" ? "in-progress" : "completed";
    }
    if (stepName === "collecting") {
      if (loadingState === "curating" || loadingState === "executing") return "pending";
      return loadingState === "collecting" ? "in-progress" : "completed";
    }
    return "pending";
  };

  const loadingSteps: LoadingStep[] = [
    {
      title: "Curating Relevant Tests",
      description: "Identifying the most relevant test cases according to your settings",
      status: getStepStatus("curating"),
    },
    {
      title: "Executing Test Cases",
      description: "Running curated test cases in parallel to stress-test your model",
      status: getStepStatus("executing"),
    },
    {
      title: "Collecting Data",
      description: "Finalizing your report and adding final touches",
      status: getStepStatus("collecting"),
    },
  ];

  const canCreateTest = chatbotVersion !== "" && policyVersion !== "" && selectedCategories.size > 0;

  // Show loading screen
  if (loadingState !== "idle" && loadingState !== "completed") {
    return (
      <div className="w-full px-10 relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bg-gradient-to-b blur-[100px] filter from-[rgba(24,75,255,0)] opacity-10 to-[#174aff] h-[559px] left-[227px] top-[-76px] w-[394px]" />
        </div>

        {/* Main Content */}
        <div className="px-16 pb-12 pt-10 relative z-10">
          <div className="flex flex-col gap-8 items-start">
            {/* Loading Header */}
            <LoadingHeader
              title="Creating Your Test Report"
              subtitle="Your report is being generated."
            />

            {/* Loading Steps Card */}
            <div className="flex flex-col gap-9 items-start">
              <LoadingStepCard steps={loadingSteps} className="w-[503px]" />

              {/* Info Text and Back Button */}
              <div className="flex flex-col gap-6 items-start">
                <p className="font-normal leading-5 text-[var(--color-text-secondary)] text-sm">
                  You will be notified when the report has been generated.
                </p>
                <button
                  onClick={handleBackToHome}
                  className="bg-[var(--color-bg-card)] border border-[var(--color-border-secondary)] rounded-lg flex gap-2 items-center justify-center px-5 py-3 hover:bg-[var(--color-bg-hover)] transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5" stroke="var(--color-badge-default-text)" />
                  <span className="font-semibold text-base leading-6 text-[var(--color-badge-default-text)]">Back to Home Page</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-10 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-gradient-to-b blur-[100px] filter from-[rgba(24,75,255,0)] opacity-10 to-[#174aff] h-[559px] left-[227px] top-[-76px] w-[394px]" />
      </div>

      <HeaderSection
        pageName="CREATE NEW TEST"
        title="Create a New Test"
        infoText={[
          "Compare the performance of two models across test cases, content categories, and business impact.",
          "Select two to get started.",
        ]}
        buttons={[]}
      />

      {/* Main Content */}
      <div className="px-10 pb-12 pt-10 relative z-10">
        <div className="flex gap-12 items-start">
          {/* Left Column - Form */}
          <div className="flex flex-col gap-8 items-start relative shrink-0 flex-1 max-w-[800px]">
            {/* Fields */}
            <div className="flex flex-col gap-6 items-start relative shrink-0 w-full">
              {/* Chatbot Version */}
              <Select
                label="Chatbot Version"
                required
                options={chatbotOptions}
                value={chatbotVersion}
                placeholder="Select Chatbot"
                onChange={setChatbotVersion}
              />

              {/* Policy Version */}
              <Select
                label="Policy Version"
                required
                options={policyOptions}
                value={policyVersion}
                placeholder="Select Policy"
                onChange={setPolicyVersion}
              />

              {/* Filter Categories */}
              <div className="flex flex-col gap-3 items-start relative shrink-0 w-full">
                <p className="font-medium leading-6 text-[var(--color-text-secondary)] text-base">Filter Categories</p>
                <CategoriesTable
                  categories={categories}
                  selectedIds={selectedCategories}
                  onSelectionChange={handleCategorySelection}
                  onSelectAll={handleSelectAll}
                />
              </div>
            </div>

            {/* Mandatory Fields Text */}
            <p className="font-normal leading-5 text-[var(--color-text-secondary)] text-sm">
              Fields marked with <span className="text-[var(--color-error)]">*</span> are mandatory.
            </p>

            {/* Create Test Button */}
            <div className="flex gap-6 items-start">
              <button
                onClick={canCreateTest ? handleCreateTest : undefined}
                disabled={!canCreateTest}
                className={`box-border flex gap-2 items-center justify-center px-5 py-3 rounded-lg transition-colors ${
                  canCreateTest
                    ? "bg-[var(--color-text-primary)] border border-[var(--color-text-secondary)] text-[var(--color-text-inverted)] hover:opacity-90 cursor-pointer"
                    : "bg-[var(--color-bg-muted)] border border-[var(--color-border-secondary)] text-[var(--color-text-muted)] cursor-not-allowed"
                }`}
              >
                <ArrowUpRightIcon className="w-5 h-5" stroke={canCreateTest ? "var(--color-text-inverted)" : "currentColor"} />
                <span className="font-semibold text-base leading-6">Create Test</span>
              </button>
            </div>
          </div>

          {/* Right Column - Suggestions */}
          <div className="shrink-0">
            <SuggestionsCard suggestions={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
}

