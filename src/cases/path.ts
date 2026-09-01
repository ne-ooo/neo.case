import { split } from '../core/split.js'
import { transform } from '../core/transform.js'
import { normalizeCaseInput } from '../core/normalize.js'
import type { CaseInput } from '../types.js'

/**
 * Convert to path/case
 *
 * This is a case formatter, not a path sanitizer. Validate and contain
 * untrusted paths before using them with filesystem APIs.
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
  const str = normalizeCaseInput(input)

  if (!str || str.length === 0) {
    return ''
  }

  const words = split(str)

  return transform(words, {
    case: 'lower',
    separator: '/',
  })
}
