import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import type { CaseInput } from '../types.js'

/**
 * Convert to Train-Case
 *
 * @param input - String or array to convert
 * @returns Train-Case string
 *
 * @example
 * trainCase('fooBar')         // 'Foo-Bar'
 * trainCase('foo_bar')        // 'Foo-Bar'
 * trainCase(['foo', 'bar'])   // 'Foo-Bar'
 */
export function trainCase(input: CaseInput): string {
  const str = Array.isArray(input) ? input.join('-') : input

  if (!str || str.length === 0) {
    return ''
  }

  const words = split(str)

  return transform(words, {
    case: 'capital',
    separator: '-',
  })
}
