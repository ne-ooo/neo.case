import { describe, it, expect } from 'vitest'
import { kebabCase } from '../../../src/cases/kebab.js'

describe('kebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    expect(kebabCase('fooBar')).toBe('foo-bar')
  })

  it('should convert PascalCase to kebab-case', () => {
    expect(kebabCase('FooBar')).toBe('foo-bar')
  })

  it('should convert snake_case to kebab-case', () => {
    expect(kebabCase('foo_bar')).toBe('foo-bar')
  })

  it('should handle already kebab-case', () => {
    expect(kebabCase('foo-bar')).toBe('foo-bar')
  })

  it('should convert CONSTANT_CASE to kebab-case', () => {
    expect(kebabCase('FOO_BAR')).toBe('foo-bar')
  })

  it('should convert array to kebab-case', () => {
    expect(kebabCase(['foo', 'bar'])).toBe('foo-bar')
  })

  it('should handle empty string', () => {
    expect(kebabCase('')).toBe('')
  })

  it('should handle numbers', () => {
    expect(kebabCase('foo2Bar')).toBe('foo-2-bar')
  })

  it('should handle spaces', () => {
    expect(kebabCase('foo bar')).toBe('foo-bar')
  })
})
