import { renderHook } from '@testing-library/react'
import { useShare } from '../useShare'
import { expect, describe, it, vi, beforeEach } from 'vitest'

describe('useShare', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should use navigator.share when available', async () => {
    const mockShare = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'share', {
      value: mockShare,
      configurable: true,
      writable: true
    })

    const { result } = renderHook(() => useShare())
    const success = await result.current.shareJoke('Test joke', 'http://test.url')


    expect(success).toBe(true)
    expect(mockShare).toHaveBeenCalledWith({
      title: 'Chuck Norris Joke',
      text: 'Test joke',
      url: 'http://test.url'
    })
  })

  it('should fallback to clipboard when share is not available', async () => {
    // Remove share API
    Object.defineProperty(navigator, 'share', {
      value: undefined,
      configurable: true
    })

    const mockClipboard = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: mockClipboard,
      configurable: true,
      writable: true
    })

    const { result } = renderHook(() => useShare())
    const success = await result.current.shareJoke('Test joke', 'http://test.url')


    expect(success).toBe(true)
    expect(mockClipboard).toHaveBeenCalledWith('Test joke')
  })

  it('should handle share API errors gracefully', async () => {
    const mockShare = vi.fn().mockRejectedValue(new Error('Share failed'))
    Object.defineProperty(navigator, 'share', {
      value: mockShare,
      configurable: true
    })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const { result } = renderHook(() => useShare())
    const success = await result.current.shareJoke('Test joke', 'http://test.url')


    expect(success).toBe(false)
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('should handle clipboard errors gracefully', async () => {
    // Remove share API
    Object.defineProperty(navigator, 'share', {
      value: undefined,
      configurable: true
    })

    const mockClipboard = vi.fn().mockRejectedValue(new Error('Clipboard failed'))
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: mockClipboard,
      configurable: true
    })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const { result } = renderHook(() => useShare())
    const success = await result.current.shareJoke('Test joke', 'http://test.url')


    expect(success).toBe(false)
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('should ignore AbortError from share API', async () => {
    const abortError = new Error('Share aborted')
    abortError.name = 'AbortError'
    const mockShare = vi.fn().mockRejectedValue(abortError)
    Object.defineProperty(navigator, 'share', {
      value: mockShare,
      configurable: true
    })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const { result } = renderHook(() => useShare())
    const success = await result.current.shareJoke('Test joke', 'http://test.url')



    expect(success).toBe(false)
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
}) 