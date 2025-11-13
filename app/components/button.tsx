import React from "react";

interface ButtonProps {
  icon?: React.ReactNode;
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

export function Button({
  icon,
  text,
  variant = "primary",
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "box-border flex gap-2 items-center justify-center px-5 py-3 rounded-lg transition-colors";
  
  const primaryStyles =
    "bg-[#181d27] border border-[#181d27] text-white hover:opacity-90";
  
  const secondaryStyles =
    "bg-white border border-[#d5d7da] text-[#414651] hover:opacity-90";

  const styles =
    variant === "primary"
      ? `${baseStyles} ${primaryStyles}`
      : `${baseStyles} ${secondaryStyles}`;

  return (
    <button onClick={onClick} className={`${styles} ${className}`}>
      {icon && (
        <div className="shrink-0 w-5 h-5 flex items-center justify-center">
          {icon}
        </div>
      )}
      <span className="font-semibold text-base leading-6">{text}</span>
    </button>
  );
}

