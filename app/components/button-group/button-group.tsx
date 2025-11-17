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
      className={`border border-[#d5d7da] relative rounded-[8px] overflow-hidden ${className}`}
    >
      <div className="flex items-start overflow-hidden relative rounded-[inherit]">
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const isFirst = index === 0;
          const isLast = index === options.length - 1;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`box-border flex gap-2 items-center justify-center px-4 py-3 relative transition-colors ${
                isSelected
                  ? "bg-[#fafafa]"
                  : "bg-white hover:bg-[#f5f5f5]"
              } ${!isLast ? "border-r border-[#d5d7da]" : ""}`}
            >
              {option.icon && (
                <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                  {option.icon}
                </div>
              )}
              <p
                className={`leading-5 text-sm tracking-[-0.28px] ${
                  isSelected
                    ? "font-semibold text-[#414651]"
                    : "font-normal text-[#717680]"
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

