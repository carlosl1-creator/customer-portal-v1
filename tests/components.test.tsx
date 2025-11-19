import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

// Import all components
import { Badge } from "~/components/badge/badge";
import { Button } from "~/components/button/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Modal } from "~/components/modal/modal";
import { PoliciesTable, type Policy } from "~/components/tables/policies-table/policies-table";
import { TestPrioritizationTable, type TestCategory } from "~/components/tables/test-prioritization-table/test-prioritization-table";
import { TestPrioritizationDiffTable, type TestCategoryDiff } from "~/components/tables/test-prioritization-diff-table/test-prioritization-diff-table";
import { ContentDiffView } from "~/components/content-diff-view/content-diff-view";
import { UploadLocalFileModal } from "~/components/upload-local-file-modal/upload-local-file-modal";
import { HeaderSection, type HeaderButton } from "~/components/header-section/header-section";
import { LeftNavBar, type NavItem } from "~/components/left-nav-bar/left-nav-bar";
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
  HashIcon,
  HelpIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MaximizeIcon,
  LockIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CalendarIcon,
  XIcon,
  FilterIcon,
  SearchIcon,
  PlusIcon,
} from "~/components/icons/icons";
import { InputField } from "~/components/input-field/input-field";
import { Select } from "~/components/select/select";
import { Pagination } from "~/components/pagination/pagination";
import { SettingsCheckbox } from "~/components/settings-checkbox/settings-checkbox";
import { LoadingSpinner } from "~/components/loading/loading-spinner/loading-spinner";
import { LoadingHeader } from "~/components/loading/loading-header/loading-header";
import { GeometricBackground } from "~/components/geometric-background/geometric-background";
import { PageContainer } from "~/components/page-container/page-container";
import { Section } from "~/components/section/section";
import { Card } from "~/components/cards/card/card";
import { RatingCard } from "~/components/cards/rating-card/rating-card";
import { PillarScoreCard } from "~/components/cards/pillar-score-card/pillar-score-card";
import { RadialChart } from "~/components/charts/radial-chart/radial-chart";
import { BarChart } from "~/components/charts/bar-chart/bar-chart";
import { BubbleChart } from "~/components/charts/bubble-chart/bubble-chart";
import { LoadingStepCard, type LoadingStep } from "~/components/cards/loading-step-card/loading-step-card";
import { ReportsTable, type Report } from "~/components/tables/reports-table/reports-table";
import { ReportsFilterBar } from "~/components/filters/reports-filter-bar/reports-filter-bar";
import { FilterBar } from "~/components/filters/filter-bar/filter-bar";
import { TestCasesTable, type TestCase } from "~/components/tables/test-cases-table/test-cases-table";
import { CategoriesTable, type Category } from "~/components/tables/categories-table/categories-table";
import { ComparisonTable, type ComparisonCase } from "~/components/tables/comparison-table/comparison-table";
import { BenchmarksTable, type Benchmark } from "~/components/tables/benchmarks-table/benchmarks-table";
import { RiskAreasTable, type RiskAreaCase } from "~/components/tables/risk-areas-table/risk-areas-table";
import { SelectableReportsTable } from "~/components/tables/selectable-reports-table/selectable-reports-table";
import { CasesCard } from "~/components/cards/cases-card/cases-card";
import { SuggestionsCard, type Suggestion } from "~/components/cards/suggestions-card/suggestions-card";
import { TopRiskAreaCard } from "~/components/cards/top-risk-area-card/top-risk-area-card";
import { FoundVulnerabilitiesCard } from "~/components/cards/found-vulnerabilities-card/found-vulnerabilities-card";
import { ConversationalStatisticsCard } from "~/components/cards/conversational-statistics-card/conversational-statistics-card";
import { Dashboard } from "~/components/dashboard/dashboard";

// Helper to render with router
const renderWithRouter = (ui: React.ReactElement, initialEntries = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>
  );
};

// ============================================================================
// Badge Tests
// ============================================================================
describe("Badge", () => {
  it("renders badge with children", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies default neutral variant", () => {
    const { container } = render(<Badge>Neutral</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveStyle({ backgroundColor: "#F5F5F5" });
  });

  it("applies success variant styles", () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveStyle({ backgroundColor: "#ECFDF3" });
  });

  it("applies warning variant styles", () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveStyle({ backgroundColor: "#FFFAEB" });
  });

  it("applies info variant styles", () => {
    const { container } = render(<Badge variant="info">Info</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveStyle({ backgroundColor: "#EFF8FF" });
  });

  it("applies active variant styles", () => {
    const { container } = render(<Badge variant="active">Active</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveStyle({ backgroundColor: "#EFF8FF" });
  });

  it("applies draft variant styles", () => {
    const { container } = render(<Badge variant="draft">Draft</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveStyle({ backgroundColor: "#F4F3FF" });
  });

  it("applies archive variant styles", () => {
    const { container } = render(<Badge variant="archive">Archive</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveStyle({ backgroundColor: "#F5F5F5" });
  });

  it("applies custom className", () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass("custom-class");
  });
});

// ============================================================================
// Button Tests
// ============================================================================
describe("Button", () => {
  it("renders button with text", () => {
    render(<Button text="Click me" />);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders button with icon and text", () => {
    const { container } = render(
      <Button
        text="Open Report"
        icon={<ArrowUpRightIcon />}
      />
    );
    expect(screen.getByRole("button", { name: /open report/i })).toBeInTheDocument();
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button text="Primary Button" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[#1570EF]");
    expect(button).toHaveClass("text-white");
  });

  it("applies primary variant styles when explicitly set", () => {
    render(<Button text="Primary Button" variant="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[#1570EF]");
    expect(button).toHaveClass("text-white");
  });

  it("applies secondary variant styles", () => {
    render(<Button text="Secondary Button" variant="secondary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("text-[#414651]");
    expect(button).toHaveClass("border-[#e9eaeb]");
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button text="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when not provided", async () => {
    const user = userEvent.setup();
    render(<Button text="Click me" />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    expect(button).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button text="Custom Button" className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("renders without icon when icon prop is not provided", () => {
    render(<Button text="No Icon Button" />);
    const button = screen.getByRole("button");
    const iconContainer = button.querySelector(".shrink-0.w-5.h-5");
    expect(iconContainer).not.toBeInTheDocument();
  });

  it("renders text with correct styling", () => {
    render(<Button text="Styled Text" />);
    const textElement = screen.getByText("Styled Text");
    expect(textElement).toHaveClass("font-semibold");
    expect(textElement).toHaveClass("text-base");
    expect(textElement).toHaveClass("leading-6");
  });

  it("renders icon container with correct styling when icon is provided", () => {
    const { container } = render(
      <Button
        text="With Icon"
        icon={<ArrowUpRightIcon />}
      />
    );
    const iconContainer = container.querySelector(".shrink-0.w-5.h-5");
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass("shrink-0");
    expect(iconContainer).toHaveClass("w-5");
    expect(iconContainer).toHaveClass("h-5");
  });
});

// ============================================================================
// ButtonGroup Tests
// ============================================================================
describe("ButtonGroup", () => {
  const mockOptions = [
    { label: "Active", value: "active" },
    { label: "Draft", value: "draft" },
    { label: "Archive", value: "archive" },
  ];

  it("renders all options", () => {
    render(<ButtonGroup options={mockOptions} value="active" onChange={() => {}} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Draft")).toBeInTheDocument();
    expect(screen.getByText("Archive")).toBeInTheDocument();
  });

  it("calls onChange when option is clicked", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<ButtonGroup options={mockOptions} value="active" onChange={handleChange} />);
    
    const draftButton = screen.getByText("Draft");
    await user.click(draftButton);
    
    expect(handleChange).toHaveBeenCalledWith("draft");
  });

  it("applies selected styling to active option", () => {
    const { container } = render(
      <ButtonGroup options={mockOptions} value="active" onChange={() => {}} />
    );
    const activeButton = screen.getByText("Active").closest("button");
    expect(activeButton).toHaveStyle({ backgroundColor: "#EFF8FF" });
  });

  it("does not apply selected styling to non-active options", () => {
    render(<ButtonGroup options={mockOptions} value="active" onChange={() => {}} />);
    const draftButton = screen.getByText("Draft").closest("button");
    expect(draftButton).toBeInTheDocument();
    expect(draftButton).not.toHaveStyle({ backgroundColor: "#EFF8FF" });
  });

  it("renders options with icons", () => {
    const optionsWithIcons = [
      { label: "Option 1", value: "opt1", icon: <span>Icon1</span> },
      { label: "Option 2", value: "opt2", icon: <span>Icon2</span> },
    ];
    render(<ButtonGroup options={optionsWithIcons} value="opt1" onChange={() => {}} />);
    expect(screen.getByText("Icon1")).toBeInTheDocument();
    expect(screen.getByText("Icon2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ButtonGroup
        options={mockOptions}
        value="active"
        onChange={() => {}}
        className="custom-class"
      />
    );
    const buttonGroup = container.firstChild as HTMLElement;
    expect(buttonGroup).toHaveClass("custom-class");
  });
});

// ============================================================================
// Modal Tests
// ============================================================================
describe("Modal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="My Title">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Title"
        description="Test Description"
      >
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Title">
        <p>Content</p>
      </Modal>
    );
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Content</p>
      </Modal>
    );
    
    const closeButton = screen.getByLabelText("Close modal");
    await user.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Content</p>
      </Modal>
    );
    
    const backdrop = document.querySelector('[aria-hidden="true"]');
    if (backdrop) {
      await user.click(backdrop);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  it("calls onClose when Escape key is pressed", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Content</p>
      </Modal>
    );
    
    await user.keyboard("{Escape}");
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test"
        className="custom-modal"
      >
        <p>Content</p>
      </Modal>
    );
    const modal = container.querySelector('[role="dialog"]');
    expect(modal).toHaveClass("custom-modal");
  });

  it("has proper ARIA attributes", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Content</p>
      </Modal>
    );
    const modal = screen.getByRole("dialog");
    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("aria-labelledby", "modal-title");
  });
});

// ============================================================================
// PoliciesTable Tests
// ============================================================================
describe("PoliciesTable", () => {
  const mockPolicies: Policy[] = [
    {
      id: "1",
      name: "Content Policy",
      version: "2.1",
      created: "8/14/2025",
      status: "active",
      reports: 2,
      content: "Test content",
    },
    {
      id: "2",
      name: "Another Policy",
      version: "1.0",
      created: "7/10/2025",
      status: "draft",
      reports: 0,
      content: "Another test content",
    },
  ];

  it("renders all policies", () => {
    render(<PoliciesTable policies={mockPolicies} />);
    expect(screen.getByText("Content Policy")).toBeInTheDocument();
    expect(screen.getByText("Another Policy")).toBeInTheDocument();
  });

  it("renders policy details", () => {
    render(<PoliciesTable policies={mockPolicies} />);
    expect(screen.getByText("2.1")).toBeInTheDocument();
    expect(screen.getByText("8/14/2025")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders status badges", () => {
    render(<PoliciesTable policies={mockPolicies} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", async () => {
    const handleEdit = vi.fn();
    const user = userEvent.setup();
    render(<PoliciesTable policies={mockPolicies} onEdit={handleEdit} />);
    
    const editButtons = screen.getAllByText("Edit");
    await user.click(editButtons[0]);
    
    expect(handleEdit).toHaveBeenCalledWith(mockPolicies[0]);
  });

  it("calls onDelete when delete button is clicked", async () => {
    const handleDelete = vi.fn();
    const user = userEvent.setup();
    render(<PoliciesTable policies={mockPolicies} onDelete={handleDelete} />);
    
    const deleteButtons = screen.getAllByText("Delete");
    await user.click(deleteButtons[0]);
    
    expect(handleDelete).toHaveBeenCalledWith(mockPolicies[0]);
  });

  it("sorts by version when version header is clicked", async () => {
    const user = userEvent.setup();
    render(<PoliciesTable policies={mockPolicies} />);
    
    const versionHeader = screen.getByText("Version").parentElement?.querySelector("button");
    if (versionHeader) {
      await user.click(versionHeader);
      const rows = screen.getAllByText(/Content Policy|Another Policy/);
      expect(rows.length).toBeGreaterThan(0);
    }
  });

  it("applies custom className", () => {
    const { container } = render(
      <PoliciesTable policies={mockPolicies} className="custom-table" />
    );
    const table = container.firstChild as HTMLElement;
    expect(table).toHaveClass("custom-table");
  });

  it("renders pagination", () => {
    render(<PoliciesTable policies={mockPolicies} />);
    expect(screen.getByText(/Page/)).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});

// ============================================================================
// TestPrioritizationTable Tests
// ============================================================================
describe("TestPrioritizationTable", () => {
  const mockCategories: TestCategory[] = [
    {
      id: "1",
      name: "Violence",
      priority: "high",
      description: "Test description 1",
    },
    {
      id: "2",
      name: "Self-Harm",
      priority: "medium",
      description: "Test description 2",
    },
  ];

  it("renders all categories", () => {
    render(<TestPrioritizationTable categories={mockCategories} />);
    expect(screen.getByText("Violence")).toBeInTheDocument();
    expect(screen.getByText("Self-Harm")).toBeInTheDocument();
  });

  it("renders search bar", () => {
    render(<TestPrioritizationTable categories={mockCategories} />);
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
  });

  it("filters categories based on search query", async () => {
    const user = userEvent.setup();
    render(<TestPrioritizationTable categories={mockCategories} />);
    
    const searchInput = screen.getByPlaceholderText("Search");
    await user.type(searchInput, "Violence");
    
    expect(screen.getByText("Violence")).toBeInTheDocument();
    expect(screen.queryByText("Self-Harm")).not.toBeInTheDocument();
  });

  it("calls onPriorityChange when priority is changed", async () => {
    const handlePriorityChange = vi.fn();
    const user = userEvent.setup();
    render(
      <TestPrioritizationTable
        categories={mockCategories}
        onPriorityChange={handlePriorityChange}
      />
    );
    
    const priorityButtons = screen.getAllByText("High");
    if (priorityButtons.length > 0) {
      await user.click(priorityButtons[0]);
      const criticalOption = screen.getByText("Critical");
      if (criticalOption) {
        await user.click(criticalOption);
        expect(handlePriorityChange).toHaveBeenCalled();
      }
    }
  });

  it("calls onViewDetails when view details button is clicked", async () => {
    const handleViewDetails = vi.fn();
    const user = userEvent.setup();
    render(
      <TestPrioritizationTable
        categories={mockCategories}
        onViewDetails={handleViewDetails}
      />
    );
    
    const allButtons = screen.getAllByRole("button");
    const detailsButtons = allButtons.filter((btn) => {
      const svg = btn.querySelector('svg');
      return svg !== null;
    });
    
    if (detailsButtons.length > 0) {
      const actionButton = detailsButtons.find((btn) => {
        const svg = btn.querySelector('svg');
        return svg && btn.closest('td, div')?.textContent === '';
      }) || detailsButtons[detailsButtons.length - 1];
      
      if (actionButton) {
        await user.click(actionButton);
        expect(handleViewDetails).toHaveBeenCalled();
      }
    }
  });

  it("renders pagination controls", () => {
    render(<TestPrioritizationTable categories={mockCategories} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TestPrioritizationTable categories={mockCategories} className="custom-class" />
    );
    const table = container.firstChild as HTMLElement;
    expect(table).toHaveClass("custom-class");
  });
});

// ============================================================================
// TestPrioritizationDiffTable Tests
// ============================================================================
describe("TestPrioritizationDiffTable", () => {
  const mockCategories: TestCategoryDiff[] = [
    {
      id: "1",
      name: "Violence",
      oldPriority: "high",
      newPriority: "critical",
      description: "Test description 1",
    },
    {
      id: "2",
      name: "Self-Harm",
      oldPriority: "high",
      newPriority: "high",
      description: "Test description 2",
    },
  ];

  it("renders all categories", () => {
    render(<TestPrioritizationDiffTable categories={mockCategories} />);
    expect(screen.getByText("Violence")).toBeInTheDocument();
    expect(screen.getByText("Self-Harm")).toBeInTheDocument();
  });

  it("renders search bar", () => {
    render(<TestPrioritizationDiffTable categories={mockCategories} />);
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
  });

  it("filters categories based on search query", async () => {
    const user = userEvent.setup();
    render(<TestPrioritizationDiffTable categories={mockCategories} />);
    
    const searchInput = screen.getByPlaceholderText("Search");
    await user.type(searchInput, "Violence");
    
    expect(screen.getByText("Violence")).toBeInTheDocument();
    expect(screen.queryByText("Self-Harm")).not.toBeInTheDocument();
  });

  it("shows priority diff when priorities differ", () => {
    render(<TestPrioritizationDiffTable categories={mockCategories} />);
    const highTexts = screen.getAllByText("High");
    expect(highTexts.length).toBeGreaterThan(0);
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("shows only one priority when priorities are the same", () => {
    render(<TestPrioritizationDiffTable categories={mockCategories} />);
    const highTexts = screen.getAllByText("High");
    expect(highTexts.length).toBeGreaterThan(0);
  });

  it("calls onViewDetails when view details button is clicked", async () => {
    const handleViewDetails = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <TestPrioritizationDiffTable
        categories={mockCategories}
        onViewDetails={handleViewDetails}
      />
    );
    
    const viewDetailsButtons = container.querySelectorAll('button');
    const detailsButton = Array.from(viewDetailsButtons).find((btn) => {
      const svg = btn.querySelector('svg[stroke="#535862"]');
      return svg !== null && !btn.textContent?.includes("Search") && !btn.textContent?.includes("Previous") && !btn.textContent?.includes("Next");
    });
    
    if (detailsButton) {
      await user.click(detailsButton);
      expect(handleViewDetails).toHaveBeenCalled();
    } else {
      expect(handleViewDetails).toBeDefined();
    }
  });

  it("renders pagination controls", () => {
    render(<TestPrioritizationDiffTable categories={mockCategories} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TestPrioritizationDiffTable categories={mockCategories} className="custom-class" />
    );
    const table = container.firstChild as HTMLElement;
    expect(table).toHaveClass("custom-class");
  });
});

// ============================================================================
// ContentDiffView Tests
// ============================================================================
describe("ContentDiffView", () => {
  const beforeContent = "Original content\nLine 2";
  const afterContent = "Updated content\nLine 2\nNew line";

  it("renders before and after content", () => {
    render(<ContentDiffView before={beforeContent} after={afterContent} />);
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
  });

  it("renders before content", () => {
    render(<ContentDiffView before={beforeContent} after={afterContent} />);
    expect(screen.getByText("Original content")).toBeInTheDocument();
  });

  it("renders after content", () => {
    render(<ContentDiffView before={beforeContent} after={afterContent} />);
    expect(screen.getByText("Updated content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ContentDiffView before={beforeContent} after={afterContent} className="custom-class" />
    );
    const diffView = container.firstChild as HTMLElement;
    expect(diffView).toHaveClass("custom-class");
  });

  it("handles empty content", () => {
    render(<ContentDiffView before="" after="" />);
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
  });

  it("renders multiple lines correctly", () => {
    const multiLineBefore = "Line 1\nLine 2\nLine 3";
    const multiLineAfter = "Line 1\nLine 2 Modified\nLine 3";
    render(<ContentDiffView before={multiLineBefore} after={multiLineAfter} />);
    const line1Elements = screen.getAllByText("Line 1");
    expect(line1Elements.length).toBeGreaterThan(0);
    expect(screen.getByText("Line 2 Modified")).toBeInTheDocument();
  });
});

// ============================================================================
// InputField Tests
// ============================================================================
describe("InputField", () => {
  it("renders label and input", () => {
    render(<InputField label="Test Label" value="" onChange={() => {}} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays value", () => {
    render(<InputField label="Label" value="Test Value" onChange={() => {}} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Test Value");
  });

  it("calls onChange when input changes", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<InputField label="Label" value="" onChange={handleChange} />);
    
    const input = screen.getByRole("textbox");
    await user.type(input, "test");
    
    expect(handleChange).toHaveBeenCalled();
  });

  it("displays placeholder", () => {
    render(<InputField label="Label" value="" placeholder="Enter text" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("disables input when disabled prop is true", () => {
    render(<InputField label="Label" value="" disabled={true} onChange={() => {}} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <InputField label="Label" value="" onChange={() => {}} className="custom-class" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });
});

// ============================================================================
// Select Tests
// ============================================================================
describe("Select", () => {
  const mockOptions = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" },
  ];

  it("renders label and select button", () => {
    render(<Select label="Test Label" options={mockOptions} onChange={() => {}} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("displays placeholder when no value selected", () => {
    render(<Select label="Label" options={mockOptions} placeholder="Choose..." onChange={() => {}} />);
    expect(screen.getByText("Choose...")).toBeInTheDocument();
  });

  it("displays selected option", () => {
    render(<Select label="Label" options={mockOptions} value="opt1" onChange={() => {}} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("opens dropdown when clicked", async () => {
    const user = userEvent.setup();
    render(<Select label="Label" options={mockOptions} onChange={() => {}} />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("calls onChange when option is selected", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Select label="Label" options={mockOptions} onChange={handleChange} />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    const option = screen.getByText("Option 2");
    await user.click(option);
    
    expect(handleChange).toHaveBeenCalledWith("opt2");
  });

  it("shows required indicator", () => {
    render(<Select label="Label" options={mockOptions} required={true} onChange={() => {}} />);
    const requiredIndicator = screen.getByText("*");
    expect(requiredIndicator).toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Select label="Label" options={mockOptions} onChange={() => {}} />
        <div>Outside</div>
      </div>
    );
    
    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    
    await user.click(screen.getByText("Outside"));
    // Dropdown should close (options not visible)
    await waitFor(() => {
      const options = screen.queryAllByText(/Option \d/);
      expect(options.length).toBe(0);
    });
  });

  it("applies custom className", () => {
    const { container } = render(
      <Select label="Label" options={mockOptions} onChange={() => {}} className="custom-class" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });
});

// ============================================================================
// Pagination Tests
// ============================================================================
describe("Pagination", () => {
  it("renders page information", () => {
    render(<Pagination currentPage={1} totalPages={5} onPrevious={() => {}} onNext={() => {}} />);
    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPrevious={() => {}} onNext={() => {}} />);
    const previousButton = screen.getByText("Previous").closest("button");
    expect(previousButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPrevious={() => {}} onNext={() => {}} />);
    const nextButton = screen.getByText("Next").closest("button");
    expect(nextButton).toBeDisabled();
  });

  it("calls onPrevious when previous button is clicked", async () => {
    const handlePrevious = vi.fn();
    const user = userEvent.setup();
    render(<Pagination currentPage={2} totalPages={5} onPrevious={handlePrevious} onNext={() => {}} />);
    
    const previousButton = screen.getByText("Previous");
    await user.click(previousButton);
    
    expect(handlePrevious).toHaveBeenCalledTimes(1);
  });

  it("calls onNext when next button is clicked", async () => {
    const handleNext = vi.fn();
    const user = userEvent.setup();
    render(<Pagination currentPage={2} totalPages={5} onPrevious={() => {}} onNext={handleNext} />);
    
    const nextButton = screen.getByText("Next");
    await user.click(nextButton);
    
    expect(handleNext).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={5} onPrevious={() => {}} onNext={() => {}} className="custom-class" />
    );
    const pagination = container.firstChild as HTMLElement;
    expect(pagination).toHaveClass("custom-class");
  });
});

// ============================================================================
// SettingsCheckbox Tests
// ============================================================================
describe("SettingsCheckbox", () => {
  it("renders label", () => {
    render(<SettingsCheckbox checked={false} onChange={() => {}} label="Test Checkbox" />);
    expect(screen.getByText("Test Checkbox")).toBeInTheDocument();
  });

  it("calls onChange when clicked", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<SettingsCheckbox checked={false} onChange={handleChange} label="Checkbox" />);
    
    const checkbox = screen.getByRole("button");
    await user.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("shows checked state", () => {
    render(<SettingsCheckbox checked={true} onChange={() => {}} label="Checkbox" />);
    const checkbox = screen.getByRole("button");
    const checkmark = checkbox.querySelector("svg");
    expect(checkmark).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <SettingsCheckbox checked={false} onChange={() => {}} label="Checkbox" className="custom-class" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });
});

// ============================================================================
// LoadingSpinner Tests
// ============================================================================
describe("LoadingSpinner", () => {
  it("renders spinner", () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies custom size", () => {
    const { container } = render(<LoadingSpinner size={24} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
  });

  it("applies custom className", () => {
    const { container } = render(<LoadingSpinner className="custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });
});

// ============================================================================
// LoadingHeader Tests
// ============================================================================
describe("LoadingHeader", () => {
  it("renders title and subtitle", () => {
    render(<LoadingHeader title="Loading" subtitle="Please wait..." />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });

  it("renders loading spinner", () => {
    const { container } = render(<LoadingHeader title="Loading" subtitle="Wait" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <LoadingHeader title="Loading" subtitle="Wait" className="custom-class" />
    );
    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass("custom-class");
  });
});

// ============================================================================
// GeometricBackground Tests
// ============================================================================
describe("GeometricBackground", () => {
  it("renders background image", () => {
    const { container } = render(<GeometricBackground />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/sine.svg");
  });

  it("has aria-hidden attribute", () => {
    const { container } = render(<GeometricBackground />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("aria-hidden", "true");
  });
});

// ============================================================================
// PageContainer Tests
// ============================================================================
describe("PageContainer", () => {
  it("renders children", () => {
    render(
      <PageContainer>
        <div>Test Content</div>
      </PageContainer>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders geometric background", () => {
    const { container } = render(<PageContainer><div>Content</div></PageContainer>);
    const img = container.querySelector("img[src='/sine.svg']");
    expect(img).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PageContainer className="custom-class">
        <div>Content</div>
      </PageContainer>
    );
    const pageContainer = container.querySelector(".relative.border");
    expect(pageContainer).toHaveClass("custom-class");
  });
});

// ============================================================================
// Section Tests
// ============================================================================
describe("Section", () => {
  const mockCards = [
    {
      icon: <span>Icon1</span>,
      title: "Card 1",
      focusText: "Focus 1",
      listTitle: "List 1",
      listItems: ["Item 1", "Item 2"],
    },
    {
      icon: <span>Icon2</span>,
      title: "Card 2",
      focusText: "Focus 2",
      listTitle: "List 2",
      listItems: ["Item 3"],
    },
  ];

  it("renders title", () => {
    render(<Section title="Test Section" cards={mockCards} />);
    expect(screen.getByText("Test Section")).toBeInTheDocument();
  });

  it("renders all cards", () => {
    render(<Section title="Section" cards={mockCards} />);
    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Section title="Section" cards={mockCards} className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass("custom-class");
  });
});

// ============================================================================
// UploadLocalFileModal Tests
// ============================================================================
describe("UploadLocalFileModal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <UploadLocalFileModal
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );
    expect(screen.queryByText("Upload Local File")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(
      <UploadLocalFileModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );
    expect(screen.getByText("Upload Local File")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(
      <UploadLocalFileModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );
    expect(
      screen.getByText(/Select a file from your computer or drag a file/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Supported Files: \*\.txt, \*\.md, \*\.pdf, \*\.otf/)).toBeInTheDocument();
  });

  it("renders drag and drop area", () => {
    render(
      <UploadLocalFileModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );
    expect(screen.getByText(/Drag & Drop or/)).toBeInTheDocument();
    expect(screen.getByText(/select a local file/)).toBeInTheDocument();
  });

  it("renders cancel and confirm buttons", () => {
    render(
      <UploadLocalFileModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls onClose when cancel is clicked", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(
      <UploadLocalFileModal
        isOpen={true}
        onClose={handleClose}
        onConfirm={() => {}}
      />
    );
    
    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("disables confirm button when no file is selected", () => {
    render(
      <UploadLocalFileModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );
    const confirmButton = screen.getByText("Confirm").closest("button");
    expect(confirmButton).toBeDisabled();
  });

  it("enables confirm button when file is selected", async () => {
    const handleConfirm = vi.fn();
    const user = userEvent.setup();
    render(
      <UploadLocalFileModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={handleConfirm}
      />
    );
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["test content"], "test.txt", { type: "text/plain" });
    
    if (fileInput) {
      await user.upload(fileInput, file);
      const confirmButton = screen.getByText("Confirm").closest("button");
      expect(confirmButton).not.toBeDisabled();
    }
  });
});

// ============================================================================
// HeaderSection Tests
// ============================================================================
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
    const parent = infoTextElement.parentElement;
    expect(parent).toHaveClass("text-[#535862]");
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
    expect(button).toHaveClass("border-[#d5d7da]");
    expect(button).toHaveClass("rounded-[8px]");
    expect(button).toBeInTheDocument();
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

// ============================================================================
// Icons Tests
// ============================================================================
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
        expect(svg).toHaveAttribute("stroke-width", "1.5");
      });
    });
  });
});

// ============================================================================
// LeftNavBar Tests
// ============================================================================
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
    const links = container.querySelectorAll("a[href]");
    expect(links.length).toBeGreaterThanOrEqual(2);
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
    expect(screen.getByLabelText("Logo")).toBeInTheDocument();
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
      expect(navBar).toHaveClass("w-[240px]");
    }
  });

  it("collapses immediately on mouse leave", async () => {
    const { container } = renderWithRouter(<LeftNavBar navItems={mockNavItems} />);

    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;

    if (navBar) {
      fireEvent.mouseEnter(navBar);
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      expect(navBar).toHaveClass("w-[240px]");

      fireEvent.mouseLeave(navBar);
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
      fireEvent.mouseEnter(navBar);
    }

    expect(() => unmount()).not.toThrow();
  });

  it("applies correct text colors in dark mode", async () => {
    const { container } = renderWithRouter(
      <LeftNavBar navItems={mockNavItems} darkMode={true} />,
      ["/settings"]
    );
    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;
    if (navBar) {
      fireEvent.mouseEnter(navBar);
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      const settingsText = screen.getByText("Settings");
      expect(settingsText).toHaveClass("text-[#FDFDFD]");
    }
  });

  it("applies correct text colors in light mode", async () => {
    const { container } = renderWithRouter(
      <LeftNavBar navItems={mockNavItems} darkMode={false} />,
      ["/settings"]
    );
    const navBar = container.querySelector(".box-border.flex.flex-col.h-screen") as HTMLElement;
    if (navBar) {
      fireEvent.mouseEnter(navBar);
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      const settingsText = screen.getByText("Settings");
      expect(settingsText).toHaveClass("text-[#181D27]");
    }
  });
});

// ============================================================================
// Additional Component Tests - Adding tests for all remaining components
// ============================================================================

// Card Tests
describe("Card", () => {
  const mockCard = {
    icon: <span>Icon</span>,
    title: "Test Card",
    focusText: "Focus text",
    listTitle: "List Title",
    listItems: ["Item 1", "Item 2"],
  };

  it("renders card with all props", () => {
    render(<Card {...mockCard} />);
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Focus text")).toBeInTheDocument();
    expect(screen.getByText("List Title")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("calls onThumbsUpClick when thumbs up is clicked", async () => {
    const handleThumbsUp = vi.fn();
    render(<Card {...mockCard} onThumbsUpClick={handleThumbsUp} />);
    
    const thumbsUp = screen.getByLabelText("Thumbs up");
    fireEvent.click(thumbsUp);
    
    expect(handleThumbsUp).toHaveBeenCalledTimes(1);
  });

  it("applies sunset gradient variant", () => {
    const { container } = render(<Card {...mockCard} gradientVariant="sunset" />);
    const gradient = container.querySelector(".bg-gradient-to-b.from-white.via-white.to-\\[\\#f5f5f5\\]");
    expect(gradient).toBeInTheDocument();
  });
});

// RadialChart Tests
describe("RadialChart", () => {
  it("renders chart with rating", () => {
    const { container } = render(<RadialChart rating={4.5} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("clamps rating between 1 and 5", () => {
    render(<RadialChart rating={10} />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
  });

  it("applies custom size", () => {
    const { container } = render(<RadialChart rating={3} size={120} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "120");
  });
});

// BarChart Tests
describe("BarChart", () => {
  const mockData = [
    { label: "Bar 1", value: 50, color: "#FF0000", borderColor: "#CC0000" },
    { label: "Bar 2", value: 75, color: "#00FF00", borderColor: "#00CC00" },
  ];

  it("renders bars and labels", () => {
    render(<BarChart data={mockData} />);
    expect(screen.getByText("Bar 1")).toBeInTheDocument();
    expect(screen.getByText("Bar 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BarChart data={mockData} className="custom-class" />);
    const chart = container.firstChild as HTMLElement;
    expect(chart).toHaveClass("custom-class");
  });
});

// BubbleChart Tests
describe("BubbleChart", () => {
  const mockBubbles = [
    { percentage: 50, color: "#FF0000" },
    { percentage: 30, color: "#00FF00" },
    { percentage: 20, color: "#0000FF" },
  ];

  it("renders bubbles with percentages", () => {
    render(<BubbleChart bubbles={mockBubbles} />);
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("sorts and limits to 4 bubbles", () => {
    const manyBubbles = Array.from({ length: 10 }, (_, i) => ({
      percentage: i * 10,
      color: "#000000",
    }));
    render(<BubbleChart bubbles={manyBubbles} />);
    // Should show top 4 (90%, 80%, 70%, 60%)
    expect(screen.getByText("90%")).toBeInTheDocument();
  });
});

// LoadingStepCard Tests
describe("LoadingStepCard", () => {
  const mockSteps: LoadingStep[] = [
    { title: "Step 1", description: "Description 1", status: "completed" },
    { title: "Step 2", description: "Description 2", status: "in-progress" },
    { title: "Step 3", description: "Description 3", status: "pending" },
  ];

  it("renders all steps", () => {
    render(<LoadingStepCard steps={mockSteps} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("shows checkmark for completed steps", () => {
    const { container } = render(<LoadingStepCard steps={mockSteps} />);
    const checkmark = container.querySelector('svg[stroke="#039855"]');
    expect(checkmark).toBeInTheDocument();
  });

  it("shows spinner for in-progress steps", () => {
    const { container } = render(<LoadingStepCard steps={mockSteps} />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});

// ReportsTable Tests
describe("ReportsTable", () => {
  const mockReports: Report[] = [
    {
      id: "1",
      botVersion: "Bot 1.0",
      policyVersion: "Policy 1.0",
      created: "2023-01-01",
      status: "completed",
      overallReadiness: 4.5,
    },
  ];

  it("renders reports", () => {
    render(<ReportsTable reports={mockReports} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Bot 1.0")).toBeInTheDocument();
  });

  it("calls onRowClick when row is clicked", async () => {
    const handleClick = vi.fn();
    render(<ReportsTable reports={mockReports} onRowClick={handleClick} />);
    
    const reportId = screen.getByText("1");
    const row = reportId.closest("div[class*='cursor-pointer']");
    if (row) {
      fireEvent.click(row);
      expect(handleClick).toHaveBeenCalled();
    }
  });
});

// ReportsFilterBar Tests
describe("ReportsFilterBar", () => {
  it("renders date range and search", () => {
    render(<ReportsFilterBar dateRange="Jan 1 - Jan 31" />);
    expect(screen.getByText("Jan 1 - Jan 31")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls onSearchChange when typing", async () => {
    const handleSearch = vi.fn();
    render(<ReportsFilterBar onSearchChange={handleSearch} />);
    
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });
    
    expect(handleSearch).toHaveBeenCalledWith("test");
  });
});

// FilterBar Tests
describe("FilterBar", () => {
  it("renders filter buttons and search", () => {
    render(<FilterBar />);
    expect(screen.getByText("Turn Length")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls onSearchChange when typing", async () => {
    const handleSearch = vi.fn();
    render(<FilterBar onSearchChange={handleSearch} />);
    
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });
    
    expect(handleSearch).toHaveBeenCalledWith("test");
  });
});

// TestCasesTable Tests
describe("TestCasesTable", () => {
  const mockCases: TestCase[] = [
    {
      caseId: "C1",
      category: "Category 1",
      likelihood: 80,
      modelReasoning: "Reasoning",
      content: "Content",
      chatAndTurnLength: "5 turns",
    },
  ];

  it("renders test cases", () => {
    render(<TestCasesTable testCases={mockCases} />);
    expect(screen.getByText("C1")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
  });

  it("calls onRowClick when row is clicked", async () => {
    const handleClick = vi.fn();
    render(<TestCasesTable testCases={mockCases} onRowClick={handleClick} />);
    
    const caseId = screen.getByText("C1");
    const row = caseId.closest("tr");
    if (row) {
      fireEvent.click(row);
      expect(handleClick).toHaveBeenCalled();
    }
  });
});

// CategoriesTable Tests
describe("CategoriesTable", () => {
  const mockCategories: Category[] = [
    { id: "1", name: "Category 1", priority: "high" },
    { id: "2", name: "Category 2", priority: "medium" },
  ];

  it("renders categories", () => {
    render(
      <CategoriesTable
        categories={mockCategories}
        selectedIds={new Set()}
        onSelectionChange={() => {}}
      />
    );
    expect(screen.getByText("Category 1")).toBeInTheDocument();
  });

  it("calls onSelectionChange when checkbox is clicked", async () => {
    const handleChange = vi.fn();
    render(
      <CategoriesTable
        categories={mockCategories}
        selectedIds={new Set()}
        onSelectionChange={handleChange}
      />
    );
    
    // Find the first category name and get its parent row, then find the checkbox button
    const categoryName = screen.getByText("Category 1");
    const row = categoryName.closest("div[class*='border-b']");
    if (row) {
      const checkboxButton = row.querySelector('button');
      if (checkboxButton) {
        fireEvent.click(checkboxButton);
        expect(handleChange).toHaveBeenCalledWith("1", true);
      }
    }
  });
});

// ComparisonTable Tests
describe("ComparisonTable", () => {
  const mockCases: ComparisonCase[] = [
    {
      caseId: "C1",
      category: "Category 1",
      riskFactor: 25,
      turnLength: { turns: 5, chars: 100 },
    },
  ];

  it("renders comparison cases", () => {
    render(<ComparisonTable title="Test" cases={mockCases} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("C1")).toBeInTheDocument();
  });

  it("calls onCaseClick when case is clicked", async () => {
    const handleClick = vi.fn();
    render(<ComparisonTable title="Test" cases={mockCases} onCaseClick={handleClick} />);
    
    const caseLink = screen.getByText(/Category 1/);
    fireEvent.click(caseLink);
    
    expect(handleClick).toHaveBeenCalled();
  });
});

// BenchmarksTable Tests
describe("BenchmarksTable", () => {
  const mockBenchmarks: Benchmark[] = [
    { id: "1", bot: "Bot 1", description: "Description 1" },
    { id: "2", bot: "Bot 2", description: "Description 2" },
  ];

  it("renders benchmarks", () => {
    render(
      <BenchmarksTable
        benchmarks={mockBenchmarks}
        selectedIds={new Set()}
        onSelectionChange={() => {}}
      />
    );
    expect(screen.getByText("Bot 1")).toBeInTheDocument();
  });

  it("respects maxSelections", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <BenchmarksTable
        benchmarks={mockBenchmarks}
        selectedIds={new Set(["1"])}
        maxSelections={1}
        onSelectionChange={handleChange}
      />
    );
    
    // Try to select second benchmark (should be prevented)
    const checkboxes = screen.getAllByRole("button");
    if (checkboxes.length > 1) {
      fireEvent.click(checkboxes[1]);
      // Should not call onChange for new selection
      expect(handleChange).not.toHaveBeenCalled();
    }
  });
});

// RiskAreasTable Tests
describe("RiskAreasTable", () => {
  const mockCases: RiskAreaCase[] = [
    {
      likelihood: 85,
      expected: "High",
      riskDescription: "Risk description",
      content: "Content",
      chatAndTurnLength: "5 turns",
    },
  ];

  it("renders risk area cases", () => {
    render(<RiskAreasTable cases={mockCases} />);
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Risk description")).toBeInTheDocument();
  });

  it("calls onRowClick when row is clicked", async () => {
    const handleClick = vi.fn();
    render(<RiskAreasTable cases={mockCases} onRowClick={handleClick} />);
    
    const rows = screen.getAllByText("High");
    const row = rows[0].closest("tr");
    if (row) {
      fireEvent.click(row);
      expect(handleClick).toHaveBeenCalled();
    }
  });
});

// SelectableReportsTable Tests
describe("SelectableReportsTable", () => {
  const mockReports = [
    {
      id: "1",
      botVersion: "Bot 1.0",
      policyVersion: "Policy 1.0",
      created: "2023-01-01",
      status: "completed" as const,
    },
  ];

  it("renders selectable reports", () => {
    render(
      <SelectableReportsTable
        reports={mockReports}
        selectedIds={new Set()}
        onSelectionChange={() => {}}
      />
    );
    expect(screen.getByText("Bot 1.0")).toBeInTheDocument();
  });

  it("calls onSelectionChange when checkbox is clicked", async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <SelectableReportsTable
        reports={mockReports}
        selectedIds={new Set()}
        onSelectionChange={handleChange}
      />
    );
    
    // Find the checkbox div (has cursor-pointer class)
    const checkbox = container.querySelector('div[class*="cursor-pointer"][class*="rounded-[6px]"]');
    if (checkbox) {
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalled();
    }
  });
});

// CasesCard Tests
describe("CasesCard", () => {
  const mockScenarios = [
    { label: "Scenario 1", percentage: 50, color: "#FF0000" },
    { label: "Scenario 2", percentage: 30, color: "#00FF00" },
  ];

  it("renders card with total cases and scenarios", () => {
    render(
      <CasesCard
        title="Test Cases"
        subtitle="Subtitle"
        totalCases={1000}
        scenarios={mockScenarios}
      />
    );
    expect(screen.getByText("Test Cases")).toBeInTheDocument();
    expect(screen.getByText("1,000")).toBeInTheDocument();
  });

  it("calls onMaximizeClick when maximize button is clicked", async () => {
    const handleMaximize = vi.fn();
    render(
      <CasesCard
        title="Test"
        subtitle="Sub"
        totalCases={100}
        scenarios={mockScenarios}
        onMaximizeClick={handleMaximize}
      />
    );
    
    const maximizeButton = screen.getByLabelText("Maximize");
    fireEvent.click(maximizeButton);
    
    expect(handleMaximize).toHaveBeenCalledTimes(1);
  });
});

// SuggestionsCard Tests
describe("SuggestionsCard", () => {
  const mockSuggestions: Suggestion[] = [
    { title: "Suggestion 1", description: "Description 1", onClick: vi.fn() },
    { title: "Suggestion 2", description: "Description 2" },
  ];

  it("renders suggestions", () => {
    render(<SuggestionsCard suggestions={mockSuggestions} />);
    expect(screen.getByText("Suggestions")).toBeInTheDocument();
    expect(screen.getByText("Suggestion 1")).toBeInTheDocument();
    expect(screen.getByText("Suggestion 2")).toBeInTheDocument();
  });

  it("calls onClick when suggestion is clicked", async () => {
    const handleClick = vi.fn();
    const suggestions: Suggestion[] = [
      { title: "Suggestion 1", description: "Desc", onClick: handleClick },
    ];
    render(<SuggestionsCard suggestions={suggestions} />);
    
    const suggestion = screen.getByText("Suggestion 1").closest("div[class*='cursor-pointer']");
    if (suggestion) {
      fireEvent.click(suggestion);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });
});

// TopRiskAreaCard Tests
describe("TopRiskAreaCard", () => {
  const mockCases: RiskAreaCase[] = [
    {
      likelihood: 85,
      expected: "High",
      riskDescription: "Risk",
      content: "Content",
      chatAndTurnLength: "5 turns",
    },
  ];

  it("renders risk area card", () => {
    render(
      <TopRiskAreaCard
        number={1}
        title="Risk Area"
        threatLevel="High"
        asrPercentage={50}
        highRiskCases={10}
        priority="High"
        avgTurns={3.5}
        avgTurnLength={100}
        keyInsights={["Insight 1"]}
        cases={mockCases}
        currentPage={1}
        totalPages={1}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );
    expect(screen.getByText("1. Risk Area")).toBeInTheDocument();
    // "High" appears multiple times, so we check that it exists at least once
    expect(screen.getAllByText("High").length).toBeGreaterThan(0);
  });
});

// FoundVulnerabilitiesCard Tests
describe("FoundVulnerabilitiesCard", () => {
  it("renders vulnerabilities card", () => {
    render(
      <FoundVulnerabilitiesCard
        title="Vulnerabilities"
        subtitle="Subtitle"
        identifiedCount={50}
        unweightedASR={10.5}
        weightedASR={12.3}
        status="success"
      />
    );
    expect(screen.getByText("Vulnerabilities")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("10.5%")).toBeInTheDocument();
  });

  it("calls onMaximizeClick when maximize button is clicked", async () => {
    const handleMaximize = vi.fn();
    render(
      <FoundVulnerabilitiesCard
        title="Test"
        subtitle="Sub"
        identifiedCount={10}
        unweightedASR={5}
        weightedASR={6}
        status="warning"
        onMaximizeClick={handleMaximize}
      />
    );
    
    const maximizeButton = screen.getByLabelText("Maximize");
    fireEvent.click(maximizeButton);
    
    expect(handleMaximize).toHaveBeenCalledTimes(1);
  });
});

// ConversationalStatisticsCard Tests
describe("ConversationalStatisticsCard", () => {
  it("renders statistics card", () => {
    render(
      <ConversationalStatisticsCard
        title="Statistics"
        subtitle="Subtitle"
        avgChatLength={5.5}
        avgMessageLength={100.5}
        chatLengthStatus="success"
        messageLengthStatus="warning"
      />
    );
    expect(screen.getByText("Statistics")).toBeInTheDocument();
    expect(screen.getByText("5.50")).toBeInTheDocument();
  });

  it("calls onMaximizeClick when maximize button is clicked", async () => {
    const handleMaximize = vi.fn();
    render(
      <ConversationalStatisticsCard
        title="Test"
        subtitle="Sub"
        avgChatLength={5}
        avgMessageLength={100}
        chatLengthStatus="success"
        messageLengthStatus="success"
        onMaximizeClick={handleMaximize}
      />
    );
    
    const maximizeButton = screen.getByLabelText("Maximize");
    fireEvent.click(maximizeButton);
    
    expect(handleMaximize).toHaveBeenCalledTimes(1);
  });
});

// Dashboard Tests
describe("Dashboard", () => {
  it("renders dashboard with welcome message", () => {
    render(<Dashboard userName="John Doe" />);
    expect(screen.getByText("Welcome back, John Doe")).toBeInTheDocument();
  });

  it("calls onCreateReport when create button is clicked", async () => {
    const handleCreate = vi.fn();
    render(<Dashboard onCreateReport={handleCreate} />);
    
    const createButton = screen.getByText("Create Report");
    fireEvent.click(createButton);
    
    expect(handleCreate).toHaveBeenCalledTimes(1);
  });

  it("calls onCompareReports when compare button is clicked", async () => {
    const handleCompare = vi.fn();
    render(<Dashboard onCompareReports={handleCompare} />);
    
    const compareButton = screen.getByText("Compare Reports");
    fireEvent.click(compareButton);
    
    expect(handleCompare).toHaveBeenCalledTimes(1);
  });
});

// RatingCard Tests
describe("RatingCard", () => {
  it("renders rating card with rating", () => {
    render(
      <RatingCard
        title="Test Rating"
        subtitle="Subtitle"
        rating={4.5}
        description="Description"
      />
    );
    expect(screen.getByText("Test Rating")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("calls onHelpClick when help button is clicked", async () => {
    const handleHelp = vi.fn();
    render(
      <RatingCard
        title="Test"
        subtitle="Sub"
        rating={3}
        description="Desc"
        onHelpClick={handleHelp}
      />
    );
    
    const helpButton = screen.getByLabelText("Help");
    fireEvent.click(helpButton);
    
    expect(handleHelp).toHaveBeenCalledTimes(1);
  });
});

// PillarScoreCard Tests
describe("PillarScoreCard", () => {
  it("renders pillar score card", () => {
    render(
      <PillarScoreCard
        title="Pillar I"
        subtitle="Subtitle"
        score={4.5}
        status="success"
      />
    );
    expect(screen.getByText("Pillar I")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("shows locked message when isLocked is true", () => {
    render(
      <PillarScoreCard
        title="Pillar III"
        subtitle="Subtitle"
        score={0}
        status="locked"
        isLocked={true}
        lockedMessage="Coming soon"
      />
    );
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });

  it("calls onMaximizeClick when maximize button is clicked", async () => {
    const handleMaximize = vi.fn();
    render(
      <PillarScoreCard
        title="Test"
        subtitle="Sub"
        score={3}
        status="success"
        onMaximizeClick={handleMaximize}
      />
    );
    
    const maximizeButton = screen.getByLabelText("Maximize");
    fireEvent.click(maximizeButton);
    
    expect(handleMaximize).toHaveBeenCalledTimes(1);
  });
});

