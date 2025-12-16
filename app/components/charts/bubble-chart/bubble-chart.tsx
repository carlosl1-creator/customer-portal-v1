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

  // Size constraints
  const minSize = 48;
  const maxSize = 96;
  const minFontSize = 12;
  const maxFontSize = 18;

  // Find max value for proportional scaling
  const maxValue = Math.max(...sortedBubbles.map((b) => b.percentage));

  // Calculate size proportionally: largest gets maxSize, others scale proportionally
  const getSize = (percentage: number) => {
    if (maxValue === 0) return minSize;

    // Size is proportional to value (largest = maxSize)
    const proportionalSize = (percentage / maxValue) * maxSize;

    // Clamp to min/max bounds
    return Math.max(minSize, Math.min(maxSize, proportionalSize));
  };

  // Calculate font size proportionally to bubble size
  const getFontSize = (bubbleSize: number) => {
    const ratio = (bubbleSize - minSize) / (maxSize - minSize);
    return minFontSize + ratio * (maxFontSize - minFontSize);
  };

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {sortedBubbles.map((bubble, index) => {
        const size = getSize(bubble.percentage);
        const fontSize = getFontSize(size);
        return (
          <div
            key={index}
            className="flex items-center justify-center rounded-full font-normal text-[#181d27]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: bubble.color,
              fontSize: `${fontSize}px`,
              lineHeight: `${fontSize * 1.5}px`,
            }}
          >
            {bubble.percentage}%
          </div>
        );
      })}
    </div>
  );
}

