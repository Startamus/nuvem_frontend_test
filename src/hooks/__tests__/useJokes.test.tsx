import { renderHook, waitFor } from '@testing-library/react'
import { useJokes } from '../useJokes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { expect, describe, it } from 'vitest'

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useJokes', () => {
  it('fetches a random joke', async () => {
    const { result } = renderHook(() => useJokes(), { wrapper })

    await waitFor(() => {
      expect(result.current.joke).toBeDefined()
      expect(result.current.joke?.value).toBe('Test joke')
    })
  })
}) 