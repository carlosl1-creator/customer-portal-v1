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
      <div className="flex flex-col gap-4 items-start px-8 w-full relative">
        {/* Title Section */}
        <div className="flex flex-col gap-6 items-start justify-center w-full">
          {/* Page Name */}
          <p className="font-normal leading-6 text-[#1570ef] text-base uppercase">
            {pageName}
          </p>

          {/* Text and supporting texts */}
          <div className="flex flex-col gap-4 items-start w-full">
            {/* Title */}
            <p className="font-semibold leading-[38px] text-[#181d27] text-[30px] w-full">
              {title}
            </p>

            {/* Supporting Texts */}
            <div className="flex flex-col gap-1 items-start text-[#535862] w-full">
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
              className="bg-white border border-[#d5d7da] rounded-lg flex gap-2 items-center justify-center px-[18px] py-[10px] hover:opacity-90 transition-colors"
            >
              <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                {button.icon}
              </div>
              <span className="font-medium leading-6 text-[#414651] text-base">
                {button.text}
              </span>
            </button>
          ))}
        </div>

        {/* View All Reports Button (positioned absolutely on the right) */}
        {viewAllReportsButton && (
          <button
            onClick={viewAllReportsButton.onClick}
            className="absolute right-8 top-0 flex gap-2 items-center justify-center hover:opacity-70 transition-opacity"
          >
            <div className="shrink-0 w-5 h-5 flex items-center justify-center">
              {viewAllReportsButton.icon}
            </div>
            <span className="font-semibold leading-6 text-[#535862] text-base">
              {viewAllReportsButton.text}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

