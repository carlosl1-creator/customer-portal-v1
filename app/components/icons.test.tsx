import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  HomeIcon,
  TestTubeIcon,
  CompareIcon,
  ServerIcon,
  SettingsIcon,
  LogOutIcon,
  LogoIcon,
  ArrowUpRightIcon,
  ListIcon,
} from "./icons";

describe("Icons", () => {
  describe("HomeIcon", () => {
    it("renders home icon", () => {
      const { container } = render(<HomeIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("applies custom className", () => {
      const { container } = render(<HomeIcon className="custom-class" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("custom-class");
    });

    it("applies custom stroke color", () => {
      const { container } = render(<HomeIcon stroke="#FF0000" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke", "#FF0000");
    });

    it("uses default className when not provided", () => {
      const { container } = render(<HomeIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("w-6");
      expect(svg).toHaveClass("h-6");
    });
  });

  describe("TestTubeIcon", () => {
    it("renders test tube icon", () => {
      const { container } = render(<TestTubeIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("applies custom props", () => {
      const { container } = render(
        <TestTubeIcon className="test-class" stroke="#00FF00" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("test-class");
      expect(svg).toHaveAttribute("stroke", "#00FF00");
    });
  });

  describe("CompareIcon", () => {
    it("renders compare icon", () => {
      const { container } = render(<CompareIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("ServerIcon", () => {
    it("renders server icon", () => {
      const { container } = render(<ServerIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("SettingsIcon", () => {
    it("renders settings icon", () => {
      const { container } = render(<SettingsIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("LogOutIcon", () => {
    it("renders logout icon", () => {
      const { container } = render(<LogOutIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("LogoIcon", () => {
    it("renders logo icon in light mode by default", () => {
      const { container } = render(<LogoIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("width", "44");
      expect(svg).toHaveAttribute("height", "48");
    });

    it("renders logo icon in dark mode", () => {
      const { container } = render(<LogoIcon darkMode={true} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<LogoIcon className="logo-custom" />);
      const div = container.querySelector("div");
      expect(div).toHaveClass("logo-custom");
    });

    it("uses default className when not provided", () => {
      const { container } = render(<LogoIcon />);
      const div = container.querySelector("div");
      expect(div).toHaveClass("w-11");
      expect(div).toHaveClass("h-11");
    });
  });

  describe("ArrowUpRightIcon", () => {
    it("renders arrow up right icon", () => {
      const { container } = render(<ArrowUpRightIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("applies custom className and stroke", () => {
      const { container } = render(
        <ArrowUpRightIcon className="arrow-class" stroke="#0000FF" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("arrow-class");
      expect(svg).toHaveAttribute("stroke", "#0000FF");
    });

    it("uses default className when not provided", () => {
      const { container } = render(<ArrowUpRightIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("w-5");
      expect(svg).toHaveClass("h-5");
    });
  });

  describe("ListIcon", () => {
    it("renders list icon", () => {
      const { container } = render(<ListIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("applies custom props", () => {
      const { container } = render(
        <ListIcon className="list-class" stroke="#FF00FF" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("list-class");
      expect(svg).toHaveAttribute("stroke", "#FF00FF");
    });

    it("uses default className when not provided", () => {
      const { container } = render(<ListIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("w-5");
      expect(svg).toHaveClass("h-5");
    });
  });

  describe("Icon consistency", () => {
    it("all icons have fill='none'", () => {
      const icons = [
        <HomeIcon key="home" />,
        <TestTubeIcon key="test" />,
        <CompareIcon key="compare" />,
        <ServerIcon key="server" />,
        <SettingsIcon key="settings" />,
        <LogOutIcon key="logout" />,
        <ArrowUpRightIcon key="arrow" />,
        <ListIcon key="list" />,
      ];

      icons.forEach((icon) => {
        const { container } = render(icon);
        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("fill", "none");
      });
    });

    it("all icons have strokeWidth={1.5} (except LogoIcon)", () => {
      const icons = [
        <HomeIcon key="home" />,
        <TestTubeIcon key="test" />,
        <CompareIcon key="compare" />,
        <ServerIcon key="server" />,
        <SettingsIcon key="settings" />,
        <LogOutIcon key="logout" />,
        <ArrowUpRightIcon key="arrow" />,
        <ListIcon key="list" />,
      ];

      icons.forEach((icon) => {
        const { container } = render(icon);
        const svg = container.querySelector("svg");
        // strokeWidth prop becomes stroke-width attribute in SVG
        expect(svg).toHaveAttribute("stroke-width", "1.5");
      });
    });
  });
});

