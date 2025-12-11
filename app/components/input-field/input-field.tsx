import React from "react";

export interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  type?: string;
}

export function InputField({
  label,
  value,
  placeholder = "",
  disabled = false,
  required = false,
  onChange,
  className = "",
  type = "text",
}: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-2 items-start relative ${className}`}>
      <p className="font-medium leading-6 text-theme-secondary text-base">
        {label}
        {required && <span className="font-bold text-[#d92d20] ml-1">*</span>}
      </p>
      <div className="flex flex-col gap-1.5 items-start relative w-[320px]">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className={`bg-theme-input border rounded-[8px] w-full px-[14px] py-[10px] font-normal leading-6 text-base tracking-[-0.32px] outline-none transition-colors ${
            disabled
              ? "bg-theme-muted border-theme-secondary text-theme-tertiary cursor-not-allowed"
              : "border-theme-secondary text-theme-primary hover:border-[var(--color-primary)] focus:border-[var(--color-primary)]"
          }`}
        />
      </div>
    </div>
  );
}
