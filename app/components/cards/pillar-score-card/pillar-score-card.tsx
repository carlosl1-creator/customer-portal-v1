import React from "react";
import { LockIcon, MaximizeIcon } from "~/components/icons/icons";

export interface BarData {
  label: string;
  value: number; // 0-100
  color: string;
  borderColor: string;
}

export interface PillarScoreCardProps {
  title: string;
  subtitle: string;
  score: number; // Score out of 5
  status: "success" | "warning" | "locked";
  barData?: BarData[];
  isLocked?: boolean;
  lockedMessage?: string;
  onLearnMore?: () => void;
  onMaximizeClick?: () => void;
  className?: string;
}

export function PillarScoreCard({
  title,
  subtitle,
  score,
  status,
  barData = [],
  isLocked = false,
  lockedMessage,
  onLearnMore,
  onMaximizeClick,
  className = "",
}: PillarScoreCardProps) {
  const statusColors = {
    success: { bg: "#d1fadf", icon: "✓" },
    warning: { bg: "#fef0c7", icon: "⚠" },
    locked: { bg: "#e9eaeb", icon: "🔒" },
  };

  const statusColor = statusColors[status];

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
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-[16px] leading-[24px] text-[#181d27]">
            {title}
          </h3>
          {isLocked && (
            <LockIcon className="w-4 h-4" stroke="#535862" />
          )}
        </div>
        <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
          {subtitle}
        </p>
      </div>

      {/* Body */}
      {isLocked ? (
        <div className="flex flex-1 flex-col items-end justify-between">
          <p className="font-normal text-[14px] leading-[20px] text-[#535862] whitespace-pre-wrap w-full">
            {lockedMessage || "Pillar III scores are coming Quarter 2026 and provide additional insights about model biases. Stay tuned!"}
          </p>
          {onLearnMore && (
            <button
              onClick={onLearnMore}
              className="flex items-center gap-2 p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity mt-4"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#535862"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
              <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
                Learn More
              </p>
            </button>
          )}
        </div>
      ) : (
        <div className="flex gap-4 items-end w-full">
          {/* Score and status icon */}
          <div className="flex gap-4 items-end">
            <div className="flex items-end">
              <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-[#181d27]">
                {score.toFixed(1)}
              </p>
              <span className="font-normal text-[30px] leading-[38px] text-[#717680] ml-1">
                {" / 5"}
              </span>
            </div>
            <div
              className="rounded-[12px] w-6 h-6 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: statusColor.bg }}
            >
              {status === "success" && (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="#039855"
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
                  stroke="#dc6803"
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

          {/* Bar chart */}
          {barData.length > 0 && (
            <div className="flex flex-1 gap-4 items-center justify-end">
              {/* Legend */}
              <div className="flex flex-col gap-2.5 justify-center">
                {barData.map((bar, index) => (
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
                {barData.map((bar, index) => (
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
          )}
        </div>
      )}
    </div>
  );
}

