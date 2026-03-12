import { describe, it, expect } from 'vitest'
import { trainCase } from '../../../src/cases/train.js'

describe('trainCase', () => {
  it('should convert camelCase to Train-Case', () => {
    expect(trainCase('fooBar')).toBe('Foo-Bar')
  })

  it('should convert PascalCase to Train-Case', () => {
    expect(trainCase('FooBar')).toBe('Foo-Bar')
  })

  it('should convert kebab-case to Train-Case', () => {
    expect(trainCase('foo-bar')).toBe('Foo-Bar')
  })

  it('should convert snake_case to Train-Case', () => {
    expect(trainCase('foo_bar')).toBe('Foo-Bar')
  })

  it('should handle already Train-Case', () => {
    expect(trainCase('Foo-Bar')).toBe('Foo-Bar')
  })

  it('should convert array to Train-Case', () => {
    expect(trainCase(['foo', 'bar'])).toBe('Foo-Bar')
  })

  it('should handle empty string', () => {
    expect(trainCase('')).toBe('')
  })

  it('should handle multiple words', () => {
    expect(trainCase('foo-bar-baz')).toBe('Foo-Bar-Baz')
  })
})
