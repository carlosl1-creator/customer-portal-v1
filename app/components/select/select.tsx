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
      <p className="font-medium leading-6 text-theme-secondary text-base">
        {label} {required && <span className="font-bold text-[var(--color-error)]">*</span>}
      </p>
      <div className="flex flex-col gap-1.5 items-start relative w-[320px]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-theme-input border rounded-[8px] w-full flex gap-2 items-center px-[14px] py-[10px] transition-colors ${
            isOpen
              ? "border-[var(--color-primary)]"
              : "border-theme-secondary"
          }`}
        >
          <p
            className={`flex-1 font-normal leading-6 text-base tracking-[-0.32px] text-left ${
              isSelected ? "text-theme-primary" : "text-theme-tertiary"
            }`}
          >
            {displayText}
          </p>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            stroke={isOpen ? "var(--color-primary)" : "var(--color-text-secondary)"}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-theme-card border border-theme-primary rounded-[8px] shadow-lg z-50 max-h-[240px] overflow-y-auto scrollbar-theme">
            {options.map((option) => {
              const isOptionSelected = selectedValue === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-[14px] py-[10px] text-left hover:bg-theme-hover transition-colors flex items-center gap-2 ${
                    isOptionSelected ? "bg-[var(--color-primary-light)]" : ""
                  }`}
                >
                  <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                    {isOptionSelected && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="var(--color-primary)"
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
                      isOptionSelected ? "text-[var(--color-primary)]" : "text-theme-primary"
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
