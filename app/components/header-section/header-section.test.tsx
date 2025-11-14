import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeaderSection, type HeaderButton } from "./header-section";
import { ArrowUpRightIcon } from "../icons/icons";

describe("HeaderSection", () => {
  const mockButtons: HeaderButton[] = [
    {
      icon: <ArrowUpRightIcon />,
      text: "Send to Slack",
      onClick: vi.fn(),
    },
    {
      icon: <ArrowUpRightIcon />,
      text: "Link to Jira",
      onClick: vi.fn(),
    },
  ];

  const mockInfoText = [
    "Created 8/3/2025",
    "Policy Version: Acme Inc. Content Policy 4.2",
    "Model Version: Content Model 2.1",
  ];

  it("renders page name", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
      />
    );
    expect(screen.getByText("PRESSURE TEST REPORT")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Acme Inc. Content Model 2.1"
        infoText={mockInfoText}
        buttons={mockButtons}
      />
    );
    expect(screen.getByText("Acme Inc. Content Model 2.1")).toBeInTheDocument();
  });

  it("renders all info text lines", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
      />
    );
    expect(screen.getByText("Created 8/3/2025")).toBeInTheDocument();
    expect(screen.getByText("Policy Version: Acme Inc. Content Policy 4.2")).toBeInTheDocument();
    expect(screen.getByText("Model Version: Content Model 2.1")).toBeInTheDocument();
  });

  it("renders all buttons", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
      />
    );
    expect(screen.getByText("Send to Slack")).toBeInTheDocument();
    expect(screen.getByText("Link to Jira")).toBeInTheDocument();
  });

  it("calls button onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    const buttonsWithHandler: HeaderButton[] = [
      {
        icon: <ArrowUpRightIcon />,
        text: "Test Button",
        onClick: handleClick,
      },
    ];

    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={buttonsWithHandler}
      />
    );

    const button = screen.getByText("Test Button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders view all reports button when provided", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
        viewAllReportsButton={{
          text: "View All Reports",
          icon: <ArrowUpRightIcon />,
        }}
      />
    );
    expect(screen.getByText("View All Reports")).toBeInTheDocument();
  });

  it("calls view all reports onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
        viewAllReportsButton={{
          text: "View All Reports",
          icon: <ArrowUpRightIcon />,
          onClick: handleClick,
        }}
      />
    );

    const button = screen.getByText("View All Reports");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not render view all reports button when not provided", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
      />
    );
    expect(screen.queryByText("View All Reports")).not.toBeInTheDocument();
  });

  it("applies correct styling to page name", () => {
    const { container } = render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
      />
    );
    const pageName = screen.getByText("PRESSURE TEST REPORT");
    expect(pageName).toHaveClass("text-[#1570ef]");
    expect(pageName).toHaveClass("uppercase");
  });

  it("applies correct styling to title", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
      />
    );
    const title = screen.getByText("Test Title");
    expect(title).toHaveClass("font-semibold");
    expect(title).toHaveClass("text-[#181d27]");
    expect(title).toHaveClass("text-[30px]");
  });

  it("applies correct styling to info text", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
      />
    );
    const infoTextElement = screen.getByText("Created 8/3/2025");
    expect(infoTextElement).toHaveClass("text-[#535862]");
  });

  it("applies correct styling to buttons", () => {
    const { container } = render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={mockButtons}
      />
    );
    const button = screen.getByText("Send to Slack").closest("button");
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("border-[#d5d7da]");
    expect(button).toHaveClass("rounded-lg");
  });

  it("renders buttons without onClick handlers", () => {
    const buttonsWithoutHandlers: HeaderButton[] = [
      {
        icon: <ArrowUpRightIcon />,
        text: "No Handler Button",
      },
    ];

    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={buttonsWithoutHandlers}
      />
    );

    const button = screen.getByText("No Handler Button");
    expect(button).toBeInTheDocument();
    // Should not throw when clicked
    expect(() => button.click()).not.toThrow();
  });

  it("handles empty info text array", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={[]}
        buttons={mockButtons}
      />
    );
    expect(screen.getByText("PRESSURE TEST REPORT")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("handles empty buttons array", () => {
    render(
      <HeaderSection
        pageName="PRESSURE TEST REPORT"
        title="Test Title"
        infoText={mockInfoText}
        buttons={[]}
      />
    );
    expect(screen.getByText("PRESSURE TEST REPORT")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});

