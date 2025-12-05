import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpar após cada teste
afterEach(() => {
  cleanup()
})

// Mock do Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock do ambiente
process.env.JWT_SECRET = 'test-secret-key-for-testing-purposes-only'
process.env.DATABASE_URL = 'mysql://test:test@localhost:3306/test_db'

