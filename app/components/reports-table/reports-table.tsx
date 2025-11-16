import React from "react";
import { Badge } from "~/components/badge/badge";
import { HelpIcon, MoreVerticalIcon, ChevronUpIcon, ChevronDownIcon } from "~/components/icons/icons";

export interface Report {
  id: string;
  botVersion: string;
  policyVersion: string;
  created: string;
  status: "completed" | "processing" | "churned";
  overallReadiness?: number;
  pillarI?: number;
  pillarII?: number;
  asr?: number;
  asrTrend?: "up" | "down" | "neutral";
}

export interface ReportsTableProps {
  reports: Report[];
  onRowClick?: (report: Report) => void;
  className?: string;
}

const getStatusVariant = (status: string): "success" | "warning" | "neutral" => {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
      return "warning";
    default:
      return "neutral";
  }
};

const getPillarVariant = (score?: number): "success" | "warning" | "neutral" => {
  if (!score) return "neutral";
  if (score >= 4.0) return "success";
  if (score >= 3.0) return "warning";
  return "neutral";
};

export function ReportsTable({ reports, onRowClick, className = "" }: ReportsTableProps) {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"up" | "down">("up");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "up" ? "down" : "up");
    } else {
      setSortColumn(column);
      setSortDirection("up");
    }
  };

  return (
    <div className={`bg-white border border-[#e9eaeb] rounded-xl overflow-hidden ${className}`}>
      <div className="flex flex-col">
        {/* Header */}
        <div className="bg-white flex items-start border-b border-[#e9eaeb]">
          {/* Report ID */}
          <div className="flex flex-col w-[196px]">
            <div className="bg-white border-b border-[#e9eaeb] flex gap-3 h-11 items-center px-6 py-3">
              <div className="flex gap-1 items-center">
                <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Report ID</p>
                <button
                  onClick={() => handleSort("id")}
                  className="p-0 border-0 bg-transparent cursor-pointer"
                >
                  {sortColumn === "id" && sortDirection === "up" ? (
                    <ChevronUpIcon className="w-2.5 h-2.5" stroke="#535862" />
                  ) : (
                    <ChevronDownIcon className="w-2.5 h-2.5" stroke="#535862" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bot and Policy Version */}
          <div className="flex flex-col w-[196px]">
            <div className="bg-white border-b border-[#e9eaeb] flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Bot and Policy Version</p>
            </div>
          </div>

          {/* Created */}
          <div className="flex flex-col w-[116px]">
            <div className="bg-white border-b border-[#e9eaeb] flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Created</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <div className="bg-white border-b border-[#e9eaeb] flex gap-3 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Status</p>
            </div>
          </div>

          {/* Overall Readiness */}
          <div className="flex flex-col flex-1">
            <div className="bg-white border-b border-[#e9eaeb] flex gap-1 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Overall Readiness</p>
              <HelpIcon className="w-4 h-4" stroke="#A4A7AE" />
            </div>
          </div>

          {/* Pillar I */}
          <div className="flex flex-col">
            <div className="bg-white border-b border-[#e9eaeb] flex gap-1 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Pillar I</p>
              <HelpIcon className="w-4 h-4" stroke="#A4A7AE" />
            </div>
          </div>

          {/* Pillar II */}
          <div className="flex flex-col">
            <div className="bg-white border-b border-[#e9eaeb] flex gap-1 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-[#535862]">Pillar II</p>
              <HelpIcon className="w-4 h-4" stroke="#A4A7AE" />
            </div>
          </div>

          {/* ASR */}
          <div className="flex flex-col">
            <div className="bg-white border-b border-[#e9eaeb] flex gap-1 h-11 items-center px-6 py-3">
              <p className="font-medium text-[12px] leading-[18px] text-[#535862]">ASR</p>
              <HelpIcon className="w-4 h-4" stroke="#A4A7AE" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col flex-1">
            <div className="bg-white border-b border-[#e9eaeb] h-11 px-6 py-3" />
          </div>
        </div>

        {/* Rows */}
        {reports.map((report, index) => {
          const isEven = index % 2 === 0;
          const bgColor = isEven ? "bg-neutral-50" : "bg-white";

          return (
            <div
              key={report.id}
              className={`${bgColor} flex items-start border-b border-[#e9eaeb] cursor-pointer hover:bg-gray-100 transition-colors`}
              onClick={() => onRowClick?.(report)}
            >
              {/* Report ID */}
              <div className="w-[196px] flex gap-3 h-18 items-center px-6 py-4">
                <p className="font-medium text-[14px] leading-[20px] text-[#181d27]">{report.id}</p>
              </div>

              {/* Bot and Policy Version */}
              <div className="w-[196px] flex flex-col h-18 justify-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-[#181d27]">{report.botVersion}</p>
                <p className="font-normal text-[14px] leading-[20px] text-[#535862]">{report.policyVersion}</p>
              </div>

              {/* Created */}
              <div className="w-[116px] flex h-18 items-center px-6 py-4">
                <p className="font-normal text-[14px] leading-[20px] text-[#535862]">{report.created}</p>
              </div>

              {/* Status */}
              <div className="flex h-18 items-center px-6 py-4">
                <Badge variant={getStatusVariant(report.status)}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </Badge>
              </div>

              {/* Overall Readiness */}
              <div className="flex-1 flex gap-3 h-18 items-center px-6 py-4">
                {report.overallReadiness !== undefined ? (
                  <>
                    <div className="flex-1 h-2 relative rounded-lg bg-neutral-100 border border-[#32d583]">
                      <div
                        className="absolute h-2 bg-[#A6F4C5] border border-[#32d583] rounded-lg"
                        style={{ width: `${(report.overallReadiness / 5) * 100}%` }}
                      />
                    </div>
                    <p className="font-normal text-[14px] leading-[20px] text-[#535862] whitespace-nowrap">
                      {report.overallReadiness.toFixed(1)}
                    </p>
                  </>
                ) : (
                  <p className="font-normal text-[14px] leading-[20px] text-[#535862]">-</p>
                )}
              </div>

              {/* Pillar I */}
              <div className="flex h-18 items-center justify-center px-6 py-4">
                {report.pillarI !== undefined ? (
                  <Badge variant={getPillarVariant(report.pillarI)}>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {report.pillarI.toFixed(1)}
                      <span className="font-normal">/ 5</span>
                    </span>
                  </Badge>
                ) : (
                  <p className="font-normal text-[14px] leading-[20px] text-[#535862]">-</p>
                )}
              </div>

              {/* Pillar II */}
              <div className="flex h-18 items-center justify-center px-6 py-4">
                {report.pillarII !== undefined ? (
                  <Badge variant={getPillarVariant(report.pillarII)}>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {report.pillarII.toFixed(1)}
                      <span className="font-normal">/ 5</span>
                    </span>
                  </Badge>
                ) : (
                  <p className="font-normal text-[14px] leading-[20px] text-[#535862]">-</p>
                )}
              </div>

              {/* ASR */}
              <div className="flex h-18 items-center justify-center px-6 py-4">
                {report.asr !== undefined ? (
                  <Badge variant={report.asrTrend === "up" ? "success" : report.asrTrend === "down" ? "warning" : "neutral"}>
                    <span className="flex items-center gap-1">
                      {report.asrTrend === "up" && <ChevronDownIcon className="w-3 h-3 rotate-180" stroke="currentColor" />}
                      {report.asrTrend === "down" && <ChevronDownIcon className="w-3 h-3" stroke="currentColor" />}
                      {report.asr.toFixed(1)}%
                    </span>
                  </Badge>
                ) : (
                  <p className="font-normal text-[14px] leading-[20px] text-[#535862]">-</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex-1 flex gap-1 h-18 items-center justify-end px-4 py-4">
                <button
                  className="p-2.5 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle action
                  }}
                >
                  <MoreVerticalIcon className="w-5 h-5" stroke="#535862" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="border-t border-[#e9eaeb] flex items-center justify-between px-6 py-3">
        <div className="flex gap-3 items-start">
          <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
            <p className="font-semibold text-[14px] leading-[20px] text-[#d5d7da]">Previous</p>
          </button>
          <button className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
            <p className="font-semibold text-[14px] leading-[20px] text-[#535862]">Next</p>
          </button>
        </div>
        <p className="font-medium text-[14px] leading-[20px] text-[#414651]">Page 1 of 10</p>
      </div>
    </div>
  );
}

