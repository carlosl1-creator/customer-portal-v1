import React from "react";
import { Badge } from "~/components/badge/badge";
import { HelpIcon, ArrowUpRightIcon } from "~/components/icons/icons";

export interface ComparisonCase {
  caseId: string;
  category: string;
  riskFactor: number; // Percentage
  turnLength: {
    turns: number;
    chars: number;
  };
}

export interface ComparisonTableProps {
  title: string;
  cases: ComparisonCase[];
  onCaseClick?: (caseItem: ComparisonCase) => void;
  className?: string;
}

const getRiskFactorVariant = (value: number): "success" | "warning" | "neutral" => {
  if (value < 20) return "success";
  if (value < 30) return "warning";
  return "neutral";
};

export function ComparisonTable({
  title,
  cases,
  onCaseClick,
  className = "",
}: ComparisonTableProps) {
  return (
    <div className={`flex flex-col gap-[10px] items-start ${className}`}>
      <div className="px-1">
        <p className="font-medium text-[16px] leading-[24px] text-[#535862]">{title}</p>
      </div>
      <div className="bg-white border border-[#e9eaeb] rounded-[12px] overflow-hidden w-full">
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="bg-white flex items-start border-b border-[#e9eaeb] w-full">
            {/* Case ID */}
            <div className="flex flex-col">
              <div className="bg-white border-b border-[#e9eaeb] flex gap-3 h-11 items-center px-6 py-3">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Case ID</p>
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <div className="bg-white border-b border-[#e9eaeb] flex gap-3 h-11 items-center px-6 py-3">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Category</p>
              </div>
            </div>

            {/* Risk Factor */}
            <div className="flex flex-col">
              <div className="bg-white border-b border-[#e9eaeb] flex gap-1 h-11 items-center px-6 py-3">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Risk Factor</p>
                <HelpIcon className="w-4 h-4" stroke="#A4A7AE" />
              </div>
            </div>

            {/* Turn Length */}
            <div className="flex flex-col">
              <div className="bg-white border-b border-[#e9eaeb] flex gap-1 h-11 items-center px-6 py-3">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Turn Length</p>
                <HelpIcon className="w-4 h-4" stroke="#A4A7AE" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col">
              <div className="bg-white border-b border-[#e9eaeb] h-11 px-6 py-3" />
            </div>
          </div>

          {/* Rows */}
          {cases.map((caseItem, index) => {
            const isEven = index % 2 === 0;
            const bgColor = isEven ? "bg-neutral-50" : "bg-white";

            return (
              <div
                key={caseItem.caseId}
                className={`${bgColor} flex items-start border-b border-[#e9eaeb] w-full`}
              >
                {/* Case ID */}
                <div className="flex gap-3 h-18 items-center px-6 py-4">
                  <p className="font-normal text-[14px] leading-[20px] text-[#181d27]">{caseItem.caseId}</p>
                </div>

                {/* Category */}
                <div className="flex h-18 items-center px-6 py-4">
                  <a
                    className="block cursor-pointer font-normal leading-[20px] text-[#535862] text-[14px] whitespace-nowrap"
                    onClick={() => onCaseClick?.(caseItem)}
                  >
                    <p className="leading-[20px]">
                      {caseItem.category} <span className="font-normal text-[#a4a7ae]">↗</span>
                    </p>
                  </a>
                </div>

                {/* Risk Factor */}
                <div className="flex h-18 items-center px-6 py-4">
                  <Badge variant={getRiskFactorVariant(caseItem.riskFactor)}>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {caseItem.riskFactor}%
                    </span>
                  </Badge>
                </div>

                {/* Turn Length */}
                <div className="flex flex-col h-18 justify-center px-6 py-4">
                  <p className="font-medium text-[14px] leading-[20px] text-[#181d27]">{caseItem.turnLength.turns}</p>
                  <p className="font-normal text-[14px] leading-[20px] text-[#535862]">{caseItem.turnLength.chars}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-1 h-18 items-center p-4">
                  <button
                    className="p-2.5 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity rounded-lg"
                    onClick={() => onCaseClick?.(caseItem)}
                  >
                    <ArrowUpRightIcon className="w-5 h-5" stroke="#535862" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="border-t border-[#e9eaeb] flex items-center justify-between px-6 py-3 w-full">
          <div className="flex gap-3 items-start">
            <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-medium text-[14px] leading-[20px] text-[#d5d7da]">Previous</p>
            </button>
            <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-medium text-[14px] leading-[20px] text-[#535862]">Next</p>
            </button>
          </div>
          <p className="font-normal text-[14px] leading-[20px] text-[#414651]">Page 1 of 10</p>
        </div>
      </div>
    </div>
  );
}

