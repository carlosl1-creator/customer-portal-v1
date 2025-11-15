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
    if (value >= 80) return { bg: "#B2DDFF", border: "#1570EF" };
    if (value >= 60) return { bg: "#FEDF89", border: "#DC6803" };
    return { bg: "#FECDD6", border: "#F04438" };
  };

  const getExpectedBadgeColor = (expected: string) => {
    const lower = expected.toLowerCase();
    if (lower === "high") return { bg: "#FEF3F2", text: "#B42318" };
    if (lower === "medium") return { bg: "#FEF0C7", text: "#DC6803" };
    return { bg: "#ECFDF3", text: "#027A48" };
  };

  return (
    <div
      className={`bg-white border border-[#e9eaeb] rounded-[12px] overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white border-b border-[#e9eaeb]">
              <th className="px-6 py-3 text-left w-[144px]">
                <div className="flex gap-1 items-center">
                  <p className="font-medium text-[12px] leading-[18px] text-[#535862]">
                    Likelihood
                  </p>
                  <HelpIcon className="w-4 h-4" stroke="#A4A7AE" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">
                  Expected
                </p>
              </th>
              <th className="px-6 py-3 text-left w-[258px]">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">
                  Risk Description
                </p>
              </th>
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">
                  Content
                </p>
              </th>
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">
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
                    isEven ? "bg-neutral-50" : "bg-white"
                  } border-b border-[#e9eaeb] hover:bg-neutral-100 transition-colors cursor-pointer`}
                  onClick={() => onRowClick?.(caseItem)}
                >
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div className="flex-1 h-2 bg-neutral-100 rounded-[4px] relative overflow-hidden">
                        <div
                          className="h-full rounded-[4px]"
                          style={{
                            width: `${caseItem.likelihood}%`,
                            backgroundColor: likelihoodColor.bg,
                            border: `1px solid ${likelihoodColor.border}`,
                          }}
                        />
                      </div>
                      <p className="font-medium text-[14px] leading-[20px] text-[#414651] whitespace-nowrap">
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
                    <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
                      {caseItem.riskDescription}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
                      {caseItem.content}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                      <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
                        {caseItem.chatAndTurnLength}
                      </p>
                      <ChevronRightIcon
                        className="w-5 h-5 flex-shrink-0"
                        stroke="#535862"
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

