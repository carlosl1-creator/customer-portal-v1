import React from "react";
import {
  HomeIcon,
  TestTubeIcon,
  CompareIcon,
  ServerIcon,
  SettingsIcon,
} from "../components/icons/icons";
import type { NavItem } from "../components/left-nav-bar/left-nav-bar";
import { ROUTES } from "./routes";

/**
 * Navigation configuration
 * Centralized navigation items for consistency across the app
 * 
 * Returns a function that creates nav items with JSX icons.
 * This is necessary because JSX cannot be created at module scope.
 */
export function getNavItems(): NavItem[] {
  return [
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon />,
      path: ROUTES.HOME,
    },
    {
      id: "pressure-test",
      label: "Pressure Test",
      icon: <TestTubeIcon />,
      path: ROUTES.PRESSURE_TEST,
    },
    {
      id: "report-comparison",
      label: "Report Comparison",
      icon: <CompareIcon />,
      path: ROUTES.COMPARE_REPORTS,
    },
    {
      id: "policy-manager",
      label: "Policy Manager",
      icon: <ServerIcon />,
      path: ROUTES.POLICY_MANAGER,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      path: ROUTES.SETTINGS,
    },
  ];
}

