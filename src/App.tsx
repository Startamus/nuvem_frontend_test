import { useState } from 'react';
import './App.css'
import { Footer } from './components/ui/Footer'
import { useJokes } from './hooks/useJokes';
import { Joke } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { JokeView } from './components/JokeView';
import { useShare } from './hooks/useShare';
import { useCategories } from './hooks/useCategories';


function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useLocalStorage<Joke[]>('favorites', []);

  const {
    joke,
    isLoading: jokesLoading,
    error: jokesError,
    searchJokes,
    isSearching,
    refreshJoke,
  } = useJokes(selectedCategory ?? undefined);
  const { categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { shareJoke } = useShare();


  const handleSearch = () => {
    searchJokes(searchQuery);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleToggleFavorite = () => {
    if (!joke) return;
    const isFavorite = favorites.some((fav) => fav.id === joke.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== joke.id));
    } else {
      setFavorites([...favorites, joke]);
    }
  };

  const handleShare = async () => {
    if (!joke) return;
    const success = await shareJoke(joke.value, joke.url);
    if (success && !navigator.share) {
      alert('Joke copied to clipboard!');
    }
  };

  return (
    <main className='flex flex-col grow items-center h-screen gap-10'>
      <header className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-bold hover:text-5xl transition-all duration-300'>Chuck Norris Jokes</h1>
      </header>

      <article className='flex flex-col items-center gap-4'>
        <JokeView
          joke={joke}
          isLoading={jokesLoading || isSearching}
          error={jokesError?.message ?? null}
          isFavorite={joke ? favorites.some((fav) => fav.id === joke.id) : false}
          onToggleFavorite={handleToggleFavorite}
          onShare={handleShare}
          onRefresh={refreshJoke}
        />
      </article>
      <Footer />
    </main>
  )
}

export default App
