// Example usage of LeftNavBar component
import { LeftNavBar, type NavItem } from "./left-nav-bar";
import {
  HomeIcon,
  TestTubeIcon,
  CompareIcon,
  ServerIcon,
  SettingsIcon,
  LogOutIcon,
  LogoIcon,
} from "../icons/icons";

// Single LeftNavBar example that automatically responds to theme changes
export function LeftNavBarExample() {
  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      id: "pressure-test",
      label: "Pressure Test",
      icon: <TestTubeIcon />,
      path: "/pressure-test",
    },
    {
      id: "report-comparison",
      label: "Report Comparison",
      icon: <CompareIcon />,
      path: "/compare-reports",
    },
    {
      id: "policy-manager",
      label: "Policy Manager",
      icon: <ServerIcon />,
      path: "/policy-manager",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ];

  const handleLogoClick = () => {
    // Navigate to home or perform logo action
    console.log("Logo clicked");
  };

  const handleLogOut = () => {
    // Handle logout logic
    console.log("Log out clicked");
  };

  return (
    <LeftNavBar
      logoIcon={<LogoIcon />}
      navItems={navItems}
      onLogoClick={handleLogoClick}
      logOutItem={{
        label: "Log Out",
        icon: <LogOutIcon />,
        onClick: handleLogOut,
      }}
    />
  );
}

// Keep this export for backwards compatibility, but it's the same component now
export const LeftNavBarDarkExample = LeftNavBarExample;
