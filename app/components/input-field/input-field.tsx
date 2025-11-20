import React from "react";

export interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export function InputField({
  label,
  value,
  placeholder = "",
  disabled = false,
  onChange,
  className = "",
}: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-2 items-start relative ${className}`}>
      <p className="font-medium leading-6 text-[#535862] text-base">{label}</p>
      <div className="flex flex-col gap-1.5 items-start relative w-[320px]">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className={`bg-white border rounded-[8px] w-full px-[14px] py-[10px] font-normal leading-6 text-base tracking-[-0.32px] outline-none transition-colors ${
            disabled
              ? "bg-[#fafafa] border-[#d5d7da] text-[#717680] cursor-not-allowed"
              : "border-[#d5d7da] text-[#181d27] hover:border-[#1570ef] focus:border-[#1570ef]"
          }`}
        />
      </div>
    </div>
  );
}

