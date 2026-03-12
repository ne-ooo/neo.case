import { describe, it, expect } from 'vitest'
import { pathCase } from '../../../src/cases/path.js'

describe('pathCase', () => {
  it('should convert camelCase to path/case', () => {
    expect(pathCase('fooBar')).toBe('foo/bar')
  })

  it('should convert PascalCase to path/case', () => {
    expect(pathCase('FooBar')).toBe('foo/bar')
  })

  it('should convert kebab-case to path/case', () => {
    expect(pathCase('foo-bar')).toBe('foo/bar')
  })

  it('should convert snake_case to path/case', () => {
    expect(pathCase('foo_bar')).toBe('foo/bar')
  })

  it('should handle already path/case', () => {
    expect(pathCase('foo/bar')).toBe('foo/bar')
  })

  it('should convert array to path/case', () => {
    expect(pathCase(['foo', 'bar'])).toBe('foo/bar')
  })

  it('should handle empty string', () => {
    expect(pathCase('')).toBe('')
  })
})
