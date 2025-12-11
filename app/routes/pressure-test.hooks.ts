/**
 * Custom hooks and handlers for the Pressure Test page.
 */

import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import type { ModalType } from "./pressure-test.data";

// ============================================================================
// Modal Hook
// ============================================================================

export function useModal() {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const openModalById = useCallback((modalId: ModalType) => {
    setOpenModal(modalId);
  }, []);

  const closeModal = useCallback(() => {
    setOpenModal(null);
  }, []);

  return {
    openModal,
    openModalById,
    closeModal,
  };
}

// ============================================================================
// Header Actions Hook
// ============================================================================

export function useHeaderActions() {
  const navigate = useNavigate();

  const handleSendToSlack = useCallback(() => {
    console.log("Send to Slack clicked");
    // TODO: Implement Slack integration
  }, []);

  const handleLinkToJira = useCallback(() => {
    console.log("Link to Jira clicked");
    // TODO: Implement Jira integration
  }, []);

  const handleDownloadReport = useCallback(() => {
    console.log("Download Report clicked");
    // TODO: Implement download functionality
  }, []);

  const handleCopyPermalink = useCallback(() => {
    console.log("Copy Permalink clicked");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  const handleViewAllReports = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return {
    handleSendToSlack,
    handleLinkToJira,
    handleDownloadReport,
    handleCopyPermalink,
    handleViewAllReports,
  };
}

// ============================================================================
// Filter Actions Hook
// ============================================================================

export function useFilterActions() {
  const handleTurnLengthChange = useCallback((value: string) => {
    console.log("Turn length changed:", value);
    // TODO: Implement filter logic
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    console.log("Category changed:", value);
    // TODO: Implement filter logic
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    console.log("Search changed:", value);
    // TODO: Implement search logic
  }, []);

  const handleMoreFiltersClick = useCallback(() => {
    console.log("More filters clicked");
    // TODO: Implement more filters modal
  }, []);

  return {
    handleTurnLengthChange,
    handleCategoryChange,
    handleSearchChange,
    handleMoreFiltersClick,
  };
}

// ============================================================================
// Pagination Hook
// ============================================================================

export function usePagination(initialPage = 1, totalPages = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    handlePrevious,
    handleNext,
  };
}

// ============================================================================
// Interaction Handlers Hook
// ============================================================================

export function useInteractionHandlers() {
  const handleThumbsUp = useCallback((insightId: string) => {
    console.log("Thumbs up clicked for:", insightId);
    // TODO: Implement feedback logic
  }, []);

  const handleThumbsDown = useCallback((insightId: string) => {
    console.log("Thumbs down clicked for:", insightId);
    // TODO: Implement feedback logic
  }, []);

  const handleRowClick = useCallback((item: unknown) => {
    console.log("Row clicked:", item);
    // TODO: Implement row click navigation
  }, []);

  return {
    handleThumbsUp,
    handleThumbsDown,
    handleRowClick,
  };
}

