import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import type { CaseInput } from '../types.js'

/**
 * Convert to CONSTANT_CASE
 *
 * @param input - String or array to convert
 * @returns CONSTANT_CASE string
 *
 * @example
 * constantCase('fooBar')         // 'FOO_BAR'
 * constantCase('foo-bar')        // 'FOO_BAR'
 * constantCase(['foo', 'bar'])   // 'FOO_BAR'
 */
export function constantCase(input: CaseInput): string {
  const str = Array.isArray(input) ? input.join('-') : input

  if (!str || str.length === 0) {
    return ''
  }

  const words = split(str)

  return transform(words, {
    case: 'upper',
    separator: '_',
  })
}
