import React from "react";

export type DotBadgeVariant = "success" | "warning" | "danger" | "info";

export interface DotBadgeProps {
  children: React.ReactNode;
  variant?: DotBadgeVariant;
  className?: string;
}

const VARIANT_STYLES: Record<DotBadgeVariant, { bg: string; dot: string; text: string }> = {
  danger: {
    bg: "bg-[#FEF3F2]",
    dot: "bg-[#F04438]",
    text: "text-[#B42318]",
  },
  warning: {
    bg: "bg-[#FFFAEB]",
    dot: "bg-[#F79009]",
    text: "text-[#B54708]",
  },
  success: {
    bg: "bg-[#ECFDF3]",
    dot: "bg-[#12B76A]",
    text: "text-[#027A48]",
  },
  info: {
    bg: "bg-[#EFF8FF]",
    dot: "bg-[#2E90FA]",
    text: "text-[#175CD3]",
  },
};

export function DotBadge({ children, variant = "info", className = "" }: DotBadgeProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className={`inline-flex items-center gap-1.5 pl-1.5 pr-2 py-0.5 rounded-2xl ${styles.bg} ${className}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      <span className={`font-medium text-[12px] leading-[18px] ${styles.text}`}>
        {children}
      </span>
    </div>
  );
}

