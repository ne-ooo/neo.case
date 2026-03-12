import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import type { CaseInput } from '../types.js'

/**
 * Convert to snake_case
 *
 * @param input - String or array to convert
 * @returns snake_case string
 *
 * @example
 * snakeCase('fooBar')         // 'foo_bar'
 * snakeCase('FooBar')         // 'foo_bar'
 * snakeCase('foo-bar')        // 'foo_bar'
 * snakeCase(['foo', 'bar'])   // 'foo_bar'
 */
export function snakeCase(input: CaseInput): string {
  const str = Array.isArray(input) ? input.join('-') : input

  if (!str || str.length === 0) {
    return ''
  }

  const words = split(str)

  return transform(words, {
    case: 'lower',
    separator: '_',
  })
}
