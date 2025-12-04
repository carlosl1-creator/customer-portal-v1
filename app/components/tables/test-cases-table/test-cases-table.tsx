import React from "react";
import { ChevronRightIcon } from "~/components/icons/icons";

export interface TestCase {
  caseId: string;
  category: string;
  likelihood: number; // 0-100
  modelReasoning: string;
  content: string;
  chatAndTurnLength: string;
}

export interface TestCasesTableProps {
  testCases: TestCase[];
  onRowClick?: (testCase: TestCase) => void;
  className?: string;
}

export function TestCasesTable({
  testCases,
  onRowClick,
  className = "",
}: TestCasesTableProps) {
  const getLikelihoodColor = (value: number) => {
    if (value >= 80) return { bg: "var(--color-info-bg)", border: "var(--color-primary)" };
    if (value >= 60) return { bg: "var(--color-warning-bg)", border: "var(--color-warning)" };
    return { bg: "var(--color-error-bg)", border: "var(--color-error)" };
  };

  return (
    <div
      className={`bg-theme-card border border-theme-primary rounded-[12px] overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--color-table-header-bg)] border-b border-theme-primary">
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">
                  Case ID
                </p>
              </th>
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">
                  Category
                </p>
              </th>
              <th className="px-6 py-3 text-left w-[132px]">
                <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">
                  Likelihood
                </p>
              </th>
              <th className="px-6 py-3 text-left w-[258px]">
                <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">
                  Model Reasoning
                </p>
              </th>
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">
                  Content
                </p>
              </th>
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">
                  Chat and Turn Length
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase, index) => {
              const isEven = index % 2 === 0;
              const likelihoodColor = getLikelihoodColor(testCase.likelihood);
              
              return (
                <tr
                  key={testCase.caseId}
                  className={`${
                    isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
                  } border-b border-theme-primary hover:bg-theme-hover transition-colors cursor-pointer`}
                  onClick={() => onRowClick?.(testCase)}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-[14px] leading-[20px] text-theme-primary">
                      {testCase.caseId}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">
                      {testCase.category}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div className="flex-1 h-2 bg-theme-muted rounded-[4px] relative overflow-hidden">
                        <div
                          className="h-full rounded-[4px]"
                          style={{
                            width: `${testCase.likelihood}%`,
                            backgroundColor: likelihoodColor.bg,
                            border: `1px solid ${likelihoodColor.border}`,
                          }}
                        />
                      </div>
                      <p className="font-medium text-[14px] leading-[20px] text-theme-secondary whitespace-nowrap">
                        {testCase.likelihood}%
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">
                      {testCase.modelReasoning}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">
                      {testCase.content}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                      <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">
                        {testCase.chatAndTurnLength}
                      </p>
                      <ChevronRightIcon
                        className="w-5 h-5 flex-shrink-0 text-theme-secondary"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
