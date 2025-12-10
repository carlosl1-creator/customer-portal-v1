import React from "react";

export type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info" | "active" | "draft" | "archive";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

// Theme-aware variant styles using CSS variables
const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-status-success text-status-success",
  warning: "bg-status-warning text-status-warning",
  danger: "bg-status-error text-status-error",
  neutral: "bg-[var(--color-badge-default-bg)] text-[var(--color-badge-default-text)]",
  info: "bg-status-info text-status-info",
  active: "bg-status-info text-[var(--color-primary)]",
  draft: "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
  archive: "bg-[var(--color-badge-default-bg)] text-[var(--color-badge-default-text)]",
};

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  const classes = variantClasses[variant];

  return (
    <div
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-2xl ${classes} ${className}`}
    >
      <p className="font-medium text-[12px] leading-[18px] text-center">
        {children}
      </p>
    </div>
  );
}
