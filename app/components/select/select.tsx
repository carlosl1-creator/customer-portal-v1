import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "~/components/icons/icons";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label: string;
  required?: boolean;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({
  label,
  required = false,
  options,
  value,
  placeholder = "Select...",
  onChange,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const isSelected = selectedValue !== "";

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  return (
    <div className={`flex flex-col gap-2 items-start relative ${className}`} ref={selectRef}>
      <p className="font-medium leading-6 text-[#535862] text-base">
        {label} {required && <span className="font-bold text-[#d92d20]">*</span>}
      </p>
      <div className="flex flex-col gap-1.5 items-start relative w-[320px]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`backdrop-blur backdrop-filter bg-[rgba(255,255,255,0.8)] border rounded-[8px] w-full flex gap-2 items-center px-[14px] py-[10px] transition-colors ${
            isOpen
              ? "border-[#1570ef]"
              : isSelected
              ? "border-[#d5d7da]"
              : "border-[#d5d7da]"
          }`}
        >
          <p
            className={`flex-1 font-normal leading-6 text-base tracking-[-0.32px] text-left ${
              isSelected ? "text-[#181d27]" : "text-[#717680]"
            }`}
          >
            {displayText}
          </p>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            stroke={isOpen ? "#1570ef" : "#535862"}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e9eaeb] rounded-[8px] shadow-lg z-50 max-h-[240px] overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-[14px] py-[10px] text-left hover:bg-[#f5f5f5] transition-colors flex items-center gap-2 ${
                    isSelected ? "bg-[#eff8ff]" : ""
                  }`}
                >
                  <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                    {isSelected && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="#1570ef"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </div>
                  <p
                    className={`font-normal leading-6 text-base flex-1 ${
                      isSelected ? "text-[#1570ef]" : "text-[#181d27]"
                    }`}
                  >
                    {option.label}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

