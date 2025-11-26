import React from "react";
import { ChevronRightIcon } from "~/components/icons/icons";
import { HelpIcon } from "~/components/icons/icons";

export interface RiskAreaCase {
  likelihood: number; // 0-100
  expected: string; // Badge text like "High", "Medium", "Low"
  riskDescription: string;
  content: string;
  chatAndTurnLength: string;
}

export interface RiskAreasTableProps {
  cases: RiskAreaCase[];
  onRowClick?: (caseItem: RiskAreaCase) => void;
  className?: string;
}

export function RiskAreasTable({
  cases,
  onRowClick,
  className = "",
}: RiskAreasTableProps) {
  const getLikelihoodColor = (value: number) => {
    if (value >= 80) return { bg: "var(--color-info-bg)", border: "var(--color-primary)" };
    if (value >= 60) return { bg: "var(--color-warning-bg)", border: "var(--color-warning)" };
    return { bg: "var(--color-error-bg)", border: "var(--color-error)" };
  };

  const getExpectedBadgeColor = (expected: string) => {
    const lower = expected.toLowerCase();
    if (lower === "high") return { bg: "var(--color-error-bg)", text: "var(--color-error-text)" };
    if (lower === "medium") return { bg: "var(--color-warning-bg)", text: "var(--color-warning-text)" };
    return { bg: "var(--color-success-bg)", text: "var(--color-success-text)" };
  };

  return (
    <div
      className={`bg-theme-card border border-theme-primary rounded-[12px] overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--color-table-header-bg)] border-b border-theme-primary">
              <th className="px-6 py-3 text-left w-[144px]">
                <div className="flex gap-1 items-center">
                  <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">
                    Likelihood
                  </p>
                  <HelpIcon className="w-4 h-4 text-theme-muted" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">
                  Expected
                </p>
              </th>
              <th className="px-6 py-3 text-left w-[258px]">
                <p className="font-medium text-[12px] leading-[18px] text-theme-secondary">
                  Risk Description
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
            {cases.map((caseItem, index) => {
              const isEven = index % 2 === 0;
              const likelihoodColor = getLikelihoodColor(caseItem.likelihood);
              const expectedBadge = getExpectedBadgeColor(caseItem.expected);
              
              return (
                <tr
                  key={index}
                  className={`${
                    isEven ? "bg-[var(--color-table-row-hover)]" : "bg-theme-card"
                  } border-b border-theme-primary hover:bg-theme-hover transition-colors cursor-pointer`}
                  onClick={() => onRowClick?.(caseItem)}
                >
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div className="flex-1 h-2 bg-theme-muted rounded-[4px] relative overflow-hidden">
                        <div
                          className="h-full rounded-[4px]"
                          style={{
                            width: `${caseItem.likelihood}%`,
                            backgroundColor: likelihoodColor.bg,
                            border: `1px solid ${likelihoodColor.border}`,
                          }}
                        />
                      </div>
                      <p className="font-medium text-[14px] leading-[20px] text-theme-secondary whitespace-nowrap">
                        {caseItem.likelihood}%
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="inline-flex items-center justify-center px-2 py-0.5 rounded-[16px]"
                      style={{
                        backgroundColor: expectedBadge.bg,
                      }}
                    >
                      <p
                        className="font-medium text-[12px] leading-[18px] text-center"
                        style={{ color: expectedBadge.text }}
                      >
                        {caseItem.expected}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">
                      {caseItem.riskDescription}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">
                      {caseItem.content}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                      <p className="font-normal text-[14px] leading-[20px] text-theme-secondary">
                        {caseItem.chatAndTurnLength}
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
