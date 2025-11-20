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
              className={`box-border flex gap-[8px] items-center justify-center px-4 py-[10px] relative transition-colors ${
                isSelected
                  ? "bg-[#eff8ff]"
                  : "bg-white hover:bg-[#f5f5f5]"
              } ${!isLast ? "border-r border-[#d5d7da]" : ""}`}
              style={
                isSelected
                  ? { backgroundColor: "#EFF8FF" }
                  : undefined
              }
            >
              {option.icon && (
                <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                  {option.icon}
                </div>
              )}
              {isSelected && (
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#2E90FA" }} />
              )}
              <p
                className={`leading-5 text-sm ${
                  isSelected
                    ? "font-medium text-[#175cd3]"
                    : "font-normal text-[#414651]"
                }`}
                style={
                  isSelected
                    ? { color: "#175CD3" }
                    : undefined
                }
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

