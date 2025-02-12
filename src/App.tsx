import { useState } from "react";
import { Footer } from "./components/ui/Footer";
import { useJokes } from "./hooks/useJokes";
import { Joke } from "./types/joke";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { JokeView } from "./components/JokeView";
import { useShare } from "./hooks/useShare";
import { useCategories } from "./hooks/useCategories";
import { CategoryList } from "./components/CategoryList";
import { SearchBar } from "./components/SearchBar";
import { JokeCard } from "./components/JokeCard";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useLocalStorage<Joke[]>("favorites", []);
  const [notification, setNotification] = useState<string | null>(null);
  const {
    joke,
    isFetching: jokesLoading,
    error: jokesError,
    searchJokes,
    isSearching,
    refreshJoke,
  } = useJokes(selectedCategory ?? undefined);
  const { categories } = useCategories();
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
      setNotification("Joke copied to clipboard!"); // Replace alert with this
      setTimeout(() => setNotification(null), 3000); // Clear after 3s
    }
  };

  const handleRefreshJoke = () => {
    refreshJoke();
    console.log("Limpe");
    setSearchQuery("");
  };

  return (
    <main className="flex grow flex-col items-center gap-10 p-4">
      {notification && (
        <div
          role="alert"
          className="fixed top-4 right-4 rounded bg-green-500 px-4 py-2 text-white shadow"
        >
          {notification}
        </div>
      )}
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-bold text-red-500 transition-all duration-300 hover:text-5xl md:text-4xl">
          Chuck Norris Jokes
        </h1>
      </header>

      <article className="flex flex-col items-center gap-4">
        <JokeView
          joke={joke}
          isLoading={jokesLoading || isSearching}
          searchQuery={searchQuery}
          error={jokesError?.message ?? null}
          isFavorite={
            joke ? favorites.some((fav) => fav.id === joke.id) : false
          }
          onToggleFavorite={handleToggleFavorite}
          onShare={handleShare}
          onRefresh={handleRefreshJoke}
        />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />

        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        {favorites.length > 0 && (
          <section className="mt-12 w-full">
            <h2 className="mb-4 text-2xl font-bold text-yellow-500">
              Favorite Jokes
            </h2>
            <div className="space-y-4">
              {favorites.map((favorite) => (
                <JokeCard
                  key={favorite.id}
                  joke={favorite}
                  isLoading={false}
                  isFavorite={true}
                  onToggleFavorite={() => {
                    setFavorites(
                      favorites.filter((fav) => fav.id !== favorite.id),
                    );
                  }}
                  onShare={() => {
                    shareJoke(favorite.value, favorite.url).then((success) => {
                      if (success && !navigator.share) {
                        alert("Joke copied to clipboard!");
                      }
                    });
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </main>
  );
}

export default App;
