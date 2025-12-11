import React from "react";
import { LoadingSpinner } from "~/components/loading/loading-spinner/loading-spinner";

export type StepStatus = "completed" | "in-progress" | "pending";

export interface LoadingStep {
  title: string;
  description: string;
  status: StepStatus;
}

export interface LoadingStepCardProps {
  steps: LoadingStep[];
  className?: string;
}

export function LoadingStepCard({ steps, className = "" }: LoadingStepCardProps) {
  return (
    <div
      className={`backdrop-blur backdrop-filter bg-[var(--color-bg-overlay)] border border-theme-primary box-border flex flex-col gap-6 items-start px-12 py-9 relative rounded-[12px] shrink-0 ${className}`}
      style={{ backgroundColor: 'rgba(var(--color-bg-card), 0.2)' }}
    >
      {steps.map((step, index) => (
        <div key={index} className="flex gap-2.5 items-start relative shrink-0 w-full">
          {/* Icon/Spinner */}
          <div className="flex items-center justify-center relative shrink-0" style={{ width: 24, height: 24 }}>
            {step.status === "completed" ? (
              <div className="bg-status-success rounded-xl flex items-center justify-center shrink-0" style={{ width: 24, height: 24 }}>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="var(--color-success-text)"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            ) : step.status === "in-progress" ? (
              <LoadingSpinner size={18} />
            ) : (
              <div className="shrink-0" style={{ width: 24, height: 24 }} />
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1 items-start relative shrink-0 flex-1">
            <p
              className={`font-medium leading-6 text-base ${
                step.status === "in-progress" ? "text-theme-primary" : "text-theme-secondary"
              }`}
            >
              {step.title}
            </p>
            <p className="font-normal leading-[18px] text-theme-secondary text-[12px]">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
