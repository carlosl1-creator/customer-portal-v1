import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface LeftNavBarProps {
  logoIcon?: React.ReactNode;
  navItems: NavItem[];
  onLogoClick?: () => void;
  darkMode?: boolean;
  logOutItem?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  };
}

export function LeftNavBar({
  logoIcon,
  navItems,
  onLogoClick,
  darkMode = false,
  logOutItem,
}: LeftNavBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    setIsExpanded((prev) => !prev);
    if (onLogoClick) {
      onLogoClick();
    }
  };

  // Handle clicks outside the navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const bgColor = darkMode ? "bg-[#131313]" : "bg-neutral-100";
  const surfaceColor = darkMode ? "bg-[#303030]" : "bg-[#dfdfdf]";
  const textColor = darkMode ? "text-[#FDFDFD]" : "text-[#181D27]";
  const inactiveTextColor = darkMode ? "text-[#FDFDFD]" : "text-[#535862]";

  return (
    <div
      ref={navRef}
      className={`box-border flex flex-col h-screen items-center justify-between px-4 py-6 transition-all duration-300 fixed left-0 top-0 z-50 ${isExpanded ? "w-[240px]" : "w-[76px]"
        } ${bgColor}`}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-8 items-start w-full">
        {/* Logo */}
        <div
          className={`flex ${isExpanded ? "flex-col gap-3 w-full" : "w-full"
            }`}
        >
          {logoIcon && (
            <button
              onClick={handleLogoClick}
              className="cursor-pointer flex items-center"
              aria-label="Toggle navigation"
            >
              {logoIcon}
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-3 items-center">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`box-border flex gap-2.5 items-center p-3.5 rounded-md w-full transition-colors ${active
                    ? surfaceColor
                    : "hover:opacity-70"
                  }`}
              >
                <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                  {item.icon}
                </div>
                {isExpanded && (
                  <span
                    className={`text-base font-normal leading-6 whitespace-nowrap ${active ? textColor : inactiveTextColor
                      }`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Section - Log Out */}
      {logOutItem && (
        <div className={`w-full flex ${isExpanded ? "justify-end" : "items-center"}`}>
          {isExpanded ? (
            <button
              onClick={logOutItem.onClick}
              className="flex items-center gap-2 p-2 rounded-lg hover:opacity-70 transition-colors"
            >
              <span className={`text-sm font-medium ${inactiveTextColor}`}>
                {logOutItem.label}
              </span>
              <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                {logOutItem.icon}
              </div>
            </button>
          ) : (
            <button
              onClick={logOutItem.onClick}
              className="flex items-center justify-center p-3.5 rounded-md w-full hover:opacity-70 transition-colors"
              aria-label={logOutItem.label}
            >
              <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                {logOutItem.icon}
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

