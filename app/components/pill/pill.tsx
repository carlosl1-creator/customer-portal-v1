import { ArrowRightIcon } from "~/components/icons/icons";

export interface PillProps {
  label: string;
  message?: string;
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export function Pill({
  label,
  message,
  linkText,
  linkHref,
  className = "",
}: PillProps) {
  return (
    <div className={`inline-flex items-center gap-4 px-1.5 py-1.5 pr-5 rounded-full border border-[#B2DDFF] bg-[#F0F9FF] ${className}`}>
      {/* Badge */}
      <span className="bg-[#D1E9FF] text-[#175CD3] px-3 py-1 rounded-full text-sm font-medium">
        {label}
      </span>

      {/* Message and Link */}
      {(message || linkText) && (
        <div className="flex items-center gap-2">
          {message && (
            <span className="text-sm text-[#344054]">{message}</span>
          )}
          {linkText && linkHref && (
            <a
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#175CD3] font-medium hover:underline flex items-center gap-2"
            >
              {linkText}
              <ArrowRightIcon className="w-4 h-4" stroke="currentColor" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

