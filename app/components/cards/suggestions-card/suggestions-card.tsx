import React from "react";
import { ArrowUpRightIcon } from "~/components/icons/icons";

export interface Suggestion {
  title: string;
  description: string;
  onClick?: () => void;
}

export interface SuggestionsCardProps {
  suggestions: Suggestion[];
  className?: string;
}

export function SuggestionsCard({ suggestions, className = "" }: SuggestionsCardProps) {
  return (
    <div
      className={`backdrop-blur backdrop-filter bg-[rgba(255,255,255,0.2)] border border-[#e9eaeb] box-border flex flex-col gap-6 items-start px-12 py-9 relative rounded-[12px] shrink-0 ${className}`}
    >
      <p className="font-medium leading-6 text-[#535862] text-base">Suggestions</p>
      <div className="flex flex-col gap-8 items-start relative shrink-0 w-full">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 items-start relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity"
            onClick={suggestion.onClick}
          >
            <div className="flex gap-2 items-center justify-center relative shrink-0">
              <p className="font-medium leading-5 text-[#181d27] text-sm">{suggestion.title}</p>
              <ArrowUpRightIcon className="w-[18px] h-[18px]" stroke="#181d27" />
            </div>
            <p className="font-normal leading-[18px] text-[#535862] text-[12px]">
              {suggestion.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

