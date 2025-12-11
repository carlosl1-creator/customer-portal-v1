import React from "react";

export interface BarData {
  label: string;
  value: number; // 0-100
  color: string;
  borderColor: string;
}

export interface BarChartProps {
  data: BarData[];
  className?: string;
}

export function BarChart({ data, className = "" }: BarChartProps) {
  return (
    <div className={`flex gap-4 items-center justify-end ${className}`}>
      {/* Legend */}
      <div className="flex flex-col gap-2.5 justify-center">
        {data.map((bar, index) => (
          <p
            key={index}
            className="font-normal text-[12px] leading-[18px] text-[#535862]"
          >
            {bar.label}
          </p>
        ))}
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-2.5 items-start relative">
        {data.map((bar, index) => (
          <div
            key={index}
            className="h-3 opacity-80"
            style={{
              width: `${bar.value}px`,
              backgroundColor: bar.color,
              border: `1px solid ${bar.borderColor}`,
            }}
          />
        ))}
        {/* X-axis labels */}
        <div className="absolute -bottom-5 left-0 right-0 flex items-center justify-between text-[4px] leading-[4px] text-[#535862] font-normal">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}

