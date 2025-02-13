import { RefreshCw } from "lucide-react";
import type { Joke } from "../types/joke";
import { JokeCard } from "./JokeCard";
import { ErrorMessage } from "./ErrorMessage";

interface JokeViewProps {
  joke: Joke | undefined;
  isLoading: boolean;
  error: string | null;
  isFavorite: boolean;
  searchQuery?: string;
  onToggleFavorite: () => void;
  onShare: () => void;
  onRefresh: () => void;
}

export function JokeView({
  joke,
  isLoading,
  error,
  isFavorite,
  searchQuery,
  onToggleFavorite,
  onShare,
  onRefresh,
}: JokeViewProps) {
  return (
    <div className="flex w-full flex-col items-center space-y-6">
      {error && <ErrorMessage message={error} />}

      {joke && (
        <JokeCard
          joke={joke}
          isLoading={isLoading}
          isFavorite={isFavorite}
          searchQuery={searchQuery}
          onToggleFavorite={onToggleFavorite}
          onShare={onShare}
        />
      )}

      <button
        onClick={onRefresh}
        className="flex cursor-pointer items-center space-x-2 rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-600"
        disabled={isLoading}
      >
        <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
        <span>Get New Joke</span>
      </button>
    </div>
  );
}
