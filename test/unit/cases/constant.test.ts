import { describe, it, expect } from 'vitest'
import { constantCase } from '../../../src/cases/constant.js'

describe('constantCase', () => {
  it('should convert camelCase to CONSTANT_CASE', () => {
    expect(constantCase('fooBar')).toBe('FOO_BAR')
  })

  it('should convert PascalCase to CONSTANT_CASE', () => {
    expect(constantCase('FooBar')).toBe('FOO_BAR')
  })

  it('should convert kebab-case to CONSTANT_CASE', () => {
    expect(constantCase('foo-bar')).toBe('FOO_BAR')
  })

  it('should convert snake_case to CONSTANT_CASE', () => {
    expect(constantCase('foo_bar')).toBe('FOO_BAR')
  })

  it('should handle already CONSTANT_CASE', () => {
    expect(constantCase('FOO_BAR')).toBe('FOO_BAR')
  })

  it('should convert array to CONSTANT_CASE', () => {
    expect(constantCase(['foo', 'bar'])).toBe('FOO_BAR')
  })

  it('should handle empty string', () => {
    expect(constantCase('')).toBe('')
  })

  it('should handle numbers', () => {
    expect(constantCase('foo2Bar')).toBe('FOO_2_BAR')
  })
})
