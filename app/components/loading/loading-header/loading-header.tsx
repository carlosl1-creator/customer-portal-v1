import React from "react";
import { LoadingSpinner } from "~/components/loading/loading-spinner/loading-spinner";

export interface LoadingHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function LoadingHeader({ title, subtitle, className = "" }: LoadingHeaderProps) {
  return (
    <div className={`flex gap-4 items-start ${className}`}>
      <div className="relative shrink-0" style={{ width: 36, height: 36 }}>
        <LoadingSpinner size={36} />
      </div>
      <div className="flex flex-col gap-3 items-start relative shrink-0 flex-1">
        <p className="font-semibold leading-[38px] text-[#181d27] text-[30px] w-full">
          {title}
        </p>
        <p className="font-normal leading-6 text-[#535862] text-base w-full">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

