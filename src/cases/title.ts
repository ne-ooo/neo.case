import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import type { CaseInput } from '../types.js'

/**
 * Convert to Title Case
 *
 * @param input - String or array to convert
 * @returns Title Case string
 *
 * @example
 * titleCase('fooBar')         // 'Foo Bar'
 * titleCase('foo-bar')        // 'Foo Bar'
 * titleCase(['foo', 'bar'])   // 'Foo Bar'
 */
export function titleCase(input: CaseInput): string {
  const str = Array.isArray(input) ? input.join('-') : input

  if (!str || str.length === 0) {
    return ''
  }

  const words = split(str)

  return transform(words, {
    case: 'capital',
    separator: ' ',
  })
}
