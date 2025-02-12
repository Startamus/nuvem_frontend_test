import { render, screen, fireEvent } from '@testing-library/react'
import { JokeView } from '../JokeView'
import { expect, describe, it, vi } from 'vitest'

describe('JokeView', () => {
  const mockJoke = {
    id: '1',
    value: 'Test joke',
    categories: [],
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    url: 'https://api.chucknorris.io/jokes/1'
  }

  const defaultProps = {
    joke: mockJoke,
    isLoading: false,
    error: null,
    isFavorite: false,
    onToggleFavorite: vi.fn(),
    onShare: vi.fn(),
    onRefresh: vi.fn()
  }

  it('renders joke content when provided', () => {
    render(<JokeView {...defaultProps} />)
    expect(screen.getByText('Test joke')).toBeInTheDocument()
  })

  it('shows error message when error exists', () => {
    render(<JokeView {...defaultProps} error="Failed to load joke" />)
    expect(screen.getByText('Failed to load joke')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<JokeView {...defaultProps} isLoading={true} />)
    const refreshIcon = screen.getByRole('button').querySelector('svg')
    expect(refreshIcon).toHaveClass('animate-spin')
  })

  it('handles refresh click', () => {
    const onRefresh = vi.fn()
    render(<JokeView {...defaultProps} onRefresh={onRefresh} />)

    fireEvent.click(screen.getByText('Get New Joke'))
    expect(onRefresh).toHaveBeenCalled()
  })

  it('disables refresh button when loading', () => {
    render(<JokeView {...defaultProps} isLoading={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
}) 