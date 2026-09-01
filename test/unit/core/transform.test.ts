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

    it('should capitalize every word after the first', () => {
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

    it('should capitalize supplementary-plane Unicode letters', () => {
      expect(transform(['𐐨word'], {
        case: 'capital',
        separator: ' ',
      })).toBe('𐐀word')
      expect(transform(['𐐨word'], {
        case: 'lower',
        separator: ' ',
        capitalizeFirst: true,
      })).toBe('𐐀word')
      expect(transform(['first', '𐐨word'], {
        case: 'lower',
        separator: '',
        capitalizeAll: true,
      })).toBe('first𐐀word')
    })

    it('should apply contextual lowercase mappings to capitalized words', () => {
      expect(transform(['ΟΣ'], {
        case: 'capital',
        separator: ' ',
      })).toBe('Ος')
      expect(transform(['istanbul'], {
        case: 'capital',
        separator: ' ',
        locale: 'tr',
      })).toBe('İstanbul')
    })

    it('should capitalize an initial base with its combining marks', () => {
      expect(transform(['Ì'], {
        case: 'lower',
        separator: '',
        capitalizeFirst: true,
        locale: 'lt',
      })).toBe('I\u0300')
      expect(transform(['i\u0307\u0300'], {
        case: 'capital',
        separator: '',
        locale: 'lt',
      })).toBe('I\u0300')
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
