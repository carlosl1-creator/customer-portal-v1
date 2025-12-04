import React from "react";

export interface HeaderButton {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

interface HeaderSectionProps {
  pageName: string;
  title: string;
  infoText: string[];
  buttons: HeaderButton[];
  viewAllReportsButton?: {
    text: string;
    icon: React.ReactNode;
    onClick?: () => void;
  };
}

export function HeaderSection({
  pageName,
  title,
  infoText,
  buttons,
  viewAllReportsButton,
}: HeaderSectionProps) {
  return (
    <div className="flex flex-col gap-6 items-start w-full">
      <div className="flex flex-col gap-4 items-start px-10 pt-8 w-full relative">
        {/* Title Section */}
        <div className="flex flex-col gap-6 items-start justify-center w-full">
          {/* Page Name */}
          <p className="font-normal leading-6 text-[var(--color-primary)] text-base uppercase">
            {pageName}
          </p>

          {/* Text and supporting texts */}
          <div className="flex flex-col gap-4 items-start w-full">
            {/* Title */}
            <p className="font-semibold leading-[38px] text-theme-primary text-[30px] w-full">
              {title}
            </p>

            {/* Supporting Texts */}
            <div className="flex flex-col gap-1 items-start text-theme-secondary w-full">
              {infoText.map((text, index) => (
                <p key={index} className="font-normal leading-6 text-base w-full">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 items-start w-full">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className="bg-theme-card border border-theme-secondary rounded-[8px] flex gap-[8px] items-center justify-center px-[18px] py-[10px] transition-colors duration-200 hover:bg-theme-hover cursor-pointer"
            >
              <div className="shrink-0 w-6 h-6 flex items-center justify-center text-theme-secondary">
                {button.icon}
              </div>
              <span className="font-medium leading-[24px] text-theme-secondary text-[16px]">
                {button.text}
              </span>
            </button>
          ))}
        </div>

        {/* View All Reports Button (positioned absolutely on the right) */}
        {viewAllReportsButton && (
          <button
            onClick={viewAllReportsButton.onClick}
            className="absolute right-10 top-8 flex gap-2 items-center justify-center hover:opacity-70 transition-opacity bg-transparent border-0 cursor-pointer"
          >
            <div className="shrink-0 w-5 h-5 flex items-center justify-center text-theme-secondary">
              {viewAllReportsButton.icon}
            </div>
            <span className="font-semibold leading-6 text-theme-secondary text-base">
              {viewAllReportsButton.text}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
