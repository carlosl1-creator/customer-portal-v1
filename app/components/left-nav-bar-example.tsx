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
} from "./icons";

// Example: How to use the LeftNavBar component
export function LeftNavBarExample() {
  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon stroke="currentColor" />,
      path: "/",
    },
    {
      id: "pressure-test",
      label: "Pressure Test",
      icon: <TestTubeIcon stroke="currentColor" />,
      path: "/pressure-test",
    },
    {
      id: "report-comparison",
      label: "Report Comparison",
      icon: <CompareIcon stroke="currentColor" />,
      path: "/report-comparison",
    },
    {
      id: "policy-manager",
      label: "Policy Manager",
      icon: <ServerIcon stroke="currentColor" />,
      path: "/policy-manager",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon stroke="currentColor" />,
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
      logoIcon={<LogoIcon darkMode={false} />}
      navItems={navItems}
      onLogoClick={handleLogoClick}
      darkMode={false}
      logOutItem={{
        label: "Log Out",
        icon: <LogOutIcon stroke="currentColor" />,
        onClick: handleLogOut,
      }}
    />
  );
}

// Dark mode example
export function LeftNavBarDarkExample() {
  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon stroke="currentColor" />,
      path: "/",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <SettingsIcon stroke="currentColor" />,
      path: "/notifications",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon stroke="currentColor" />,
      path: "/settings",
    },
  ];

  return (
    <LeftNavBar
      logoIcon={<LogoIcon darkMode={true} />}
      navItems={navItems}
      darkMode={true}
    />
  );
}

