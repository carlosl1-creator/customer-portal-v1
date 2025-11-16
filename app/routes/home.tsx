import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Welcome } from "../welcome/welcome";
import { Dashboard } from "~/components/dashboard/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Reinforce Labs" },
    { name: "description", content: "Welcome to Reinforce Labs" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisited");
    setIsFirstLogin(hasVisited === null);
  }, []);

  const handleWelcomeAction = () => {
    // Mark as visited when user interacts with welcome screen
    localStorage.setItem("hasVisited", "true");
    setIsFirstLogin(false);
  };

  // Show loading state while checking
  if (isFirstLogin === null) {
    return null; // or a loading spinner
  }

  // Show Welcome component on first login
  if (isFirstLogin) {
    return <Welcome onAction={handleWelcomeAction} />;
  }

  // Show Dashboard for returning users
  return (
    <Dashboard
      onCreateReport={() => console.log("Create Report clicked")}
      onCompareReports={() => navigate("/compare-reports")}
      onReportClick={(report) => console.log("Report clicked:", report)}
    />
  );
}
