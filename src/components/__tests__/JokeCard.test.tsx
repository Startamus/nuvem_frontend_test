import { render, screen } from "@testing-library/react";
import { JokeCard } from "../JokeCard";
import { expect, describe, it, vi } from "vitest";

const mockOnToggleFavorite = vi.fn();
const mockOnShare = vi.fn();

const mockJoke = {
  id: "1",
  value: "Test joke",
  categories: [],
  created_at: "2020-01-05",
  updated_at: "2020-01-05",
  url: "https://api.chucknorris.io/jokes/1",
};
describe("JokeCard", () => {
  it("renders joke content", () => {
    render(
      <JokeCard
        joke={mockJoke}
        isLoading={false}
        isFavorite={false}
        onToggleFavorite={() => {}}
        onShare={() => {}}
      />,
    );
    const characterCount = mockJoke.value.length;
    const readingTime = Math.ceil(mockJoke.value.split(" ").length / 200);
    expect(screen.getByText("Test joke")).toBeInTheDocument();
    expect(screen.getByText("Favorite")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText(`${characterCount} chars`)).toBeInTheDocument();
    expect(screen.getByText(`${readingTime} min read`)).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(
      <JokeCard
        joke={mockJoke}
        isLoading={true}
        isFavorite={false}
        onToggleFavorite={() => {}}
        onShare={() => {}}
      />,
    );
    expect(screen.getByRole("loading")).toBeInTheDocument();
  });

  it("renders favorited button correctly", () => {
    render(
      <JokeCard
        joke={mockJoke}
        isLoading={false}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
        onShare={mockOnShare}
      />,
    );
    const favoritedButton = screen.getByRole("button", { name: "Favorited" });
    favoritedButton.click();
    expect(favoritedButton).toBeInTheDocument();
    expect(favoritedButton).toHaveClass("text-red-500");
    expect(mockOnToggleFavorite).toHaveBeenCalled();
    expect(mockOnShare).not.toHaveBeenCalled();
  });

  it("renders share button correctly", () => {
    render(
      <JokeCard
        joke={mockJoke}
        isLoading={false}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
        onShare={mockOnShare}
      />,
    );

    const shareButton = screen.getByRole("button", { name: "Share" });
    shareButton.click();
    expect(shareButton).toBeInTheDocument();
    expect(mockOnShare).toHaveBeenCalled();
    expect(mockOnToggleFavorite).not.toHaveBeenCalled();
  });
});
