import React from "react";

export interface RadialChartProps {
  rating: number; // Rating from 1 to 5
  size?: number; // Size of the chart in pixels
  className?: string;
}

export function RadialChart({ rating, size = 90, className = "" }: RadialChartProps) {
  // Clamp rating between 1 and 5
  const clampedRating = Math.max(1, Math.min(5, rating));
  
  // Calculate percentage (rating out of 5)
  const percentage = (clampedRating / 5) * 100;
  
  // SVG circle properties
  const center = size / 2;
  const radius = (size - 8) / 2; // Leave some padding
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Start from bottom (90 degrees = bottom)
  const rotation = 90;

  return (
    <div className={`relative inline-grid justify-items-start ${className}`} style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E9EAEB"
          strokeWidth="6"
        />
      </svg>
      
      {/* Progress circle */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#53B1FD"
          strokeWidth="6"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      
      {/* Rating text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-medium text-[30px] leading-[38px] text-[#181d27]">
          {clampedRating.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

