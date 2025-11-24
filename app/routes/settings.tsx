import type { Route } from "./+types/settings";
import { useState } from "react";
import { HeaderSection } from "~/components/header-section/header-section";
import { InputField } from "~/components/input-field/input-field";
import { SettingsCheckbox } from "~/components/settings-checkbox/settings-checkbox";
import { ButtonGroup, type ButtonGroupOption } from "~/components/button-group/button-group";
import { SunIcon, MoonIcon, UserIcon, BellIcon, SlidersIcon} from "~/components/icons/icons";
import { useTheme } from "~/utils/theme-context";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Settings - Reinforce Labs" },
    { name: "description", content: "Customize your settings to manage your account and set preferences" },
  ];
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("John Doe");
  const [email] = useState("john.doe@gmail.com");
  const [receiveMarketingEmails, setReceiveMarketingEmails] = useState(true);
  const [receiveEmailAlerts, setReceiveEmailAlerts] = useState(true);
  const [pauseNotificationsHours, setPauseNotificationsHours] = useState("0");

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
                onChange={(value) => setTheme(value as "light" | "dark")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

