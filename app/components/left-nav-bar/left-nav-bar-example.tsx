import { useNavigate } from "react-router";
import { LeftNavBar } from "./left-nav-bar";
import { LogOutIcon, LogoIcon } from "../icons/icons";
import { getNavItems } from "~/constants/navigation";
import { ROUTES } from "~/constants/routes";
import { logger } from "~/utils/logger";

/**
 * LeftNavBar component with navigation configuration
 * Automatically responds to theme changes
 */
export function LeftNavBarExample() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
    logger.debug("Logo clicked, navigating to home");
  };

  const handleLogOut = () => {
    // TODO: Implement logout functionality
    logger.info("Log out clicked");
  };

  return (
    <LeftNavBar
      logoIcon={<LogoIcon />}
      navItems={getNavItems()}
      onLogoClick={handleLogoClick}
      logOutItem={{
        label: "Log Out",
        icon: <LogOutIcon />,
        onClick: handleLogOut,
      }}
    />
  );
}

// Keep this export for backwards compatibility
export const LeftNavBarDarkExample = LeftNavBarExample;
