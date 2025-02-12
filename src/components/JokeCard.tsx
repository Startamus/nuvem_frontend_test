import { Heart, Share2, Clock, Type } from 'lucide-react';
import { Joke } from '../types/joke';

interface JokeCardProps {
  joke: Joke;
  isLoading: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

export function JokeCard({ joke, isLoading, isFavorite, onToggleFavorite, onShare }: JokeCardProps) {
  const readingTime = Math.ceil(joke.value.split(' ').length / 200);
  const characterCount = joke.value.length;

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl min-h-40 p-6 shadow-lg transition-all duration-300 max-w-2xl w-full">
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-200 h-4 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
        </div>
      ) : (
        <p className="text-lg font-semibold mb-4">{joke.value}</p>
      )}
      <div className="space-y-4 md:space-y-2 justify-between items-center text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <button
            onClick={onShare}
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>

          <div className="flex items-center space-x-1">
            <Type className="w-4 h-4" />
            <span>{characterCount} chars</span>
          </div>
        </div>
        <div className="flex items-center justify-between md:space-x-4">
          <button
            onClick={onToggleFavorite}
            className={`flex items-center space-x-1 transition-colors ${isFavorite ? 'text-red-500' : 'hover:text-red-500'
              }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>
    </div >
  );
}