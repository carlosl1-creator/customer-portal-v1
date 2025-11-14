import React from "react";

export interface BubbleData {
  percentage: number;
  color: string;
}

export interface BubbleChartProps {
  bubbles: BubbleData[];
  className?: string;
}

export function BubbleChart({ bubbles, className = "" }: BubbleChartProps) {
  // Sort bubbles by percentage (largest first) and limit to 4
  const sortedBubbles = [...bubbles]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);

  // Calculate sizes based on percentage (min 40px, max 96px)
  const getSize = (percentage: number) => {
    const minSize = 40;
    const maxSize = 96;
    return minSize + (percentage / 100) * (maxSize - minSize);
  };

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {sortedBubbles.map((bubble, index) => {
        const size = getSize(bubble.percentage);
        return (
          <div
            key={index}
            className="flex items-center justify-center rounded-full font-normal text-[12px] leading-[18px] text-[#181d27]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: bubble.color,
            }}
          >
            {bubble.percentage}%
          </div>
        );
      })}
    </div>
  );
}

