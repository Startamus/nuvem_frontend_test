import { describe, expect, it } from "vitest";
import { highlightJoke } from "../highlightJoke";

describe("highlightJoke", () => {
  it("should highlight the search query in the joke", () => {
    const joke = "This is a joke";
    const searchQuery = "joke";

    const result = highlightJoke(joke, searchQuery);

    expect(result).toBe(
      'This is a <span class="bg-yellow-200 p-0.5">joke</span>',
    );
  });

  it("should return joke without highlight when search query is empty", () => {
    const joke = "This is a joke";
    const result = highlightJoke(joke);

    expect(result).toBe(joke);
    expect(result).not.toContain("span");
  });

  it("should return joke without highlight when joke have one word", () => {
    const joke = "Joke";
    const result = highlightJoke(joke);
    const resultLength = result.split(" ").length;

    expect(result).toBe(joke);
    expect(result).not.toContain("span");
    expect(resultLength).toBe(1);
  });

  it("should return joke when search query is not in the joke", () => {
    const joke = "This is a joke";
    const searchQuery = "not";

    const result = highlightJoke(joke, searchQuery);

    expect(result).toBe(joke);
    expect(result).not.toContain("span");
    expect(result).not.toContain("not");
  });
});
