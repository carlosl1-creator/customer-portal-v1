import React from "react";
import { ThumbsUpIcon, ThumbsDownIcon } from "~/components/icons/icons";

export interface CardProps {
  icon: React.ReactNode;
  title: string;
  focusText: string;
  listTitle: string;
  listItems: string[];
  thumbsUpActive?: boolean;
  thumbsDownActive?: boolean;
  onThumbsUpClick?: () => void;
  onThumbsDownClick?: () => void;
  gradientVariant?: "sunset" | "nebulae";
}

export function Card({
  icon,
  title,
  focusText,
  listTitle,
  listItems,
  thumbsUpActive = false,
  thumbsDownActive = false,
  onThumbsUpClick,
  onThumbsDownClick,
  gradientVariant = "sunset",
}: CardProps) {
  const thumbsUpColor = thumbsUpActive ? "#32D583" : "#A4A7AE";
  const thumbsDownColor = thumbsDownActive ? "#F97066" : "#A4A7AE";

  return (
    <div className="relative border border-[#e9eaeb] rounded-[12px] flex-1 min-h-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
        {gradientVariant === "sunset" ? (
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f5f5f5]" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f0f4ff]" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6 p-8">
        {/* Header with icon, title, and thumbs buttons */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-shrink-0 w-6 h-6 text-[#181d27]">
              {icon}
            </div>
            <h3 className="font-normal text-[20px] leading-[30px] text-[#181d27] truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onThumbsUpClick}
              className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Thumbs up"
            >
              <ThumbsUpIcon className="w-6 h-6" stroke={thumbsUpColor} />
            </button>
            <button
              onClick={onThumbsDownClick}
              className="p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Thumbs down"
            >
              <ThumbsDownIcon className="w-6 h-6" stroke={thumbsDownColor} />
            </button>
          </div>
        </div>

        {/* Focus text */}
        <div className="flex gap-3 w-full">
          <p className="text-[16px] leading-[24px] text-[#181d27]">
            <span className="font-medium">Focus:</span>
            <span> {focusText}</span>
          </p>
        </div>

        {/* List section */}
        <div className="flex flex-col gap-1.5 text-[#535862] text-[16px] w-full">
          <p className="font-medium leading-[24px]">{listTitle}</p>
          <ul className="block min-w-full w-full">
            {listItems.map((item, index) => (
              <li
                key={index}
                className={`leading-[24px] ${
                  index === listItems.length - 1 ? "" : "mb-0"
                } ms-6`}
              >
                <span className="leading-[24px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

