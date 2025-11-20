import React, { useRef, useState, useCallback } from "react";
import { Modal } from "~/components/modal/modal";
import { UploadIcon } from "~/components/icons/icons";

export interface UploadLocalFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File) => void;
}

export function UploadLocalFileModal({
  isOpen,
  onClose,
  onConfirm,
}: UploadLocalFileModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = [".txt", ".md", ".pdf", ".otf"];

  const handleFileSelect = useCallback((file: File) => {
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (acceptedFileTypes.includes(fileExtension)) {
      setSelectedFile(file);
    } else {
      alert(`Unsupported file type. Please select one of: ${acceptedFileTypes.join(", ")}`);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleConfirm = () => {
    if (selectedFile) {
      onConfirm(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Upload Local File"
      className="max-w-[640px]"
    >
      <div className="flex flex-col gap-6 items-start relative shrink-0 w-full">
        {/* Description Text */}
        <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
          <p className="font-normal leading-6 text-[#535862] text-base">
            Select a file from your computer or drag a file to this window.
          </p>
          <p className="font-normal leading-6 text-[#535862] text-base">
            Supported Files: *.txt, *.md, *.pdf, *.otf
          </p>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`border border-[#d5d7da] border-dashed h-[180px] relative rounded-[12px] shrink-0 w-full cursor-pointer transition-colors ${
            isDragging ? "border-[#1570ef] bg-[#eff8ff]" : "hover:border-[#1570ef]"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFileTypes.join(",")}
            onChange={handleFileInputChange}
            className="hidden"
          />
          <div className="box-border flex gap-2.5 h-[180px] items-center justify-center overflow-clip p-2.5 relative rounded-[inherit] w-full">
            <div className="box-border flex flex-[1_0_0] flex-col gap-4 items-center min-h-px min-w-px overflow-clip px-[18px] py-3 relative shrink-0">
              <div className="overflow-clip relative shrink-0 size-9">
                <UploadIcon className="size-9" stroke="#717680" />
              </div>
              <p className="font-normal leading-6 not-italic relative shrink-0 text-[#535862] text-base text-center">
                <span className="text-[#717680]">Drag & Drop or </span>
                <span className="text-[#181d27] underline">select a local file</span>
                <span className="text-[#717680]"> to upload</span>
              </p>
              {selectedFile && (
                <p className="font-medium leading-6 text-[#181d27] text-base mt-2">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-start justify-end relative shrink-0 w-full">
          <button
            onClick={handleCancel}
            className="bg-white border border-[#d5d7da] border-solid relative rounded-lg shrink-0 hover:opacity-80 transition-opacity"
          >
            <div className="box-border flex gap-2 items-center justify-center overflow-clip px-[18px] py-2.5 relative rounded-[inherit]">
              <p className="font-medium leading-6 not-italic relative shrink-0 text-[#414651] text-base">
                Cancel
              </p>
            </div>
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedFile}
            className={`border border-solid relative rounded-lg shrink-0 transition-opacity ${
              selectedFile
                ? "bg-[#b2ddff] border-[#b2ddff] text-white hover:opacity-90 cursor-pointer"
                : "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <div className="box-border flex gap-2 items-center justify-center overflow-clip px-[18px] py-2.5 relative rounded-[inherit]">
              <p className="font-medium leading-6 not-italic relative shrink-0 text-base">
                Confirm
              </p>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
}

