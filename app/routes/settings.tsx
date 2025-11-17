import type { Route } from "./+types/settings";
import { useState } from "react";
import { HeaderSection } from "~/components/header-section/header-section";
import { InputField } from "~/components/input-field/input-field";
import { SettingsCheckbox } from "~/components/settings-checkbox/settings-checkbox";
import { ButtonGroup, type ButtonGroupOption } from "~/components/button-group/button-group";

// Icon components for settings
function UserIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

function BellIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
      />
    </svg>
  );
}

function SlidersIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 1.5 1.5h1.5m-1.5 0a1.5 1.5 0 0 0-1.5 1.5M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Zm12-13.5V3.75M18 13.5a1.5 1.5 0 0 1 1.5 1.5h1.5m-1.5 0a1.5 1.5 0 0 0-1.5 1.5m1.5-9.75h-7.5m7.5 0a2.25 2.25 0 0 1 2.25 2.25M12 3.75v13.5m0-13.5a2.25 2.25 0 0 0-2.25 2.25M12 17.25a2.25 2.25 0 0 1 2.25 2.25M12 17.25a2.25 2.25 0 0 0-2.25 2.25m-7.5-4.5v6.75a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25Z"
      />
    </svg>
  );
}

function SunIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

function MoonIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Settings - Reinforce Labs" },
    { name: "description", content: "Customize your settings to manage your account and set preferences" },
  ];
}

export default function Settings() {
  const [name, setName] = useState("John Doe");
  const [email] = useState("john.doe@gmail.com");
  const [receiveMarketingEmails, setReceiveMarketingEmails] = useState(true);
  const [receiveEmailAlerts, setReceiveEmailAlerts] = useState(true);
  const [pauseNotificationsHours, setPauseNotificationsHours] = useState("0");
  const [theme, setTheme] = useState("light");

  const themeOptions: ButtonGroupOption[] = [
    {
      label: "Light Mode",
      value: "light",
      icon: <SunIcon className="w-5 h-5" stroke="#717680" />,
    },
    {
      label: "Dark Mode",
      value: "dark",
      icon: <MoonIcon className="w-5 h-5" stroke="#717680" />,
    },
  ];

  const handleLogOut = () => {
    console.log("Log out clicked");
    // TODO: Implement logout functionality
  };

  const handleSubmitPauseNotifications = () => {
    console.log("Pause notifications for:", pauseNotificationsHours, "hours");
    // TODO: Implement pause notifications functionality
  };

  return (
    <div className="w-full px-10 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-gradient-to-b blur-[100px] filter from-[rgba(24,75,255,0)] opacity-10 to-[#174aff] h-[559px] left-[227px] top-[-76px] w-[394px]" />
      </div>

      <HeaderSection
        pageName="SETTINGS"
        title="Settings"
        infoText={["Customize your settings to manage your account and set preferences"]}
        buttons={[]}
      />

      {/* Main Content */}
      <div className="px-10 pb-12 pt-10 relative z-10">
        <div className="flex gap-8 items-start">
          {/* Account Section */}
          <div className="border border-[#e9eaeb] box-border flex flex-col gap-6 items-start p-9 relative rounded-[12px] shrink-0">
            <div className="flex gap-2.5 items-center relative shrink-0">
              <UserIcon className="w-6 h-6" stroke="#181d27" />
              <p className="font-medium leading-[30px] text-[#181d27] text-xl">Account</p>
            </div>
            <div className="flex flex-col gap-6 items-start relative shrink-0 w-full">
              <InputField
                label="Name"
                value={name}
                onChange={setName}
              />
              <InputField
                label="Email"
                value={email}
                disabled
              />
              <div className="flex gap-4 items-start">
                <button
                  onClick={handleLogOut}
                  className="bg-white border border-[#e9eaeb] rounded-lg flex items-center justify-center px-[14px] py-2 hover:opacity-80 transition-opacity"
                >
                  <p className="font-medium leading-5 text-[#414651] text-sm">Log Out</p>
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="border border-[#e9eaeb] box-border flex flex-col gap-6 items-start p-9 relative rounded-[12px] shrink-0">
            <div className="flex gap-2.5 items-center relative shrink-0">
              <BellIcon className="w-6 h-6" stroke="#181d27" />
              <p className="font-medium leading-[30px] text-[#181d27] text-xl">Notifications</p>
            </div>
            <div className="flex flex-col gap-6 items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-4 items-start relative shrink-0 w-full">
                <SettingsCheckbox
                  checked={receiveMarketingEmails}
                  onChange={setReceiveMarketingEmails}
                  label="Receive marketing emails"
                />
                <SettingsCheckbox
                  checked={receiveEmailAlerts}
                  onChange={setReceiveEmailAlerts}
                  label="Receive email alerts when new reports are ready"
                />
              </div>
              <div className="flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
                <p className="font-medium leading-6 text-[#535862] text-base">Pause Notifications for</p>
                <div className="flex gap-12 items-center relative shrink-0">
                  <div className="flex gap-6 items-center relative shrink-0">
                    <div className="flex flex-col items-start relative shrink-0 w-[120px]">
                      <input
                        type="number"
                        value={pauseNotificationsHours}
                        onChange={(e) => setPauseNotificationsHours(e.target.value)}
                        className="bg-white border border-[#d5d7da] rounded-[8px] w-full px-[14px] py-[10px] font-normal leading-6 text-base tracking-[-0.32px] text-[#717680] outline-none hover:border-[#1570ef] focus:border-[#1570ef] transition-colors"
                        placeholder="0"
                      />
                    </div>
                    <p className="font-normal leading-6 text-base text-black tracking-[-0.32px] w-[44px]">
                      Hours
                    </p>
                  </div>
                  <button
                    onClick={handleSubmitPauseNotifications}
                    className="bg-white border border-[#e9eaeb] rounded-lg flex items-center justify-center px-[14px] py-2 hover:opacity-80 transition-opacity"
                  >
                    <p className="font-medium leading-5 text-[#414651] text-sm">Submit</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="border border-[#e9eaeb] box-border flex flex-col gap-6 items-start p-9 relative rounded-[12px] shrink-0">
            <div className="flex gap-2.5 items-center relative shrink-0">
              <SlidersIcon className="w-6 h-6" stroke="#181d27" />
              <p className="font-medium leading-[30px] text-[#181d27] text-xl">Preferences</p>
            </div>
            <div className="flex flex-col gap-2.5 items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-6 items-start relative shrink-0 w-full">
                <p className="font-medium leading-6 text-[#535862] text-base">Light/Dark Mode</p>
              </div>
              <ButtonGroup
                options={themeOptions}
                value={theme}
                onChange={setTheme}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

