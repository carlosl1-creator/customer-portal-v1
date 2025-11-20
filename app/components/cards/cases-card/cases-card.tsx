import React from "react";
import { MaximizeIcon } from "~/components/icons/icons";
import { BubbleChart } from "~/components/charts/bubble-chart/bubble-chart";

export interface Scenario {
  label: string;
  percentage: number;
  color: string;
}

export interface CasesCardProps {
  title: string;
  subtitle: string;
  totalCases: number;
  scenarios: Scenario[];
  onMaximizeClick?: () => void;
  className?: string;
}

export function CasesCard({
  title,
  subtitle,
  totalCases,
  scenarios,
  onMaximizeClick,
  className = "",
}: CasesCardProps) {
  // Format number with commas
  const formattedTotal = totalCases.toLocaleString('en-US');

  // Prepare bubble data from scenarios
  const bubbleData = scenarios.map((scenario) => ({
    percentage: scenario.percentage,
    color: scenario.color,
  }));

  return (
    <div
      className={`bg-white border border-[#e9eaeb] rounded-[8px] flex flex-col gap-6 p-6 h-full relative min-h-[220px] max-h-[224px] ${className}`}
    >
      {/* Maximize button */}
      {onMaximizeClick && (
        <button
          onClick={onMaximizeClick}
          className="absolute top-4 right-4 p-2 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Maximize"
        >
          <MaximizeIcon className="w-5 h-5" stroke="#535862" />
        </button>
      )}

      {/* Title and subtitle */}
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-[16px] leading-[24px] text-[#181d27]">
          {title}
        </h3>
        <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
          {subtitle}
        </p>
      </div>

      {/* Body: Number, bubbles, and legend */}
      <div className="flex gap-4 items-center w-full flex-1">
        {/* Number and label */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-[#181d27]">
            {formattedTotal}
          </p>
          <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
            Generated
          </p>
        </div>

        {/* Bubbles and legend */}
        <div className="flex flex-1 items-center justify-center gap-4">
          {/* Bubble chart */}
          <BubbleChart bubbles={bubbleData} />

          {/* Legend */}
          <div className="flex flex-col gap-0.5 justify-center">
            {scenarios.map((scenario, index) => (
              <div
                key={index}
                className="flex items-center gap-1 py-0.5"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: scenario.color }}
                />
                <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                  {scenario.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

