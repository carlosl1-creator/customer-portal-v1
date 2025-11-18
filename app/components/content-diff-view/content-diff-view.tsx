import React from "react";

export interface ContentDiffViewProps {
  before: string;
  after: string;
  className?: string;
}

export function ContentDiffView({ before, after, className = "" }: ContentDiffViewProps) {
  // Split content into lines for diff display
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");

  return (
    <div className={`border border-[#d5d7da] border-solid h-[400px] relative rounded-[12px] shrink-0 w-full ${className}`}>
      <div className="content-stretch flex h-[400px] items-start overflow-clip relative rounded-[inherit] w-full">
        {/* Before Column */}
        <div className="border-[#d5d7da] border-b-0 border-l-0 border-r border-solid border-t-0 flex-[1_0_0] h-full min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
            {/* Header */}
            <div className="box-border content-stretch flex gap-[10px] items-end px-6 py-3 relative shrink-0 w-full">
              <p className="font-medium leading-5 not-italic relative shrink-0 text-[#717680] text-sm">
                Before
              </p>
            </div>
            {/* Divider */}
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px] border-b border-[#d5d7da]" />
            </div>
            {/* Content - Scrollable */}
            <div className="box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-px min-w-px px-6 py-3 relative shrink-0 w-full overflow-y-auto">
              <div className="content-stretch flex flex-[1_0_0] font-medium gap-[10px] h-full items-start leading-[18px] min-h-px min-w-px relative shrink-0 text-[#181d27] text-sm" style={{ fontFamily: "monospace" }}>
                {/* Line numbers and content */}
                <div className="leading-[18px] relative shrink-0 whitespace-nowrap text-[#717680]">
                  {beforeLines.map((_, index) => (
                    <p key={index} className="mb-0">
                      -
                    </p>
                  ))}
                </div>
                <div className="flex-[1_0_0] h-full leading-[18px] min-h-px min-w-px relative shrink-0 whitespace-pre-wrap">
                  {beforeLines.map((line, index) => (
                    <p key={index} className="mb-0">
                      {line || " "}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* After Column */}
        <div className="border-[#d5d7da] border-b-0 border-l-0 border-r border-solid border-t-0 flex-[1_0_0] h-full min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
            {/* Header */}
            <div className="box-border content-stretch flex gap-[10px] items-end px-6 py-3 relative shrink-0 w-full">
              <p className="font-medium leading-5 not-italic relative shrink-0 text-[#717680] text-sm">
                After
              </p>
            </div>
            {/* Divider */}
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px] border-b border-[#d5d7da]" />
            </div>
            {/* Content - Scrollable */}
            <div className="box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-px min-w-px px-6 py-3 relative shrink-0 w-full overflow-y-auto">
              <div className="content-stretch flex flex-[1_0_0] font-medium gap-[10px] h-full items-start leading-[18px] min-h-px min-w-px relative shrink-0 text-sm text-black" style={{ fontFamily: "monospace" }}>
                {/* Line numbers and content */}
                <div className="leading-[18px] relative shrink-0 whitespace-nowrap text-[#717680]">
                  {afterLines.map((_, index) => (
                    <p key={index} className="mb-0">
                      +
                    </p>
                  ))}
                </div>
                <div className="flex-[1_0_0] h-full leading-[18px] min-h-px min-w-px relative shrink-0 whitespace-pre-wrap">
                  {afterLines.map((line, index) => (
                    <p key={index} className="mb-0">
                      {line || " "}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

