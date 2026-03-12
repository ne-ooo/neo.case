import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import type { CaseInput } from '../types.js'

/**
 * Convert to kebab-case
 *
 * @param input - String or array to convert
 * @returns kebab-case string
 *
 * @example
 * kebabCase('fooBar')         // 'foo-bar'
 * kebabCase('FooBar')         // 'foo-bar'
 * kebabCase('foo_bar')        // 'foo-bar'
 * kebabCase(['foo', 'bar'])   // 'foo-bar'
 */
export function kebabCase(input: CaseInput): string {
  const str = Array.isArray(input) ? input.join('-') : input

  if (!str || str.length === 0) {
    return ''
  }

  const words = split(str)

  return transform(words, {
    case: 'lower',
    separator: '-',
  })
}
