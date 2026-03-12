import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import type { CaseInput } from '../types.js'

/**
 * Convert to dot.case
 *
 * @param input - String or array to convert
 * @returns dot.case string
 *
 * @example
 * dotCase('fooBar')         // 'foo.bar'
 * dotCase('foo-bar')        // 'foo.bar'
 * dotCase(['foo', 'bar'])   // 'foo.bar'
 */
export function dotCase(input: CaseInput): string {
  const str = Array.isArray(input) ? input.join('-') : input

  if (!str || str.length === 0) {
    return ''
  }

  const words = split(str)

  return transform(words, {
    case: 'lower',
    separator: '.',
  })
}
