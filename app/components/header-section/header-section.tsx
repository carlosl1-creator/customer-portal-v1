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
              className="border border-[#d5d7da] border-solid rounded-[8px] flex gap-[8px] items-center justify-center px-[18px] py-[10px] transition-colors duration-200 relative isolate"
              style={{ 
                backgroundColor: '#FFFFFF',
                opacity: 1,
              } as React.CSSProperties}
              ref={(el) => {
                if (el) {
                  el.style.setProperty('background-color', '#FFFFFF', 'important');
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.setProperty('background-color', '#F5F5F5', 'important');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty('background-color', '#FFFFFF', 'important');
              }}
            >
              <div className="shrink-0 w-6 h-6 flex items-center justify-center relative z-10">
                {button.icon}
              </div>
              <span className="font-medium leading-[24px] text-[#414651] text-[16px] relative z-10">
                {button.text}
              </span>
            </button>
          ))}
        </div>

        {/* View All Reports Button (positioned absolutely on the right) */}
        {viewAllReportsButton && (
          <button
            onClick={viewAllReportsButton.onClick}
            className="absolute right-10 top-8 flex gap-2 items-center justify-center hover:opacity-70 transition-opacity"
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

