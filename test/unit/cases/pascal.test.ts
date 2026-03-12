import { describe, it, expect } from 'vitest'
import { pascalCase } from '../../../src/cases/pascal.js'

describe('pascalCase', () => {
  it('should convert kebab-case to PascalCase', () => {
    expect(pascalCase('foo-bar')).toBe('FooBar')
  })

  it('should convert snake_case to PascalCase', () => {
    expect(pascalCase('foo_bar')).toBe('FooBar')
  })

  it('should convert camelCase to PascalCase', () => {
    expect(pascalCase('fooBar')).toBe('FooBar')
  })

  it('should handle already PascalCase', () => {
    expect(pascalCase('FooBar')).toBe('FooBar')
  })

  it('should convert array to PascalCase', () => {
    expect(pascalCase(['foo', 'bar'])).toBe('FooBar')
  })

  it('should handle empty string', () => {
    expect(pascalCase('')).toBe('')
  })

  it('should handle single character', () => {
    expect(pascalCase('a')).toBe('A')
  })

  it('should preserve leading special characters', () => {
    expect(pascalCase('_foo-bar')).toBe('_FooBar')
  })
})
