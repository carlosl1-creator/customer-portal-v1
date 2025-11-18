import React from "react";

export type BadgeVariant = "success" | "warning" | "neutral" | "info" | "active" | "draft" | "archive";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: "#ECFDF3", text: "#027A48" },
  warning: { bg: "#FFFAEB", text: "#B54708" },
  neutral: { bg: "#F5F5F5", text: "#414651" },
  info: { bg: "#EFF8FF", text: "#1570EF" },
  active: { bg: "#EFF8FF", text: "#175CD3" },
  draft: { bg: "#F4F3FF", text: "#5925DC" },
  archive: { bg: "#F5F5F5", text: "#414651" },
};

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-2xl ${className}`}
      style={{ backgroundColor: styles.bg }}
    >
      <p className="font-medium text-[12px] leading-[18px] text-center" style={{ color: styles.text }}>
        {children}
      </p>
    </div>
  );
}

