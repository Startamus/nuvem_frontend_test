import React from "react"
import { Heart, Share2, Clock, Type } from "lucide-react"
import { Joke } from "../types"

interface JokeCardProps {
  joke: Joke
  isLoading: boolean
  isFavorite: boolean
  onToggleFavorite: () => void
  onShare: () => void
}

export function JokeCard({
  joke,
  isLoading,
  isFavorite,
  onToggleFavorite,
  onShare,
}: JokeCardProps) {
  const readingTime = Math.ceil(joke.value.split(" ").length / 200)
  const characterCount = joke.value.length

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 max-w-2xl w-full">
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ) : (
        <>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
            {joke.value}
          </p>
          <div className="flex flex-col-reverse sm:flex-row gap-2 items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <button
                onClick={onToggleFavorite}
                className={`flex items-center space-x-1 transition-colors ${
                  isFavorite ? "text-red-500" : "hover:text-red-500"
                }`}>
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
                <span>{isFavorite ? "Favorited" : "Favorite"}</span>
              </button>
              <button
                onClick={onShare}
                className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Type className="w-4 h-4" />
                <span>{characterCount} chars</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
