import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Joke } from '../types';
import { JokeCard } from './JokeCard';
import { ErrorMessage } from './ErrorMessage';

interface JokeViewProps {
  joke: Joke | null;
  isLoading: boolean;
  error: string | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
  onRefresh: () => void;
}

export function JokeView({
  joke,
  isLoading,
  error,
  isFavorite,
  onToggleFavorite,
  onShare,
  onRefresh,
}: JokeViewProps) {
  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {error && <ErrorMessage message={error} />}
      
      {joke && (
        <JokeCard
          joke={joke}
          isLoading={isLoading}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          onShare={onShare}
        />
      )}

      <button
        onClick={onRefresh}
        className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 
                 text-white rounded-lg transition-colors duration-200"
        disabled={isLoading}
      >
        <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        <span>Get New Joke</span>
      </button>
    </div>
  );
}