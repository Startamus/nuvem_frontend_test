import { render, screen, fireEvent } from '@testing-library/react'
import { CategoryList } from '../CategoryList'
import { expect, describe, it, vi } from 'vitest'

describe('CategoryList', () => {
  const mockCategories = ['dev', 'sport', 'music']
  const defaultProps = {
    categories: mockCategories,
    selectedCategory: null,
    onSelectCategory: vi.fn()
  }

  it('renders all categories', () => {
    render(<CategoryList {...defaultProps} />)
    mockCategories.forEach(category => {
      expect(screen.getByText(category, { exact: false })).toBeInTheDocument()
    })
  })

  it('highlights selected category', () => {
    render(<CategoryList {...defaultProps} selectedCategory="dev" />)
    const selectedButton = screen.getByText('dev', { exact: false }).closest('button')
    expect(selectedButton).toHaveClass('bg-blue-500')
  })

  it('calls onSelectCategory when clicking a category', () => {
    const onSelectCategory = vi.fn()
    render(<CategoryList {...defaultProps} onSelectCategory={onSelectCategory} />)

    fireEvent.click(screen.getByText('dev', { exact: false }))
    expect(onSelectCategory).toHaveBeenCalledWith('dev')
  })

  it('renders correct icon for each category', () => {
    render(<CategoryList {...defaultProps} />)
    const devButton = screen.getByText('dev', { exact: false }).closest('button')
    expect(devButton?.querySelector('svg')).toBeInTheDocument()
  })

  it('uses fallback icon for unknown categories', () => {
    render(
      <CategoryList
        {...defaultProps}
        categories={[...mockCategories, 'unknown']}
      />
    )
    const unknownButton = screen.getByText('unknown', { exact: false }).closest('button')
    expect(unknownButton?.querySelector('svg')).toBeInTheDocument()
  })
}) 