import React from "react";
import { HashIcon, HelpIcon } from "~/components/icons/icons";
import { RadialChart } from "~/components/charts/radial-chart/radial-chart";

export interface RatingCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  rating: number; // Rating from 1 to 5
  description: string;
  onHelpClick?: () => void;
  className?: string;
}

export function RatingCard({
  icon,
  title,
  subtitle,
  rating,
  description,
  onHelpClick,
  className = "",
}: RatingCardProps) {
  const defaultIcon = <HashIcon className="w-5 h-5" />;

  return (
    <div
      className={`bg-theme-card border border-theme-primary rounded-[8px] flex flex-col gap-6 p-6 h-full ${className}`}
    >
      {/* Header section */}
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {/* Title row with icon */}
          <div className="flex items-center gap-2.5 text-theme-primary">
            {icon || defaultIcon}
            <h3 className="font-medium text-[16px] leading-[24px]">
              {title}
            </h3>
          </div>
          
          {/* Subtitle row with help icon */}
          <div className="flex items-start gap-2 w-full">
            <p className="font-normal text-[12px] leading-[18px] text-theme-secondary flex-1">
              {subtitle}
            </p>
            <button
              onClick={onHelpClick}
              className="flex-shrink-0 p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity text-theme-muted"
              aria-label="Help"
            >
              <HelpIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content section with chart and description */}
      <div className="flex gap-12 items-center justify-center w-full">
        {/* Radial chart */}
        <div className="flex-shrink-0">
          <RadialChart rating={rating} size={90} />
        </div>
        
        {/* Description text */}
        <p className="flex-1 font-normal text-[14px] leading-[20px] text-theme-secondary whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
}
