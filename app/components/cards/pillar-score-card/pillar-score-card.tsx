import React from "react";
import { CheckIcon, LockIcon, WarningIcon } from "~/components/icons/icons";

// ============================================================================
// Types
// ============================================================================

export type PillarStatus = "success" | "warning" | "locked";

export interface BarData {
  label: string;
  value: number; // 0-100
  color: string;
  borderColor: string;
}

export interface PillarScoreCardProps {
  title: string;
  subtitle: string;
  score: number;
  status: PillarStatus;
  barData?: BarData[];
  isLocked?: boolean;
  lockedMessage?: string;
  className?: string;
}

// ============================================================================
// Constants
// ============================================================================

const STATUS_STYLES: Record<PillarStatus, { bg: string; stroke: string }> = {
  success: { bg: "var(--color-success-bg)", stroke: "var(--color-success-text)" },
  warning: { bg: "var(--color-warning-bg)", stroke: "var(--color-warning-text)" },
  locked: { bg: "var(--color-badge-default-bg)", stroke: "var(--color-text-muted)" },
};

const DEFAULT_LOCKED_MESSAGE =
  "Pillar III scores are coming Quarter 2026 and provide additional insights about model biases. Stay tuned!";

// ============================================================================
// Sub-components
// ============================================================================

function CardHeader({
  title,
  subtitle,
  isLocked = false,
}: {
  title: string;
  subtitle: string;
  isLocked?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h3 className="font-medium text-[20px] leading-[28px] text-theme-primary">
          {title}
        </h3>
        {isLocked && <LockIcon className="w-5 h-5 text-theme-secondary" />}
      </div>
      <p className="font-normal text-[16px] leading-[22px] text-theme-secondary">
        {subtitle}
      </p>
    </div>
  );
}

function StatusIcon({ status }: { status: PillarStatus }) {
  const { bg, stroke } = STATUS_STYLES[status];

  if (status === "locked") return null;

  const Icon = status === "success" ? CheckIcon : WarningIcon;

  return (
    <div
      className="rounded-[16px] w-10 h-10 flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: bg }}
    >
      <Icon className="w-5 h-5" stroke={stroke} />
    </div>
  );
}

function ScoreDisplay({ score, status }: { score: number; status: PillarStatus }) {
  return (
    <div className="flex gap-4 items-end">
      <div className="flex items-end">
        <p className="font-medium text-[52px] leading-[60px] tracking-[-1px] text-theme-primary">
          {score.toFixed(1)}
        </p>
        <span className="font-normal text-[44px] leading-[52px] text-theme-tertiary ml-1">
          {" / 5"}
        </span>
      </div>
      <StatusIcon status={status} />
    </div>
  );
}

function BarChart({ data }: { data: BarData[] }) {
  if (data.length === 0) return null;

  return (
    <div className="flex flex-1 gap-5 items-center justify-end">
      <div className="flex flex-col gap-4 justify-center">
        {data.map((bar, index) => (
          <p
            key={index}
            className="font-normal text-[16px] leading-[22px] text-theme-secondary"
          >
            {bar.label}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-4 items-start relative">
        {data.map((bar, index) => (
          <div
            key={index}
            className="h-5 opacity-80"
            style={{
              width: `${bar.value}px`,
              backgroundColor: bar.color,
              border: `1px solid ${bar.borderColor}`,
            }}
          />
        ))}
        <div className="absolute -bottom-5 left-0 right-0 flex items-center justify-between text-[11px] leading-[11px] text-theme-secondary font-normal">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}

function LockedContent({ message }: { message?: string }) {
  return (
    <div className="flex flex-1 flex-col items-end justify-between">
      <p className="font-normal text-[14px] leading-[20px] text-theme-secondary whitespace-pre-wrap w-full">
        {message || DEFAULT_LOCKED_MESSAGE}
      </p>
    </div>
  );
}

function ActiveContent({
  score,
  status,
  barData,
}: {
  score: number;
  status: PillarStatus;
  barData: BarData[];
}) {
  return (
    <div className="flex gap-4 items-end w-full">
      <ScoreDisplay score={score} status={status} />
      <BarChart data={barData} />
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function PillarScoreCard({
  title,
  subtitle,
  score,
  status,
  barData = [],
  isLocked = false,
  lockedMessage,
  className = "",
}: PillarScoreCardProps) {
  return (
    <div
      className={`bg-theme-card border border-theme-primary rounded-[8px] flex flex-col gap-6 p-6 h-full relative ${className}`}
    >
      <CardHeader title={title} subtitle={subtitle} isLocked={isLocked} />

      {isLocked ? (
        <LockedContent message={lockedMessage} />
      ) : (
        <ActiveContent score={score} status={status} barData={barData} />
      )}
    </div>
  );
}
