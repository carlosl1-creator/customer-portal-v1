import React from "react";

export interface SettingsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

export function SettingsCheckbox({
  checked,
  onChange,
  label,
  className = "",
}: SettingsCheckboxProps) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex items-center justify-center relative shrink-0 cursor-pointer"
      >
        <div
          className={`border rounded-[4px] shrink-0 size-4 transition-colors ${
            checked
              ? "bg-[#eff8ff] border-[#2e90fa]"
              : "bg-white border-[#d5d7da]"
          }`}
        >
          {checked && (
            <div className="overflow-hidden relative rounded-[inherit] size-4">
              <div className="absolute inset-[12.5%] overflow-hidden">
                <svg
                  className="absolute w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="#2e90fa"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </button>
      <p className="font-medium leading-6 text-[#535862] text-base">{label}</p>
    </div>
  );
}

