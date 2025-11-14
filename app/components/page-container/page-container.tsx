import React from "react";
import { GeometricBackground } from "~/components/geometric-background/geometric-background";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-neutral-100">
      <div className="flex-1 w-full py-[18px] px-2">
        <div className={`relative border border-[#e9eaeb] rounded-[12px] bg-white w-full min-h-[calc(100vh-36px)] overflow-hidden ${className}`}>
          {/* Geometric background positioned absolutely behind content */}
          <GeometricBackground />
          {/* Content rendered on top with full opacity */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

