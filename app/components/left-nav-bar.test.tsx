import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { LeftNavBar, type NavItem } from "./left-nav-bar";
import {
  HomeIcon,
  SettingsIcon,
  LogOutIcon,
  LogoIcon,
} from "./icons";

// Helper to render with router
const renderWithRouter = (ui: React.ReactElement, initialEntries = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>
  );
};

describe("LeftNavBar", () => {
  const mockNavItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders navigation items", () => {
    const { container } = renderWithRouter(<LeftNavBar navItems={mockNavItems} />);
    // Navigation links should be present (text is hidden when collapsed)
    const links = container.querySelectorAll("a[href]");
    expect(links.length).toBeGreaterThanOrEqual(2);
    // Check that links have correct hrefs
    expect(container.querySelector('a[href="/"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="/settings"]')).toBeInTheDocument();
  });

  it("renders logo when logoIcon is provided", () => {
    const { container } = renderWithRouter(
      <LeftNavBar
        navItems={mockNavItems}
        logoIcon={<LogoIcon />}
      />
    );
    // Logo should be in a button with aria-label="Logo"
    expect(screen.getByLabelText("Logo")).toBeInTheDocument();
    // Logo SVG should be present
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("does not render logo when logoIcon is not provided", () => {
    renderWithRouter(<LeftNavBar navItems={mockNavItems} />);
    const logoButton = screen.queryByLabelText("Logo");
    expect(logoButton).not.toBeInTheDocument();
  });

  it("calls onLogoClick when logo is clicked", async () => {
    vi.useRealTimers();
    const handleLogoClick = vi.fn();
    const user = userEvent.setup();
    renderWithRouter(
      <LeftNavBar
        navItems={mockNavItems}
        logoIcon={<LogoIcon />}
        onLogoClick={handleLogoClick}
      />
    );

    const logoButton = screen.getByLabelText("Logo");
    await user.click(logoButton);

    expect(handleLogoClick).toHaveBeenCalledTimes(1);
    vi.useFakeTimers();
  });

  it("expands on mouse enter after 1 second", async () => {
    const { container } = renderWithRouter(<LeftNavBar navItems={mockNavItems} />);

    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;
    expect(navBar).toBeInTheDocument();
    expect(navBar).toHaveClass("w-[76px]");

    if (navBar) {
      fireEvent.mouseEnter(navBar);
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      // State should update after timer advances
      expect(navBar).toHaveClass("w-[240px]");
    }
  });

  it("collapses immediately on mouse leave", async () => {
    const { container } = renderWithRouter(<LeftNavBar navItems={mockNavItems} />);

    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;

    if (navBar) {
      // Expand first
      fireEvent.mouseEnter(navBar);
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      expect(navBar).toHaveClass("w-[240px]");

      // Then leave
      fireEvent.mouseLeave(navBar);
      // Should collapse immediately
      expect(navBar).toHaveClass("w-[76px]");
    }
  });

  it("highlights active route", () => {
    const { container } = renderWithRouter(<LeftNavBar navItems={mockNavItems} />, ["/settings"]);
    const settingsLink = container.querySelector('a[href="/settings"]');
    expect(settingsLink).toHaveClass("bg-[#dfdfdf]");
  });

  it("applies dark mode styles when darkMode is true", () => {
    const { container } = renderWithRouter(
      <LeftNavBar navItems={mockNavItems} darkMode={true} />
    );
    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen");
    expect(navBar).toHaveClass("bg-[#131313]");
  });

  it("applies light mode styles when darkMode is false", () => {
    const { container } = renderWithRouter(
      <LeftNavBar navItems={mockNavItems} darkMode={false} />
    );
    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen");
    expect(navBar).toHaveClass("bg-neutral-100");
  });

  it("renders logout button when logOutItem is provided", () => {
    const handleLogout = vi.fn();
    renderWithRouter(
      <LeftNavBar
        navItems={mockNavItems}
        logOutItem={{
          label: "Log Out",
          icon: <LogOutIcon />,
          onClick: handleLogout,
        }}
      />
    );
    // Logout button should be present (text is hidden when collapsed, but button exists)
    expect(screen.getByLabelText("Log Out")).toBeInTheDocument();
  });

  it("does not render logout button when logOutItem is not provided", () => {
    renderWithRouter(<LeftNavBar navItems={mockNavItems} />);
    expect(screen.queryByText("Log Out")).not.toBeInTheDocument();
  });

  it("calls logout onClick when logout button is clicked", async () => {
    vi.useRealTimers();
    const handleLogout = vi.fn();
    const user = userEvent.setup();
    const { container } = renderWithRouter(
      <LeftNavBar
        navItems={mockNavItems}
        logOutItem={{
          label: "Log Out",
          icon: <LogOutIcon />,
          onClick: handleLogout,
        }}
      />
    );

    // Expand navbar first to show logout text
    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;
    if (navBar) {
      fireEvent.mouseEnter(navBar);
      await waitFor(
        () => {
          expect(navBar).toHaveClass("w-[240px]");
        },
        { timeout: 2000 }
      );
    }

    const logoutButton = screen.getByText("Log Out");
    await user.click(logoutButton);

    expect(handleLogout).toHaveBeenCalledTimes(1);
    vi.useFakeTimers();
  });

  it("shows only icons when collapsed", () => {
    const { container } = renderWithRouter(<LeftNavBar navItems={mockNavItems} />);
    // When collapsed, labels are in DOM but hidden via CSS
    // The navbar should have collapsed width
    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen");
    expect(navBar).toHaveClass("w-[76px]");
  });

  it("shows labels when expanded", async () => {
    const { container } = renderWithRouter(<LeftNavBar navItems={mockNavItems} />);

    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;

    if (navBar) {
      fireEvent.mouseEnter(navBar);
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      // When expanded, text should be visible
      const homeText = screen.queryByText("Home");
      const settingsText = screen.queryByText("Settings");
      expect(homeText).toBeInTheDocument();
      expect(settingsText).toBeInTheDocument();
    }
  });

  it("cleans up timeout on unmount", () => {
    const { container, unmount } = renderWithRouter(<LeftNavBar navItems={mockNavItems} />);
    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;

    if (navBar) {
      // Trigger hover to set timeout
      fireEvent.mouseEnter(navBar);
    }

    // Should not throw when unmounting
    expect(() => unmount()).not.toThrow();
  });

  it("applies correct text colors in dark mode", async () => {
    const { container } = renderWithRouter(
      <LeftNavBar navItems={mockNavItems} darkMode={true} />,
      ["/settings"]
    );
    // Expand to see text
    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;
    if (navBar) {
      fireEvent.mouseEnter(navBar);
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      // Text color is on the span element, not the link
      const settingsText = screen.getByText("Settings");
      expect(settingsText).toHaveClass("text-[#FDFDFD]");
    }
  });

  it("applies correct text colors in light mode", async () => {
    const { container } = renderWithRouter(
      <LeftNavBar navItems={mockNavItems} darkMode={false} />,
      ["/settings"]
    );
    // Expand to see text
    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;
    if (navBar) {
      fireEvent.mouseEnter(navBar);
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      // Text color is on the span element, not the link
      const settingsText = screen.getByText("Settings");
      expect(settingsText).toHaveClass("text-[#181D27]");
    }
  });
});

