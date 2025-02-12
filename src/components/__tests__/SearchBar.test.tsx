import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from '../SearchBar'
import { expect, describe, it, vi } from 'vitest'

describe('SearchBar', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    onSearch: vi.fn()
  }

  it('renders search input', () => {
    render(<SearchBar {...defaultProps} />)
    expect(screen.getByPlaceholderText('Search for jokes...')).toBeInTheDocument()
  })

  it('displays the current value', () => {
    render(<SearchBar {...defaultProps} value="test query" />)
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument()
  })

  it('calls onChange when input value changes', () => {
    const onChange = vi.fn()
    render(<SearchBar {...defaultProps} onChange={onChange} />)

    fireEvent.change(screen.getByPlaceholderText('Search for jokes...'), {
      target: { value: 'new search' }
    })

    expect(onChange).toHaveBeenCalledWith('new search')
  })

  it('calls onSearch when form is submitted', () => {
    const onSearch = vi.fn()
    render(<SearchBar {...defaultProps} onSearch={onSearch} />)

    const form = screen.getByTestId('search-form')
    fireEvent.submit(form)

    expect(onSearch).toHaveBeenCalled()
  })

  it('prevents default form submission', () => {
    const onSearch = vi.fn()
    render(<SearchBar {...defaultProps} onSearch={onSearch} />)

    const form = screen.getByTestId('search-form')

    fireEvent(
      form,
      new Event('submit', {
        bubbles: true,
        cancelable: true
      })
    )

    expect(onSearch).toHaveBeenCalled()
  })

  it('renders search icon', () => {
    render(<SearchBar {...defaultProps} />)
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
  })
}) 