import { describe, it, expect } from 'vitest'
import { transform } from '../../../src/core/transform.js'

describe('transform', () => {
  describe('case transformations', () => {
    it('should lowercase all words', () => {
      const result = transform(['FOO', 'BAR'], {
        case: 'lower',
        separator: '-',
      })
      expect(result).toBe('foo-bar')
    })

    it('should uppercase all words', () => {
      const result = transform(['foo', 'bar'], {
        case: 'upper',
        separator: '_',
      })
      expect(result).toBe('FOO_BAR')
    })

    it('should capitalize all words', () => {
      const result = transform(['foo', 'bar'], {
        case: 'capital',
        separator: ' ',
      })
      expect(result).toBe('Foo Bar')
    })

    it('should preserve case', () => {
      const result = transform(['FoO', 'BaR'], {
        case: 'preserve',
        separator: '-',
      })
      expect(result).toBe('FoO-BaR')
    })
  })

  describe('separators', () => {
    it('should use hyphen separator', () => {
      const result = transform(['foo', 'bar'], {
        case: 'lower',
        separator: '-',
      })
      expect(result).toBe('foo-bar')
    })

    it('should use underscore separator', () => {
      const result = transform(['foo', 'bar'], {
        case: 'lower',
        separator: '_',
      })
      expect(result).toBe('foo_bar')
    })

    it('should use dot separator', () => {
      const result = transform(['foo', 'bar'], {
        case: 'lower',
        separator: '.',
      })
      expect(result).toBe('foo.bar')
    })

    it('should use space separator', () => {
      const result = transform(['foo', 'bar'], {
        case: 'lower',
        separator: ' ',
      })
      expect(result).toBe('foo bar')
    })

    it('should use empty separator for camelCase', () => {
      const result = transform(['foo', 'bar'], {
        case: 'lower',
        separator: '',
        capitalizeAll: true,
      })
      expect(result).toBe('fooBar')
    })
  })

  describe('capitalization options', () => {
    it('should capitalize first word', () => {
      const result = transform(['foo', 'bar'], {
        case: 'lower',
        separator: ' ',
        capitalizeFirst: true,
      })
      expect(result).toBe('Foo bar')
    })

    it('should capitalize all words', () => {
      const result = transform(['foo', 'bar', 'baz'], {
        case: 'lower',
        separator: '',
        capitalizeAll: true,
      })
      expect(result).toBe('fooBarBaz')
    })

    it('should capitalize first and all words', () => {
      const result = transform(['foo', 'bar', 'baz'], {
        case: 'lower',
        separator: '',
        capitalizeFirst: true,
        capitalizeAll: true,
      })
      expect(result).toBe('FooBarBaz')
    })
  })

  describe('edge cases', () => {
    it('should return empty string for empty array', () => {
      const result = transform([], {
        case: 'lower',
        separator: '-',
      })
      expect(result).toBe('')
    })

    it('should handle single word', () => {
      const result = transform(['foo'], {
        case: 'lower',
        separator: '-',
      })
      expect(result).toBe('foo')
    })

    it('should handle empty strings in array', () => {
      const result = transform(['foo', '', 'bar'], {
        case: 'lower',
        separator: '-',
      })
      expect(result).toBe('foo--bar')
    })
  })
})
