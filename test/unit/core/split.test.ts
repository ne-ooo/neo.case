import { describe, it, expect } from 'vitest'
import { split } from '../../../src/core/split.js'

describe('split', () => {
  describe('camelCase and PascalCase', () => {
    it('should split camelCase', () => {
      expect(split('fooBar')).toEqual(['foo', 'Bar'])
    })

    it('should split PascalCase', () => {
      expect(split('FooBar')).toEqual(['Foo', 'Bar'])
    })

    it('should split multiple words in camelCase', () => {
      expect(split('fooBarBaz')).toEqual(['foo', 'Bar', 'Baz'])
    })

    it('should split consecutive uppercase', () => {
      expect(split('FOOBar')).toEqual(['FOO', 'Bar'])
    })

    it('should split XMLHttpRequest style', () => {
      expect(split('XMLHttpRequest')).toEqual(['XML', 'Http', 'Request'])
    })
  })

  describe('snake_case, kebab-case, and separators', () => {
    it('should split snake_case', () => {
      expect(split('foo_bar')).toEqual(['foo', 'bar'])
    })

    it('should split kebab-case', () => {
      expect(split('foo-bar')).toEqual(['foo', 'bar'])
    })

    it('should split dot.case', () => {
      expect(split('foo.bar')).toEqual(['foo', 'bar'])
    })

    it('should split space separated', () => {
      expect(split('foo bar')).toEqual(['foo', 'bar'])
    })

    it('should split CONSTANT_CASE', () => {
      expect(split('FOO_BAR')).toEqual(['FOO', 'BAR'])
    })

    it('should handle multiple separators', () => {
      expect(split('foo_-bar')).toEqual(['foo', 'bar'])
    })

    it('should handle mixed separators', () => {
      expect(split('foo-bar_baz.qux')).toEqual(['foo', 'bar', 'baz', 'qux'])
    })
  })

  describe('numbers', () => {
    it('should split number followed by letter', () => {
      expect(split('foo2Bar')).toEqual(['foo', '2', 'Bar'])
    })

    it('should split multiple numbers', () => {
      expect(split('foo2bar3baz')).toEqual(['foo', '2', 'bar', '3', 'baz'])
    })

    it('should handle number at start', () => {
      expect(split('2fooBar')).toEqual(['2', 'foo', 'Bar'])
    })

    it('should handle number at end', () => {
      expect(split('fooBar2')).toEqual(['foo', 'Bar', '2'])
    })
  })

  describe('special characters', () => {
    it('should preserve leading underscore', () => {
      expect(split('_fooBar')).toEqual(['_foo', 'Bar'])
    })

    it('should preserve leading dollar sign', () => {
      expect(split('$fooBar')).toEqual(['$foo', 'Bar'])
    })

    it('should preserve trailing underscore', () => {
      expect(split('fooBar_')).toEqual(['foo', 'Bar_'])
    })

    it('should preserve leading and trailing underscores', () => {
      expect(split('__fooBar__')).toEqual(['__foo', 'Bar__'])
    })
  })

  describe('edge cases', () => {
    it('should return empty array for empty string', () => {
      expect(split('')).toEqual([])
    })

    it('should handle single character', () => {
      expect(split('a')).toEqual(['a'])
    })

    it('should handle single word', () => {
      expect(split('foo')).toEqual(['foo'])
    })

    it('should handle all uppercase', () => {
      expect(split('FOO')).toEqual(['FOO'])
    })

    it('should handle only separators', () => {
      expect(split('___')).toEqual(['___'])
    })

    it('should filter out empty words from consecutive separators', () => {
      expect(split('foo---bar')).toEqual(['foo', 'bar'])
    })
  })
})
