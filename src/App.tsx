import './App.css'
import { SearchBar } from './components/ui/SearchBar'
import { Footer } from './components/ui/Footer'


function App() {
  return (
    <main className='flex flex-col items-center h-screen gap-10'>
      <h1 className='text-4xl font-bold hover:text-5xl transition-all duration-300'>Chuck Norris Jokes</h1>
      <SearchBar />

      <Footer />
    </main>
  )
}

export default App
