import React from "react";

interface ButtonProps {
  icon?: React.ReactNode;
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  icon,
  text,
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "box-border flex gap-2 items-center justify-center px-5 py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const primaryStyles =
    "bg-[var(--color-primary)] border border-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)]";
  
  const secondaryStyles =
    "bg-theme-card border border-theme-primary text-theme-secondary hover:bg-theme-hover";

  const styles =
    variant === "primary"
      ? `${baseStyles} ${primaryStyles}`
      : `${baseStyles} ${secondaryStyles}`;

  return (
    <button 
      onClick={onClick} 
      className={`${styles} ${className}`}
      disabled={disabled}
      type={type}
    >
      {icon && (
        <div className="shrink-0 w-5 h-5 flex items-center justify-center">
          {icon}
        </div>
      )}
      <span className="font-semibold text-base leading-6">{text}</span>
    </button>
  );
}
