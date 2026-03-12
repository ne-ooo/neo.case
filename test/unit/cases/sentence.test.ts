import { describe, it, expect } from 'vitest'
import { sentenceCase } from '../../../src/cases/sentence.js'

describe('sentenceCase', () => {
  it('should convert camelCase to Sentence case', () => {
    expect(sentenceCase('fooBar')).toBe('Foo bar')
  })

  it('should convert PascalCase to Sentence case', () => {
    expect(sentenceCase('FooBar')).toBe('Foo bar')
  })

  it('should convert kebab-case to Sentence case', () => {
    expect(sentenceCase('foo-bar')).toBe('Foo bar')
  })

  it('should convert snake_case to Sentence case', () => {
    expect(sentenceCase('foo_bar')).toBe('Foo bar')
  })

  it('should handle already Sentence case', () => {
    expect(sentenceCase('Foo bar')).toBe('Foo bar')
  })

  it('should convert array to Sentence case', () => {
    expect(sentenceCase(['foo', 'bar'])).toBe('Foo bar')
  })

  it('should handle empty string', () => {
    expect(sentenceCase('')).toBe('')
  })

  it('should handle multiple words', () => {
    expect(sentenceCase('foo-bar-baz')).toBe('Foo bar baz')
  })
})
