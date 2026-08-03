import { describe, it, expect } from 'vitest'
import { camelCase } from '../../../src/cases/camel.js'

describe('camelCase', () => {
  describe('basic conversions', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(camelCase('foo-bar')).toBe('fooBar')
    })

    it('should convert snake_case to camelCase', () => {
      expect(camelCase('foo_bar')).toBe('fooBar')
    })

    it('should convert PascalCase to camelCase', () => {
      expect(camelCase('FooBar')).toBe('fooBar')
    })

    it('should convert dot.case to camelCase', () => {
      expect(camelCase('foo.bar')).toBe('fooBar')
    })

    it('should convert space separated to camelCase', () => {
      expect(camelCase('foo bar')).toBe('fooBar')
    })

    it('should convert CONSTANT_CASE to camelCase', () => {
      expect(camelCase('FOO_BAR')).toBe('fooBar')
    })

    it('should handle already camelCase', () => {
      expect(camelCase('fooBar')).toBe('fooBar')
    })
  })

  describe('array input (backward compatible with camelcase package)', () => {
    it('should convert array to camelCase', () => {
      expect(camelCase(['foo', 'bar'])).toBe('fooBar')
    })

    it('should handle array with multiple elements', () => {
      expect(camelCase(['foo', 'bar', 'baz'])).toBe('fooBarBaz')
    })

    it('should trim and filter empty strings from array', () => {
      expect(camelCase(['  foo  ', '', 'bar'])).toBe('fooBar')
    })

    it('should handle leading underscores in array (backward compatible)', () => {
      expect(camelCase(['__foo__', '--bar'])).toBe('__fooBar')
    })
  })

  describe('pascalCase option (backward compatible)', () => {
    it('should convert to PascalCase when option is true', () => {
      expect(camelCase('foo-bar', { pascalCase: true })).toBe('FooBar')
    })

    it('should convert array to PascalCase when option is true', () => {
      expect(camelCase(['foo', 'bar'], { pascalCase: true })).toBe('FooBar')
    })
  })

  describe('camelcase@9 options', () => {
    it('should preserve consecutive uppercase characters', () => {
      expect(camelCase('foo-BAR', {
        preserveConsecutiveUppercase: true,
      })).toBe('fooBAR')
      expect(camelCase('XMLHttpRequest', {
        preserveConsecutiveUppercase: true,
      })).toBe('XMLHttpRequest')
    })

    it('should not capitalize after numbers when disabled', () => {
      expect(camelCase('foo2bar', {
        capitalizeAfterNumber: false,
      })).toBe('foo2bar')
      expect(camelCase('Textures_3D', {
        capitalizeAfterNumber: false,
      })).toBe('textures3D')
    })
  })

  describe('special characters', () => {
    it('should preserve leading underscore', () => {
      expect(camelCase('_foo-bar')).toBe('_fooBar')
    })

    it('should preserve leading dollar sign', () => {
      expect(camelCase('$foo-bar')).toBe('$fooBar')
    })

    it('should preserve multiple leading underscores', () => {
      expect(camelCase('__foo-bar')).toBe('__fooBar')
    })

    it('should not treat slash as a camelcase separator', () => {
      expect(camelCase('foo/bar')).toBe('foo/bar')
    })

    it('should preserve dollar signs outside the leading prefix', () => {
      expect(camelCase('foo$')).toBe('foo$')
      expect(camelCase('$foo$')).toBe('$foo$')
    })
  })

  describe('numbers', () => {
    it('should handle numbers in string', () => {
      // Default behavior: capitalize after numbers
      expect(camelCase('foo2bar')).toBe('foo2Bar')
    })

    it('should handle numbers with separators', () => {
      expect(camelCase('foo-2-bar')).toBe('foo2Bar')
    })
  })

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(camelCase('')).toBe('')
    })

    it('should return empty string for whitespace only', () => {
      expect(camelCase('   ')).toBe('')
    })

    it('should handle single character', () => {
      expect(camelCase('a')).toBe('a')
    })

    it('should handle single word', () => {
      expect(camelCase('foo')).toBe('foo')
    })

    it('should handle multiple separators', () => {
      expect(camelCase('foo---bar')).toBe('fooBar')
    })

    it('should handle mixed separators', () => {
      expect(camelCase('foo_-bar.baz')).toBe('fooBarBaz')
    })

    it('should return leading special chars for only special chars', () => {
      expect(camelCase('___')).toBe('___')
    })
  })

  describe('Unicode support', () => {
    it('should handle Unicode characters', () => {
      expect(camelCase('розовый_пушистый')).toBe('розовыйПушистый')
    })

    it('should detect Unicode case boundaries', () => {
      expect(camelCase('fooÄBar')).toBe('fooÄbar')
      expect(camelCase('БыстрыйТест')).toBe('быстрыйТест')
      expect(camelCase('αΒeta')).toBe('αΒeta')
    })
  })
})
