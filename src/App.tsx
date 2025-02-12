import { useState } from "react"
import "./App.css"
import { Footer } from "./components/ui/Footer"
import { useJokes } from "./hooks/useJokes"
import { Joke } from "./types"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { JokeView } from "./components/JokeView"
import { useShare } from "./hooks/useShare"
import { useCategories } from "./hooks/useCategories"
import { CategoryList } from "./components/CategoryList"
import { SearchBar } from "./components/SearchBar"
import { JokeCard } from "./components/JokeCard"

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useLocalStorage<Joke[]>("favorites", [])

  const {
    joke,
    isLoading: jokesLoading,
    error: jokesError,
    searchJokes,
    isSearching,
    refreshJoke,
  } = useJokes(selectedCategory ?? undefined)
  const { categories } = useCategories()
  const { shareJoke } = useShare()

  const handleSearch = () => {
    searchJokes(searchQuery)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleToggleFavorite = () => {
    if (!joke) return
    const isFavorite = favorites.some((fav) => fav.id === joke.id)
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== joke.id))
    } else {
      setFavorites([...favorites, joke])
    }
  }

  const handleShare = async () => {
    if (!joke) return
    const success = await shareJoke(joke.value, joke.url)
    if (success && !navigator.share) {
      alert("Joke copied to clipboard!")
    }
  }

  return (
    <main className="flex flex-col grow items-center h-screen gap-10">
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-3xl cursor-default sm:text-4xl hover:text-5xl md:text-5xl  font-bold hover:sm:text-6xl transition-all duration-300">
          Chuck Norris Jokes
        </h1>
      </header>

      <article className="flex flex-col items-center gap-4">
        <JokeView
          joke={joke}
          isLoading={jokesLoading || isSearching}
          error={jokesError?.message ?? null}
          isFavorite={
            joke ? favorites.some((fav) => fav.id === joke.id) : false
          }
          onToggleFavorite={handleToggleFavorite}
          onShare={handleShare}
          onRefresh={refreshJoke}
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
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
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
                      favorites.filter((fav) => fav.id !== favorite.id)
                    )
                  }}
                  onShare={() => {
                    shareJoke(favorite.value, favorite.url).then((success) => {
                      if (success && !navigator.share) {
                        alert("Joke copied to clipboard!")
                      }
                    })
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </main>
  )
}

export default App
