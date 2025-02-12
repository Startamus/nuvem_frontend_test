import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import App from '../App'
import { fetchRandomJoke, searchJokes, fetchCategories } from '../api/jokes'

// Mock all the API calls
vi.mock('../api/jokes', () => ({
  fetchRandomJoke: vi.fn(),
  searchJokes: vi.fn(),
  fetchCategories: vi.fn()
}))

const mockJoke = {
  id: '1',
  value: 'Test joke',
  categories: [],
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  url: 'https://api.chucknorris.io/jokes/1'
}

describe('App', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    })
    vi.mocked(fetchRandomJoke).mockResolvedValue(mockJoke)
    vi.mocked(fetchCategories).mockResolvedValue(['dev', 'sport'])
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('renders main components', () => {
    render(<App />, { wrapper })
    expect(screen.getByText('Chuck Norris Jokes')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search for jokes...')).toBeInTheDocument()
  })

  it('loads and displays a random joke', async () => {
    render(<App />, { wrapper })
    await waitFor(() => {
      expect(screen.getByText('Test joke')).toBeInTheDocument()
    })
  })

  it('handles category selection', async () => {
    const categoryJoke = { ...mockJoke, categories: ['dev'] }
    vi.mocked(fetchRandomJoke).mockResolvedValueOnce(categoryJoke)

    render(<App />, { wrapper })

    const categoryButton = await screen.findByText('dev')
    fireEvent.click(categoryButton)

    await waitFor(() => {
      expect(fetchRandomJoke).toHaveBeenCalledWith('dev')
    })
  })

  it('handles joke search', async () => {
    const searchResult = { ...mockJoke, value: 'Search result joke' }
    vi.mocked(searchJokes).mockResolvedValueOnce([searchResult])

    render(<App />, { wrapper })

    const searchInput = screen.getByPlaceholderText('Search for jokes...')
    fireEvent.change(searchInput, { target: { value: 'test' } })

    const form = screen.getByTestId('search-form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(searchJokes).toHaveBeenCalledWith('test')
    })
  })

  it('handles favorites', async () => {
    render(<App />, { wrapper })

    await waitFor(() => {
      expect(screen.getByText('Test joke')).toBeInTheDocument()
    })

    const favoriteButton = screen.getByText('Favorite')
    fireEvent.click(favoriteButton)

    expect(screen.getByText('Favorite Jokes')).toBeInTheDocument()
    expect(screen.getAllByText('Test joke')).toHaveLength(2) // One in main view, one in favorites
  })

  it('handles sharing', async () => {
    const mockShare = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'share', {
      value: mockShare,
      configurable: true,
      writable: true
    })

    render(<App />, { wrapper })

    await waitFor(() => {
      expect(screen.getByText('Test joke')).toBeInTheDocument()
    })

    const shareButton = screen.getAllByText('Share')[0]
    fireEvent.click(shareButton)

    expect(mockShare).toHaveBeenCalledWith({
      title: 'Chuck Norris Joke',
      text: 'Test joke',
      url: 'https://api.chucknorris.io/jokes/1'
    })
  })

  it('handles search form submission', async () => {
    render(<App />, { wrapper })

    const searchInput = screen.getByPlaceholderText('Search for jokes...')
    fireEvent.change(searchInput, { target: { value: 'test query' } })

    expect(searchInput).toHaveValue('test query')
  })

  it('handles clipboard fallback when share API is not available', async () => {
    // Remove share API
    Object.defineProperty(navigator, 'share', {
      value: undefined,
      configurable: true
    })

    // Mock clipboard
    const mockClipboard = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: mockClipboard,
      configurable: true
    })

    render(<App />, { wrapper })

    await waitFor(() => {
      expect(screen.getByText('Test joke')).toBeInTheDocument()
    })

    const shareButton = screen.getAllByText('Share')[0]
    fireEvent.click(shareButton)

    expect(mockClipboard).toHaveBeenCalledWith('Test joke')
  })

}) 