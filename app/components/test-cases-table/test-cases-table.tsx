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
    if (value >= 80) return { bg: "#B2DDFF", border: "#1570EF" };
    if (value >= 60) return { bg: "#FEDF89", border: "#DC6803" };
    return { bg: "#FECDD6", border: "#F04438" };
  };

  return (
    <div
      className={`bg-white border border-[#e9eaeb] rounded-[12px] overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white border-b border-[#e9eaeb]">
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">
                  Case ID
                </p>
              </th>
              <th className="px-6 py-3 text-left">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">
                  Category
                </p>
              </th>
              <th className="px-6 py-3 text-left w-[132px]">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">
                  Likelihood
                </p>
              </th>
              <th className="px-6 py-3 text-left w-[258px]">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">
                  Model Reasoning
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
            {testCases.map((testCase, index) => {
              const isEven = index % 2 === 0;
              const likelihoodColor = getLikelihoodColor(testCase.likelihood);
              
              return (
                <tr
                  key={testCase.caseId}
                  className={`${
                    isEven ? "bg-neutral-50" : "bg-white"
                  } border-b border-[#e9eaeb] hover:bg-neutral-100 transition-colors cursor-pointer`}
                  onClick={() => onRowClick?.(testCase)}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-[14px] leading-[20px] text-[#181d27]">
                      {testCase.caseId}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
                      {testCase.category}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div className="flex-1 h-2 bg-neutral-100 rounded-[4px] relative overflow-hidden">
                        <div
                          className="h-full rounded-[4px]"
                          style={{
                            width: `${testCase.likelihood}%`,
                            backgroundColor: likelihoodColor.bg,
                            border: `1px solid ${likelihoodColor.border}`,
                          }}
                        />
                      </div>
                      <p className="font-medium text-[14px] leading-[20px] text-[#414651] whitespace-nowrap">
                        {testCase.likelihood}%
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
                      {testCase.modelReasoning}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
                      {testCase.content}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
                        {testCase.chatAndTurnLength}
                      </p>
                      <ChevronRightIcon
                        className="w-5 h-5"
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

