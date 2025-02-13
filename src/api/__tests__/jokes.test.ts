/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchRandomJoke, searchJokes, fetchCategories } from "../jokes";

const mockJoke = {
  id: "1",
  value: "Test joke",
  categories: [],
  created_at: "2020-01-05",
  updated_at: "2020-01-05",
  url: "https://api.chucknorris.io/jokes/1",
};

const mockJokeWithCategory = {
  id: "2",
  value: "Dev joke",
  categories: ["dev"],
  created_at: "2020-01-05",
  updated_at: "2020-01-05",
  url: "https://api.chucknorris.io/jokes/2",
};

describe("Jokes API", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("fetchRandomJoke", () => {
    beforeEach(() => {
      // @ts-ignore
      global.fetch = vi.fn();
    });

    it("fetches a random joke successfully", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockJoke),
      } as Response);

      const joke = await fetchRandomJoke();
      expect(joke).toEqual(mockJoke);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.chucknorris.io/jokes/random",
      );
    });

    it("fetches a random joke with category", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockJokeWithCategory),
      } as Response);

      const joke = await fetchRandomJoke("dev");
      expect(joke).toEqual(mockJokeWithCategory);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.chucknorris.io/jokes/random?category=dev",
      );
    });

    it("handles fetch error", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(fetchRandomJoke()).rejects.toThrow("Failed to fetch joke");
    });
  });

  describe("searchJokes", () => {
    beforeEach(() => {
      // @ts-ignore
      global.fetch = vi.fn();
    });

    it("searches jokes successfully", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ result: [mockJoke] }),
      } as Response);

      const jokes = await searchJokes("test");
      expect(jokes).toEqual([mockJoke]);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.chucknorris.io/jokes/search?query=test",
      );
    });

    it("returns empty array for no results", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ result: [] }),
      } as Response);

      const jokes = await searchJokes("nonexistent");
      expect(jokes).toEqual([]);
    });

    it("handles fetch error", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(searchJokes("test")).rejects.toThrow(
        "Failed to search jokes",
      );
    });
  });

  describe("fetchCategories", () => {
    beforeEach(() => {
      // @ts-ignore
      global.fetch = vi.fn();
    });

    it("fetches categories successfully", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(["dev", "sport", "music"]),
      } as Response);

      const categories = await fetchCategories();
      expect(categories).toEqual(["dev", "sport", "music"]);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.chucknorris.io/jokes/categories",
      );
    });

    it("handles fetch error", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(fetchCategories()).rejects.toThrow(
        "Failed to fetch categories",
      );
    });
  });
});
