import React from "react";

export interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 18, className = "" }: LoadingSpinnerProps) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1570ef"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
          fill="none"
        />
      </svg>
    </div>
  );
}

