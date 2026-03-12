import { describe, it, expect } from 'vitest'
import { dotCase } from '../../../src/cases/dot.js'

describe('dotCase', () => {
  it('should convert camelCase to dot.case', () => {
    expect(dotCase('fooBar')).toBe('foo.bar')
  })

  it('should convert PascalCase to dot.case', () => {
    expect(dotCase('FooBar')).toBe('foo.bar')
  })

  it('should convert kebab-case to dot.case', () => {
    expect(dotCase('foo-bar')).toBe('foo.bar')
  })

  it('should convert snake_case to dot.case', () => {
    expect(dotCase('foo_bar')).toBe('foo.bar')
  })

  it('should handle already dot.case', () => {
    expect(dotCase('foo.bar')).toBe('foo.bar')
  })

  it('should convert array to dot.case', () => {
    expect(dotCase(['foo', 'bar'])).toBe('foo.bar')
  })

  it('should handle empty string', () => {
    expect(dotCase('')).toBe('')
  })
})
