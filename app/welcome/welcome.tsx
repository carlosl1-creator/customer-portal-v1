import { useState, useEffect } from "react";
import purpleLogo from "./purple-logo.png";
import lightLogo from "./light-logo.png";
import { Button } from "~/components/button/button";
import { InputField } from "~/components/input-field/input-field";
import { ArrowUpRightIcon, ListIcon } from "~/components/icons/icons";
import { useTheme } from "~/utils/theme-context";
import { useLocalStorage } from "~/hooks/use-local-storage";
import { STORAGE_KEYS } from "~/constants/storage-keys";
import { useAppDispatch, useAppSelector, setUserName, selectUserFullName } from "~/store";

export interface WelcomeProps {
  onAction?: () => void;
}

export function Welcome({ onAction }: WelcomeProps) {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const reduxUserName = useAppSelector(selectUserFullName);
  const [name, setName] = useLocalStorage<string>(STORAGE_KEYS.USER_NAME, "");
  const [nameValue, setNameValue] = useState(name || reduxUserName);

  // Update local state when name changes from storage or Redux
  useEffect(() => {
    setNameValue(name || reduxUserName);
  }, [name, reduxUserName]);

  const isNameEntered = nameValue.trim().length > 0;

  const handleNameChange = (value: string) => {
    setNameValue(value);
    if (value.trim().length > 0) {
      setName(value);
      
      // Parse name into first and last name
      const nameParts = value.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      // Update Redux store
      dispatch(setUserName({ first_name: firstName, last_name: lastName }));
    }
  };

  const handleOpenFirstReport = () => {
    if (!isNameEntered) return;
    // Handle open first report action
    console.log("Open First Report clicked");
    onAction?.();
  };

  const handleExploreDashboard = () => {
    if (!isNameEntered) return;
    // Handle explore dashboard action
    console.log("Explore Dashboard clicked");
    onAction?.();
  };

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="flex flex-col gap-[48px] items-start max-w-[1140px] w-full pt-24 pb-6 px-16">
        {/* Logo */}
        <div className="w-[84px] h-[84px] relative shrink-0">
          <img
            src={theme === "dark" ? purpleLogo : lightLogo}
            alt="Reinforce Labs Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Heading and supporting text */}
        <div className="flex flex-col gap-5 items-start w-full max-w-[1024px]">
          <h1 className="font-semibold text-[36px] leading-[44px] text-theme-primary tracking-[-0.72px] not-italic m-0">
            👋 Welcome to Reinforce Labs
          </h1>
          <p className="font-normal text-[18px] leading-[28px] text-theme-secondary not-italic m-0">
            Your first report is ready. Tell us a bit about yourself and explore how your chatbot is performing.
          </p>
        </div>

        {/* Name Input and Buttons */}
        <div className="flex flex-col gap-8 items-start w-full">
          <InputField
            label="Name"
            value={nameValue}
            placeholder="Your Name"
            required
            onChange={handleNameChange}
          />

          {/* Buttons */}
          <div className="flex gap-[24px] items-start">
            <Button
              icon={<ArrowUpRightIcon stroke="white" />}
              text="Open First Report"
              variant="primary"
              onClick={handleOpenFirstReport}
              disabled={!isNameEntered}
              className={!isNameEntered 
                ? "!bg-[#717680] !border-[#717680] hover:!bg-[#717680] hover:!border-[#717680] !opacity-100" 
                : "!bg-[#181d27] !border-[#181d27] hover:!bg-[#181d27] hover:!border-[#181d27]"}
            />
            <Button
              icon={<ListIcon stroke={isNameEntered ? "#414651" : "#d5d7da"} />}
              text="Explore Dashboard"
              variant="secondary"
              onClick={handleExploreDashboard}
              disabled={!isNameEntered}
              className={!isNameEntered 
                ? "!border-[#e9eaeb] !text-[#d5d7da] hover:!bg-theme-card !opacity-100" 
                : "!border-[#d5d7da] !text-[#414651]"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
