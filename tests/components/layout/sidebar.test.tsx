import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from '@/components/layout/sidebar'

// Mock do usePathname e useRouter
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}))

// Mock do fetch para logout
global.fetch = vi.fn()

describe('Sidebar Component', () => {
  it('should render PKG title', () => {
    render(<Sidebar />)
    expect(screen.getByText('PKG')).toBeInTheDocument()
  })

  it('should render navigation items', () => {
    render(<Sidebar />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Apontamento')).toBeInTheDocument()
    expect(screen.getByText('Cadastros')).toBeInTheDocument()
  })

  it('should render logout button', () => {
    render(<Sidebar />)
    expect(screen.getByText('Sair')).toBeInTheDocument()
  })
})

