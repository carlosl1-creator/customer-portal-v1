import React from "react";
import { HelpIcon, MaximizeIcon } from "~/components/icons/icons";

export interface RadarDataPoint {
  label: string;
  value: number; // 0-100
}

export interface RadarSeries {
  label: string;
  color: string;
  data: RadarDataPoint[];
}

export interface FoundVulnerabilitiesCardProps {
  title: string;
  subtitle: string;
  identifiedCount: number;
  unweightedASR: number; // Percentage
  weightedASR: number; // Percentage
  status: "success" | "warning";
  radarData?: RadarSeries[];
  onMaximizeClick?: () => void;
  onHelpClick?: () => void;
  className?: string;
}

export function FoundVulnerabilitiesCard({
  title,
  subtitle,
  identifiedCount,
  unweightedASR,
  weightedASR,
  status,
  radarData = [],
  onMaximizeClick,
  onHelpClick,
  className = "",
}: FoundVulnerabilitiesCardProps) {
  const statusColor = status === "success" ? "#d1fadf" : "#fef0c7";
  const statusIconColor = status === "success" ? "#039855" : "#dc6803";

  return (
    <div
      className={`bg-white border border-[#e9eaeb] rounded-[8px] flex flex-col gap-6 p-6 h-full relative ${className}`}
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

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-[16px] leading-[24px] text-[#181d27]">
          {title}
        </h3>
        <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
          {subtitle}
        </p>
      </div>

      {/* Body */}
      <div className="flex gap-9 items-end w-full">
        {/* Left side: Numbers */}
        <div className="flex gap-6 items-end">
          {/* Main number */}
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-[#181d27]">
                {identifiedCount}
              </p>
              <div
                className="rounded-[12px] w-6 h-6 flex items-center justify-center flex-shrink-0 mb-2"
                style={{ backgroundColor: statusColor }}
              >
                {status === "success" && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke={statusIconColor}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                {status === "warning" && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke={statusIconColor}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
              Identified
            </p>
          </div>

          {/* ASR percentages */}
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <p className="font-normal text-[24px] leading-[32px] text-[#535862]">
                {unweightedASR.toFixed(1)}%
              </p>
              <div className="flex items-center gap-1.5 pb-1">
                <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                  Unweighted ASR
                </p>
                <button
                  onClick={onHelpClick}
                  className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="Help"
                >
                  <HelpIcon className="w-4 h-4" stroke="#A4A7AE" />
                </button>
              </div>
            </div>
            <div className="flex items-end gap-3">
              <p className="font-normal text-[24px] leading-[32px] text-[#535862]">
                {weightedASR.toFixed(1)}%
              </p>
              <div className="flex items-center gap-1.5 pb-1">
                <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                  Weighted ASR
                </p>
                <button
                  onClick={onHelpClick}
                  className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="Help"
                >
                  <HelpIcon className="w-4 h-4" stroke="#A4A7AE" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Radar chart placeholder */}
        {radarData.length > 0 && (
          <div className="flex flex-1 gap-[18px] items-center justify-end">
            {/* Radar chart placeholder - simplified version */}
            <div className="relative w-[148px] h-[108px] flex items-center justify-center">
              <svg
                width="148"
                height="108"
                viewBox="0 0 148 108"
                className="absolute inset-0"
              >
                {/* Grid circles */}
                <circle cx="74" cy="54" r="20" fill="none" stroke="#E9EAEB" strokeWidth="0.5" />
                <circle cx="74" cy="54" r="35" fill="none" stroke="#E9EAEB" strokeWidth="0.5" />
                <circle cx="74" cy="54" r="50" fill="none" stroke="#E9EAEB" strokeWidth="0.5" />
                
                {/* Axis lines */}
                <line x1="74" y1="4" x2="74" y2="104" stroke="#E9EAEB" strokeWidth="0.5" />
                <line x1="24" y1="54" x2="124" y2="54" stroke="#E9EAEB" strokeWidth="0.5" />
                
                {/* Placeholder for radar data - simplified */}
                {radarData.map((series, seriesIndex) => {
                  const points = series.data.map((point, pointIndex) => {
                    const angle = (pointIndex * 2 * Math.PI) / series.data.length - Math.PI / 2;
                    const radius = (point.value / 100) * 50;
                    const x = 74 + radius * Math.cos(angle);
                    const y = 54 + radius * Math.sin(angle);
                    return { x, y };
                  });
                  
                  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
                  
                  return (
                    <path
                      key={seriesIndex}
                      d={pathData}
                      fill={series.color}
                      fillOpacity="0.3"
                      stroke={series.color}
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
              
              {/* Labels */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[6px] leading-[9px] text-[#717680] font-normal text-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2">Violence</div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2">Self-Harm</div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">Hate Speech</div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">Illegal Activities</div>
                  <div className="absolute top-1/4 right-1/4">Others</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-0.5 justify-center">
              {radarData.map((series, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 py-0.5"
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: series.color }}
                  />
                  <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                    {series.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

