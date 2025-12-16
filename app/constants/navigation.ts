import React, { type ComponentType } from "react";
import {
  HomeIcon,
  TestTubeIcon,
  CompareIcon,
  ServerIcon,
  SettingsIcon,
} from "~/components/icons/icons";
import type { NavItem } from "~/components/left-nav-bar/left-nav-bar";
import { ROUTES } from "./routes";

/**
 * Navigation item configuration (without JSX icons)
 * Icons are stored as component references and rendered in the consuming component
 */
export interface NavItemConfig {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string; stroke?: string }>;
  path: string;
}

/**
 * Navigation configuration
 * Centralized navigation items for consistency across the app
 */
export const NAV_ITEMS_CONFIG: NavItemConfig[] = [
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    path: ROUTES.HOME,
  },
  {
    id: "pressure-test",
    label: "Pressure Test",
    icon: TestTubeIcon,
    path: ROUTES.CREATE_NEW_TEST,
  },
  {
    id: "report-comparison",
    label: "Report Comparison",
    icon: CompareIcon,
    path: ROUTES.COMPARE_REPORTS,
  },
  {
    id: "policy-manager",
    label: "Policy Manager",
    icon: ServerIcon,
    path: ROUTES.POLICY_MANAGER,
  },
  {
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
    path: ROUTES.SETTINGS,
  },
];

/**
 * Helper function to convert config to NavItem with JSX icons
 * Call this inside a React component to create NavItem[] with rendered icons
 */
export function getNavItems(): NavItem[] {
  return NAV_ITEMS_CONFIG.map((item) => {
    const IconComponent = item.icon;
    return {
      id: item.id,
      label: item.label,
      icon: React.createElement(IconComponent),
      path: item.path,
    };
  });
}
