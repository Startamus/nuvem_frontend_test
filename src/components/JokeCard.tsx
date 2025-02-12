import { Heart, Share2, Clock, Type } from "lucide-react";
import { Joke } from "../types/joke";
import { JokerCardSkeleton } from "./ui/JokeSkeleton";
import { highlightJoke } from "../helpers/highlightJoke";

interface JokeCardProps {
  joke: Joke;
  isLoading: boolean;
  isFavorite: boolean;
  searchQuery?: string;
  onToggleFavorite: () => void;
  onShare: () => void;
}

export function JokeCard({
  joke,
  isLoading,
  isFavorite,
  searchQuery,
  onToggleFavorite,
  onShare,
}: JokeCardProps) {
  const jokeValue = highlightJoke(joke.value, searchQuery);

  const readingTime = Math.ceil(jokeValue.split(" ").length / 200);
  const characterCount = jokeValue.length;

  return (
    <div className="flex min-h-40 w-full max-w-2xl flex-col gap-4 rounded-xl bg-white p-6 shadow-lg transition-all duration-300">
      {!jokeValue && (
        <div className="min-h-40 w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg transition-all duration-300">
          <JokerCardSkeleton />
        </div>
      )}
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-3/4 rounded-md bg-gray-200"></div>
          <div className="h-4 w-1/2 rounded-md bg-gray-200"></div>
        </div>
      ) : (
        <p
          className="mb-4 text-left text-lg font-semibold"
          dangerouslySetInnerHTML={{ __html: jokeValue }}
        />
      )}
      <div className="items-center justify-between space-y-4 text-sm text-gray-500 md:space-y-2">
        <div className="flex items-center justify-between">
          <button
            onClick={onShare}
            className="flex items-center space-x-1 transition-colors hover:text-blue-500"
          >
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>

          <div className="flex items-center space-x-1">
            <Type className="h-4 w-4" />
            <span>{characterCount} chars</span>
          </div>
        </div>
        <div className="flex items-center justify-between md:space-x-4">
          <button
            onClick={onToggleFavorite}
            className={`flex items-center space-x-1 transition-colors ${
              isFavorite ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            <span>{isFavorite ? "Favorited" : "Favorite"}</span>
          </button>

          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
