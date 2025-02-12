import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CategoryList } from "../CategoryList";

const mockOnSelectCategory = vi.fn();

const setup = (categories: string[], selectedCategory: string | null) => {
  render(
    <CategoryList
      categories={categories}
      selectedCategory={selectedCategory}
      onSelectCategory={mockOnSelectCategory}
    />,
  );
};

describe("CategoryList", () => {
  it("should render a list of categories", () => {
    setup(["sport", "food", "movie"], "food");

    expect(screen.getByText("sport")).toBeInTheDocument();
    expect(screen.getByText("food")).toBeInTheDocument();
    expect(screen.getByText("movie")).toBeInTheDocument();
  });

  it("should call onSelectCategory when a category is clicked", () => {
    setup(["sport", "food", "movie"], "food");

    screen.getByText("sport").click();
    expect(mockOnSelectCategory).toHaveBeenCalledWith("sport");
  });

  it("should highlight the selected category", () => {
    setup(["sport", "food", "movie"], "food");

    expect(screen.getByRole("button", { name: "sport" })).not.toHaveClass(
      "bg-blue-500 text-white",
    );
    expect(screen.getByRole("button", { name: "food" })).toHaveClass(
      "bg-blue-500 text-white",
    );
    expect(screen.getByRole("button", { name: "food" })).not.toHaveClass(
      "bg-gray-100 text-gray-700 hover:bg-gray-200",
    );
    expect(screen.getByRole("button", { name: "movie" })).not.toHaveClass(
      "bg-blue-500 text-white",
    );
  });
});
