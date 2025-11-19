import React from "react";
import { MaximizeIcon } from "~/components/icons/icons";

export interface ChartDataPoint {
  x: number;
  y: number;
}

export interface ConversationalStatisticsCardProps {
  title: string;
  subtitle: string;
  avgChatLength: number;
  avgMessageLength: number;
  chatLengthStatus: "success" | "warning";
  messageLengthStatus: "success" | "warning";
  chatLengthChartData?: ChartDataPoint[];
  messageLengthChartData?: ChartDataPoint[];
  onMaximizeClick?: () => void;
  className?: string;
}

export function ConversationalStatisticsCard({
  title,
  subtitle,
  avgChatLength,
  avgMessageLength,
  chatLengthStatus,
  messageLengthStatus,
  chatLengthChartData = [],
  messageLengthChartData = [],
  onMaximizeClick,
  className = "",
}: ConversationalStatisticsCardProps) {
  const statusColors = {
    success: { bg: "#d1fadf", icon: "✓" },
    warning: { bg: "#fef0c7", icon: "⚠" },
  };

  const chatStatusColor = statusColors[chatLengthStatus];
  const messageStatusColor = statusColors[messageLengthStatus];

  // Simple line chart component
  const SimpleLineChart = ({ data, width = 144, height = 108 }: { data: ChartDataPoint[]; width?: number; height?: number }) => {
    if (data.length === 0) {
      // Generate placeholder data
      const placeholderData = Array.from({ length: 6 }, (_, i) => ({
        x: i,
        y: Math.random() * 0.8 + 0.1,
      }));
      data = placeholderData;
    }

    const maxX = Math.max(...data.map(d => d.x));
    const maxY = Math.max(...data.map(d => d.y), 1);

    const points = data.map((d, i) => {
      const x = (d.x / maxX) * (width - 16) + 8;
      const y = height - 8 - (d.y / maxY) * (height - 16);
      return { x, y };
    });

    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
      <div className="relative" style={{ width, height }}>
        <svg width={width} height={height} className="absolute inset-0">
          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              x1="8"
              y1={8 + (i * (height - 16)) / 5}
              x2={width - 8}
              y2={8 + (i * (height - 16)) / 5}
              stroke="#E9EAEB"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={i}
              x1={8 + (i * (width - 16)) / 6}
              y1="8"
              x2={8 + (i * (width - 16)) / 6}
              y2={height - 8}
              stroke="#E9EAEB"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#1570EF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Area under curve */}
          <path
            d={`${pathData} L ${points[points.length - 1].x} ${height - 8} L 8 ${height - 8} Z`}
            fill="#1570EF"
            fillOpacity="0.1"
          />
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex items-start justify-between px-1 pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-[6px] leading-[normal] text-[#535862] font-normal text-center"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    );
  };

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
      <div className="flex gap-12 items-end w-full">
        {/* Left side: Numbers */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <p className="font-medium text-[36px] leading-[44px] tracking-[-0.72px] text-[#181d27]">
                {avgChatLength.toFixed(2)}
              </p>
              <div
                className="rounded-[12px] w-6 h-6 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: chatStatusColor.bg }}
              >
                {chatLengthStatus === "success" && (
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
                {chatLengthStatus === "warning" && (
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
            <div className="flex items-center gap-2.5">
              <p className="font-normal text-[14px] leading-[20px] text-[#535862]">
                {avgMessageLength.toFixed(1)}
              </p>
              <div
                className="rounded-[12px] w-4 h-4 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: messageStatusColor.bg }}
              >
                {messageLengthStatus === "success" && (
                  <svg
                    className="w-2 h-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="#039855"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                {messageLengthStatus === "warning" && (
                  <svg
                    className="w-2 h-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
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
          </div>
          <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
            Avg. Chat and Message Length
            <br />
            per Successful Attack
          </p>
        </div>

        {/* Right side: Charts */}
        <div className="flex gap-12 items-center">
          <div className="flex flex-col gap-2.5 items-center">
            <SimpleLineChart data={chatLengthChartData} />
            <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
              Chat Len. Distribution
            </p>
          </div>
          <div className="flex flex-col gap-2.5 items-center">
            <SimpleLineChart data={messageLengthChartData} />
            <p className="font-normal text-[12px] leading-[18px] text-[#535862]">
              Message Len. Distribution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

