import { render, screen } from "@testing-library/react";
import { JokerCardSkeleton } from "../ui/jokeSkeleton";
import { expect, describe, it } from "vitest";

describe("JokeCardSkeleton", () => {
  it("renders skeleton loading state", () => {
    render(<JokerCardSkeleton />);
    const skeletonElement = screen.getByRole("loading");
    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement).toHaveClass("animate-pulse");
  });

  it("applies responsive classes correctly", () => {
    render(<JokerCardSkeleton />);
    const mobileOnlyPlaceholder = screen.getByTestId("skeleton-placeholder-mobile");
    expect(mobileOnlyPlaceholder).toHaveClass("sm:hidden");
  });
}); 