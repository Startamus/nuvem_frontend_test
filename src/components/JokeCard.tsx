import { Heart, Share2, Clock, Type } from "lucide-react";
import { Joke } from "../types/joke";
import { JokerCardSkeleton } from "./JokeCardSkeleton";

interface JokeCardProps {
  joke: Joke;
  isLoading: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

export function JokeCard({
  joke,
  isLoading,
  isFavorite,
  onToggleFavorite,
  onShare,
}: JokeCardProps) {
  const readingTime = Math.ceil(joke.value.split(" ").length / 200);
  const characterCount = joke.value.length;

  return (
    <div className="min-h-40 w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg transition-all duration-300">
      {isLoading ? (
        <JokerCardSkeleton />
      ) : (
        <>
          <p className="mb-4 text-lg text-gray-800">{joke.value}</p>
          <div className="flex flex-col-reverse items-center justify-between gap-2 text-sm text-gray-500 sm:flex-row dark:text-gray-400">
            <div className="flex items-center gap-4">
              <button
                onClick={onToggleFavorite}
                className={`flex h-10 cursor-pointer items-center space-x-1 transition-colors ${
                  isFavorite ? "text-red-500" : "hover:text-red-500"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                />
                <span>{isFavorite ? "Favorited" : "Favorite"}</span>
              </button>
              <button
                onClick={onShare}
                className="flex cursor-pointer items-center space-x-1 transition-colors hover:text-blue-500"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
            <div className="flex items-center justify-between md:space-x-4">
              <div className="flex items-center space-x-1">
                <Type className="h-4 w-4" />
                <span>{characterCount} chars</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
