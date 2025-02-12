import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'
import { expect, describe, it, beforeEach, vi } from 'vitest'

describe('useLocalStorage', () => {
  const mockStorage: { [key: string]: string } = {}

  beforeEach(() => {
    // Clear mock storage before each test
    Object.keys(mockStorage).forEach(key => delete mockStorage[key])

    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn((key: string) => mockStorage[key]),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStorage[key]
      }),
      clear: vi.fn(() => {
        Object.keys(mockStorage).forEach(key => delete mockStorage[key])
      })
    }

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    })
  })

  it('should initialize with default value when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'))

    console.log('Initial Value Test:', {
      storedValue: result.current[0],
      mockStorage
    })

    expect(result.current[0]).toBe('default')
  })

  it('should load existing value from localStorage', () => {
    mockStorage['testKey'] = JSON.stringify('stored value')

    const { result } = renderHook(() => useLocalStorage('testKey', 'default'))

    console.log('Load Existing Value Test:', {
      storedValue: result.current[0],
      mockStorage
    })

    expect(result.current[0]).toBe('stored value')
  })

  it('should update value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'))

    act(() => {
      result.current[1]('new value')
    })

    console.log('Update Value Test:', {
      storedValue: result.current[0],
      mockStorage
    })

    expect(result.current[0]).toBe('new value')
    expect(JSON.parse(mockStorage['testKey'])).toBe('new value')
  })

  it('should handle complex objects', () => {
    const complexObject = { foo: 'bar', count: 42 }
    const { result } = renderHook(() => useLocalStorage('testKey', complexObject))

    act(() => {
      result.current[1]({ ...complexObject, count: 43 })
    })

    console.log('Complex Object Test:', {
      storedValue: result.current[0],
      mockStorage
    })

    expect(result.current[0]).toEqual({ foo: 'bar', count: 43 })
    expect(JSON.parse(mockStorage['testKey'])).toEqual({ foo: 'bar', count: 43 })
  })

  it('should handle errors when localStorage is not available', () => {
    // Mock console.error to prevent test output noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    // Simulate localStorage error
    Object.defineProperty(window, 'localStorage', {
      value: null,
      writable: true
    })

    const { result } = renderHook(() => useLocalStorage('testKey', 'default'))

    console.log('Error Handling Test:', {
      storedValue: result.current[0]
    })

    expect(result.current[0]).toBe('default')
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('should handle JSON parsing errors', () => {
    // Set invalid JSON in mock storage
    mockStorage['testKey'] = 'invalid json'

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    const { result } = renderHook(() => useLocalStorage('testKey', 'default'))

    console.log('JSON Parsing Error Test:', {
      storedValue: result.current[0],
      mockStorage
    })

    expect(result.current[0]).toBe('default')
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
}) 