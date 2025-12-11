import React, { useState, useRef, useEffect } from "react";
import { HashIcon, KebabMenuIcon } from "~/components/icons/icons";
import { RadialChart } from "~/components/charts/radial-chart/radial-chart";

export interface RatingCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  rating: number; // Rating from 1 to 5
  description: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
  className?: string;
}

export function RatingCard({
  icon,
  title,
  subtitle,
  rating,
  description,
  showMenu = true,
  onMenuClick,
  className = "",
}: RatingCardProps) {
  const defaultIcon = <HashIcon className="w-7 h-7" />;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className={`bg-theme-card border border-theme-primary rounded-[8px] flex flex-col gap-6 p-6 h-full ${className}`}
    >
      {/* Header section */}
      <div className="flex flex-col gap-2 w-full">
        {/* Title row with icon and menu */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 text-theme-primary">
            {icon || defaultIcon}
            <h3 className="font-medium text-[20px] leading-[28px]">
              {title}
            </h3>
          </div>
          
          {/* Menu button */}
          {showMenu && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex-shrink-0 p-2 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity text-theme-muted"
                aria-label="Menu"
              >
                <KebabMenuIcon className="w-1 h-4" />
              </button>
              
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-theme-card border border-theme-primary rounded-lg shadow-lg z-10 min-w-[200px]">
                  <div className="p-4">
                    <p className="text-[14px] text-theme-secondary">What should go here?</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Subtitle */}
        <p className="font-normal text-[16px] leading-[22px] text-theme-secondary">
          {subtitle}
        </p>
      </div>

      {/* Content section with chart and description */}
      <div className="flex gap-12 items-center justify-center w-full">
        {/* Radial chart */}
        <div className="flex-shrink-0">
          <RadialChart rating={rating} size={130} />
        </div>
        
        {/* Description text */}
        <p className="flex-1 font-normal text-[18px] leading-[26px] text-theme-secondary whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
}
