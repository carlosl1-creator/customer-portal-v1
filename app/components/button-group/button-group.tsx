import React from "react";

export interface ButtonGroupOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface ButtonGroupProps {
  options: ButtonGroupOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ButtonGroup({
  options,
  value,
  onChange,
  className = "",
}: ButtonGroupProps) {
  return (
    <div
      className={`border border-theme-secondary relative rounded-[8px] overflow-hidden ${className}`}
    >
      <div className="flex items-start overflow-hidden relative rounded-[inherit]">
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const isLast = index === options.length - 1;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`box-border flex gap-[8px] items-center justify-center px-4 py-[10px] relative transition-colors cursor-pointer border-0 ${
                isSelected
                  ? "bg-[var(--color-primary-light)]"
                  : "bg-theme-card hover:bg-theme-hover"
              } ${!isLast ? "border-r border-theme-secondary" : ""}`}
            >
              {option.icon && (
                <div className="shrink-0 w-5 h-5 flex items-center justify-center text-theme-tertiary">
                  {option.icon}
                </div>
              )}
              {isSelected && (
                <div className="w-2 h-2 rounded-full shrink-0 bg-[var(--color-primary)]" />
              )}
              <p
                className={`leading-5 text-sm ${
                  isSelected
                    ? "font-medium text-[var(--color-primary)]"
                    : "font-normal text-theme-secondary"
                }`}
              >
                {option.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
