import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchRandomJoke, searchJokes } from "../api/jokes";

export function useJokes(category?: string) {
  const queryClient = useQueryClient();

  const {
    data: joke,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["joke", category],
    queryFn: () => fetchRandomJoke(category),
    enabled: true,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const searchMutation = useMutation({
    mutationFn: searchJokes,
    onSuccess: (jokes) => {
      if (jokes.length > 0) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        queryClient.setQueryData(["joke", category], randomJoke);
      }
    },
  });

  const refreshJoke = () => {
    queryClient.invalidateQueries({ queryKey: ["joke", category] });
  };

  return {
    joke,
    isFetching,
    error,
    searchJokes: searchMutation.mutate,
    isSearching: searchMutation.isPending,
    searchError: searchMutation.error,
    refreshJoke,
  };
}
