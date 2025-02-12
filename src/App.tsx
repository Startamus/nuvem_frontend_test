import { useState } from 'react';
import './App.css'
import { Footer } from './components/ui/Footer'
import { useJokes } from './hooks/useJokes';


function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    joke,
    isLoading: jokesLoading,
    error: jokesError,
    searchJokes,
    isSearching,
    refreshJoke,
  } = useJokes(selectedCategory ?? undefined);

  return (
    <main className='flex flex-col grow items-center h-screen gap-10'>
      <header className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-bold hover:text-5xl transition-all duration-300'>Chuck Norris Jokes</h1>
      </header>


      <Footer />
    </main>
  )
}

export default App
