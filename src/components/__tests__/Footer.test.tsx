import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "../ui/Footer";

describe("Footer", () => {
  it("should render the footer", () => {
    render(<Footer />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("api.chucknorris.io");
    expect(link).toHaveAttribute("href", "https://api.chucknorris.io");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
