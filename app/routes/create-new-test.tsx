import type { Route } from "./+types/create-new-test";
import { useState } from "react";
import { HeaderSection } from "~/components/header-section/header-section";
import { Select, type SelectOption } from "~/components/select/select";
import { CategoriesTable, type Category, type Priority } from "~/components/categories-table/categories-table";
import { SuggestionsCard, type Suggestion } from "~/components/suggestions-card/suggestions-card";
import { ArrowUpRightIcon } from "~/components/icons/icons";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Create New Test - Reinforce Labs" },
    { name: "description", content: "Create a new test to compare model performance" },
  ];
}

export default function CreateNewTest() {
  const [chatbotVersion, setChatbotVersion] = useState<string>("retail-1.5");
  const [policyVersion, setPolicyVersion] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  // Mock data for dropdowns
  const chatbotOptions: SelectOption[] = [
    { label: "Retail Chatbot 1.5", value: "retail-1.5" },
    { label: "Content Model 2.1", value: "content-2.1" },
    { label: "Account Model 1.0", value: "account-1.0" },
    { label: "Audio Model 1.0", value: "audio-1.0" },
  ];

  const policyOptions: SelectOption[] = [
    { label: "Gap Analysis", value: "gap-analysis" },
    { label: "Content Safety", value: "content-safety" },
    { label: "Policy 3.1", value: "policy-3.1" },
    { label: "Policy 2.0", value: "policy-2.0" },
  ];

  // Mock categories data
  const categories: Category[] = [
    { id: "1", name: "Violence", priority: "high" as Priority },
    { id: "2", name: "Self-Harm", priority: "medium" as Priority },
    { id: "3", name: "Illegal Activities", priority: "low" as Priority },
    { id: "4", name: "Self-Harm", priority: "medium" as Priority },
    { id: "5", name: "Hate Speech", priority: "high" as Priority },
    { id: "6", name: "Violence", priority: "medium" as Priority },
    { id: "7", name: "Illegal Activities", priority: "high" as Priority },
    { id: "8", name: "Others", priority: "low" as Priority },
    { id: "9", name: "Violence", priority: "low" as Priority },
    { id: "10", name: "Self-Harm", priority: "high" as Priority },
    { id: "11", name: "Hate Speech", priority: "medium" as Priority },
    { id: "12", name: "Illegal Activities", priority: "low" as Priority },
    { id: "13", name: "Others", priority: "medium" as Priority },
    { id: "14", name: "Violence", priority: "high" as Priority },
    { id: "15", name: "Self-Harm", priority: "low" as Priority },
    { id: "16", name: "Hate Speech", priority: "high" as Priority },
    { id: "17", name: "Illegal Activities", priority: "medium" as Priority },
    { id: "18", name: "Others", priority: "low" as Priority },
    { id: "19", name: "Violence", priority: "medium" as Priority },
    { id: "20", name: "Self-Harm", priority: "high" as Priority },
  ];

  const suggestions: Suggestion[] = [
    {
      title: "Latest Model and Policy",
      description: "Content Model 1.5 — Policy 3.1",
      onClick: () => {
        setChatbotVersion("content-1.5");
        setPolicyVersion("policy-3.1");
      },
    },
    {
      title: "Latest Model and Past Policy Version",
      description: "Content Model 1.5 — Policy 2.0",
      onClick: () => {
        setChatbotVersion("content-1.5");
        setPolicyVersion("policy-2.0");
      },
    },
    {
      title: "Last Used Model and Latest Policy",
      description: "Content Model 1.0 — Policy 3.1",
      onClick: () => {
        setChatbotVersion("content-1.0");
        setPolicyVersion("policy-3.1");
      },
    },
    {
      title: "High Priority Categories Only",
      description: "Violence, Self-Harm, 7+",
      onClick: () => {
        const highPriorityIds = categories
          .filter((cat) => cat.priority === "high")
          .map((cat) => cat.id);
        setSelectedCategories(new Set(highPriorityIds));
      },
    },
  ];

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
    console.log("Creating test with:", {
      chatbotVersion,
      policyVersion,
      selectedCategories: Array.from(selectedCategories),
    });
    // TODO: Navigate to test creation or show success message
  };

  const canCreateTest = chatbotVersion !== "" && policyVersion !== "" && selectedCategories.size > 0;

  return (
    <div className="w-full px-10">
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
      <div className="px-10 pb-12 pt-10">
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
                <p className="font-medium leading-6 text-[#535862] text-base">Filter Categories</p>
                <CategoriesTable
                  categories={categories}
                  selectedIds={selectedCategories}
                  onSelectionChange={handleCategorySelection}
                  onSelectAll={handleSelectAll}
                />
              </div>
            </div>

            {/* Mandatory Fields Text */}
            <p className="font-normal leading-5 text-[#535862] text-sm">
              Fields marked with <span className="text-[#d92d20]">*</span> are mandatory.
            </p>

            {/* Create Test Button */}
            <div className="flex gap-6 items-start">
              <button
                onClick={canCreateTest ? handleCreateTest : undefined}
                disabled={!canCreateTest}
                className={`box-border flex gap-2 items-center justify-center px-5 py-3 rounded-lg transition-colors ${
                  canCreateTest
                    ? "bg-[#535862] border border-[#535862] text-white hover:opacity-90 cursor-pointer"
                    : "bg-gray-300 border border-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ArrowUpRightIcon className="w-5 h-5" stroke={canCreateTest ? "white" : "currentColor"} />
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

