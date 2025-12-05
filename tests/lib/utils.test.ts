import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('Utils Functions', () => {
  describe('cn (classNames)', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'not-included')
      expect(result).toContain('base')
      expect(result).toContain('conditional')
      expect(result).not.toContain('not-included')
    })

    it('should merge Tailwind classes correctly', () => {
      const result = cn('p-4 p-6', 'p-8')
      // Tailwind merge should keep only the last p-* class
      expect(result).toContain('p-8')
      expect(result).not.toContain('p-4')
      expect(result).not.toContain('p-6')
    })

    it('should handle empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle undefined and null', () => {
      const result = cn('base', undefined, null, 'end')
      expect(result).toContain('base')
      expect(result).toContain('end')
    })
  })
})

