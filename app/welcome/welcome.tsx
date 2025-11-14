import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { Button } from "~/components/button/button";
import { ArrowUpRightIcon, ListIcon } from "~/components/icons/icons";

export function Welcome() {
  const handleOpenFirstReport = () => {
    // Handle open first report action
    console.log("Open First Report clicked");
  };

  const handleExploreDashboard = () => {
    // Handle explore dashboard action
    console.log("Explore Dashboard clicked");
  };

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="flex flex-col gap-[58px] items-start max-w-[1140px] w-full pt-24 pb-6">
        {/* Logo */}
        <div className="w-[84px] h-[84px] relative shrink-0">
          <img
            src="/rl_logo.svg"
            alt="Reinforce Labs Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Heading and supporting text */}
        <div className="flex flex-col gap-5 items-start w-full max-w-[1024px]">
          <h1 className="font-semibold text-[36px] leading-[44px] text-[#181d27] tracking-[-0.72px] not-italic m-0">
            👋 Welcome to Reinforce Labs
          </h1>
          <p className="font-normal text-[18px] leading-[28px] text-[#535862] not-italic m-0">
            Your first report is ready. Open it to see how your chatbot is performing.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-[24px] items-start">
          <Button
            icon={<ArrowUpRightIcon stroke="white" />}
            text="Open First Report"
            variant="primary"
            onClick={handleOpenFirstReport}
          />
          <Button
            icon={<ListIcon stroke="#414651" />}
            text="Explore Dashboard"
            variant="secondary"
            onClick={handleExploreDashboard}
          />
        </div>
      </div>
    </div>
  );
}
