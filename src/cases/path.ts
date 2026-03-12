import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import type { CaseInput } from '../types.js'

/**
 * Convert to path/case
 *
 * @param input - String or array to convert
 * @returns path/case string
 *
 * @example
 * pathCase('fooBar')         // 'foo/bar'
 * pathCase('foo-bar')        // 'foo/bar'
 * pathCase(['foo', 'bar'])   // 'foo/bar'
 */
export function pathCase(input: CaseInput): string {
  const str = Array.isArray(input) ? input.join('-') : input

  if (!str || str.length === 0) {
    return ''
  }

  const words = split(str)

  return transform(words, {
    case: 'lower',
    separator: '/',
  })
}
