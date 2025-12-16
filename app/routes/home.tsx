import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Welcome } from "../welcome/welcome";
import { Dashboard } from "~/components/dashboard/dashboard";
import { hasVisited, markAsVisited } from "~/utils/storage";
import { useLocalStorage } from "~/hooks/use-local-storage";
import { STORAGE_KEYS } from "~/constants/storage-keys";
import { ROUTES } from "~/constants/routes";
import { logger } from "~/utils/logger";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Reinforce Labs" },
    { name: "description", content: "Welcome to Reinforce Labs" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null);
  const [userName] = useLocalStorage<string>(STORAGE_KEYS.USER_NAME, "");

  useEffect(() => {
    // Check if user has visited before
    setIsFirstLogin(!hasVisited());
  }, []);

  const handleOpenFirstReport = () => {
    // Mark as visited and navigate to pressure test with latest report
    markAsVisited();
    navigate(ROUTES.PRESSURE_TEST);
  };

  const handleExploreDashboard = () => {
    // Mark as visited and show dashboard
    markAsVisited();
    setIsFirstLogin(false);
  };

  const handleCreateReport = () => {
    navigate(ROUTES.CREATE_NEW_TEST);
  };

  const handleReportClick = (report: unknown) => {
    logger.debug("Report clicked:", report);
    // TODO: Implement report click navigation
  };

  // Show loading state while checking
  if (isFirstLogin === null) {
    return null;
  }

  // Show Welcome component on first login
  if (isFirstLogin) {
    return (
      <Welcome
        onOpenFirstReport={handleOpenFirstReport}
        onExploreDashboard={handleExploreDashboard}
      />
    );
  }

  // Show Dashboard for returning users
  return (
    <Dashboard
      userName={userName || "User"}
      onCreateReport={handleCreateReport}
      onCompareReports={() => navigate(ROUTES.COMPARE_REPORTS)}
      onReportClick={handleReportClick}
    />
  );
}
