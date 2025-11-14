import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className="flex flex-col z-50 min-h-screen w-full bg-neutral-100">
      <div className="flex-1 w-full py-[18px] px-2">
        <div className={`relative border border-[#d5d7da] rounded-lg shadow-sm w-full min-h-[calc(100vh-36px)] overflow-hidden ${className}`}>
          {/* Geometric background inside the container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-100 rounded-lg">
            <div className="absolute left-0 right-0 top-0 w-full h-full">
              <img
                src="/sine.svg"
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>
          </div>
          {/* White background overlay - slightly transparent to show geometric pattern */}
          <div className="absolute inset-0 bg-white/95 z-[1] rounded-lg"></div>
          {/* Content with relative positioning */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

