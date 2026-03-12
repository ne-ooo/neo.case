import { describe, it, expect } from 'vitest'
import { snakeCase } from '../../../src/cases/snake.js'

describe('snakeCase', () => {
  it('should convert camelCase to snake_case', () => {
    expect(snakeCase('fooBar')).toBe('foo_bar')
  })

  it('should convert PascalCase to snake_case', () => {
    expect(snakeCase('FooBar')).toBe('foo_bar')
  })

  it('should convert kebab-case to snake_case', () => {
    expect(snakeCase('foo-bar')).toBe('foo_bar')
  })

  it('should handle already snake_case', () => {
    expect(snakeCase('foo_bar')).toBe('foo_bar')
  })

  it('should convert CONSTANT_CASE to snake_case', () => {
    expect(snakeCase('FOO_BAR')).toBe('foo_bar')
  })

  it('should convert array to snake_case', () => {
    expect(snakeCase(['foo', 'bar'])).toBe('foo_bar')
  })

  it('should handle empty string', () => {
    expect(snakeCase('')).toBe('')
  })

  it('should handle numbers', () => {
    expect(snakeCase('foo2Bar')).toBe('foo_2_bar')
  })

  it('should handle consecutive uppercase', () => {
    expect(snakeCase('FOOBar')).toBe('foo_bar')
  })
})
