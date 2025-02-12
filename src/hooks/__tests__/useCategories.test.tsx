import { renderHook, waitFor } from '@testing-library/react'
import { useCategories } from '../useCategories'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import { fetchCategories } from '../../api/jokes'

vi.mock('../../api/jokes', () => ({
  fetchCategories: vi.fn().mockResolvedValue(['dev', 'sport', 'music'])
}))

describe('useCategories', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          throwOnError: true
        }
      }
    })
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  it('fetches categories successfully', async () => {
    const mockCategories = ['dev', 'sport', 'music']
    vi.mocked(fetchCategories).mockResolvedValueOnce(mockCategories)

    const { result } = renderHook(() => useCategories(), { wrapper })

    await waitFor(() => {
      expect(result.current.categories).toEqual(mockCategories)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })

  it('handles fetch error correctly', async () => {
    const error = new Error('Failed to fetch categories')
    vi.mocked(fetchCategories).mockRejectedValueOnce(error)

    const { result } = renderHook(() => useCategories(), { wrapper })

    await waitFor(() => {
      expect(result.current.error).toBeDefined()
      expect(result.current.isLoading).toBe(true)
      expect(result.current.categories).toEqual([])
    })
  })
}) 