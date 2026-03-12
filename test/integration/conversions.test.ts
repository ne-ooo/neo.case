import { describe, it, expect } from 'vitest'
import {
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  constantCase,
  dotCase,
  pathCase,
  sentenceCase,
  titleCase,
  trainCase,
} from '../../src/index.js'

describe('Round-trip conversions', () => {
  it('should convert between camelCase and snake_case', () => {
    const input = 'fooBarBaz'
    const snake = snakeCase(input)      // 'foo_bar_baz'
    const camel = camelCase(snake)      // 'fooBarBaz'
    expect(camel).toBe(input)
  })

  it('should convert between camelCase and kebab-case', () => {
    const input = 'fooBarBaz'
    const kebab = kebabCase(input)      // 'foo-bar-baz'
    const camel = camelCase(kebab)      // 'fooBarBaz'
    expect(camel).toBe(input)
  })

  it('should convert between all cases', () => {
    const input = 'foo-bar-baz'

    const camel = camelCase(input)        // 'fooBarBaz'
    const pascal = pascalCase(camel)      // 'FooBarBaz'
    const snake = snakeCase(pascal)       // 'foo_bar_baz'
    const kebab = kebabCase(snake)        // 'foo-bar-baz'
    const constant = constantCase(kebab)  // 'FOO_BAR_BAZ'
    const dot = dotCase(constant)         // 'foo.bar.baz'
    const path = pathCase(dot)            // 'foo/bar/baz'

    expect(kebabCase(path)).toBe(input)
  })

  it('should handle complex conversions', () => {
    const input = 'XMLHttpRequest'

    const kebab = kebabCase(input)        // 'xml-http-request'
    const snake = snakeCase(kebab)        // 'xml_http_request'
    const pascal = pascalCase(snake)      // 'XmlHttpRequest'

    expect(pascal).toBe('XmlHttpRequest')
  })

  it('should preserve case through transformations', () => {
    const testCases = [
      { input: 'foo', cases: ['foo', 'Foo', 'foo', 'foo', 'FOO'] },
      { input: 'fooBar', cases: ['fooBar', 'FooBar', 'foo_bar', 'foo-bar', 'FOO_BAR'] },
      { input: 'foo-bar-baz', cases: ['fooBarBaz', 'FooBarBaz', 'foo_bar_baz', 'foo-bar-baz', 'FOO_BAR_BAZ'] },
    ]

    for (const { input, cases: expectedCases } of testCases) {
      expect(camelCase(input)).toBe(expectedCases[0])
      expect(pascalCase(input)).toBe(expectedCases[1])
      expect(snakeCase(input)).toBe(expectedCases[2])
      expect(kebabCase(input)).toBe(expectedCases[3])
      expect(constantCase(input)).toBe(expectedCases[4])
    }
  })
})

describe('Array input conversions', () => {
  it('should convert array to all cases', () => {
    const input = ['foo', 'bar', 'baz']

    expect(camelCase(input)).toBe('fooBarBaz')
    expect(pascalCase(input)).toBe('FooBarBaz')
    expect(snakeCase(input)).toBe('foo_bar_baz')
    expect(kebabCase(input)).toBe('foo-bar-baz')
    expect(constantCase(input)).toBe('FOO_BAR_BAZ')
    expect(dotCase(input)).toBe('foo.bar.baz')
    expect(pathCase(input)).toBe('foo/bar/baz')
    expect(sentenceCase(input)).toBe('Foo bar baz')
    expect(titleCase(input)).toBe('Foo Bar Baz')
    expect(trainCase(input)).toBe('Foo-Bar-Baz')
  })
})

describe('Special character handling', () => {
  it('should preserve leading underscores across cases', () => {
    const input = '__fooBar'

    expect(camelCase(input)).toBe('__fooBar')
    expect(snakeCase(input)).toBe('__foo_bar')
    expect(kebabCase(input)).toBe('__foo-bar')
  })

  it('should handle numbers consistently', () => {
    const input = 'foo2Bar'

    // camelCase capitalizes after numbers by default
    expect(camelCase(input)).toBe('foo2Bar')
    expect(snakeCase(input)).toBe('foo_2_bar')
    expect(kebabCase(input)).toBe('foo-2-bar')
    expect(constantCase(input)).toBe('FOO_2_BAR')
  })
})
