import React, { useEffect } from "react";
import { XIcon } from "~/components/icons/icons";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = "",
}: ModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur - covers entire screen including navbar */}
      <div
        className="fixed inset-0 z-[9998] backdrop-blur-lg backdrop-filter"
        style={{ 
          backgroundColor: "var(--color-bg-overlay)",
          WebkitBackdropFilter: "blur(16px)" 
        }}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">

        {/* Modal Content */}
        <div
          className={`relative bg-theme-card rounded-[14px] flex flex-col max-h-[90vh] w-full max-w-[90vw] overflow-hidden pointer-events-auto border border-theme-primary ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby={description ? "modal-description" : undefined}
        >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-12 right-12 p-2 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity z-10"
          aria-label="Close modal"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-[18px] items-start p-12 pb-0">
          <h2
            id="modal-title"
            className="font-semibold text-[30px] leading-[38px] text-theme-primary w-full"
          >
            {title}
          </h2>
          {description && (
            <p
              id="modal-description"
              className="font-normal text-[18px] leading-[28px] text-theme-secondary tracking-[-0.36px] w-full"
            >
              {description}
            </p>
          )}
        </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-12 py-6 scrollbar-theme">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
