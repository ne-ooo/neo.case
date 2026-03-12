import { describe, it, expect } from 'vitest'
import { titleCase } from '../../../src/cases/title.js'

describe('titleCase', () => {
  it('should convert camelCase to Title Case', () => {
    expect(titleCase('fooBar')).toBe('Foo Bar')
  })

  it('should convert PascalCase to Title Case', () => {
    expect(titleCase('FooBar')).toBe('Foo Bar')
  })

  it('should convert kebab-case to Title Case', () => {
    expect(titleCase('foo-bar')).toBe('Foo Bar')
  })

  it('should convert snake_case to Title Case', () => {
    expect(titleCase('foo_bar')).toBe('Foo Bar')
  })

  it('should handle already Title Case', () => {
    expect(titleCase('Foo Bar')).toBe('Foo Bar')
  })

  it('should convert array to Title Case', () => {
    expect(titleCase(['foo', 'bar'])).toBe('Foo Bar')
  })

  it('should handle empty string', () => {
    expect(titleCase('')).toBe('')
  })

  it('should handle multiple words', () => {
    expect(titleCase('foo-bar-baz')).toBe('Foo Bar Baz')
  })

  it('should handle lowercase words', () => {
    expect(titleCase('foo bar baz')).toBe('Foo Bar Baz')
  })
})
