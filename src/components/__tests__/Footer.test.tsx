import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Footer } from "../ui/Footer";

describe("Footer", () => {
  it("renders footer text", () => {
    render(<Footer />);
    expect(screen.getByText("Powered by")).toBeInTheDocument();
  });

  it("renders link to Chuck Norris API", () => {
    render(<Footer />);
    const link = screen.getByText("api.chucknorris.io");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://api.chucknorris.io");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has correct styling classes", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    const link = screen.getByText("api.chucknorris.io");

    expect(footer).toHaveClass("mt-12", "text-center", "text-gray-400");
    expect(link).toHaveClass("text-yellow-500 hover:text-yellow-600");
  });
});
