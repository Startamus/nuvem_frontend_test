import { renderHook, waitFor, act } from "@testing-library/react";
import { useJokes } from "../useJokes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, describe, it, vi, beforeEach } from "vitest";
import { fetchRandomJoke, searchJokes } from "../../api/jokes";

// Mock implementation
vi.mock("../../api/jokes", () => ({
  fetchRandomJoke: vi.fn().mockResolvedValue({
    id: "1",
    value: "Default test joke",
    categories: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    url: "https://api.chucknorris.io/jokes/1",
  }),
  searchJokes: vi.fn(),
}));

describe("useJokes", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          // Add this to prevent undefined data errors
          throwOnError: true,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("fetches a random joke successfully", async () => {
    const mockJoke = {
      id: "1",
      value: "Test joke",
      categories: [],
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
      url: "https://api.chucknorris.io/jokes/1",
    };

    vi.mocked(fetchRandomJoke).mockResolvedValueOnce(mockJoke);

    const { result } = renderHook(() => useJokes(), { wrapper });

    await waitFor(() => {
      expect(result.current.joke).toEqual(mockJoke);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("handles fetch error correctly", async () => {
    const error = new Error("Failed to fetch");
    vi.mocked(fetchRandomJoke).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useJokes(), { wrapper });

    await waitFor(() => {
      // React Query wraps the error in its own structure
      expect(result.current.error).toBeDefined();
      expect(result.current.isLoading).toBe(true);
      expect(result.current.joke).toBeUndefined();
    });
  });

  it("searches jokes successfully", async () => {
    const mockSearchResults = [
      {
        id: "2",
        value: "Search result joke",
        categories: [],
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
        url: "https://api.chucknorris.io/jokes/2",
      },
    ];

    vi.mocked(searchJokes).mockResolvedValueOnce(mockSearchResults);

    const { result } = renderHook(() => useJokes(), { wrapper });

    await act(async () => {
      result.current.searchJokes("test");
    });

    await waitFor(() => {
      expect(result.current.joke?.value).toBe("Search result joke");
      expect(result.current.isSearching).toBe(false);
    });
  });

  it("refreshes joke when calling refreshJoke", async () => {
    const { result } = renderHook(() => useJokes(), { wrapper });

    await act(async () => {
      result.current.refreshJoke();
    });

    expect(fetchRandomJoke).toHaveBeenCalled();
  });

  it("handles empty search query", async () => {
    vi.mocked(searchJokes).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useJokes(), { wrapper });

    await act(async () => {
      result.current.searchJokes("");
    });

    expect(searchJokes).toHaveBeenCalledWith("");
    expect(result.current.isSearching).toBe(false);
  });

  it("handles search error correctly", async () => {
    const error = new Error("Search failed");
    vi.mocked(searchJokes).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useJokes(), { wrapper });

    await act(async () => {
      result.current.searchJokes("test");
    });

    await waitFor(() => {
      expect(result.current.searchError).toBeTruthy();
      expect(result.current.isSearching).toBe(false);
    });
  });

  it("handles search with category filter", async () => {
    const mockJoke = {
      id: "3",
      value: "Category filtered joke",
      categories: ["dev"],
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
      url: "https://api.chucknorris.io/jokes/3",
    };

    vi.mocked(searchJokes).mockResolvedValueOnce([mockJoke]);

    const { result } = renderHook(() => useJokes("dev"), { wrapper });

    await act(async () => {
      result.current.searchJokes("test");
    });

    await waitFor(() => {
      expect(result.current.joke?.value).toBe("Category filtered joke");
      expect(result.current.isSearching).toBe(false);
    });
  });
});
