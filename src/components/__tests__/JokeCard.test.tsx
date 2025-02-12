import { render, screen } from "@testing-library/react";
import { JokeCard } from "../JokeCard";
import { expect, describe, it } from "vitest";

describe("JokeCard", () => {
  const mockJoke = {
    id: "1",
    value: "Test joke",
    categories: [],
    created_at: "2020-01-05",
    updated_at: "2020-01-05",
    url: "https://api.chucknorris.io/jokes/1",
  };

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
    expect(screen.getByText("Test joke")).toBeInTheDocument();
  });
});
