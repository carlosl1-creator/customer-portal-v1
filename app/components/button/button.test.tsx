import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";
import { ArrowUpRightIcon } from "../icons/icons";

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
    // Icon should be present in the button
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button text="Primary Button" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[#181d27]");
    expect(button).toHaveClass("text-white");
  });

  it("applies primary variant styles when explicitly set", () => {
    render(<Button text="Primary Button" variant="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[#181d27]");
    expect(button).toHaveClass("text-white");
  });

  it("applies secondary variant styles", () => {
    render(<Button text="Secondary Button" variant="secondary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("text-[#414651]");
    expect(button).toHaveClass("border-[#d5d7da]");
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
    
    // Should not throw an error
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
    // Icon container should not be present
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

