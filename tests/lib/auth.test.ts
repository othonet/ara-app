import { describe, it, expect, beforeEach } from 'vitest'
import { hashPassword, verifyPassword, generateToken, verifyToken } from '@/lib/auth'
import { UserRole } from '@prisma/client'

describe('Auth Functions', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'testpassword123'
      const hashed = await hashPassword(password)
      
      expect(hashed).toBeDefined()
      expect(hashed).not.toBe(password)
      expect(hashed.length).toBeGreaterThan(0)
    })

    it('should produce different hashes for the same password', async () => {
      const password = 'testpassword123'
      const hash1 = await hashPassword(password)
      const hash2 = await hashPassword(password)
      
      expect(hash1).not.toBe(hash2)
    })
  })

  describe('verifyPassword', () => {
    it('should verify correct password', async () => {
      const password = 'testpassword123'
      const hashed = await hashPassword(password)
      const isValid = await verifyPassword(password, hashed)
      
      expect(isValid).toBe(true)
    })

    it('should reject incorrect password', async () => {
      const password = 'testpassword123'
      const wrongPassword = 'wrongpassword'
      const hashed = await hashPassword(password)
      const isValid = await verifyPassword(wrongPassword, hashed)
      
      expect(isValid).toBe(false)
    })
  })

  describe('generateToken', () => {
    it('should generate a valid token', () => {
      const payload = {
        userId: 'test-user-id',
        email: 'test@example.com',
        role: UserRole.DIRETOR,
      }
      
      const token = generateToken(payload)
      
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
    })

    it('should generate different tokens for different payloads', () => {
      const payload1 = {
        userId: 'user1',
        email: 'user1@example.com',
        role: UserRole.DIRETOR,
      }
      
      const payload2 = {
        userId: 'user2',
        email: 'user2@example.com',
        role: UserRole.ANALISTA,
      }
      
      const token1 = generateToken(payload1)
      const token2 = generateToken(payload2)
      
      expect(token1).not.toBe(token2)
    })
  })

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const payload = {
        userId: 'test-user-id',
        email: 'test@example.com',
        role: UserRole.DIRETOR,
      }
      
      const token = generateToken(payload)
      const verified = verifyToken(token)
      
      expect(verified).not.toBeNull()
      expect(verified?.userId).toBe(payload.userId)
      expect(verified?.email).toBe(payload.email)
      expect(verified?.role).toBe(payload.role)
    })

    it('should reject invalid token', () => {
      const invalidToken = 'invalid.token.here'
      const verified = verifyToken(invalidToken)
      
      expect(verified).toBeNull()
    })

    it('should reject empty token', () => {
      const verified = verifyToken('')
      
      expect(verified).toBeNull()
    })
  })
})

